-- ============================================================
-- TL Elite Hockey — Supabase Schema
-- Run this in the Supabase SQL Editor (Dashboard > SQL Editor)
-- ============================================================

-- ============================================================
-- PROFILES
-- Extends auth.users. Auto-created via trigger on signup.
-- ============================================================
CREATE TABLE IF NOT EXISTS public.profiles (
  id            uuid        PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name     text        NOT NULL DEFAULT '',
  email         text        NOT NULL DEFAULT '',
  pro_status    text        NOT NULL DEFAULT 'free'
                            CHECK (pro_status IN ('free', 'member')),
  loyalty_points integer    NOT NULL DEFAULT 0 CHECK (loyalty_points >= 0),
  created_at    timestamptz NOT NULL DEFAULT now()
);

-- Trigger: auto-create profile on auth.users insert
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, email)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', ''),
    COALESCE(NEW.email, '')
  );
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- RLS: profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own profile"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- ============================================================
-- SESSIONS
-- Hockey training sessions displayed on /book and /clinics.
-- ============================================================
CREATE TABLE IF NOT EXISTS public.sessions (
  id                uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  name              text        NOT NULL,
  age_group         text,
  day               text,
  duration_minutes  integer     NOT NULL CHECK (duration_minutes > 0),
  price             numeric(10,2) NOT NULL CHECK (price >= 0),
  season            text        NOT NULL
                                CHECK (season IN ('Drop Ins', 'Spring 2026', 'Summer 2026', 'Clinics')),
  start_date        date,
  spots_left        integer     NOT NULL CHECK (spots_left >= 0),
  max_capacity      integer     NOT NULL CHECK (max_capacity > 0),
  stripe_product_id text,
  stripe_price_id   text,
  is_active         boolean     NOT NULL DEFAULT true,
  created_at        timestamptz NOT NULL DEFAULT now()
);

-- Index for tab filter queries
CREATE INDEX IF NOT EXISTS idx_sessions_season_active
  ON public.sessions (season, is_active);

-- RLS: sessions
ALTER TABLE public.sessions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view active sessions"
  ON public.sessions FOR SELECT
  USING (is_active = true);

-- INSERT / UPDATE / DELETE: service role only (no permissive policy = blocked for anon/authed)

-- ============================================================
-- BOOKINGS
-- Records each session purchase/enrollment.
-- ============================================================
CREATE TABLE IF NOT EXISTS public.bookings (
  id                          uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id                     uuid        NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  session_id                  uuid        NOT NULL REFERENCES public.sessions(id) ON DELETE RESTRICT,
  stripe_checkout_session_id  text        UNIQUE,
  stripe_payment_intent_id    text,
  amount_paid                 numeric(10,2) CHECK (amount_paid >= 0),
  status                      text        NOT NULL DEFAULT 'pending'
                                          CHECK (status IN ('pending', 'confirmed', 'cancelled')),
  created_at                  timestamptz NOT NULL DEFAULT now()
);

-- Index for user booking lookups
CREATE INDEX IF NOT EXISTS idx_bookings_user_id
  ON public.bookings (user_id);

CREATE INDEX IF NOT EXISTS idx_bookings_session_id
  ON public.bookings (session_id);

-- Trigger: decrement spots_left when booking is confirmed
CREATE OR REPLACE FUNCTION public.handle_booking_confirmed()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  -- Only decrement when status transitions TO 'confirmed'
  IF NEW.status = 'confirmed' AND (OLD.status IS DISTINCT FROM 'confirmed') THEN
    UPDATE public.sessions
    SET spots_left = spots_left - 1
    WHERE id = NEW.session_id
      AND spots_left > 0;
  END IF;

  -- Re-increment if a confirmed booking is cancelled
  IF NEW.status = 'cancelled' AND OLD.status = 'confirmed' THEN
    UPDATE public.sessions
    SET spots_left = spots_left + 1
    WHERE id = NEW.session_id;
  END IF;

  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_booking_status_change ON public.bookings;
CREATE TRIGGER on_booking_status_change
  AFTER UPDATE OF status ON public.bookings
  FOR EACH ROW EXECUTE FUNCTION public.handle_booking_confirmed();

-- RLS: bookings
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own bookings"
  ON public.bookings FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Authenticated users can create bookings"
  ON public.bookings FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- UPDATE: service role only (status changes via Stripe webhook)

-- ============================================================
-- PRODUCTS
-- Merchandise items for /shop.
-- ============================================================
CREATE TABLE IF NOT EXISTS public.products (
  id                uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  name              text        NOT NULL,
  slug              text        NOT NULL UNIQUE,
  price             numeric(10,2) NOT NULL CHECK (price >= 0),
  sale_price        numeric(10,2) CHECK (sale_price >= 0),
  images            text[]      NOT NULL DEFAULT '{}',
  badge             text        CHECK (badge IN ('New Arrival', 'Limited Edition', 'Best Seller')),
  category          text        NOT NULL
                                CHECK (category IN ('Hats', 'T-Shirts', 'Hoodies', 'Snapbacks')),
  description       text,
  stripe_product_id text,
  stripe_price_id   text,
  is_active         boolean     NOT NULL DEFAULT true,
  sort_order        integer     NOT NULL DEFAULT 0,
  created_at        timestamptz NOT NULL DEFAULT now()
);

-- Index for shop listing queries
CREATE INDEX IF NOT EXISTS idx_products_category_active
  ON public.products (category, is_active);

CREATE INDEX IF NOT EXISTS idx_products_sort_order
  ON public.products (sort_order);

-- RLS: products
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view active products"
  ON public.products FOR SELECT
  USING (is_active = true);

-- INSERT / UPDATE / DELETE: service role only

-- ============================================================
-- ORDERS
-- Merchandise orders from /shop.
-- ============================================================
CREATE TABLE IF NOT EXISTS public.orders (
  id                          uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id                     uuid        REFERENCES public.profiles(id) ON DELETE SET NULL,
  stripe_checkout_session_id  text        NOT NULL UNIQUE,
  stripe_payment_intent_id    text,
  line_items                  jsonb       NOT NULL DEFAULT '[]',
  total_amount                numeric(10,2) NOT NULL CHECK (total_amount >= 0),
  status                      text        NOT NULL DEFAULT 'pending'
                                          CHECK (status IN ('pending', 'paid', 'fulfilled', 'refunded')),
  customer_email              text,
  created_at                  timestamptz NOT NULL DEFAULT now()
);

-- Index for user order lookups
CREATE INDEX IF NOT EXISTS idx_orders_user_id
  ON public.orders (user_id);

-- RLS: orders
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own orders"
  ON public.orders FOR SELECT
  USING (auth.uid() = user_id);

-- INSERT / UPDATE: service role only (via Stripe webhook)

-- ============================================================
-- LOYALTY_TRANSACTIONS
-- Audit log for all loyalty point changes.
-- ============================================================
CREATE TABLE IF NOT EXISTS public.loyalty_transactions (
  id           uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id      uuid        NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  action       text        NOT NULL
                           CHECK (action IN ('signup', 'booking', 'purchase', 'online_program', 'redemption')),
  points       integer     NOT NULL, -- Positive = earned, negative = redeemed
  reference_id uuid,                 -- Optional FK to booking or order (not enforced at DB level)
  note         text,
  created_at   timestamptz NOT NULL DEFAULT now()
);

-- Index for user transaction history
CREATE INDEX IF NOT EXISTS idx_loyalty_transactions_user_id
  ON public.loyalty_transactions (user_id, created_at DESC);

-- RLS: loyalty_transactions
ALTER TABLE public.loyalty_transactions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own loyalty transactions"
  ON public.loyalty_transactions FOR SELECT
  USING (auth.uid() = user_id);

-- INSERT: service role only

-- ============================================================
-- CONTACT_SUBMISSIONS
-- Stores contact form and private lesson inquiry submissions.
-- ============================================================
CREATE TABLE IF NOT EXISTS public.contact_submissions (
  id         uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  form_type  text        NOT NULL
                         CHECK (form_type IN ('contact', 'private_lessons')),
  data       jsonb       NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- RLS: contact_submissions
ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit contact forms"
  ON public.contact_submissions FOR INSERT
  WITH CHECK (true);

-- SELECT: service role only (admin reads submissions)

-- ============================================================
-- EMAIL_SIGNUPS
-- Newsletter / popup email captures.
-- ============================================================
CREATE TABLE IF NOT EXISTS public.email_signups (
  id         uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  email      text        NOT NULL UNIQUE,
  source     text        NOT NULL DEFAULT 'popup'
                         CHECK (source IN ('popup', 'footer', 'inline')),
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.email_signups ENABLE ROW LEVEL SECURITY;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE tablename = 'email_signups' AND policyname = 'Anyone can subscribe'
  ) THEN
    EXECUTE 'CREATE POLICY "Anyone can subscribe" ON public.email_signups FOR INSERT WITH CHECK (true)';
  END IF;
END $$;

-- ============================================================
-- SITE_CONTENT
-- Key/value store for admin-editable copy (hero text, CTAs, etc.).
-- ============================================================
CREATE TABLE IF NOT EXISTS public.site_content (
  id         uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  key        text        NOT NULL UNIQUE,
  value      text        NOT NULL DEFAULT '',
  updated_at timestamptz NOT NULL DEFAULT now(),
  updated_by text
);

ALTER TABLE public.site_content ENABLE ROW LEVEL SECURITY;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE tablename = 'site_content' AND policyname = 'Anyone can read site content'
  ) THEN
    EXECUTE 'CREATE POLICY "Anyone can read site content" ON public.site_content FOR SELECT USING (true)';
  END IF;
END $$;

-- ============================================================
-- CONTACT_SUBMISSIONS — add is_read column
-- ============================================================
ALTER TABLE public.contact_submissions ADD COLUMN IF NOT EXISTS is_read boolean NOT NULL DEFAULT false;

-- ============================================================
-- CONTACT_SUBMISSIONS — add reply tracking
-- ============================================================
ALTER TABLE public.contact_submissions ADD COLUMN IF NOT EXISTS replied_at timestamptz DEFAULT NULL;
