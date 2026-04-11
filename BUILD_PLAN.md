# BUILD_PLAN.md — TL Elite Hockey (ywf-tlelite)

**Generated**: 2026-04-10  
**Planning Agent**: YWF Planning Agent (Opus)  
**Stack**: Next.js 15 (App Router) + React 19 + TypeScript strict + Tailwind CSS v4 + Shadcn/UI (base-nova) + Supabase + Stripe + Resend

---

## 1. Project Type Classification

**Hybrid: Marketing + Booking + E-Commerce + Membership**

This is the most complex YWF project type. It combines all three site patterns:

| Pattern | Pages | Core Need |
|---------|-------|-----------|
| Marketing | `/`, `/about`, `/contact` | SEO, content, lead capture |
| Booking | `/book`, `/clinics`, `/session-packs` | Supabase sessions + Stripe checkout |
| Lead Gen | `/private-lessons`, `/contact` | React Hook Form + Resend notifications |
| E-Commerce | `/shop` | Stripe cart + checkout + product catalog |
| Membership | `/loyalty` | Supabase points engine + Supabase Auth |

---

## 2. Directory Structure

Full proposed `src/` tree with all folders and key files:

```
src/
├── app/
│   ├── layout.tsx                        # Root layout — fonts, nav, footer, providers
│   ├── globals.css                       # TL Elite brand tokens + Tailwind base
│   ├── page.tsx                          # Homepage /
│   ├── sitemap.ts                        # Dynamic sitemap.xml
│   ├── robots.ts                         # robots.txt
│   │
│   ├── about/
│   │   └── page.tsx
│   │
│   ├── book/
│   │   └── page.tsx                      # Sessions listing + tab filter
│   │
│   ├── clinics/
│   │   └── page.tsx
│   │
│   ├── session-packs/
│   │   └── page.tsx
│   │
│   ├── private-lessons/
│   │   └── page.tsx                      # Hero + process + inquiry form
│   │
│   ├── shop/
│   │   ├── page.tsx                      # Product grid + sort + quick view
│   │   └── [slug]/
│   │       └── page.tsx                  # Individual product page (PDP)
│   │
│   ├── loyalty/
│   │   └── page.tsx                      # Members rewards page
│   │
│   ├── contact/
│   │   └── page.tsx
│   │
│   ├── auth/
│   │   ├── login/
│   │   │   └── page.tsx                  # Supabase Auth login
│   │   ├── signup/
│   │   │   └── page.tsx
│   │   └── callback/
│   │       └── route.ts                  # Supabase Auth PKCE callback
│   │
│   ├── account/
│   │   └── page.tsx                      # Member dashboard — points, bookings, orders
│   │
│   └── api/
│       ├── stripe/
│       │   ├── checkout/
│       │   │   └── route.ts              # Create Stripe checkout session
│       │   └── webhook/
│       │       └── route.ts              # Stripe webhook handler
│       └── resend/
│           └── route.ts                  # Internal email dispatch (not exposed publicly)
│
├── components/
│   ├── ui/                               # Shadcn/UI primitives (auto-generated)
│   │   ├── button.tsx                    # ALREADY EXISTS
│   │   ├── card.tsx
│   │   ├── badge.tsx
│   │   ├── tabs.tsx
│   │   ├── dialog.tsx
│   │   ├── select.tsx
│   │   ├── input.tsx
│   │   ├── label.tsx
│   │   ├── textarea.tsx
│   │   ├── checkbox.tsx
│   │   ├── radio-group.tsx
│   │   ├── separator.tsx
│   │   └── skeleton.tsx
│   │
│   ├── layout/
│   │   ├── Navbar.tsx                    # Sticky black nav — logo center, dropdown, auth
│   │   ├── NavDropdown.tsx               # Small Groups dropdown menu
│   │   ├── Footer.tsx                    # Black footer — logo, links, socials
│   │   └── PageHero.tsx                  # Reusable full-width hero with bg image + overlay
│   │
│   ├── home/
│   │   ├── HeroSection.tsx               # Full-viewport video/image hero + dual CTAs
│   │   ├── MissionSection.tsx            # Left photo + right green card overlay
│   │   ├── ServicesGrid.tsx              # 3-column service cards
│   │   ├── ShopCarousel.tsx              # 4-item product carousel with dots
│   │   └── TestimonialsCarousel.tsx      # Testimonials with star ratings
│   │
│   ├── book/
│   │   ├── SessionsFilter.tsx            # Tab filter: All | Drop Ins | Spring | Summer
│   │   ├── SessionCard.tsx               # Session card: name, age, day, price, availability
│   │   └── BookingModal.tsx              # Checkout modal — details + Stripe redirect
│   │
│   ├── shop/
│   │   ├── ProductGrid.tsx               # 2-col horizontal card grid
│   │   ├── ProductCard.tsx               # Image left, info right — badge, price, hover
│   │   ├── ProductQuickView.tsx          # Dialog with product details + add to cart
│   │   ├── SortDropdown.tsx              # Sort products select
│   │   └── CartDrawer.tsx                # Slide-out cart — items, totals, checkout CTA
│   │
│   ├── loyalty/
│   │   ├── LoyaltyHero.tsx               # Photo + overlay + Become a Member CTA
│   │   └── PointsCards.tsx               # Stacked info cards — earn/redeem rules
│   │
│   ├── forms/
│   │   ├── PrivateLessonsForm.tsx        # Full inquiry form (RHF + Zod)
│   │   ├── ContactForm.tsx               # Player inquiry form (RHF + Zod)
│   │   └── FormField.tsx                 # Reusable underline-style field wrapper
│   │
│   └── shared/
│       ├── SectionWrapper.tsx            # Consistent section padding + max-width
│       ├── StarRating.tsx                # Star rating display (orange stars)
│       ├── AvailabilityBadge.tsx         # "X spots left" / "Sold Out" badge
│       └── LoadingSpinner.tsx            # Consistent loading state component
│
├── hooks/
│   ├── useCart.ts                        # Client-side cart state (zustand or useReducer)
│   ├── useAuth.ts                        # Supabase session hook
│   └── useMediaQuery.ts                  # Responsive breakpoint detection
│
├── lib/
│   ├── supabase/
│   │   ├── client.ts                     # Supabase browser client (singleton)
│   │   ├── server.ts                     # Supabase server client (cookies)
│   │   └── middleware.ts                 # Session refresh middleware helper
│   ├── stripe/
│   │   ├── client.ts                     # Stripe.js browser instance
│   │   └── server.ts                     # Stripe Node.js server instance
│   ├── resend/
│   │   └── client.ts                     # Resend client instance
│   └── utils.ts                          # ALREADY EXISTS — cn() helper
│
├── services/
│   ├── sessions.service.ts               # Fetch sessions, check availability
│   ├── products.service.ts               # Fetch products, filter/sort
│   ├── loyalty.service.ts                # Get/add points, redemption logic
│   ├── orders.service.ts                 # Order history, session bookings
│   └── email.service.ts                  # Resend templates — confirmations, inquiries
│
├── actions/
│   ├── booking.actions.ts                # Book session, validate spots, trigger email
│   ├── contact.actions.ts                # Submit contact form → Resend
│   ├── private-lessons.actions.ts        # Submit private lesson inquiry → Resend
│   ├── checkout.actions.ts               # Create Stripe checkout session (sessions + shop)
│   ├── loyalty.actions.ts                # Award points, redeem points
│   └── auth.actions.ts                   # Sign up, sign in, sign out (server-side)
│
├── db/
│   ├── schema.sql                        # Full Supabase SQL schema (see Section 3)
│   └── seed.sql                          # Seed data: sessions, products
│
└── types/
    ├── session.ts                        # Session type + Zod schema
    ├── product.ts                        # Product type + Zod schema
    ├── user.ts                           # UserProfile type + Zod schema
    ├── loyalty.ts                        # LoyaltyTransaction type + Zod schema
    ├── booking.ts                        # Booking type + form schemas
    ├── contact.ts                        # Contact form Zod schema
    ├── private-lessons.ts                # Private lessons form Zod schema
    ├── cart.ts                           # Cart item type
    └── stripe.ts                         # Stripe webhook event types
```

### Root-level files (not in src/)
```
middleware.ts                             # Supabase session refresh + auth guard for /account
next.config.ts                            # Image domains (Stripe, Supabase storage, Wix CDN)
```

---

## 3. Supabase Schema

### Table: `profiles`
Extends `auth.users`. Created via trigger on `auth.users` insert.

| Column | Type | Notes |
|--------|------|-------|
| `id` | `uuid` | PK, FK → `auth.users.id` ON DELETE CASCADE |
| `full_name` | `text` | NOT NULL |
| `email` | `text` | NOT NULL |
| `pro_status` | `text` | DEFAULT `'free'`, CHECK IN (`'free'`, `'member'`) |
| `loyalty_points` | `integer` | DEFAULT 0, NOT NULL |
| `created_at` | `timestamptz` | DEFAULT `now()` |

**RLS**:
- `SELECT`: user can read own row (`auth.uid() = id`)
- `UPDATE`: user can update own row (`auth.uid() = id`)
- Service role bypasses RLS for admin operations

---

### Table: `sessions`
Hockey training sessions displayed on `/book` and `/clinics`.

| Column | Type | Notes |
|--------|------|-------|
| `id` | `uuid` | PK, DEFAULT `gen_random_uuid()` |
| `name` | `text` | NOT NULL — e.g. "Drop In — Ages 5-6" |
| `age_group` | `text` | e.g. "Ages 5-6", "2017/18" |
| `day` | `text` | e.g. "Mon", "Sat, Sun" |
| `duration_minutes` | `integer` | NOT NULL |
| `price` | `numeric(10,2)` | NOT NULL |
| `season` | `text` | CHECK IN (`'Drop Ins'`, `'Spring 2026'`, `'Summer 2026'`, `'Clinics'`) |
| `start_date` | `date` | Nullable — for dated packages |
| `spots_left` | `integer` | NOT NULL |
| `max_capacity` | `integer` | NOT NULL |
| `stripe_product_id` | `text` | Stripe Product ID |
| `stripe_price_id` | `text` | Stripe Price ID |
| `is_active` | `boolean` | DEFAULT true — toggle visibility |
| `created_at` | `timestamptz` | DEFAULT `now()` |

**RLS**:
- `SELECT`: public (anyone can view active sessions)
- `INSERT/UPDATE/DELETE`: service role only (admin management)

**Index**: `sessions(season, is_active)` for tab filter queries

---

### Table: `bookings`
Records each session purchase/enrollment.

| Column | Type | Notes |
|--------|------|-------|
| `id` | `uuid` | PK, DEFAULT `gen_random_uuid()` |
| `user_id` | `uuid` | FK → `profiles.id` |
| `session_id` | `uuid` | FK → `sessions.id` |
| `stripe_checkout_session_id` | `text` | Unique, from Stripe |
| `stripe_payment_intent_id` | `text` | |
| `amount_paid` | `numeric(10,2)` | |
| `status` | `text` | CHECK IN (`'pending'`, `'confirmed'`, `'cancelled'`) DEFAULT `'pending'` |
| `created_at` | `timestamptz` | DEFAULT `now()` |

**RLS**:
- `SELECT`: user can read own bookings (`auth.uid() = user_id`)
- `INSERT`: authenticated users only
- `UPDATE`: service role only (status changes via webhook)

**Trigger**: On `status` = `'confirmed'`, decrement `sessions.spots_left` by 1.

---

### Table: `products`
Merchandise items for `/shop`.

| Column | Type | Notes |
|--------|------|-------|
| `id` | `uuid` | PK, DEFAULT `gen_random_uuid()` |
| `name` | `text` | NOT NULL |
| `slug` | `text` | UNIQUE, NOT NULL — for `/shop/[slug]` |
| `price` | `numeric(10,2)` | NOT NULL |
| `sale_price` | `numeric(10,2)` | Nullable |
| `images` | `text[]` | Array of image URLs (Supabase Storage or Wix CDN) |
| `badge` | `text` | Nullable, CHECK IN (`'New Arrival'`, `'Limited Edition'`, `'Best Seller'`) |
| `category` | `text` | CHECK IN (`'Hats'`, `'T-Shirts'`, `'Hoodies'`, `'Snapbacks'`) |
| `description` | `text` | |
| `stripe_product_id` | `text` | |
| `stripe_price_id` | `text` | Default/base price |
| `is_active` | `boolean` | DEFAULT true |
| `sort_order` | `integer` | DEFAULT 0 — manual ordering |
| `created_at` | `timestamptz` | DEFAULT `now()` |

**RLS**:
- `SELECT`: public
- `INSERT/UPDATE/DELETE`: service role only

---

### Table: `orders`
Merchandise orders from `/shop`.

| Column | Type | Notes |
|--------|------|-------|
| `id` | `uuid` | PK, DEFAULT `gen_random_uuid()` |
| `user_id` | `uuid` | FK → `profiles.id`, Nullable (guest checkout) |
| `stripe_checkout_session_id` | `text` | UNIQUE |
| `stripe_payment_intent_id` | `text` | |
| `line_items` | `jsonb` | Array of `{product_id, name, quantity, unit_price}` |
| `total_amount` | `numeric(10,2)` | |
| `status` | `text` | CHECK IN (`'pending'`, `'paid'`, `'fulfilled'`, `'refunded'`) DEFAULT `'pending'` |
| `customer_email` | `text` | For guest orders |
| `created_at` | `timestamptz` | DEFAULT `now()` |

**RLS**:
- `SELECT`: user can read own orders (`auth.uid() = user_id`)
- `INSERT/UPDATE`: service role only (via webhook)

---

### Table: `loyalty_transactions`
Audit log for all point changes.

| Column | Type | Notes |
|--------|------|-------|
| `id` | `uuid` | PK, DEFAULT `gen_random_uuid()` |
| `user_id` | `uuid` | FK → `profiles.id` |
| `action` | `text` | CHECK IN (`'signup'`, `'booking'`, `'purchase'`, `'online_program'`, `'redemption'`) |
| `points` | `integer` | Positive = earned, negative = redeemed |
| `reference_id` | `uuid` | Nullable — FK to booking or order |
| `note` | `text` | Nullable — human-readable description |
| `created_at` | `timestamptz` | DEFAULT `now()` |

**RLS**:
- `SELECT`: user can read own transactions
- `INSERT`: service role only

---

### Table: `program_enrollments`
Session Packs / Online Training enrollments.

| Column | Type | Notes |
|--------|------|-------|
| `id` | `uuid` | PK |
| `user_id` | `uuid` | FK → `profiles.id` |
| `program_name` | `text` | e.g. "Online Training Pack — Spring" |
| `stripe_checkout_session_id` | `text` | UNIQUE |
| `amount_paid` | `numeric(10,2)` | |
| `status` | `text` | `'active'` \| `'expired'` |
| `created_at` | `timestamptz` | DEFAULT `now()` |

**RLS**:
- `SELECT`: user can read own enrollments

---

### Table: `contact_submissions`
Stores contact form and private lesson inquiry submissions.

| Column | Type | Notes |
|--------|------|-------|
| `id` | `uuid` | PK |
| `form_type` | `text` | CHECK IN (`'contact'`, `'private_lessons'`) |
| `data` | `jsonb` | Full form payload |
| `created_at` | `timestamptz` | DEFAULT `now()` |

**RLS**:
- `INSERT`: public (no auth required for form submissions)
- `SELECT`: service role only

---

### Supabase Auth Configuration
- Enable Email + Password auth
- Enable Google OAuth (optional, open question — see Section 9)
- Configure site URL to `https://tlelitehockey.com`
- Redirect URL: `https://tlelitehockey.com/auth/callback`
- Email templates: customize with TL Elite branding

---

## 4. Stripe Product Setup

### Sessions — One-Time Payments

| Stripe Product | Price | Type | Metadata |
|----------------|-------|------|----------|
| Drop In — Ages 5-6 | $50.00 | one_time | `season: Drop Ins`, `age_group: Ages 5-6` |
| Drop In — Ages 7-8 | $50.00 | one_time | `season: Drop Ins`, `age_group: Ages 7-8` |
| Drop In — Ages 9-11 | $50.00 | one_time | `season: Drop Ins`, `age_group: Ages 9-11` |
| Spring 2026 Package — Ages 5-6 | $599.00 | one_time | `season: Spring 2026` |
| Spring 2026 Package — Ages 7-8 | $599.00 | one_time | `season: Spring 2026` |
| Spring 2026 Package — 2017/18 | $599.00 | one_time | `season: Spring 2026` |
| Spring 2026 Package — 2015/16 | $599.00 | one_time | `season: Spring 2026` |
| Summer 2026 Package — Ages 5-6 | $399.00 | one_time | `season: Summer 2026` |
| Summer 2026 Package — Ages 7-8 | $399.00 | one_time | `season: Summer 2026` |
| Summer 2026 Package — 2017/18 | $399.00 | one_time | `season: Summer 2026` |
| Summer 2026 Package — 2015/16 | $399.00 | one_time | `season: Summer 2026` |

### Session Packs / Online Training — One-Time or Subscription

| Stripe Product | Price | Type |
|----------------|-------|------|
| Online Training Program | TBD | one_time or subscription |

> **Open Question**: Does the Online Training program have a recurring component? Confirm with Brendan (see Section 9).

### Merchandise — One-Time, Variable Price

The cart will collect all items and create a single Stripe Checkout session with `line_items[]` for each product. Products need individual Stripe Products with prices:

| Product | Price | Sale Price |
|---------|-------|------------|
| TL Elite Hat | TBD | — |
| TL Elite Snapback | TBD | — |
| TL Elite T-Shirt | TBD | — |
| TL Elite Hoodie | TBD | — |
| (+ 3 more items from Wix) | | |

> **Action required**: Pull exact product names + prices from live tlelitehockey.com Wix store.

### Stripe Webhook Events to Handle

| Event | Handler Action |
|-------|----------------|
| `checkout.session.completed` | Confirm booking/order, award loyalty points, send confirmation email |
| `payment_intent.payment_failed` | Update booking/order status to failed |
| `charge.refunded` | Update order status, reverse loyalty points if applicable |

---

## 5. Build Phases

### Phase 1 — Foundation (Backend Agent + UI Agent, parallel)

**Backend Agent tasks:**
- Install dependencies: `@supabase/supabase-js`, `@supabase/ssr`, `stripe`, `resend`, `react-hook-form`, `zod`, `@hookform/resolvers`
- Create `src/lib/supabase/client.ts`, `server.ts`, `middleware.ts`
- Create `src/lib/stripe/server.ts`, `client.ts`
- Create `src/lib/resend/client.ts`
- Create `src/db/schema.sql` (full Supabase schema from Section 3)
- Create `src/types/` — all type files + Zod schemas
- Create `middleware.ts` in project root (Supabase session refresh)

**UI Agent tasks:**
- Update `src/app/globals.css` — add TL Elite CSS custom properties (brand colors, typography tokens)
- Update `src/app/layout.tsx` — swap to Montserrat + Inter fonts, add `dark` class to `<html>`, wire Navbar + Footer
- Build `src/components/layout/Navbar.tsx` — sticky black nav, logo center, Small Groups dropdown, Log In button
- Build `src/components/layout/NavDropdown.tsx` — dropdown for Book, Clinics, Session Packs
- Build `src/components/layout/Footer.tsx` — black bg, logo, nav links, social icons
- Build `src/components/layout/PageHero.tsx` — reusable hero with bg image, dark overlay, heading slot
- Build `src/components/shared/SectionWrapper.tsx`
- Build `src/components/shared/StarRating.tsx`
- Build `src/components/shared/AvailabilityBadge.tsx`
- Build `src/components/shared/LoadingSpinner.tsx`
- Add Shadcn components: `card`, `badge`, `tabs`, `dialog`, `select`, `input`, `label`, `textarea`, `checkbox`, `radio-group`, `separator`, `skeleton`
- Add placeholder `src/app/sitemap.ts` and `src/app/robots.ts`

---

### Phase 2 — Homepage + Static Marketing Pages (UI Agent)

**UI Agent tasks:**
- `src/app/page.tsx` — full homepage composition
- `src/components/home/HeroSection.tsx` — video/image bg, dark overlay, "TRAIN WITH TL ELITE" heading, Spring 2026 (green) + Summer 2026 (orange) CTA buttons
- `src/components/home/MissionSection.tsx` — left action photo, right green card with tagline "INTENSITY. DISCIPLINE. PRECISION."
- `src/components/home/ServicesGrid.tsx` — 3-col cards: Small Group Sessions, Seasonal Clinics, Film Analysis
- `src/components/home/ShopCarousel.tsx` — 4-item product carousel (static placeholder → connect in Phase 6)
- `src/components/home/TestimonialsCarousel.tsx` — testimonial cards with orange star ratings
- `src/app/about/page.tsx` — PageHero "OUR STORY" + staff section + mission statement + testimonials 2×2 grid + coach bios (Brendan + Mitch)
- `src/app/contact/page.tsx` — PageHero "GET IN TOUCH" + photo banner + ContactForm + contact info block

**Backend Agent tasks:**
- `src/actions/contact.actions.ts` — validate ContactForm submission, insert into `contact_submissions`, send Resend email to Brendan
- `src/types/contact.ts` — ContactForm Zod schema
- `src/services/email.service.ts` — Resend templates: contact inquiry, private lesson inquiry, booking confirmation

---

### Phase 3 — Private Lessons Page (UI Agent + Backend Agent, parallel)

**UI Agent tasks:**
- `src/app/private-lessons/page.tsx` — PageHero "INTRODUCING: PRIVATE LESSONS"
- 3-step process section (numbered, green accent)
- `src/components/forms/PrivateLessonsForm.tsx` — full player inquiry form (all fields from brief), underline input style, RHF + Zod
- `src/components/forms/FormField.tsx` — shared underline-style field wrapper

**Backend Agent tasks:**
- `src/types/private-lessons.ts` — full Zod schema with all fields: player name, guardian name, email, current team, birthdate, position, location radio, day checkboxes, preferred time, skills focus, additional info
- `src/actions/private-lessons.actions.ts` — validate submission, insert into `contact_submissions`, Resend notification to brendanheayden@tlelitehockey.com

---

### Phase 4 — Sessions Booking (UI Agent + Backend Agent, parallel)

**Backend Agent tasks:**
- Execute `src/db/schema.sql` on Supabase (sessions + bookings tables + RLS)
- `src/services/sessions.service.ts` — `getSessions(season?)`, `getSessionById(id)`, `decrementSpot(sessionId)`
- `src/types/session.ts` + `src/types/booking.ts`
- `src/actions/booking.actions.ts` — validate availability, create pending booking in Supabase, create Stripe Checkout session, return URL
- `src/actions/checkout.actions.ts` — Stripe checkout session factory (reused for sessions + shop)
- `src/app/api/stripe/checkout/route.ts` — POST handler
- `src/app/api/stripe/webhook/route.ts` — handle `checkout.session.completed`: confirm booking, award 10 loyalty points, send confirmation email
- `src/db/seed.sql` — seed all sessions from PROJECT_BRIEF

**UI Agent tasks:**
- `src/app/book/page.tsx` — "OUR SESSIONS" heading, tab filter, session cards grid
- `src/components/book/SessionsFilter.tsx` — orange underline tab bar: All Services | Drop Ins | Spring 2026 | Summer 2026
- `src/components/book/SessionCard.tsx` — card: session name, age group, day/time, duration, price, AvailabilityBadge, "Book Now" (green) + "Explore Plans" (outline) CTAs
- `src/components/book/BookingModal.tsx` — Dialog: confirm session details, collect user info if not logged in, redirect to Stripe checkout
- Loading skeleton states for session cards

---

### Phase 5 — Shop + Cart (UI Agent + Backend Agent, parallel)

**Backend Agent tasks:**
- `src/services/products.service.ts` — `getProducts(sort?, category?)`, `getProductBySlug(slug)`
- `src/types/product.ts` + `src/types/cart.ts`
- Populate `products` table in Supabase + create Stripe products
- Webhook handler update: `checkout.session.completed` for shop orders → create order record, award 20 loyalty points if `online_program`, else 10 for `purchase`

**UI Agent tasks:**
- `src/app/shop/page.tsx` — product grid with sort dropdown, badge filtering
- `src/app/shop/[slug]/page.tsx` — product detail page (PDP)
- `src/components/shop/ProductGrid.tsx` — 2-col horizontal cards
- `src/components/shop/ProductCard.tsx` — image left, details right, badge overlay, sale price strikethrough, hover Quick View trigger
- `src/components/shop/ProductQuickView.tsx` — Dialog: product images, name, price, "Add to Cart" button
- `src/components/shop/SortDropdown.tsx` — Shadcn Select: Default, Price: Low-High, Price: High-Low, Newest
- `src/components/shop/CartDrawer.tsx` — slide-out drawer: cart items, subtotal, "Checkout" button → Stripe
- `src/hooks/useCart.ts` — cart state: `items[]`, `addItem`, `removeItem`, `updateQuantity`, `clearCart`, persisted to localStorage

---

### Phase 6 — Clinics + Session Packs (UI Agent + Backend Agent, parallel)

**Backend Agent tasks:**
- `src/services/sessions.service.ts` update — add `getClinics()` method
- Program enrollment flow in `src/actions/booking.actions.ts`

**UI Agent tasks:**
- `src/app/clinics/page.tsx` — PageHero, clinic description, session cards grid (reuse `SessionCard` component, season = 'Clinics')
- `src/app/session-packs/page.tsx` — tab filter (All | Online Training), program cards with image, name, participant count, paid indicator, "View Details"
- Wire `ShopCarousel` on homepage to real products (from Phase 5)

---

### Phase 7 — Authentication + Loyalty + Member Area (UI Agent + Backend Agent, parallel)

**Backend Agent tasks:**
- `src/lib/supabase/client.ts` + `server.ts` finalize — ensure auth cookies work with App Router
- `src/actions/auth.actions.ts` — `signUp`, `signIn`, `signOut` Server Actions
- `src/services/loyalty.service.ts` — `getPoints(userId)`, `getTransactions(userId)`, `awardPoints(userId, action, referenceId)`, `redeemPoints(userId, rewardType)`
- `src/types/loyalty.ts` — LoyaltyTransaction Zod schema
- Loyalty points rules: signup = 15, booking = 10, purchase = 10, online_program = 25, order_online_training = 20
- Redemption rules: 50 pts = $10 discount, 125 pts = free hat (create Stripe coupon programmatically)
- Webhook handler update: award signup points on new `auth.users` insert (Supabase trigger or webhook)

**UI Agent tasks:**
- `src/app/auth/login/page.tsx` — login form, TL Elite branded
- `src/app/auth/signup/page.tsx` — signup form
- `src/app/auth/callback/route.ts` — Supabase PKCE callback
- `src/app/account/page.tsx` — member dashboard: points balance, recent transactions, booking history, order history
- `src/app/loyalty/page.tsx` — LoyaltyHero + PointsCards
- `src/components/loyalty/LoyaltyHero.tsx`
- `src/components/loyalty/PointsCards.tsx`
- Update Navbar `Log In` button to show user avatar/name when authenticated + sign out

---

### Phase 8 — SEO + Performance Hardening (UI Agent + Backend Agent, parallel)

**UI Agent tasks:**
- Complete `src/app/sitemap.ts` — static routes + dynamic product + session slugs
- Complete `src/app/robots.ts`
- Audit all `page.tsx` metadata exports — ensure every page has title, description, OG tags
- Add JSON-LD schema to each page (see Section 7)
- Image optimization audit: convert all `<img>` to `next/image`, add `priority` to hero images
- Core Web Vitals: defer non-critical scripts, add `loading="lazy"` to below-fold images

**Backend Agent tasks:**
- `next.config.ts` — add `images.remotePatterns` for Supabase Storage, Stripe CDN, Wix CDN
- Caching strategy: add `cache: 'force-cache'` or `revalidate` to server data fetches (sessions, products)
- Database indexes: `sessions(season, is_active)`, `products(category, is_active)`, `bookings(user_id)`, `orders(user_id)`

---

## 6. Component Inventory

### Shadcn/UI Components (install via `npx shadcn@latest add`)

| Component | Used By |
|-----------|---------|
| `button` | ALREADY INSTALLED |
| `card` | SessionCard, ProductCard, PointsCards |
| `badge` | AvailabilityBadge, product badges |
| `tabs` | SessionsFilter, SessionPacksFilter |
| `dialog` | BookingModal, ProductQuickView |
| `select` | SortDropdown |
| `input` | All forms |
| `label` | All forms |
| `textarea` | ContactForm, PrivateLessonsForm |
| `checkbox` | PrivateLessonsForm day availability |
| `radio-group` | PrivateLessonsForm location |
| `separator` | Footer, various sections |
| `skeleton` | Loading states for session/product cards |
| `sheet` | CartDrawer (slide-out) |

### Custom Components (build from scratch)

| Component | Complexity | Agent |
|-----------|------------|-------|
| `Navbar` + `NavDropdown` | High — sticky, mobile menu, auth state | UI |
| `Footer` | Medium | UI |
| `PageHero` | Medium — background image + overlay | UI |
| `HeroSection` | High — video bg, responsive, dual CTAs | UI |
| `MissionSection` | Medium | UI |
| `ServicesGrid` | Medium | UI |
| `ShopCarousel` | High — touch swipe, dots pagination | UI |
| `TestimonialsCarousel` | High — autoplay, star ratings | UI |
| `SessionCard` | Medium | UI |
| `SessionsFilter` | Medium — orange underline tabs | UI |
| `BookingModal` | High — multi-state, Stripe redirect | UI |
| `ProductCard` | Medium — hover quick view | UI |
| `CartDrawer` | High — localStorage sync, quantity controls | UI |
| `PrivateLessonsForm` | High — many field types, RHF + Zod | UI |
| `ContactForm` | Medium | UI |
| `FormField` | Low — wrapper component | UI |
| `StarRating` | Low | UI |
| `AvailabilityBadge` | Low | UI |
| `LoyaltyHero` | Medium | UI |
| `PointsCards` | Medium | UI |

---

## 7. SEO Strategy

### Metadata (every page exports `metadata` object)

| Route | `title` | `description` | OG Image |
|-------|---------|---------------|----------|
| `/` | `TL Elite Hockey \| Youth Player Development \| Braintree, MA` | `Top-rated youth hockey training in the Greater Boston area. Small group sessions, seasonal clinics, and private coaching at Thayer Sports Center and Gallo Ice Arena.` | Hero photo |
| `/about` | `Our Story \| TL Elite Hockey` | `Meet the coaches behind TL Elite Hockey. Brendan Heayden and Mitch Walinski bring intensity, discipline, and precision to every session.` | Coach photo |
| `/book` | `Skate With Us \| Book a Session — TL Elite Hockey` | `Book drop-in sessions, Spring 2026 packages, or Summer 2026 packages with TL Elite Hockey. Ages 5–16, Braintree MA.` | Rink photo |
| `/private-lessons` | `Private Hockey Lessons \| TL Elite Hockey` | `1-on-1 private hockey training tailored to your player's needs. Inquire today to work with TL Elite coaches.` | Action photo |
| `/clinics` | `Youth Hockey Clinics \| TL Elite Skill Development` | `Seasonal hockey clinics for youth players. Christmas, Thanksgiving, Summer, and more. TL Elite Hockey, Braintree MA.` | Clinic photo |
| `/session-packs` | `Session Packs \| Online Training — TL Elite Hockey` | `Structured training programs and online hockey packs from TL Elite. Improve skills on your schedule.` | Program photo |
| `/shop` | `Shop TL Gear \| TL Elite Hockey Merchandise` | `Official TL Elite Hockey gear — hats, hoodies, t-shirts, and snapbacks. Rep the rink.` | Product photo |
| `/loyalty` | `Members Rewards Program \| TL Elite Hockey` | `Earn points every time you train, book, or shop with TL Elite Hockey. Redeem for discounts and free gear.` | Loyalty photo |
| `/contact` | `Get In Touch \| TL Elite Hockey` | `Questions about training? Contact TL Elite Hockey or inquire about sessions at our Braintree and Bourne rink locations.` | Contact photo |

### JSON-LD Schema (per page)

| Route | Schema Type | Key Fields |
|-------|-------------|------------|
| `/` | `SportsClub` | name, url, logo, sameAs (social links), address, telephone |
| `/about` | `AboutPage` + `Person` (×2 coaches) | name, jobTitle, description for Brendan + Mitch |
| `/book` | `SportsEvent` (per session) | name, startDate, location (rink), price, availability |
| `/private-lessons` | `Service` | name, provider, description, areaServed |
| `/clinics` | `SportsEvent` | name, startDate, location, organizer |
| `/shop` | `ItemList` + `Product` (per item) | name, image, price, offers |
| `/loyalty` | `WebPage` | name, description |
| `/contact` | `ContactPage` | name, url, contactPoint (telephone + email) |

### Sitemap (`src/app/sitemap.ts`)
- Static routes: all 9 pages + auth pages
- Dynamic routes: `/shop/[slug]` for each active product
- Priority: `/` = 1.0, `/book` = 0.9, `/shop` = 0.9, others = 0.7

### robots.ts
```
Allow: /
Disallow: /api/
Disallow: /account/
Disallow: /auth/
Sitemap: https://tlelitehockey.com/sitemap.xml
```

### Wix Migration Redirect Map
These old Wix URL patterns need redirects in `next.config.ts` (redirects array):

| Old Wix URL | New URL |
|-------------|---------|
| `/our-story` or `/about-us` | `/about` |
| `/sessions` or `/skating-sessions` | `/book` |
| `/store` or `/products` | `/shop` |
| `/contact-us` | `/contact` |
| `/loyal-program` or `/rewards` | `/loyalty` |

> **Action required**: Crawl tlelitehockey.com to capture exact Wix URL paths before go-live. Add full redirect map to `next.config.ts`.

---

## 8. Environment Variables

Create `.env.local` in project root with the following:

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=

# Resend
RESEND_API_KEY=

# App
NEXT_PUBLIC_SITE_URL=https://tlelitehockey.com
ADMIN_EMAIL=brendanheayden@tlelitehockey.com

# Optional: Google OAuth (if enabled)
# SUPABASE_AUTH_GOOGLE_CLIENT_ID=
# SUPABASE_AUTH_GOOGLE_SECRET=
```

> Add `.env.local` to `.gitignore` (verify it's already there).

---

## 9. Open Questions / Client Decisions Needed

| # | Question | Impact | Owner |
|---|----------|--------|-------|
| 1 | **Guest checkout for Shop**: Should users be required to create an account to purchase merchandise, or allow guest checkout? Guest checkout skips auth but loses loyalty point tracking. | Shop + Loyalty flow | Brendan |
| 2 | **Online Training Program**: Is the Online Training on `/session-packs` a one-time purchase or a recurring subscription? What is the price? | Stripe product setup | Brendan |
| 3 | **Google OAuth**: Should "Sign in with Google" be offered alongside email/password on the auth pages? | Auth setup | Brendan |
| 4 | **Clinics page**: Is the Clinics page always showing the next upcoming clinic, or does it show a list of all clinics across seasons? | `/clinics` data model | Brendan |
| 5 | **Video hero**: Does Brendan have a background video for the homepage hero, or should we use a static action photo? (Wix site has a static image.) | HeroSection component | Brendan |
| 6 | **Private lessons pricing**: Should private lesson pricing be shown on the `/private-lessons` page, or is it inquiry-only (no public price)? | Page design | Brendan |
| 7 | **Wix URL audit**: What are the exact current Wix URL slugs for the pages that need redirects? (Prevents SEO ranking loss on migration.) | Redirect map | YWF / Wix crawl |
| 8 | **Product images**: Should product images be migrated to Supabase Storage, or continue loading from Wix CDN URLs? Wix CDN URLs may break after migration. | Shop image hosting | YWF |
| 9 | **Member-only content**: Are there any pages or sessions that should be restricted to logged-in members only, beyond the `/account` dashboard? | RLS + auth guards | Brendan |
| 10 | **Loyalty redemption UX**: When a user redeems 50pts for a $10 discount, where does this happen — at checkout in the cart, or via a separate redemption flow that generates a Stripe coupon? | Loyalty + Stripe flow | YWF decision |

---

## 10. Agent Task Assignment Summary

| Phase | UI Agent | Backend Agent |
|-------|----------|---------------|
| 1 — Foundation | Globals CSS, fonts, Navbar, Footer, PageHero, shared components, Shadcn installs | Supabase/Stripe/Resend lib clients, schema.sql, all types |
| 2 — Marketing pages | Homepage sections, About, Contact form UI | Contact action, email service |
| 3 — Private Lessons | PrivateLessonsForm, page layout | Private lessons action + Zod schema |
| 4 — Booking | SessionCard, SessionsFilter, BookingModal, /book page | Sessions service, booking action, Stripe checkout, webhook handler |
| 5 — Shop | ProductGrid, ProductCard, CartDrawer, QuickView, /shop page | Products service, cart → Stripe, order webhook |
| 6 — Clinics + Packs | /clinics, /session-packs, wire homepage carousel | Session service update, enrollment action |
| 7 — Auth + Loyalty | Login/Signup pages, Account dashboard, Loyalty page | Auth actions, loyalty service, points engine |
| 8 — SEO + Perf | All page metadata, JSON-LD, sitemap, robots, image optimization | next.config image domains, cache headers, DB indexes, redirect map |

---

## 11. Dependencies to Install

Run before starting builds:

```bash
npm install @supabase/supabase-js @supabase/ssr stripe @stripe/stripe-js resend react-hook-form @hookform/resolvers zod
```

Shadcn components to add:
```bash
npx shadcn@latest add card badge tabs dialog select input label textarea checkbox radio-group separator skeleton sheet
```

---

*This plan is the source of truth for the TL Elite Hockey rebuild. UI Agent and Backend Agent should reference it at the start of every phase. QA Agent should use Section 7 (SEO) as its audit checklist.*
