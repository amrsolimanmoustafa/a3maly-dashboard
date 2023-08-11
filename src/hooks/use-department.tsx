import { useContext } from 'react';
import { DepartmentContext } from '@/contexts/department-context';
import { DepartmentContextType } from '@/@types/department';

const useDepartment = () => useContext<DepartmentContextType>(DepartmentContext)

export default useDepartment