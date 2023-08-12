import { ContextType } from "./IContext"

export interface INewTemplateText {
  content: string
  contentAr: string
  type: 'PROJECT' | 'PRODUCT' | 'FREE'
  order: number
  templateId: string
  inputType?: 'TEXT' | 'AREA' | 'SELECT' | null | undefined
  inputOptions?: string[] | null | undefined
  inputLabel?: string | null | undefined
  inputMaxLength?: number
}
export interface ITemplateText {
  id: string
  content: string
  contentAr: string
  type: 'PROJECT' | 'PRODUCT' | 'FREE'
  order: number
  templateId: string
  inputType?: 'TEXT' | 'AREA' | 'SELECT' | null | undefined
  inputOptions?: string[] | null | undefined
  inputLabel?: string | null | undefined
  inputMaxLength?: number
}

export interface INewTemplate {
  name: string
  nameAr: string
  departmentId: string
  gptModel: string
  state: boolean
}
export interface ITemplate {
  id: string
  name: string
  nameAr: string
  departmentId: string
  departmentName: string
  gptModel: string
  wordsUsed: number
  state: boolean
  inputs: ITemplateText[]
  createdAt: string
  deletedAt: string | null
}

export type TemplateContextType = ContextType & {
  templates: ITemplate[]
}