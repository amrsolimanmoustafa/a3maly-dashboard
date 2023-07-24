export interface INotification {
  account: string;
  order_id: string;
  id: string;
  name: string;
  balance: string;
  total: string;
  created_at: string;
  updated_at: string;
  deleted_at: string;
}
export type NotificationContextType = {
  notification: INotification[];
};