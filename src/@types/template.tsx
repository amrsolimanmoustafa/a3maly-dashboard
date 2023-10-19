import { makeTableApiResponseZodSchema } from "@/components/SharedTable/utils";
import { z } from "zod"

export const templateZodScheme = z.object({
  id: z.number(),
  title_ar: z.string(),
  title_en: z.string(),
  description_ar: z.string().or(z.null()),
  description_en: z.string().or(z.null()),
  schemes: z.array(z.object({ ar: z.string(), en: z.string() })).or(z.null()),
  icon: z.string(),
  category_id: z.number(),
  is_active: z.number(),
  created_at: z.string(),
  updated_at: z.string(),
  category: z.object({
    id: z.number(),
    title_en: z.string(),
    title_ar: z.string()
  })
})

export const templatesTableApiResponseZodSchema =
  makeTableApiResponseZodSchema(templateZodScheme)

export type TemplatesTableApiResponse = z.infer<typeof templatesTableApiResponseZodSchema>;