import { createContext, useState } from "react";
import axiosClient from "../configs/axios-client";
import { post_Notification } from "@/environment/apis";

export const NotificationContext = createContext<NoticationType | undefined>(undefined);

const NoticationContextProvider = ({ children }: any) => {

  const [isSent, setIsSent] = useState(false);

  const addNotification = async (group: string, title_ar:string ,text_ar:string,title_en:string ,text_en:string ) => {
    try {
      const res = await  axiosClient.post(post_Notification(),{group:group,title_ar:title_ar,text_ar: text_ar,title_en: title_en,text_en: text_en})
      if(res.status == 201) return true;
      else return false;
    } catch (error) {
      console.log(error);
    }
  };



  return (
    <NotificationContext.Provider
      value={{
        addNotification,
        isSent,
        setIsSent

      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export default NoticationContextProvider;

export type NoticationType = {
  addNotification: (group: string, title_ar:string ,text_ar:string,title_en:string ,text_en:string) => Promise<any>;
  isSent:boolean;
  setIsSent:(isSent:boolean)=>void;
};