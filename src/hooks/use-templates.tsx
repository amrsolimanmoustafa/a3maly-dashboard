import { TemplateContext } from '@/contexts/template-context'
import { useContext } from 'react'

const useTemplate = () => useContext(TemplateContext)
export default useTemplate