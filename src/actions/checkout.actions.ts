'use server';

import { getSupabaseServerClient } from '@/lib/supabase/server';
import { stripe } from '@/lib/stripe/server';
import { getSessionById } from '@/services/sessions.service';
import type { ActionResult } from '@/types/action';
import type { CartItem } from '@/types/cart';
import { z } from 'zod';

const CartItemSchema = z.object({
  productId: z.string().min(1),
  name: z.string().min(1),
  price: z.number().positive(),
  salePrice: z.number().positive().nullable(),
  image: z.string(),
  quantity: z.number().int().positive().max(99),
  stripeProductId: z.string().min(1),
  stripePriceId: z.string().min(1),
});

const CartItemsSchema = z.array(CartItemSchema).min(1).max(50);

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://tlelitehockey.com';

export async function createSessionCheckout(
  sessionId: string
): Promise<ActionResult<{ checkoutUrl: string }>> {
  const supabase = await getSupabaseServerClient();

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return { success: false, error: 'Please log in to continue.' };
  }

  const session = await getSessionById(sessionId);

  if (!session) {
    return { success: false, error: 'Session not found.' };
  }

  if (session.spots_left === 0) {
    return { success: false, error: 'This session is fully booked.' };
  }

  if (!session.stripe_price_id) {
    return { success: false, error: 'This session is not available for online booking.' };
  }

  try {
    const checkoutSession = await stripe.checkout.sessions.create({
      mode: 'payment',
      line_items: [
        {
          price: session.stripe_price_id,
          quantity: 1,
        },
      ],
      success_url: `${siteUrl}/book?booking=success`,
      cancel_url: `${siteUrl}/book`,
      metadata: {
        type: 'session_booking',
        session_id: sessionId,
        user_id: user.id,
      },
    });

    // Insert pending booking
    const { error: insertError } = await supabase.from('bookings').insert({
      user_id: user.id,
      session_id: sessionId,
      stripe_checkout_session_id: checkoutSession.id,
      status: 'pending',
    });

    if (insertError) {
      console.error('[checkout.actions] createSessionCheckout booking insert error:', insertError);
      // Don't block the checkout — Stripe webhook will reconcile
    }

    return { success: true, data: { checkoutUrl: checkoutSession.url! } };
  } catch (err) {
    console.error('[checkout.actions] createSessionCheckout Stripe error:', err);
    return { success: false, error: 'Failed to create checkout session. Please try again.' };
  }
}

export async function createShopCheckout(
  items: CartItem[]
): Promise<ActionResult<{ checkoutUrl: string }>> {
  const supabase = await getSupabaseServerClient();

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return { success: false, error: 'Please log in to continue.' };
  }

  const parsed = CartItemsSchema.safeParse(items);
  if (!parsed.success) {
    return { success: false, error: 'Invalid cart data. Please refresh and try again.' };
  }

  try {
    const lineItems = parsed.data.map((item) => ({
      price: item.stripePriceId,
      quantity: item.quantity,
    }));

    const checkoutSession = await stripe.checkout.sessions.create({
      mode: 'payment',
      line_items: lineItems,
      success_url: `${siteUrl}/shop?order=success`,
      cancel_url: `${siteUrl}/shop`,
      metadata: {
        type: 'shop_order',
        user_id: user.id,
      },
    });

    return { success: true, data: { checkoutUrl: checkoutSession.url! } };
  } catch (err) {
    console.error('[checkout.actions] createShopCheckout Stripe error:', err);
    return { success: false, error: 'Failed to create checkout session. Please try again.' };
  }
}
