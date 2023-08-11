import { IDepartment, INewDepartment, DepartmentContextType } from '@/@types/department'
import { createContext, useState } from 'react'

export const DepartmentContext = createContext<DepartmentContextType>({
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

const initialData: IDepartment[] = [
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
    setDepartments(initialData)
    setCount(2)
  }

  const add = (record: INewDepartment) => {
    // assuming api call will return the additional data provided here
    const newRecord: IDepartment = {
      ...record,
      id: (departments?.length + 1).toString(),
      numberOfTemplates: 0,
      numberOfWordsUsed: 0,
      created_at: new Date().toLocaleDateString(),
      deleted_at: null
    }
    setDepartments([...departments, newRecord])
    setCount(count + 1)
  }

  const remove = (id: string) => {
    const data = departments?.filter((record) => record.id !== id)
    setDepartments(data)
    setCount(count - 1)
  }

  const edit = (record: IDepartment) => {
    const data = [...departments]
    const index = data.findIndex(x => x.id === record.id)
    if (index > -1) data[index] = record
    setDepartments(data)
  }

  const suspend = (id: string) => {
    const data = [...departments]
    const index = data.findIndex(x => x.id === id)
    if (index > -1) {
      data[index].state = !data[index].state
    }
    setDepartments(data)
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