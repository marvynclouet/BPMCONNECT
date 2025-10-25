import { loadStripe } from '@stripe/stripe-js'

// Initialize Stripe
let stripePromise: Promise<any>

export const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)
  }
  return stripePromise
}
