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

export type DepartmentContextType = {
    departments: IDepartment[];
    count: number;
    fetch: (page: number, rowsPerPage: number, filter?: string) => void;
    add: (record: any) => void;
    edit: (record: any) => void;
    remove: (record_id: string) => void;
    suspend: (id: string) => void;
    selected: string[],
    setSelected: (x: string[]) => void,
    suspendSelected: () => void;
    removeSelected: () => void;
}