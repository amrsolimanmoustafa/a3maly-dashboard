import { createContext, Dispatch, useState, useEffect } from "react";
import axiosClient from "../configs/axios-client";
export const GroupContext = createContext<groupContextType | undefined>(undefined);
//TODO: move this to types folder
export type Group = {
  id: string;
  type: 'admin' | 'moderator' | 'financial';
  arName: string;
  enName: string;
  status: boolean;
  created_at: string|null|undefined;
  deleted_at:string|null|undefined;
};
const GroupContextProvider = ({ children }: any) => {
  const[groups,setGroups] = useState<Group[]>([])
  const[Selectedgroup,setSelectedGroup] = useState<Group>()
  const[count,setCount] = useState<number>(3);

  const fetchGroups = (page: number, rowsPerPage: number, filter?:string) => {
    setGroups(
      [
        ...Array.from({ length: 3 }, (_, i) => ({
          id: `${i+1}`,
          type: 'admin' as const,
          arName: ['مجموعة مشرفين', 'مجموعة مالية', 'مجموعة مشرفين'][i],
          enName: (['Admin Group', 'Moderator Group', 'Financial Group'])[i],
          status: ([true, false])[i%2],
          notes: 'ملاحظات',
          deleted_at:null,
          created_at:new Date().toUTCString(),
        }))

      ])
    setCount(3);
  };
  //TODO: replace with BK-end function
  const AddGroup = (group:any)=>{
    const newGroup:Group = {
      id:(groups?.length+1).toString(),
      type: 'admin' ,
      arName:group?.arName,
      enName:group?.enName,
      status:group?.status,
      created_at:new Date().toUTCString(),
      deleted_at:null
    }
    setGroups([...groups,newGroup])
  }
  //TODO: replace with BK-end function
  const EditGroup = (_group:any)=>{
    const restGroups = groups?.filter(group=>group.id!==_group.id);
    const EditedGroup:Group = {
      id:_group?.id || "0",
      type: 'admin' ,
      arName:_group?.arName,
      enName:_group?.enName,
      status:_group?.status,
      created_at:new Date().toUTCString(),
      deleted_at:null
    }
    setGroups([...restGroups,EditedGroup])
  }

  const suspendGroups = (id: string) => {
    //get client by index
    const groupIndex = groups.findIndex((group) => group.id === id);
    const singlegroup = groups[groupIndex];
    if (singlegroup?.deleted_at == null){
      singlegroup.deleted_at = new Date().toUTCString();
      setGroups([...groups]);
    }
    else{
      singlegroup.deleted_at = null;
      setGroups([...groups]);
    }
  }

  return (
    <GroupContext.Provider
      value={{
        groups,
        Selectedgroup,
        count,
        fetchGroups,
        suspendGroups,
        AddGroup,
        EditGroup
      }}
    >
      {children}
    </GroupContext.Provider>
  );
}

export default GroupContextProvider;

export type groupContextType = {
  groups: any[];
  count: number;
  Selectedgroup: any;
  fetchGroups: (page: number, rowsPerPage: number, filter?: string) => void;
  suspendGroups: (id:string) => void;
  AddGroup: (group:Group) => void;
  EditGroup: (group:Group) => void;
};