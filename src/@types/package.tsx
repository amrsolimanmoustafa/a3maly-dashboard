import { ContextType } from "./IContext"

export interface IPackage {
    id: string
    name: string
    nameAr: string
    title: string
    titleAr: string
    description: string
    descriptionAr: string
    price: number
    words: number
    features: string[]
    state: boolean
    deleted_at: string | null
    created_at: string
}

export interface INewPackage {
    name: string
    nameAr: string
    title: string
    titleAr: string
    description: string
    descriptionAr: string
    price: number
    words: number
    features: string[]
    state: boolean
}

export type PackageContextType = ContextType & {
    packages: IPackage[]
}