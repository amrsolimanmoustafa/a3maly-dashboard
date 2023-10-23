import { z } from "zod"

const templateFieldSchema = z.object({
  label_ar: z.string(),
  label_en: z.string(),
  name: z.string(),
  placeholder_ar: z.string(),
  placeholder_en: z.string()
})

const textTemplateFieldSchema = templateFieldSchema.extend({
  type: z.literal("text"),
  validation: z.object({
    required: z.boolean(),
    minLength: z.number().optional(),
    maxLength: z.number().optional(),
    minRows: z.number().optional()
  })
})

const optionsTemplateFieldSchema = templateFieldSchema.extend({
  type: z.literal("options"),
  validation: z.object({
    required: z.boolean()
  }),
  options: z.array(z.string())
})

const templateTextVariantSchema = z.object({
  ar: z.string(),
  en: z.string()
})

export const templateSchemeZodSchema = z.object({
  template_text_variants: z.array(templateTextVariantSchema),
  fields: z.array(
    z.union([textTemplateFieldSchema, optionsTemplateFieldSchema])
  )
})

export type TemplateScheme = z.infer<typeof templateSchemeZodSchema>