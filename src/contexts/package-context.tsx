import { PackageContextType, IPackage, INewPackage } from '@/@types/package'
import { createContext, useState } from 'react'

export const PackageContext = createContext<PackageContextType>({
  packages: [],
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

const initialData: IPackage[] = [
  {
    id: "1",
    name: "Free",
    nameAr: "مجانية",
    title: "Free",
    titleAr: "مجانية",
    description: "Free",
    descriptionAr: "مجانية",
    price: 12,
    words: 113336666,
    state: true,
    features: [],
    featuresAr: [],
    deleted_at: null,
    created_at: new Date().toLocaleDateString(),
  },
  {
    id: "2",
    name: "Special",
    nameAr: "مميزة",
    title: "Special",
    titleAr: "مميزة",
    description: "Special",
    descriptionAr: "مميزة",
    price: 32,
    words: 345,
    state: true,
    features: [],
    featuresAr: [],
    deleted_at: null,
    created_at: new Date().toLocaleDateString(),
  }
]

const PackageContextProvider : React.FC<{children: React.ReactNode}> = ({ children }: any) => {
  const [packages, setPackages] = useState<IPackage[]>([])
  const [selected, setSelected] = useState<string[]>([])
  const [count, setCount] = useState<number>(0)

  const fetch = (page: number, rowsPerPage: number, filter?: string) => {
    setPackages(initialData)
    setCount(2)
  }

  const add = (record: INewPackage) => {
    // assuming api call will return the additional data provided here
    const newRecord: IPackage = {
      ...record,
      id: (packages?.length + 1).toString(),
      created_at: new Date().toLocaleDateString(),
      deleted_at: null
    }
    setPackages([...packages, newRecord])
    setCount(count + 1)
  }

  const remove = (id: string) => {
    const data = packages?.filter((record) => record.id !== id)
    setPackages(data)
    setCount(count - 1)
  }

  const edit = (record: IPackage) => {
    const data = [...packages]
    const index = data.findIndex(x => x.id === record.id)
    if (index > -1) data[index] = record
    setPackages(data)
  }

  const suspend = (id: string) => {
    const data = [...packages]
    const index = data.findIndex(x => x.id === id)
    if (index > -1) {
      data[index].state = !data[index].state
    }
    setPackages(data)
  }

  const suspendSelected = () => selected.forEach(x => suspend(x))
  const removeSelected = () => selected.forEach(x => remove(x))


  return (
    <PackageContext.Provider
      value={{
        packages,
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
    </PackageContext.Provider>
  )
}

export default PackageContextProvider