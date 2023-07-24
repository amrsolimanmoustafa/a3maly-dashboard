import { AuthProvider } from "./auth-context";
import ClientContextProvider from "./client-context";
import ContactMessageContextProvider from "./contact-message-context";
import DriverContextProvider from "./driver-context";
import OrderContextProvider from "./order-context";
import VehicleContextProvider from "./vehicle-context";
import OfficeContextProvider from "./office-context";
import FinancialsProvider from '@/contexts/financials-context';
import DestinationsContextProvider from '@/contexts/destinations-context';
import AdminContextProvider from '@/contexts/admin-context';

const ContextProvider = ({ children }: any) => {
  return (
      <DriverContextProvider>
        <ContactMessageContextProvider>
          <OrderContextProvider>
            <FinancialsProvider>
              <VehicleContextProvider>
                <OfficeContextProvider>
                  <DestinationsContextProvider>
                    <AdminContextProvider>
                      <AuthProvider>{children}</AuthProvider>
                    </AdminContextProvider>
                  </DestinationsContextProvider>
                </OfficeContextProvider>
              </VehicleContextProvider>
            </FinancialsProvider>
          </OrderContextProvider>
        </ContactMessageContextProvider>
      </DriverContextProvider>
  );
};
export default ContextProvider;
