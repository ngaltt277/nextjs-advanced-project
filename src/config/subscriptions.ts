export interface SubscriptionPlan {
  id: string;
  name: string;
  description: string;
  stripePriceId: string;
  price: number;
  features: Array<string>;
}

export const storeSubscriptionPlans: SubscriptionPlan[] = [
  {
    id: "basic",
    name: "X Basic",
    description: "Be able to post on twitter.",
    stripePriceId: process.env.NEXT_PUBLIC_STRIPE_PRO_PRICE_ID ?? "",
    price: 100,
    features: ["Feature 1", "Feature 2", "Feature 3"],
  },
];
