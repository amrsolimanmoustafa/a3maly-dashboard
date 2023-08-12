import { AuthProvider } from "./auth-context";
import ContactMessageContextProvider from "./contact-message-context";
import FinancialsProvider from '@/contexts/financials-context';
import AdminContextProvider from '@/contexts/admin-context';

const ContextProvider = ({ children }: any) => {
  return (
    <ContactMessageContextProvider>
      <FinancialsProvider>
        <AdminContextProvider>
          <AuthProvider>{children}</AuthProvider>
        </AdminContextProvider>
      </FinancialsProvider>
    </ContactMessageContextProvider>
  );
};
export default ContextProvider;
