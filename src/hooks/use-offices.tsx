
import { OfficeContext } from '@/contexts/office-context';
import { useContext } from 'react';

export const useOffice = () => useContext(OfficeContext);
