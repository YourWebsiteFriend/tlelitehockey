# PROJECT_BRIEF.md — TL Elite Hockey

## Client Overview
- **Client**: TL Elite Hockey School LLC
- **Founded**: 2021
- **Owner / Primary Contact**: Brendan Heayden
- **Email**: brendanheayden@tlelitehockey.com (direct) / info@tlelitehockey.com (general)
- **Phone**: 508-641-5842
- **Managed by**: Your Website Friend (YWF)
- **Live site**: tlelitehockey.com (currently Wix)

---

## Project Type
**Full Rebuild** — Migrating from Wix to a custom-coded Next.js site. Replaces all Wix-native features (Bookings, Stores, Members, Loyalty, Forms) with custom implementations.

---

## Business Description
TL Elite Hockey provides small-group and private youth hockey training in the Greater Boston area. Sessions run year-round at two rink locations. Revenue comes from drop-in sessions, seasonal packages, merchandise, and online training programs.

---

## Locations
- **Thayer Sports Center** — 1515 Washington Street, Braintree, MA 02184
- **Gallo Ice Arena** — Bourne, MA

---

## Tech Stack
- **Framework**: Next.js 15 (App Router), React 19, TypeScript strict
- **Styling**: Tailwind CSS + Shadcn/UI
- **Database / Auth**: Supabase (Postgres, RLS, Auth)
- **Payments**: Stripe (sessions, merchandise, session packs)
- **Email**: Resend (contact forms, booking confirmations, admin notifications)
- **Assets**: Pulled from live tlelitehockey.com Wix site

---

## Site Type
**Hybrid** — Marketing + Booking + E-Commerce + Membership

---

## Site Map (9 Pages)

| Route | Page | Type |
|-------|------|------|
| `/` | Homepage | Marketing |
| `/about` | Our Story, Team, Mission | Content |
| `/book` | Sessions Booking | Booking |
| `/private-lessons` | Private Lesson Inquiry | Lead Gen / Form |
| `/clinics` | Seasonal Clinics | Booking |
| `/session-packs` | Online Training Programs | Programs |
| `/shop` | Merchandise Store | E-Commerce |
| `/loyalty` | Members Rewards Program | Membership |
| `/contact` | Contact Form + Info | Lead Gen / Form |

---

## Navigation

### Primary Nav (sticky, black)
- About → `/about`
- Small Groups (dropdown) → Book, Clinics, Session Packs
- Private Lessons → `/private-lessons`
- Contact → `/contact`
- Logo (center) → `/`
- Log In (right) → Supabase Auth / member area

---

## Brand & Design

### Colors
| Token | Hex | Usage |
|-------|-----|-------|
| Black | `#000000` | Primary background, nav, footer |
| White | `#FFFFFF` | Text on dark backgrounds |
| TL Green | `#4CAF50` | Primary CTAs, active states, accent headings |
| TL Orange | `#F78E2B` | Secondary CTAs, sale prices, stars, tab underlines |
| Dark Gray | `#111111` | Card backgrounds, section alternates |

### Typography
- **Headings**: Bold sans-serif, uppercase, large scale (60–80px hero, 36–48px sections)
- **Body**: Regular sans-serif, white/light on dark, ~16px, line-height 1.6
- **Suggested fonts**: Montserrat (headings) + Inter (body)

### Design System
- Dark-first — nearly every section is black or `#111`
- Images as section backgrounds with 40–60% dark overlay
- Rounded pill buttons (~25–30px border-radius)
- Underline-style form inputs (no full borders)
- Orange active tab underlines

### Tagline
"INTENSITY. DISCIPLINE. PRECISION." (fix typo from live site: "PRESICION")

---

## Pages — Content & Feature Summary

### Homepage `/`
- Full-viewport hero (video/image bg, dark overlay) — "TRAIN WITH TL ELITE"
- CTAs: "Spring 2026" (green) + "Summer 2026" (orange)
- Mission section: left photo + right green card overlay
- 3-column service cards (Small Group Sessions, Seasonal Clinics, Film Analysis)
- Product carousel — "SHOP TL GEAR" (4 items visible, pagination dots)
- Testimonials carousel with star ratings

### About `/about`
- Hero with background image + "OUR STORY"
- Staff names section (Brendan Heayden, Mitch Walinski)
- Mission statement — "INTENSITY. DISCIPLINE. PRECISION."
- Testimonials 2×2 grid on photo background
- Full coach bios (Brendan + Mitch)

### Book `/book`
- Heading: "OUR SESSIONS"
- Tab filter: All Services | Drop Ins | Spring 2026 | Summer 2026
- Session cards: name, age group, day, duration, price, availability badge, Book Now + Explore Plans
- Sessions stored in Supabase, managed via admin
- **Drop-Ins**: $50 each (Sat/Sun, 50 min, ages 5–11)
- **Spring 2026**: $599/package (Mon/Tue/Wed nights, various age groups, started April)
- **Summer 2026**: $399/package (Mon–Thu nights, various age groups, starts July)
- Payments via Stripe

### Private Lessons `/private-lessons`
- Hero — "INTRODUCING: PRIVATE LESSONS"
- 3-step process section (numbered, green)
- Prospective Player Form: player name, guardian name, email, current team, birthdate, position, location (radio), day availability (checkboxes), preferred time, skills focus, additional info
- Form submissions → Resend email notification to Brendan

### Clinics `/clinics`
- Seasonal — name changes (Christmas, Thanksgiving, Summer, etc.)
- Description + booking widget (sessions from Supabase)
- Up to 25 players per clinic, 5+ coaches

### Session Packs `/session-packs`
- Tab filter: All programs | Online Training
- Program cards: image, name, participant count, paid indicator, View Details
- Linked to Stripe products

### Shop `/shop`
- 2-column product grid (horizontal card: image left, info right)
- Sort dropdown
- Product badges: New Arrival, Limited Edition, Best Seller
- Sale price with strikethrough
- Quick View on hover
- Cart + checkout via Stripe
- **Products** (7 items): hats, t-shirts, hoodies, snapbacks — $14.99–$64.99

### Loyalty `/loyalty`
- Left: photo with Members Program overlay + "Become a Member" CTA
- Right: stacked info cards
  - Sign Up — earn 15 points
  - Book a Session — earn 10 points
  - Buy online program — earn 25 points
  - Order Online Training — earn 20 points
  - Redeem: 50pts = $10 discount / 125pts = Free Hat
- Backed by Supabase (points table, transactions)

### Contact `/contact`
- Hero — "GET IN TOUCH"
- Photo banner (2 side-by-side hockey action photos)
- Player Inquiry Form: first/last name, email*, birth year, message*
- Contact info: email, locations, social links
- Form submissions → Resend

---

## Feature Replacement Map (Wix → Custom)

| Wix Feature | Replacement |
|-------------|-------------|
| Wix Bookings | Custom booking system (Supabase sessions + Stripe payments) |
| Wix Stores | Custom shop (Supabase catalog + Stripe checkout) |
| Wix Members | Supabase Auth |
| Wix Loyalty | Custom points system (Supabase) |
| Wix Pricing Plans | Stripe products/subscriptions |
| Wix Forms | Custom forms + Resend email notifications |

---

## Data Models

### Sessions
```ts
{
  name: string,
  ageGroup: string,       // "Ages 5-6" | "2017/18"
  day: string,            // "Mon" | "Sat, Sun"
  duration: number,       // minutes
  price: number,
  season: "Drop Ins" | "Spring 2026" | "Summer 2026" | "Clinics",
  startDate: Date,
  spotsLeft: number,
  maxCapacity: number,
  stripeProductId: string
}
```

### Products
```ts
{
  name: string,
  price: number,
  salePrice: number | null,
  images: string[],
  badge: "New Arrival" | "Limited Edition" | "Best Seller" | null,
  category: "Hats" | "T-Shirts" | "Hoodies" | "Snapbacks",
  stripeProductId: string
}
```

### Users (extends Supabase auth.users)
```ts
{
  id: uuid,
  full_name: string,
  email: string,
  pro_status: "free" | "member",
  loyalty_points: number,
  created_at: timestamptz
}
```

### Loyalty Transactions
```ts
{
  user_id: uuid,
  action: string,         // "signup" | "booking" | "purchase" | "online_program"
  points: number,
  created_at: timestamptz
}
```

---

## SEO Targets

| Page | Title | Focus Keywords |
|------|-------|---------------|
| `/` | TL Elite Hockey \| Youth Player Development \| Thayer Sports Center, Braintree, MA | youth hockey, player development, Braintree MA |
| `/about` | Youth Hockey Development \| TL Elite Hockey | hockey development, coaching staff, New England |
| `/private-lessons` | Private Hockey Lessons \| TL Elite Hockey Training | private hockey lessons, 1-on-1 training |
| `/clinics` | Youth Hockey Clinics \| TL Elite Skill Development | hockey clinics, skill development |
| `/book` | Skate With Us \| TL Elite Hockey | book hockey sessions, small group training |
| `/shop` | Shop TL Gear \| TL Elite Hockey | hockey merchandise, TL Elite gear |
| `/contact` | Get In Touch \| TL Elite Hockey | contact, hockey training inquiry |
| `/loyalty` | Members Rewards Program \| TL Elite Hockey | loyalty program, hockey rewards |
| `/session-packs` | Session Packs \| TL Elite Hockey | session packs, training packages |

---

## Social Links
- Instagram: @tlelitehockey
- Facebook: facebook.com/TLeliteHockey
- LinkedIn: (linked from site footer)

---

## Build Priority Order
1. Core layout — header, footer, section wrappers
2. Homepage
3. About
4. Contact
5. Private Lessons
6. Book / Sessions (Supabase + Stripe)
7. Shop (Supabase + Stripe)
8. Clinics + Session Packs
9. Loyalty / Members (Supabase points system)

---

## Assets
- Source: live tlelitehockey.com (Wix site) — pull logos, photos, product images
- Logo: Leprechaun mascot (primary, navbar center) + circular badge (footer)
- Photography: rink action shots, coaches with players
