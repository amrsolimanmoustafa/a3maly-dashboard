import { ContextType } from "./IContext"

export interface IDepartment {
    id: string,
    name: string,
    nameAr: string,
    numberOfTemplates: number,
    numberOfWordsUsed: number,
    state: boolean,
    deleted_at: string | null,
    created_at: string,
}

export interface INewDepartment {
    name: string,
    nameAr: string,
    state: boolean
}

export type DepartmentContextType = ContextType & {
    departments: IDepartment[]
}