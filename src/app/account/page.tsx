import type { Metadata } from "next";
import Link from "next/link";
import { SectionWrapper } from "@/components/shared/SectionWrapper";
import { SignOutButton } from "@/components/account/SignOutButton";
import { getSupabaseServerClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "My Account | TL Elite Hockey",
};

export default async function AccountPage() {
  const supabase = await getSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user!.id)
    .single();

  const { data: bookings } = await supabase
    .from("bookings")
    .select("*, sessions(name, age_group, day, price, season)")
    .eq("user_id", user!.id)
    .order("created_at", { ascending: false })
    .limit(5);

  const { data: orders } = await supabase
    .from("orders")
    .select("*")
    .eq("user_id", user!.id)
    .order("created_at", { ascending: false })
    .limit(5);

  return (
    <SectionWrapper className="bg-black pt-32">
      {/* Header */}
      <div className="mb-10">
        <h1 className="section-heading text-white text-3xl sm:text-4xl mb-2">
          MY ACCOUNT
        </h1>
        <p className="text-white/50">
          Welcome back,{" "}
          <span className="text-white">
            {profile?.full_name ?? user?.email}
          </span>
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Loyalty Card */}
        <div className="bg-[#111111] rounded-2xl p-8 border border-white/10 text-center">
          <p className="text-[#4CAF50] text-7xl font-black leading-none">
            {profile?.loyalty_points ?? 0}
          </p>
          <p className="text-white/50 uppercase text-xs tracking-widest mt-2">
            LOYALTY POINTS
          </p>
          <p className="text-white/30 text-sm mt-1">
            Keep training to earn more
          </p>
          <Link
            href="/loyalty"
            className="inline-block mt-6 text-[#4CAF50] text-xs uppercase tracking-wide hover:underline"
          >
            View Rewards →
          </Link>
        </div>

        {/* Bookings */}
        <div className="bg-[#111111] rounded-2xl p-8 border border-white/10">
          <h2 className="text-[#F78E2B] uppercase text-xs tracking-widest mb-4 font-bold">
            RECENT BOOKINGS
          </h2>
          {!bookings || bookings.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-white/40 text-sm mb-4">
                No bookings yet. Ready to get started?
              </p>
              <Link
                href="/book"
                className="bg-[#4CAF50] rounded-full px-6 py-2 text-white font-bold text-sm hover:bg-[#43A047] transition-colors"
              >
                Book Now
              </Link>
            </div>
          ) : (
            <div className="space-y-3">
              {bookings.map(
                (booking: {
                  id: string;
                  status: string;
                  sessions?: { name: string; price: number; season: string } | null;
                }) => (
                  <div
                    key={booking.id}
                    className="bg-black rounded-xl p-4 border border-white/10"
                  >
                    <div className="flex justify-between items-start">
                      <p className="text-white font-bold text-sm">
                        {booking.sessions?.name ?? "Session"}
                      </p>
                      <span
                        className={`text-xs font-bold uppercase px-2 py-0.5 rounded-full ${
                          booking.status === "confirmed"
                            ? "bg-[#4CAF50]/20 text-[#4CAF50]"
                            : booking.status === "cancelled"
                            ? "bg-red-900/40 text-red-400"
                            : "bg-white/10 text-white/60"
                        }`}
                      >
                        {booking.status}
                      </span>
                    </div>
                    {booking.sessions?.price && (
                      <p className="text-[#F78E2B] text-sm font-black mt-1">
                        ${booking.sessions.price}
                      </p>
                    )}
                  </div>
                )
              )}
            </div>
          )}
        </div>

        {/* Orders */}
        <div className="bg-[#111111] rounded-2xl p-8 border border-white/10">
          <h2 className="text-[#F78E2B] uppercase text-xs tracking-widest mb-4 font-bold">
            RECENT ORDERS
          </h2>
          {!orders || orders.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-white/40 text-sm mb-4">No orders yet.</p>
              <Link
                href="/shop"
                className="border border-white/20 rounded-full px-6 py-2 text-white/60 font-bold text-sm hover:border-white/40 hover:text-white transition-colors"
              >
                Shop Gear
              </Link>
            </div>
          ) : (
            <div className="space-y-3">
              {orders.map(
                (order: {
                  id: string;
                  total_amount: number;
                  status: string;
                  created_at: string;
                }) => (
                  <div
                    key={order.id}
                    className="bg-black rounded-xl p-4 border border-white/10"
                  >
                    <div className="flex justify-between items-start">
                      <p className="text-[#F78E2B] font-black text-sm">
                        ${order.total_amount?.toFixed(2)}
                      </p>
                      <span
                        className={`text-xs font-bold uppercase px-2 py-0.5 rounded-full ${
                          order.status === "completed"
                            ? "bg-[#4CAF50]/20 text-[#4CAF50]"
                            : "bg-white/10 text-white/60"
                        }`}
                      >
                        {order.status}
                      </span>
                    </div>
                    <p className="text-white/40 text-xs mt-1">
                      {new Date(order.created_at).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                )
              )}
            </div>
          )}
        </div>
      </div>

      {/* Sign Out */}
      <div className="mt-12 flex justify-start">
        <SignOutButton />
      </div>
    </SectionWrapper>
  );
}
