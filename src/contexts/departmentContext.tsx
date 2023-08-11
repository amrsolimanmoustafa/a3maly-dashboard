import { IDepartment, INewDepartment, departmentContextType } from '@/@types/department'
import { createContext, useState } from 'react'

export const DepartmentContext = createContext<departmentContextType>({
  departments: [],
  count: 0,
  fetch: () => {},
  add: () => {},
  edit: () => {},
  remove: () => {},
  suspend: () => {},
  selected: [],
  setSelected: () => {},
  suspendSelected: () => {},
  removeSelected: () => {},
})

const initialDepartment: IDepartment[] = [
  {
    id: "1",
    name: "Blog",
    nameAr: "مقالة",
    numberOfTemplates: 12,
    numberOfWordsUsed: 113336666,
    state: true,
    deleted_at: null,
    created_at: new Date().toLocaleDateString(),
  },
  {
    id: "2",
    name: "Social Media",
    nameAr: "تواصل اجتماعي",
    numberOfTemplates: 32,
    numberOfWordsUsed: 345,
    state: true,
    deleted_at: null,
    created_at: new Date().toLocaleDateString(),
  }
]

const DepartmentContextProvider : React.FC<{children: React.ReactNode}> = ({ children }: any) => {
  const [departments, setDepartments] = useState<IDepartment[]>([])
  const [selected, setSelected] = useState<string[]>([])
  const [count, setCount] = useState<number>(0)

  const fetch = (page: number, rowsPerPage: number, filter?: string) => {
    setDepartments(initialDepartment)
    setCount(2)
  }

  const add = (department: INewDepartment) => {
    // assuming api call will return the additional data provided here
    const newDepartment: IDepartment = {
      ...department,
      id: (departments?.length + 1).toString(),
      numberOfTemplates: 0,
      numberOfWordsUsed: 0,
      created_at: new Date().toLocaleDateString(),
      deleted_at: null
    }
    setDepartments([...departments, newDepartment])
    setCount(count + 1)
  }

  const remove = (departmentId: string) => {
    const restDepartments = departments?.filter((department) => department.id !== departmentId)
    setDepartments(restDepartments)
    setCount(count - 1)
  }

  const edit = (department: IDepartment) => {
    const newDepartments = [...departments]
    const index = newDepartments.findIndex(x => x.id === department.id)
    if (index > -1) newDepartments[index] = department
    setDepartments(newDepartments)
  }

  const suspend = (id: string) => {
    const newDepartments = [...departments]
    const index = newDepartments.findIndex(x => x.id === id)
    if (index > -1) {
      newDepartments[index].state = !newDepartments[index].state
    }
    setDepartments(newDepartments)
  }

  const suspendSelected = () => selected.forEach(x => suspend(x))
  const removeSelected = () => selected.forEach(x => remove(x))


  return (
    <DepartmentContext.Provider
      value={{
        departments,
        count,
        fetch,
        add,
        edit,
        remove,
        suspend,
        selected,
        setSelected,
        suspendSelected,
        removeSelected
      }}
    >
      {children}
    </DepartmentContext.Provider>
  )
}

export default DepartmentContextProvider