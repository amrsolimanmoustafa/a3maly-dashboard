import { useContext } from 'react';
import { DepartmentContext } from '@/contexts/departmentContext';
import { departmentContextType } from '@/@types/department';

export const useDepartment = () => useContext<departmentContextType>(DepartmentContext);