import { makeTableApiResponseZodSchema } from "@/components/SharedTable/utils";
import { z } from "zod";

const TemplateZodSchema = z.object({
  id: z.number(),
  title_ar: z.string(),
  title_en: z.string(),
  description_ar: z.string(),
  description_en: z.string(),
  icon: z.string(),
  category_id: z.number(),
  category: z.object({   
    id: z.number(),
    title_ar: z.string(),
    title_en: z.string()
  }),
  is_active: z.number(),
  created_at: z.string(),
  updated_at: z.string(),
});

export type Template = z.infer<typeof TemplateZodSchema>;

export type TemplateContextType = {
  user: Template[];
};

export const TemplatesTableZodSchema = makeTableApiResponseZodSchema(TemplateZodSchema);

export type TemplateTableApiResponse = z.infer<typeof TemplatesTableZodSchema>;