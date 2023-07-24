import { DestinationsContext } from '@/contexts/destinations-context';
import { useContext } from 'react';

export const useDestinations = () => useContext(DestinationsContext);
