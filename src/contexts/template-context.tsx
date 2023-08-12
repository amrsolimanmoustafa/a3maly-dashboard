import { ITemplate, TemplateContextType } from '@/@types/ITemplate'
import { createContext, useState } from 'react'

export const TemplatesContext = createContext<TemplateContextType>({
  templates: [],
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

const initialData : ITemplate[] = [
  {
    id: '1001',
    name: "Create Facebook Page",
    nameAr: "انشاء صفحة فيسبوك",
    departmentId: '3',
    departmentName: "Social Media",
    wordsUsed: 1500,
    gptModel: "GPT-3.5",
    state: true,
    inputs: [],
    deletedAt: null,
    createdAt: new Date().toLocaleString(),
  },
  {
    id: '1002',
    name: "Create Twitter Page",
    nameAr: "انشاء صفحة تويتر",
    departmentId: '3',
    departmentName: "Social Media",
    wordsUsed: 8901,
    gptModel: "GPT-3",
    inputs: [],
    state: true,
    deletedAt: null,
    createdAt: new Date().toLocaleString(),
  },
]

const TemplatesContextProvider = ({ children }: any) => {
  const [templates, setTemplates] = useState<ITemplate[]>([])
  const [selected, setSelected] = useState<string[]>([])
  const [count, setCount] = useState<number>(0)

  const fetch = (page: number, rowsPerPage: number, filter?: string) => {
    setTemplates(initialData)
    setCount(2)
  }

  const add = (template: any) => {
    const newTemplate: any = {
      id: (templates?.length + 1).toString(),
      templateName: template?.templateName,
      departmentName: template?.departmentName,
      wordUsed: template?.wordUsed,
      gptModel: template?.gptModel,
      fields: template?.fields,
      state: template?.state,
      startDate: template?.startDate,
      deleted_at: template?.deleted_at,
      created_at: template?.created_at,
    }
    setTemplates([...templates, newTemplate])
    setCount(count + 1)
  }

  const edit = (record: ITemplate) => {
    const data = [...templates]
    const index = data.findIndex(x => x.id === record.id)
    if (index > -1) data[index] = record
    setTemplates(data)
  }

  const remove = (id: string) => {
    const data = templates.filter((record) => record.id !== id)
    setTemplates(data)
    setCount(count - 1)
  }

  const suspend = (id: string) => {
    const data = [...templates]
    const index = data.findIndex(x => x.id === id)
    if (index > -1) {
      data[index].state = !data[index].state
    }
    setTemplates(data)
  }

  const suspendSelected = () => selected.forEach(x => suspend(x))
  const removeSelected = () => selected.forEach(x => remove(x))

  return (
    <TemplatesContext.Provider
      value={{
        templates,
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
    </TemplatesContext.Provider>
  )
}

export default TemplatesContextProvider