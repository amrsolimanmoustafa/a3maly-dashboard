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

export type PackageContextType = {
    packages: IPackage[]
    count: number
    fetch: (page: number, rowsPerPage: number, filter?: string) => void
    add: (record: any) => void
    edit: (record: any) => void
    remove: (record_id: string) => void
    suspend: (id: string) => void
    selected: string[],
    setSelected: (x: string[]) => void,
    suspendSelected: () => void
    removeSelected: () => void
}