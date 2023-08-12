import { AuthProvider } from "./auth-context";
import ContactMessageContextProvider from "./contact-message-context";
import AdminContextProvider from '@/contexts/admin-context';

const ContextProvider = ({ children }: any) => {
  return (
    <ContactMessageContextProvider>
        <AdminContextProvider>
          <AuthProvider>{children}</AuthProvider>
        </AdminContextProvider>
    </ContactMessageContextProvider>
  );
};
export default ContextProvider;
