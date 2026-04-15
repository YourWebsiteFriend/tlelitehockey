import { headers } from 'next/headers';
import { stripe } from '@/lib/stripe/server';
import { getSupabaseServiceClient } from '@/lib/supabase/server';
import { awardLoyaltyPoints } from '@/services/loyalty.service';
import type { CheckoutMetadata } from '@/types/stripe';

const STRIPE_WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(request: Request): Promise<Response> {
  const body = await request.text();
  const headersList = await headers();
  const sig = headersList.get('stripe-signature');

  if (!sig) {
    return new Response('Missing stripe-signature header', { status: 400 });
  }

  let event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    console.error('[stripe/webhook] Signature verification failed:', err);
    return new Response(`Webhook Error: ${(err as Error).message}`, { status: 400 });
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    const metadata = session.metadata as CheckoutMetadata | null;

    if (!metadata) {
      console.error('[stripe/webhook] checkout.session.completed: no metadata');
      return Response.json({ received: true });
    }

    const supabase = await getSupabaseServiceClient();

    if (metadata.type === 'session_booking') {
      const { session_id, user_id } = metadata;
      const paymentIntentId =
        typeof session.payment_intent === 'string'
          ? session.payment_intent
          : (session.payment_intent?.id ?? null);

      // Update booking to confirmed
      const { error: updateError } = await supabase
        .from('bookings')
        .update({
          status: 'confirmed',
          stripe_payment_intent_id: paymentIntentId,
          amount_paid: session.amount_total ? session.amount_total / 100 : null,
        })
        .eq('stripe_checkout_session_id', session.id);

      if (updateError) {
        console.error('[stripe/webhook] booking update error:', updateError);
      }

      // Award loyalty points (non-blocking)
      try {
        await awardLoyaltyPoints(user_id, 'booking', session_id);
      } catch (err) {
        console.error('[stripe/webhook] awardLoyaltyPoints (booking) error:', err);
      }
    } else if (metadata.type === 'shop_order') {
      const paymentIntentId =
        typeof session.payment_intent === 'string'
          ? session.payment_intent
          : (session.payment_intent?.id ?? null);

      const userId = metadata.user_id && metadata.user_id !== 'guest' ? metadata.user_id : null;

      // Insert order record
      const { error: insertError } = await supabase.from('orders').insert({
        user_id: userId,
        stripe_checkout_session_id: session.id,
        stripe_payment_intent_id: paymentIntentId,
        status: 'paid',
        total_amount: session.amount_total ? session.amount_total / 100 : 0,
        line_items: session.line_items ?? null,
        customer_email: session.customer_details?.email ?? null,
      });

      if (insertError) {
        console.error('[stripe/webhook] order insert error:', insertError);
      }

      // Award loyalty points (non-blocking, guests skipped)
      if (userId) {
        try {
          await awardLoyaltyPoints(userId, 'purchase');
        } catch (err) {
          console.error('[stripe/webhook] awardLoyaltyPoints (purchase) error:', err);
        }
      }
    }
  }

  return Response.json({ received: true });
}
