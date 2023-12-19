import { z } from "zod"

const baseTemplateFieldSchema = z.object({
  label_ar: z.string(),
  label_en: z.string(),
  name: z.string(),
})

const templateFieldSchema = baseTemplateFieldSchema.extend({
  placeholder_ar: z.string(),
  placeholder_en: z.string()
})

const textTemplateFieldSchema = templateFieldSchema.extend({
  type: z.literal("small_text").or(z.literal("large_text")),
  validation: z.object({
    required: z.string(),
    minLength: z.number().optional(),
    maxLength: z.number().optional(),
    minRows: z.number().optional()
  })
})

// remove placeholder_en and placeholder_ar
const optionsTemplateFieldSchema = baseTemplateFieldSchema.extend({
  type: z.literal("options"),
  validation: z.object({
    required: z.string()
  }),
  options: z.array(z.string())
})


const templateTextVariantSchema = z.object({
  id: z.string(),
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

export type TypeTemplateField = z.infer<typeof templateFieldSchema>

export type TypeTextTemplateField = z.infer<typeof textTemplateFieldSchema>

export type TypeOptionsTemplateField = z.infer<typeof optionsTemplateFieldSchema>