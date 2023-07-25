import { createContext, useState } from 'react';

export const TemplatesContext = createContext<templateContextType | undefined>(undefined);

const initialTemplate = [
  {
    id: 1001,
    templateName: "Create Facebook Page",
    departmentName: "Blog",
    wordUsed: "113336666",
    gptModel: "GPT-2",
    fields: ["Number of word", "Discrebtion", "Number of result"],
    state: true,
    startDate: new Date(),
    deleted_at: null,
    created_at: new Date().toUTCString(),
  },
  {
    id: 100,
    templateName: "Create Twitter Page",
    departmentName: "Social Media",
    wordUsed: "113336666",
    gptModel: "GPT-3",
    fields: ["Number of word", "Number of result"],
    state: true,
    startDate: new Date(),
    deleted_at: null,
    created_at: new Date().toUTCString(),
  },
]

const TemplatesContextProvider = ({ children }: any) => {
  const [templates, setTemplates] = useState<any[]>([]);
  const [SelectedTemplate, setSelectedTemplate] = useState<any>();
  const [count, setCount] = useState<number>(3);

  const fetchTemplates = (page: number, rowsPerPage: number, filter?: string) => {
    setTemplates(initialTemplate);
    setCount(2);
  };

  const addTemplate = (template: any) => {
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
    };
    setTemplates([...templates, newTemplate]);
    setCount(count + 1);
  };

  const EditTemplate = (template: any) => {
    const restTemplates = templates?.filter((template) => template.id !== template.id);
    const EditedTemplate: any = {
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
    };
    setTemplates([...restTemplates, template]);
  };

  const DeleteTemplate = (template_id: string) => {
    const restTemplates = templates?.filter((template) => template.id !== template_id);
    setTemplates([...restTemplates]);
    setCount(count - 1);
  };

  const suspendTemplate = (id: string) => {
    const templateIndex = templates.findIndex((template) => template.id === id);
    const singleTemplate = templates[templateIndex];
    singleTemplate.state = !singleTemplate.state;
    if (singleTemplate.deleted_at == null) {
      singleTemplate.deleted_at = new Date().toUTCString();
      setTemplates([...templates]);
    } else {
      singleTemplate.deleted_at = null;
      setTemplates([...templates]);
    }
  };

  const handelfilterCategory = (query: string) => {
    if (query == "All") {
      setTemplates(initialTemplate);
    } else {
      setTemplates([...initialTemplate.filter((item: any) => item?.user_category == query)]);
    }
  };
  const handelfilterGroups = (query: string) => {
    if (query == "All") {
      setTemplates(initialTemplate);
    } else {
      setTemplates([...initialTemplate.filter((item: any) => item?.group == query)]);
    }
  };
  const handelfilterRoles = (query: string) => {
    if (query == "All") {
      setTemplates(initialTemplate);
    } else {
      setTemplates([...initialTemplate.filter((item: any) => item?.roles == query)]);
    }
  };

  return (

    <TemplatesContext.Provider
      value={{
        templates,
        count,
        SelectedTemplate,
        fetchTemplates,
        suspendTemplate,
        addTemplate,
        EditTemplate,
        DeleteTemplate,
        handelfilterCategory,
        handelfilterGroups,
        handelfilterRoles,
      }}
    >
      {children}
    </TemplatesContext.Provider>
  );
}

export default TemplatesContextProvider;

export type templateContextType = {
  templates: any[];
  count: number;
  SelectedTemplate: any;
  fetchTemplates: (page: number, rowsPerPage: number, filter?: string) => void;
  suspendTemplate: (id: string) => void;
  addTemplate: (user: any) => void;
  EditTemplate: (user: any) => void;
  DeleteTemplate: (Template_id: string) => void;
  handelfilterCategory: (query: string) => void;
  handelfilterGroups: (query: string) => void;
  handelfilterRoles: (query: string) => void;
}