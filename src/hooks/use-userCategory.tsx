import { UserCategoryContext } from "@/contexts/userCategory-context";
import { useContext } from "react";

export const useUserCategory = () => useContext(UserCategoryContext);