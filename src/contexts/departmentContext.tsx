import { createContext, useState } from 'react';
import { UserContext } from '@/contexts/user-context';

export const DepartmentContext = createContext<departmentContextType | undefined>(undefined);

const initialDepartment = [
  {
    id: 1001,
    templatesNumer: "34234324234",
    departmentName: "Blog",
    wordUsed: "113336666",
    departmentOwner: "Mohamed@gmail.com",
    state: true,
    startDate: new Date(),
    deleted_at: null,
    created_at: new Date().toUTCString(),
  },
  {
    id: 1002,
    templatesNumer: "123",
    departmentName: "Social Media",
    wordUsed: "345",
    departmentOwner: "Youssef",
    state: true,
    startDate: new Date(),
    deleted_at: null,
    created_at: new Date().toUTCString(),
  }
]

const DepartmentContextProvider = ({ children }: any) => {
  const [departments, setDepartments] = useState<any[]>([]);
  const [SelectedDepartment, setSelectedDepartment] = useState<any>();
  const [count, setCount] = useState<number>(3);

  const fetchDepartmets = (page: number, rowsPerPage: number, filter?: string) => {
    setDepartments(initialDepartment);
    setCount(1);
  };

  const AddDepartment = (department: any) => {
    const newDepartment: any = {
      id: (departments?.length + 1).toString(),
      templatesNumer: department?.templatesNumer,
      departmentName: department?.departmentName,
      wordUsed: department?.wordUsed,
      departmentOwner: department?.departmentOwner,
      state: department?.state,
      startDate: department?.startDate,
      deleted_at: department?.deleted_at,
      created_at: department?.created_at,
    };
    setDepartments([...departments, newDepartment]);
    setCount(count + 1);
  };

  const DeleteDepartment = (department_id: string) => {
    const restDepartments = departments?.filter((department) => department.id !== department_id);
    setDepartments([...restDepartments]);
    setCount(count - 1);
  };

  const suspendDepartment = (id: string) => {
    //get client by index
    const userIndex = departments.findIndex((user) => user.id === id);
    const singleuser:any = departments[userIndex];
    singleuser.state = !(singleuser?.state);
    if (singleuser?.deleted_at == null) {
      singleuser.deleted_at = new Date().toUTCString();
      setDepartments([...departments]);
    } else {
      singleuser.deleted_at = null;
      setDepartments([...departments]);
    }
  };

  //TODO: remove replace this with Bk-end filtering
  const handelfilterCategory = (query: string) => {
    if (query == "All") {
      setDepartments(initialDepartment);
    } else {
      setDepartments([...initialDepartment.filter((item: any) => item?.user_category == query)]);
    }
  };
  const handelfilterGroups = (query: string) => {
    if (query == "All") {
      setDepartments(initialDepartment);
    } else {
      setDepartments([...initialDepartment.filter((item: any) => item?.group == query)]);
    }
  };
  const handelfilterRoles = (query: string) => {
    if (query == "All") {
      setDepartments(initialDepartment);
    } else {
      setDepartments([...initialDepartment.filter((item: any) => item?.roles == query)]);
    }
  };

  return (
    <DepartmentContext.Provider
      value={{
        departments,
        SelectedDepartment,
        count,
        fetchDepartmets,
        suspendDepartment,
        AddDepartment,
        DeleteDepartment,
        handelfilterCategory,
        handelfilterGroups,
        handelfilterRoles,
      }}
    >
      {children}
    </DepartmentContext.Provider>
  );
}

export default DepartmentContextProvider;

export type departmentContextType = {
  departments: any[];
  count: number;
  SelectedDepartment: any;
  fetchDepartmets: (page: number, rowsPerPage: number, filter?: string) => void;
  suspendDepartment: (id: string) => void;
  AddDepartment: (department: any) => void;
  DeleteDepartment: (department_id: string) => void;
  handelfilterCategory: (query: string) => void;
  handelfilterGroups: (query: string) => void;
  handelfilterRoles: (query: string) => void;
};