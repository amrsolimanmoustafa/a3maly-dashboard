import { RoleContext } from "@/contexts/role-context";
import { useContext } from "react";

export const useRole = () => useContext(RoleContext);