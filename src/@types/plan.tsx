import { makeTableApiResponseZodSchema } from "@/components/SharedTable/utils";
import { z } from "zod";

export const planZodSchema = z.object({
  id: z.number(),
  title_ar: z.string(),
  title_en: z.string(),
  features_ar: z.string(),
  features_en: z.string(),
  price_monthly: z.number(),
  price_annually: z.number(),
  words_count: z.number(),
  created_at: z.string(),
  updated_at: z.string()
})

export type PlanType = z.infer<typeof planZodSchema>;

export const PlanTableApiResponseZodSchema = makeTableApiResponseZodSchema(planZodSchema);

export type PlanTableApiResponse = z.infer<typeof PlanTableApiResponseZodSchema>;