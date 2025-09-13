import Stripe from "stripe";

// Lazy initialization to prevent build-time errors
let stripeInstance: Stripe | null = null;

function getStripeInstance(): Stripe {
  if (!stripeInstance) {
    const secretKey = process.env.STRIPE_SECRET_KEY;
    if (!secretKey || secretKey === '') {
      throw new Error('STRIPE_SECRET_KEY environment variable is not set');
    }
    stripeInstance = new Stripe(secretKey, {
      apiVersion: "2025-08-27.basil",
    });
  }
  return stripeInstance;
}

// Export a proxy that only initializes Stripe when actually used
export const stripe = new Proxy({} as Stripe, {
  get(target, prop) {
    const instance = getStripeInstance();
    const value = instance[prop as keyof Stripe];
    return typeof value === 'function' ? value.bind(instance) : value;
  }
});

export const getStripe = async () => {
  if (typeof window !== "undefined") {
    const { loadStripe } = await import("@stripe/stripe-js");
    return loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);
  }
  return null;
};