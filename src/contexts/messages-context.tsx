import { createContext, Dispatch, useState, useEffect } from "react";
import axiosClient from "../configs/axios-client";
export const MessagesContext = createContext<groupContextType | undefined>(undefined);
//TODO: move this to types folder
export type Message = {
  id: string;
  type: 'admin' | 'moderator' | 'financial';
  title: string;
  content: string;
  sender: string;
  status: boolean;
  created_At?: string|null|undefined;
  deleted_At?: string|null|undefined;

};
const MessagesContextProvider = ({ children }: any) => {
  const[Messages,setMessages] = useState<Message[]>([])
  const[SelectedMessage,setSelectedMessage] = useState<Message>()
  const[count,setCount] = useState<number>(3);

  const SendMessage = async (title:string ,content:string ) => {
    /*  try {
     const res = await  axiosClient.post(post_Notification(),{group:group,title_ar:title_ar,text_ar: text_ar,title_en: title_en,text_en: text_en})
     if(res.status == 201) return true;
     else return false;
     } catch (error) {
     console.log(error);
     } */
  };
  const fetchMessages = (page: number, rowsPerPage: number, filter?:string) => {
    setMessages(
      [
        ...Array.from({ length: 3 }, (_, i) => ({
          id: `${i+1}`,
          type: 'admin' as const,
          title: ['الانضمام كتاجر', 'كيف اعمل معكم', 'اريد الانضمام كتاجر'][i],
          content: (['انا محمد اسماعيل من جدة اريد الانضمام كتاجر', 'كيف اعمل معكم وانا صاحب سطحة', 'اناعلي محمد علي من جدة اريد الانضمام كتاجر'])[i],
          sender: ['محمد اسماعيل', 'امير السيد', 'علي محمد'][i],
          status: ([true, false])[i%2],
          deleted_At:null,
          created_At:new Date().toUTCString(),

        }))

      ])
    setCount(3);
  };
  //TODO: replace with BK-end function
  const AddMessage = (message:any)=>{
    const newMessage:Message = {
      id:(Messages?.length+1).toString(),
      type: 'admin',
      title:message?.title,
      content:message?.content,
      sender: message?.sender,
      deleted_At:null,
      created_At:new Date().toUTCString(),
      status:message?.status,

    }
    setMessages([...Messages,newMessage])
  }
  //TODO: replace with BK-end function
  const EditMessage = (_message:any)=>{
    const restMessages = Messages?.filter(message=>message.id!==_message.id);
    const EditedMessage:Message = {
      id:_message?.id || "0",
      type: 'admin' ,
      title:_message?.title,
      content:_message?.content,
      sender:_message?.sender,
      status:_message?.status,
      deleted_At:null,
      created_At:new Date().toUTCString(),
    }
    setMessages([...restMessages,EditedMessage])
  }
  //TODO: replace with BK-end function
  const DeleteMessage = (message_id:string)=>{
    const restMessages = Messages?.filter(message=>message.id!==message_id);
    setMessages([...restMessages])
    setCount(count-1)
  }


  const suspendMessage = (id: string) => {
    //get client by index
    const messageIndex = Messages.findIndex((message) => message.id === id);
    const singleMessage = Messages[messageIndex];
    if (singleMessage?.deleted_At == null){
      singleMessage.deleted_At = new Date().toUTCString();
      setMessages([...Messages]);
    }
    else{
      singleMessage.deleted_At = null;
      setMessages([...Messages]);
    }
  }

  return (
    <MessagesContext.Provider
      value={{
        Messages,
        SelectedMessage,
        count,
        fetchMessages,
        suspendMessage,
        AddMessage,
        SendMessage,
        EditMessage,
        DeleteMessage
      }}
    >
      {children}
    </MessagesContext.Provider>
  );
}

export default MessagesContextProvider;

export type groupContextType = {
  Messages: any[];
  count: number;
  SelectedMessage: any;
  fetchMessages: (page: number, rowsPerPage: number, filter?: string) => void;
  suspendMessage: (id:string) => void;
  AddMessage: (message:Message) => void;
  EditMessage: (message:Message) => void;
  SendMessage:(title: string, content:string ) => void;
  DeleteMessage:(message:string) => void;
};