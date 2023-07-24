import { GroupContext } from "@/contexts/group-context";
import { useContext } from "react";
export const useGroup = () => useContext(GroupContext);