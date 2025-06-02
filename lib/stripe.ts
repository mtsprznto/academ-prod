import Stripe from "stripe";

if (!process.env.STRIPE_SECRET_KEY) {
    throw new Error("No Stripe secret key defined")
}

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: "2025-05-28.basil",
    typescript: true
})