-- ============================================================
-- TL Elite Hockey — Seed Data
-- Run AFTER schema.sql has been executed.
-- Stripe IDs are placeholders — replace with real IDs from the
-- TL Elite Stripe dashboard after products are created there.
-- ============================================================

-- ============================================================
-- PRODUCTS (7 items — TL Gear)
-- ============================================================
INSERT INTO public.products (name, slug, price, sale_price, images, badge, category, description, stripe_product_id, stripe_price_id, is_active, sort_order)
VALUES
  (
    'TL Elite Snapback',
    'tl-elite-snapback',
    29.99,
    NULL,
    ARRAY['https://static.wixstatic.com/media/placeholder-snapback.jpg'],
    'Best Seller',
    'Snapbacks',
    'Classic TL Elite snapback hat. One size fits most.',
    'prod_placeholder_snapback',
    'price_placeholder_snapback',
    true,
    10
  ),
  (
    'TL Elite Fitted Hat',
    'tl-elite-fitted-hat',
    34.99,
    NULL,
    ARRAY['https://static.wixstatic.com/media/placeholder-fitted-hat.jpg'],
    'New Arrival',
    'Hats',
    'Premium fitted hat with TL Elite embroidered logo.',
    'prod_placeholder_fitted_hat',
    'price_placeholder_fitted_hat',
    true,
    20
  ),
  (
    'TL Elite T-Shirt',
    'tl-elite-tshirt',
    24.99,
    19.99,
    ARRAY['https://static.wixstatic.com/media/placeholder-tshirt.jpg'],
    NULL,
    'T-Shirts',
    'Comfortable cotton TL Elite training t-shirt. Available in S–XXL.',
    'prod_placeholder_tshirt',
    'price_placeholder_tshirt',
    true,
    30
  ),
  (
    'TL Elite Premium T-Shirt',
    'tl-elite-premium-tshirt',
    29.99,
    NULL,
    ARRAY['https://static.wixstatic.com/media/placeholder-premium-tshirt.jpg'],
    'Limited Edition',
    'T-Shirts',
    'Limited edition premium tee with full-color TL Elite graphic. Available in S–XXL.',
    'prod_placeholder_premium_tshirt',
    'price_placeholder_premium_tshirt',
    true,
    40
  ),
  (
    'TL Elite Hoodie',
    'tl-elite-hoodie',
    59.99,
    NULL,
    ARRAY['https://static.wixstatic.com/media/placeholder-hoodie.jpg'],
    'Best Seller',
    'Hoodies',
    'Heavyweight pullover hoodie with TL Elite embroidered chest logo. Available in S–XXL.',
    'prod_placeholder_hoodie',
    'price_placeholder_hoodie',
    true,
    50
  ),
  (
    'TL Elite Zip Hoodie',
    'tl-elite-zip-hoodie',
    64.99,
    NULL,
    ARRAY['https://static.wixstatic.com/media/placeholder-zip-hoodie.jpg'],
    'New Arrival',
    'Hoodies',
    'Full-zip hoodie with TL Elite left chest logo. Available in S–XXL.',
    'prod_placeholder_zip_hoodie',
    'price_placeholder_zip_hoodie',
    true,
    60
  ),
  (
    'TL Elite Youth Hat',
    'tl-elite-youth-hat',
    14.99,
    NULL,
    ARRAY['https://static.wixstatic.com/media/placeholder-youth-hat.jpg'],
    NULL,
    'Hats',
    'Youth-sized TL Elite hat. Perfect for young players.',
    'prod_placeholder_youth_hat',
    'price_placeholder_youth_hat',
    true,
    70
  );


-- ============================================================
-- SESSIONS
-- Drop-Ins, Spring 2026, Summer 2026 from PROJECT_BRIEF.md
-- ============================================================

-- --------------------------
-- DROP-INS ($50, Sat/Sun, 50 min)
-- --------------------------
INSERT INTO public.sessions (name, age_group, day, duration_minutes, price, season, start_date, spots_left, max_capacity, stripe_product_id, stripe_price_id, is_active)
VALUES
  (
    'Drop In — Ages 5-6',
    'Ages 5-6',
    'Sat, Sun',
    50,
    50.00,
    'Drop Ins',
    NULL,
    12,
    15,
    'prod_placeholder_dropin_5_6',
    'price_placeholder_dropin_5_6',
    true
  ),
  (
    'Drop In — Ages 7-8',
    'Ages 7-8',
    'Sat, Sun',
    50,
    50.00,
    'Drop Ins',
    NULL,
    10,
    15,
    'prod_placeholder_dropin_7_8',
    'price_placeholder_dropin_7_8',
    true
  ),
  (
    'Drop In — Ages 9-11',
    'Ages 9-11',
    'Sat, Sun',
    50,
    50.00,
    'Drop Ins',
    NULL,
    8,
    15,
    'prod_placeholder_dropin_9_11',
    'price_placeholder_dropin_9_11',
    true
  ),
  (
    'Drop In — Clinic',
    'All Ages',
    'Sat',
    50,
    50.00,
    'Drop Ins',
    NULL,
    20,
    25,
    'prod_placeholder_dropin_clinic',
    'price_placeholder_dropin_clinic',
    true
  ),
  (
    'Drop In — Weekend Open',
    'Ages 5-11',
    'Sun',
    50,
    50.00,
    'Drop Ins',
    NULL,
    15,
    20,
    'prod_placeholder_dropin_weekend',
    'price_placeholder_dropin_weekend',
    true
  );

-- --------------------------
-- SPRING 2026 ($599/package, Mon/Tue/Wed nights, 7 sessions)
-- --------------------------
INSERT INTO public.sessions (name, age_group, day, duration_minutes, price, season, start_date, spots_left, max_capacity, stripe_product_id, stripe_price_id, is_active)
VALUES
  (
    'Spring 2026 Package — Ages 5-6',
    'Ages 5-6',
    'Mon',
    50,
    599.00,
    'Spring 2026',
    '2026-04-07',
    6,
    12,
    'prod_placeholder_spring_5_6',
    'price_placeholder_spring_5_6',
    true
  ),
  (
    'Spring 2026 Package — Ages 7-8',
    'Ages 7-8',
    'Tue',
    50,
    599.00,
    'Spring 2026',
    '2026-04-08',
    5,
    12,
    'prod_placeholder_spring_7_8',
    'price_placeholder_spring_7_8',
    true
  ),
  (
    'Spring 2026 Package — 2017/18',
    '2017/18',
    'Wed',
    50,
    599.00,
    'Spring 2026',
    '2026-04-09',
    4,
    12,
    'prod_placeholder_spring_2017_18',
    'price_placeholder_spring_2017_18',
    true
  ),
  (
    'Spring 2026 Package — 2015/16',
    '2015/16',
    'Wed',
    50,
    599.00,
    'Spring 2026',
    '2026-04-09',
    7,
    12,
    'prod_placeholder_spring_2015_16',
    'price_placeholder_spring_2015_16',
    true
  ),
  (
    'Spring 2026 Package — Ages 9-10',
    'Ages 9-10',
    'Mon',
    50,
    599.00,
    'Spring 2026',
    '2026-04-07',
    3,
    12,
    'prod_placeholder_spring_9_10',
    'price_placeholder_spring_9_10',
    true
  ),
  (
    'Spring 2026 Package — Ages 11-12',
    'Ages 11-12',
    'Tue',
    50,
    599.00,
    'Spring 2026',
    '2026-04-08',
    8,
    12,
    'prod_placeholder_spring_11_12',
    'price_placeholder_spring_11_12',
    true
  ),
  (
    'Spring 2026 Package — Advanced',
    'Advanced',
    'Thu',
    60,
    599.00,
    'Spring 2026',
    '2026-04-10',
    9,
    12,
    'prod_placeholder_spring_advanced',
    'price_placeholder_spring_advanced',
    true
  );

-- --------------------------
-- SUMMER 2026 ($399/package, Mon–Thu nights, 10+ sessions)
-- --------------------------
INSERT INTO public.sessions (name, age_group, day, duration_minutes, price, season, start_date, spots_left, max_capacity, stripe_product_id, stripe_price_id, is_active)
VALUES
  (
    'Summer 2026 Package — Ages 5-6',
    'Ages 5-6',
    'Mon',
    50,
    399.00,
    'Summer 2026',
    '2026-07-07',
    12,
    15,
    'prod_placeholder_summer_5_6',
    'price_placeholder_summer_5_6',
    true
  ),
  (
    'Summer 2026 Package — Ages 7-8',
    'Ages 7-8',
    'Tue',
    50,
    399.00,
    'Summer 2026',
    '2026-07-08',
    12,
    15,
    'prod_placeholder_summer_7_8',
    'price_placeholder_summer_7_8',
    true
  ),
  (
    'Summer 2026 Package — 2017/18',
    '2017/18',
    'Wed',
    50,
    399.00,
    'Summer 2026',
    '2026-07-09',
    15,
    15,
    'prod_placeholder_summer_2017_18',
    'price_placeholder_summer_2017_18',
    true
  ),
  (
    'Summer 2026 Package — 2015/16',
    '2015/16',
    'Thu',
    50,
    399.00,
    'Summer 2026',
    '2026-07-10',
    15,
    15,
    'prod_placeholder_summer_2015_16',
    'price_placeholder_summer_2015_16',
    true
  ),
  (
    'Summer 2026 Package — Ages 9-10',
    'Ages 9-10',
    'Mon',
    50,
    399.00,
    'Summer 2026',
    '2026-07-07',
    15,
    15,
    'prod_placeholder_summer_9_10',
    'price_placeholder_summer_9_10',
    true
  ),
  (
    'Summer 2026 Package — Ages 11-12',
    'Ages 11-12',
    'Tue',
    50,
    399.00,
    'Summer 2026',
    '2026-07-08',
    15,
    15,
    'prod_placeholder_summer_11_12',
    'price_placeholder_summer_11_12',
    true
  ),
  (
    'Summer 2026 Package — Advanced',
    'Advanced',
    'Wed, Thu',
    60,
    399.00,
    'Summer 2026',
    '2026-07-09',
    15,
    15,
    'prod_placeholder_summer_advanced',
    'price_placeholder_summer_advanced',
    true
  ),
  (
    'Summer 2026 Package — 2014 & Under',
    '2014 & Under',
    'Mon, Wed',
    50,
    399.00,
    'Summer 2026',
    '2026-07-07',
    15,
    15,
    'prod_placeholder_summer_2014',
    'price_placeholder_summer_2014',
    true
  ),
  (
    'Summer 2026 Package — Goalie',
    'All Ages',
    'Thu',
    60,
    399.00,
    'Summer 2026',
    '2026-07-10',
    8,
    10,
    'prod_placeholder_summer_goalie',
    'price_placeholder_summer_goalie',
    true
  ),
  (
    'Summer 2026 Package — Mites',
    'Ages 5-8',
    'Tue, Thu',
    50,
    399.00,
    'Summer 2026',
    '2026-07-08',
    15,
    15,
    'prod_placeholder_summer_mites',
    'price_placeholder_summer_mites',
    true
  );
