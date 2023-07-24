import { MessagesContext } from "@/contexts/messages-context";
import { useContext } from "react";
export const useMessages = () => useContext(MessagesContext);