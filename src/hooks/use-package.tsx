import { useContext } from 'react';
import { PackageContext } from '@/contexts/package-context';
import { PackageContextType } from '@/@types/package';

const usePackage = () => useContext<PackageContextType>(PackageContext)

export default usePackage