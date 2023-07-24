import { createContext, Dispatch, useState, useEffect } from "react";
import axiosClient from "../configs/axios-client";
export const UserCategoryContext = createContext<userCategoryContextType | undefined>(undefined);
//TODO: move this to types folder
export type UserCategory = {
  id: string;
  type: 'admin' | 'moderator' | 'financial';
  arName: string;
  enName: string;
  status: boolean;
  created_at: string|null|undefined;
  deleted_at:string|null|undefined;
};
const UserCategoryContextProvider = ({ children }: any) => {
  const[userCategories,setUserCategories] = useState<UserCategory[]>([])
  const[SelecteduserCategory,setSelectedUserCategory] = useState<UserCategory>()
  const[count,setCount] = useState<number>(3);

  const fetchUserCategories = (page: number, rowsPerPage: number, filter?:string) => {
    setUserCategories(
      [
        ...Array.from({ length: 3 }, (_, i) => ({
          id: `${i+1}`,
          type: 'admin' as const,
          arName: ["الادارة","العملاء" ,"المندوبين" ,"الورش" ,"المتاجر",][i],
          enName: (['Administration', 'clients', 'delegates','workshops','Shops'])[i],
          status: ([true, false])[i%2],
          notes: 'ملاحظات',
          deleted_at:null,
          created_at:new Date().toUTCString(),
        }))

      ])
    setCount(3);
  };
  //TODO: replace with BK-end function
  const AddUserCategory = (userCategory:any)=>{
    const newUserCategory:UserCategory = {
      id:(userCategories?.length+1).toString(),
      type: 'admin' ,
      arName:userCategory?.arName,
      enName:userCategory?.enName,
      status:userCategory?.status,
      created_at:new Date().toUTCString(),
      deleted_at:null
    }
    setUserCategories([...userCategories,newUserCategory])
  }
  //TODO: replace with BK-end function
  const EditUserCategory = (_userCategory:any)=>{
    const restUserCategories = userCategories?.filter(userCategory=>userCategory.id!==_userCategory.id);
    const EditedUserCategory:UserCategory = {
      id:_userCategory?.id || "0",
      type: 'admin' ,
      arName:_userCategory?.arName,
      enName:_userCategory?.enName,
      status:_userCategory?.status,
      created_at:new Date().toUTCString(),
      deleted_at:null
    }
    setUserCategories([...restUserCategories,EditedUserCategory])
  }

  //TODO: replace with BK-end function
  const DeleteCategory = (id:string)=>{
    const restCategorys = userCategories?.filter(cat=>cat.id!==id);
    setUserCategories([...restCategorys])
    setCount(count-1)
  }
  const suspendUserCategories = (id: string) => {
    //get client by index
    const userCategoryIndex = userCategories.findIndex((userCategory) => userCategory.id === id);
    const singleuserCategory = userCategories[userCategoryIndex];
    if (singleuserCategory?.deleted_at == null){
      singleuserCategory.deleted_at = new Date().toUTCString();
      setUserCategories([...userCategories]);
    }
    else{
      singleuserCategory.deleted_at = null;
      setUserCategories([...userCategories]);
    }
  }

  return (
    <UserCategoryContext.Provider
      value={{
        userCategories,
        SelecteduserCategory,
        count,
        fetchUserCategories,
        suspendUserCategories,
        AddUserCategory,
        EditUserCategory,
        DeleteCategory
      }}
    >
      {children}
    </UserCategoryContext.Provider>
  );
}

export default UserCategoryContextProvider;

export type userCategoryContextType = {
  userCategories: any[];
  count: number;
  SelecteduserCategory: any;
  fetchUserCategories: (page: number, rowsPerPage: number, filter?: string) => void;
  suspendUserCategories: (id:string) => void;
  AddUserCategory: (userCategory:UserCategory) => void;
  EditUserCategory: (userCategory:UserCategory) => void;
  DeleteCategory: (id:string) => void;
};