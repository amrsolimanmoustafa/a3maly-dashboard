import { createContext, Dispatch, useState, useEffect } from "react";
import axiosClient from "../configs/axios-client";
export const UserContext = createContext<userContextType | undefined>(undefined);
const initialAccount = [
  {
    id: 1001,
    user_category: "مستخدمين",
    NationalID: "34234324234",
    city: "جدة - المدينة المنورة",
    name: "Mohamed",
    phone: "+0966404580823",
    telephone: "011 333 6666",
    email: "Mohamed@gmail.com",
    group: "الادارة المالية",
    subscription_status: "غير مدرج",
    subscription_package: "غير مدرج",
    roles: "المدن",
    state: true,
    description: "admin",
    startDate: new Date(),
    deleted_at: null,
    created_at: new Date().toUTCString(),
  },
  {
    id: 1002,
    user_category: "الادارة",
    NationalID: "34234324234",
    city: "المدينة المنورة",
    name: "Mousa",
    phone: "+0966405848230",
    telephone: "012 555 4444",
    email: "Mohamed@gmail.com",
    group: "الأدمن",
    subscription_status : "غير مدرج",
    subscription_package: "غير مدرج",
    roles: "ادارة العمولات",
    state: true,
    description: "admin",
    startDate: new Date(),
    deleted_at: null,
    created_at: new Date().toUTCString(),
  },
  {
    id: 1005,
    user_category: "العملاء",
    NationalID: "34234324234",
    city: "القصيم ",
    name: "حلمي بكر",
    phone: "+0966403580482",
    telephone: "011 333 5454",
    email: "Ahmed@gmail.com",
    group: "عميل",
    subscription_status : "غير مدرج",
    subscription_package: "غير مدرج",
    roles: "غير مدرج",
    state: true,
    description: "admin",
    startDate: new Date(),
    deleted_at: null,
    created_at: new Date().toUTCString(),
  },
  {
    id: 1007,
    user_category: "الورش",
    NationalID: "34234324234",
    city: "الرياض",
    name: "عمرو",
    phone: "+0966840423580",
    telephone: "011 333 4444",
    email: "amr@gmail.com",
    group: "الادارة المالية",
    subscription_status : "غير مشترك",
    subscription_package: "غير مدرج",
    roles: "ادارة العمولات",
    state: true,
    description: "admin",
    startDate: new Date(),
    deleted_at: null,
    created_at: new Date().toUTCString(),
  },
  {
    id: 1008,
    user_category: "المتاجر",
    NationalID: "34234324234",
    city: "المدينة المنورة",
    name: "احمد سليمان",
    phone: "+0966403580482",
    telephone: "012 333 4444",
    email: "amr@gmail.com",
    group: "الأدمن",
    subscription_status : "مشترك",
    subscription_package: "الباقة الربع سنوية",
    roles: "ادارة الاشتراكات",
    state: true,
    description: "admin",
    startDate: new Date(),
    deleted_at: null,
    created_at: new Date().toUTCString(),
  },
];
const UserContextProvider = ({ children }: any) => {
  const [users, setUsers] = useState<any[]>([]);
  const [Selecteduser, setSelectedUser] = useState<any>();
  const [count, setCount] = useState<number>(3);

  const fetchUsers = (page: number, rowsPerPage: number, filter?: string) => {
    setUsers(initialAccount);
    setCount(10);
  };
  //TODO: replace with BK-end function
  const AddUser = (user: any) => {
    const newUser: any = {
      id: (users?.length + 1).toString(),
      name: user?.name,
      user_category: user?.user_category,
      NationalID: user?.NationalID,
      city: user?.city,
      phone: user?.phone,
      telephone: user?.telephone,
      email: user?.email,
      group: user?.group,
      roles: user?.roles,
      subscription_package: user?.subscription_package,
      subscription_status: user?.subscription_status,
      state: user?.state,
      description: user?.description,
      startDate: user?.startDate,
      deleted_at: user?.deleted_at,
      created_at: user?.created_at,
    };
    setUsers([...users, newUser]);
    setCount(count + 1);
  };
  //TODO: replace with BK-end function
  const EditUser = (_user: any) => {
    const restUsers = users?.filter((user) => user.id !== _user.id);
    const EditedUser: any = {
      id: _user?.id,
      name: _user?.name,
      user_category: _user?.user_category,
      NationalID: _user?.NationalID,
      city: _user?.city,
      phone: _user?.phone,
      telephone: _user?.telephone,
      email: _user?.email,
      group: _user?.group,
      roles: _user?.roles,
      subscription_package: _user?.subscription_package,
      subscription_status: _user?.subscription_status,
      state: _user?.state,
      description: _user?.description,
      startDate: _user?.startDate,
      deleted_at: _user?.deleted_at,
      created_at: _user?.created_at,
    };
    setUsers([...restUsers, EditedUser]);
  };

  //TODO: replace with BK-end function
  const DeleteUser = (user_id: string) => {
    const restUsers = users?.filter((user) => user.id !== user_id);
    setUsers([...restUsers]);
    setCount(count - 1);
  };

  const suspendUsers = (id: string) => {
    //get client by index
    const userIndex = users.findIndex((user) => user.id === id);
    const singleuser:any = users[userIndex];
    singleuser.state = !(singleuser?.state);
    if (singleuser?.deleted_at == null) {
      singleuser.deleted_at = new Date().toUTCString();
      setUsers([...users]);
    } else {
      singleuser.deleted_at = null;
      setUsers([...users]);
    }
  };

  //TODO: remove replace this with Bk-end filtering
  const handelfilterCategory = (query: string) => {
    if (query == "All") {
      setUsers(initialAccount);
    } else {
      setUsers([...initialAccount.filter((item: any) => item?.user_category == query)]);
    }
  };
  const handelfilterGroups = (query: string) => {
    if (query == "All") {
      setUsers(initialAccount);
    } else {
      setUsers([...initialAccount.filter((item: any) => item?.group == query)]);
    }
  };
  const handelfilterRoles = (query: string) => {
    if (query == "All") {
      setUsers(initialAccount);
    } else {
      setUsers([...initialAccount.filter((item: any) => item?.roles == query)]);
    }
  };
  return (
    <UserContext.Provider
      value={{
        users,
        Selecteduser,
        count,
        fetchUsers,
        suspendUsers,
        AddUser,
        EditUser,
        DeleteUser,
        handelfilterCategory,
        handelfilterGroups,
        handelfilterRoles,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;

export type userContextType = {
  users: any[];
  count: number;
  Selecteduser: any;
  fetchUsers: (page: number, rowsPerPage: number, filter?: string) => void;
  suspendUsers: (id: string) => void;
  AddUser: (user: any) => void;
  EditUser: (user: any) => void;
  DeleteUser: (user_id: string) => void;
  handelfilterCategory: (query: string) => void;
  handelfilterGroups: (query: string) => void;
  handelfilterRoles: (query: string) => void;
};