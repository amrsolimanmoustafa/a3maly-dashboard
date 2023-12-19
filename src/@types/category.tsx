import { makeTableApiResponseZodSchema } from "@/components/SharedTable/utils";
import { z } from "zod"

export const categoryZodSchema = z.object({
  id: z.number(),
  title_ar: z.string(),
  title_en: z.string(),
  is_active: z.number(),
  created_at: z.string(),
  updated_at: z.string()
})

export type Category = z.infer<typeof categoryZodSchema>

export const categoriesTableApiResponseZodSchema =
  makeTableApiResponseZodSchema(categoryZodSchema)

export type CategoriesTableApiResponse = z.infer<typeof categoriesTableApiResponseZodSchema>;