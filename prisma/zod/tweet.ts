import * as z from "zod"

export const tweetSchema = z.object({
  id: z.string(),
  content: z.string(),
  userId: z.string(),
  createdAt: z.date().nullish(),
})
