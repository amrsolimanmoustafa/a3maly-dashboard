import { createContext, Dispatch, useState, useEffect } from "react";
import axiosClient from "../configs/axios-client";
export const RoleContext = createContext<roleContextType | undefined>(undefined);
//TODO: move this to types folder
export type Role = {
  id: string;
  type: 'admin' | 'moderator' | 'financial';
  arName: string;
  enName: string;
  status: boolean;
  created_at: string|null|undefined;
  deleted_at:string|null|undefined;
};
const RoleContextProvider = ({ children }: any) => {
  const[roles,setRoles] = useState<Role[]>([])
  const[Selectedrole,setSelectedRole] = useState<Role[]>([])
  const[count,setCount] = useState<number>(3);

  const fetchRoles = (page: number, rowsPerPage: number, filter?:string) => {
    setRoles(
      [
        ...Array.from({ length: 3 }, (_, i) => ({
          id: `${i+1}`,
          type: 'admin' as const,
          arName: ['المدن', 'ادارة العمولات', 'ادارة الاشتراكات'][i],
          enName: (['cities', 'Commission management', 'Subscription management'])[i],
          status: ([true, false])[i%2],
          deleted_at:null,
          created_at:new Date().toUTCString(),
        }))

      ])
    setCount(3);
  };
  //TODO: replace with BK-end function
  const AddRole = (role:any)=>{
    const newRole:Role = {
      id:(roles?.length+1).toString(),
      type: 'admin' ,
      arName:role?.arName,
      enName:role?.enName,
      status:role?.status,
      created_at:new Date().toUTCString(),
      deleted_at:null
    }
    setRoles([...roles,newRole])
  }
  //TODO: replace with BK-end function
  const EditRole = (_role:any)=>{
    const restRoles = roles?.filter(role=>role.id!==_role.id);
    const EditedRole:Role = {
      id:_role?.id || "0",
      type: 'admin' ,
      arName:_role?.arName,
      enName:_role?.enName,
      status:_role?.status,
      created_at:new Date().toUTCString(),
      deleted_at:null
    }
    setRoles([...restRoles,EditedRole])
  }

  //TODO: replace with BK-end function
  const DeleteRole = (role_id:string)=>{
    const restRoles = roles?.filter(role=>role.id!==role_id);
    setRoles([...restRoles])
    setCount(count-1)
  }

  const suspendRoles = (id: string) => {
    //get client by index
    const roleIndex = roles.findIndex((role) => role.id === id);
    const singlerole = roles[roleIndex];
    if (singlerole?.deleted_at == null){
      singlerole.deleted_at = new Date().toUTCString();
      setRoles([...roles]);
    }
    else{
      singlerole.deleted_at = null;
      setRoles([...roles]);
    }
  }

  return (
    <RoleContext.Provider
      value={{
        roles,
        Selectedrole,
        count,
        fetchRoles,
        suspendRoles,
        AddRole,
        EditRole,
        DeleteRole
      }}
    >
      {children}
    </RoleContext.Provider>
  );
}

export default RoleContextProvider;

export type roleContextType = {
  roles: Role[];
  count: number;
  Selectedrole: any;
  fetchRoles: (page: number, rowsPerPage: number, filter?: string) => void;
  suspendRoles: (id:string) => void;
  AddRole: (role:Role) => void;
  EditRole: (role:Role) => void;
  DeleteRole: (role_id:string) => void;
};