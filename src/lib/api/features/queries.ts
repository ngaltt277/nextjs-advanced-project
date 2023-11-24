import { db } from "@/lib/db/index";

export const getFeatures = async () => {
  const f = await db.feature.findMany();
  return { features: f };
};
