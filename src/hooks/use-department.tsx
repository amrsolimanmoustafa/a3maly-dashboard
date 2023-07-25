import { useContext } from 'react';
import { DepartmentContext } from '@/contexts/departmentContext';

export const useDepartment = () => useContext(DepartmentContext);