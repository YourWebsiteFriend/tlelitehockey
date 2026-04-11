import type Stripe from "stripe";

// Re-export commonly used Stripe event types for type-safe webhook handling

export type StripeCheckoutSessionCompleted =
  Stripe.CheckoutSessionCompletedEvent;

export type StripePaymentIntentPaymentFailed =
  Stripe.PaymentIntentPaymentFailedEvent;

export type StripeChargeRefunded = Stripe.ChargeRefundedEvent;

// Union type for all webhook events we handle
export type HandledStripeEvent =
  | StripeCheckoutSessionCompleted
  | StripePaymentIntentPaymentFailed
  | StripeChargeRefunded;

// Metadata attached to Stripe checkout sessions by our checkout action
export interface SessionCheckoutMetadata {
  type: "session_booking";
  session_id: string;
  user_id: string;
}

export interface ShopCheckoutMetadata {
  type: "shop_order";
  user_id: string;
}

export type CheckoutMetadata = SessionCheckoutMetadata | ShopCheckoutMetadata;
