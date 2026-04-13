/**
 * TL Elite Hockey — Wix → Supabase Member Migration
 *
 * Run: npx tsx src/lib/supabase/migrations/migrate-wix-users.ts
 *
 * Before running:
 * 1. Generate a Wix API key: wix.com Dashboard → Settings → API Keys → Generate Key
 *    Required permissions: Members (Read), Loyalty (Read)
 *    Add to .env.local as WIX_API_KEY=your_key_here
 * 2. Ensure RESEND_API_KEY is set in .env.local
 * 3. Ensure NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are set
 * 4. Add wix_member_id column to profiles table in Supabase Dashboard before running:
 *      ALTER TABLE profiles ADD COLUMN IF NOT EXISTS wix_member_id TEXT;
 *
 * What this does:
 * - Pulls all 695 Wix members + their loyalty point balances via the Wix REST API
 * - Creates Supabase auth accounts via admin.generateLink (invite type)
 * - Sets loyalty points and wix_member_id in the profiles table
 * - Sends a branded TL Elite migration email via Resend with the activation link
 *
 * Env vars needed in .env.local:
 *   WIX_API_KEY=               # Wix API key (wix.com → Settings → API Keys)
 *   RESEND_API_KEY=            # Resend API key
 *   NEXT_PUBLIC_SUPABASE_URL=
 *   SUPABASE_SERVICE_ROLE_KEY=
 *   NEXT_PUBLIC_SITE_URL=https://www.tlelitehockey.com
 */

import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";
import * as dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });

// ── Config ────────────────────────────────────────────────────────────────────
const WIX_SITE_ID = "58829261-87fa-43ce-8a6c-980d0240d935";
const WIX_API_KEY = process.env.WIX_API_KEY!;
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const RESEND_API_KEY = process.env.RESEND_API_KEY!;
const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.tlelitehockey.com";
const FROM_EMAIL = "TL Elite Hockey <noreply@tlelitehockey.com>";

// ── Types ─────────────────────────────────────────────────────────────────────
interface WixMember {
  wixContactId: string;
  email: string;
  firstName: string;
  lastName: string;
  loyaltyPoints: number;
  loyaltyEarned: number;
  loyaltyRedeemed: number;
}

interface LoyaltyPoints {
  balance: number;
  earned: number;
  redeemed: number;
}

interface LoyaltyAccount {
  contactId?: string;
  memberId?: string;
  points: LoyaltyPoints;
  contact?: { email?: string };
}

interface LoyaltyQueryResponse {
  loyaltyAccounts: LoyaltyAccount[];
  pagingMetadata: {
    hasNext: boolean;
    cursors?: { next?: string };
  };
}

interface RawMember {
  id: string;
  contactId?: string;
  profile?: { nickname?: string };
  memberInfo?: { email?: string; status?: string };
}

interface MembersQueryResponse {
  members: RawMember[];
  metadata: { count: number; total: number };
}

// ── Wix API helper ────────────────────────────────────────────────────────────
async function wixPost(endpoint: string, body: unknown): Promise<unknown> {
  const res = await fetch(`https://www.wixapis.com${endpoint}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: WIX_API_KEY,
      "wix-site-id": WIX_SITE_ID,
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Wix API error ${res.status} at ${endpoint}: ${text}`);
  }

  return res.json();
}

// ── Step 1: Pull all loyalty accounts (cursor-based pagination) ───────────────
async function fetchAllLoyaltyAccounts(): Promise<Map<string, LoyaltyPoints>> {
  const map = new Map<string, LoyaltyPoints>();
  let cursor: string | undefined;
  let page = 0;

  while (true) {
    page++;
    console.log(`  Fetching loyalty accounts page ${page}...`);

    const body: Record<string, unknown> = cursor
      ? { query: { cursorPaging: { cursor, limit: 100 } } }
      : { query: { paging: { limit: 100 } } };

    const data = (await wixPost(
      "/loyalty-accounts/v1/accounts/query",
      body
    )) as LoyaltyQueryResponse;

    for (const account of data.loyaltyAccounts) {
      const id = account.contactId ?? account.memberId;
      if (id) {
        map.set(id, {
          balance: account.points.balance,
          earned: account.points.earned,
          redeemed: account.points.redeemed,
        });
      }
    }

    if (!data.pagingMetadata.hasNext || !data.pagingMetadata.cursors?.next) {
      break;
    }
    cursor = data.pagingMetadata.cursors.next;

    // Courtesy delay — avoid hitting Wix rate limits
    await new Promise((r) => setTimeout(r, 200));
  }

  console.log(`  Fetched ${map.size} loyalty accounts total`);
  return map;
}

// ── Step 2: Pull all members (offset-based pagination) ───────────────────────
async function fetchAllMembers(): Promise<WixMember[]> {
  const members: WixMember[] = [];
  let offset = 0;
  const limit = 100;

  while (true) {
    console.log(`  Fetching members offset ${offset}...`);

    const data = (await wixPost("/members/v1/members/query", {
      query: {
        fieldsets: ["FULL"],
        paging: { limit, offset },
      },
    })) as MembersQueryResponse;

    for (const m of data.members) {
      const email = m.memberInfo?.email;
      if (!email) continue;

      // Parse name from profile nickname (best available source)
      const nickname = m.profile?.nickname ?? "";
      const nameParts = nickname.trim().split(/\s+/);

      members.push({
        wixContactId: m.contactId ?? m.id,
        email: email.toLowerCase().trim(),
        firstName: nameParts[0] ?? "",
        lastName: nameParts.slice(1).join(" "),
        loyaltyPoints: 0,
        loyaltyEarned: 0,
        loyaltyRedeemed: 0,
      });
    }

    offset += data.metadata.count;
    if (offset >= data.metadata.total || data.metadata.count === 0) break;

    await new Promise((r) => setTimeout(r, 200));
  }

  console.log(`  Fetched ${members.length} members with emails`);
  return members;
}

// ── Migration email HTML ──────────────────────────────────────────────────────
function buildMigrationEmail(
  firstName: string,
  activateUrl: string,
  loyaltyPoints: number
): string {
  const greeting = firstName ? `Hi ${firstName},` : "Hello,";
  const pointsLine =
    loyaltyPoints > 0
      ? `<p style="color:#555;font-size:16px;margin:16px 0;">Your <strong>${loyaltyPoints} loyalty points</strong> have been carried over and are ready to use.</p>`
      : "";

  return `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f5f5f5;font-family:Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f5f5f5;padding:40px 20px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:12px;overflow:hidden;max-width:600px;width:100%;">
        <!-- Header -->
        <tr><td style="background:#000000;padding:32px;text-align:center;">
          <img src="https://www.tlelitehockey.com/images/logo-primary.png" alt="TL Elite Hockey" height="60" style="display:block;margin:0 auto;">
        </td></tr>
        <!-- Body -->
        <tr><td style="padding:40px 40px 32px;">
          <h1 style="color:#111;font-size:24px;font-weight:900;margin:0 0 8px;text-transform:uppercase;">We've got a new home.</h1>
          <p style="color:#555;font-size:16px;margin:0 0 24px;">${greeting}</p>
          <p style="color:#555;font-size:16px;line-height:1.6;margin:0 0 16px;">TL Elite Hockey has launched a brand new website. Your account has already been moved over — all you need to do is set your password to start using it.</p>
          ${pointsLine}
          <p style="color:#555;font-size:16px;line-height:1.6;margin:0 0 32px;">Click the button below to activate your account. The link expires in 24 hours.</p>
          <!-- CTA Button -->
          <table cellpadding="0" cellspacing="0" style="margin:0 auto 32px;">
            <tr><td style="background:#4CAF50;border-radius:50px;">
              <a href="${activateUrl}" style="display:inline-block;padding:16px 40px;color:#ffffff;font-weight:900;font-size:16px;text-decoration:none;text-transform:uppercase;letter-spacing:1px;">Activate My Account</a>
            </td></tr>
          </table>
          <p style="color:#888;font-size:13px;line-height:1.6;margin:0 0 8px;">Already use Google to sign in? You can also <a href="${SITE_URL}/auth/login" style="color:#4CAF50;">sign in with Google</a> using the same Google account — no setup needed.</p>
          <p style="color:#aaa;font-size:12px;margin:0;">If you didn't expect this email, you can safely ignore it.</p>
        </td></tr>
        <!-- Footer -->
        <tr><td style="background:#111;padding:24px;text-align:center;">
          <p style="color:#555;font-size:12px;margin:0;">TL Elite Hockey School · Thayer Sports Center, 1515 Washington St, Braintree, MA 02184</p>
          <p style="margin:8px 0 0;"><a href="${SITE_URL}" style="color:#4CAF50;font-size:12px;text-decoration:none;">tlelitehockey.com</a></p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

// ── Main ──────────────────────────────────────────────────────────────────────
async function main() {
  // Validate env vars before doing any work
  const required = [
    "WIX_API_KEY",
    "NEXT_PUBLIC_SUPABASE_URL",
    "SUPABASE_SERVICE_ROLE_KEY",
    "RESEND_API_KEY",
  ];
  const missing = required.filter((k) => !process.env[k]);
  if (missing.length) {
    console.error(`\nMissing required env vars: ${missing.join(", ")}`);
    console.error("Add them to .env.local before running this script.");
    process.exit(1);
  }

  const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
  const resend = new Resend(RESEND_API_KEY);

  // ── Step 1: Loyalty accounts ──────────────────────────────────────────────
  console.log("\nStep 1: Fetching loyalty accounts from Wix...");
  const loyaltyMap = await fetchAllLoyaltyAccounts();

  // ── Step 2: Members ───────────────────────────────────────────────────────
  console.log("\nStep 2: Fetching members from Wix...");
  const members = await fetchAllMembers();

  // ── Step 3: Merge loyalty into members ───────────────────────────────────
  for (const member of members) {
    const loyalty = loyaltyMap.get(member.wixContactId);
    if (loyalty) {
      member.loyaltyPoints = loyalty.balance;
      member.loyaltyEarned = loyalty.earned;
      member.loyaltyRedeemed = loyalty.redeemed;
    }
  }

  // Deduplicate by email — keep first occurrence
  const byEmail = new Map<string, WixMember>();
  for (const m of members) {
    if (m.email && !byEmail.has(m.email)) {
      byEmail.set(m.email, m);
    }
  }
  const unique = Array.from(byEmail.values());

  console.log(`\nStep 3: Migrating ${unique.length} unique members...`);

  let success = 0;
  let failed = 0;
  let skipped = 0;

  for (const member of unique) {
    try {
      // Generate a Supabase invite link — this creates the auth user
      const { data: linkData, error: linkError } =
        await supabase.auth.admin.generateLink({
          type: "invite",
          email: member.email,
          options: {
            redirectTo: `${SITE_URL}/auth/callback`,
            data: {
              full_name: `${member.firstName} ${member.lastName}`.trim(),
            },
          },
        });

      if (linkError) {
        // User may already exist in Supabase — look them up and update profile
        const { data: existingList } = await supabase.auth.admin.listUsers();
        const existingUser = existingList?.users.find(
          (u) => u.email === member.email
        );

        if (existingUser) {
          await supabase.from("profiles").upsert({
            id: existingUser.id,
            email: member.email,
            full_name: `${member.firstName} ${member.lastName}`.trim(),
            loyalty_points: member.loyaltyPoints,
            wix_member_id: member.wixContactId,
            pro_status: "free",
          });
          skipped++;
          console.log(`  SKIP (already exists): ${member.email}`);
          continue;
        }

        console.error(`  FAILED: ${member.email} — ${linkError.message}`);
        failed++;
        continue;
      }

      const userId = linkData.user.id;
      const activateUrl = linkData.properties.action_link;

      // Upsert profile row with loyalty data + wix reference
      const { error: profileError } = await supabase.from("profiles").upsert({
        id: userId,
        email: member.email,
        full_name: `${member.firstName} ${member.lastName}`.trim(),
        loyalty_points: member.loyaltyPoints,
        wix_member_id: member.wixContactId,
        pro_status: "free",
      });

      if (profileError) {
        console.warn(
          `  WARN: Profile upsert for ${member.email}: ${profileError.message}`
        );
      }

      // Send branded migration email via Resend
      const { error: emailError } = await resend.emails.send({
        from: FROM_EMAIL,
        to: member.email,
        subject: "Your TL Elite account is ready — activate it now",
        html: buildMigrationEmail(
          member.firstName,
          activateUrl,
          member.loyaltyPoints
        ),
      });

      if (emailError) {
        console.warn(`  WARN: Email send failed for ${member.email}:`, emailError);
      }

      success++;
      console.log(`  OK: ${member.email} (${member.loyaltyPoints} pts)`);

      // Rate limit: Resend free tier = 2 emails/sec; stay under with 600ms gap
      await new Promise((r) => setTimeout(r, 600));
    } catch (err) {
      console.error(`  ERROR: ${member.email}`, err);
      failed++;
    }
  }

  console.log(`
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Migration complete
  Success:  ${success}
  Skipped:  ${skipped} (already existed in Supabase — profile updated)
  Failed:   ${failed}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
}

main().catch(console.error);
