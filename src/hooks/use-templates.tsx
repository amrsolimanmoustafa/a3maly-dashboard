import { TemplatesContext } from '@/contexts/template-context';
import { useContext } from 'react';

export const useTemplates = () => useContext(TemplatesContext);