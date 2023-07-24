import { IOrderAddress } from '@/@types/order-addresse';

export interface IOrder {
  addresses: IOrderAddress[];
  chats: object[];
  collect_amount: string;
  created_at: string;
  driver: string;
  driver_reviewed: string;
  estimated_time: string;
  id: string;
  images: object[];
  number: string;
  payee: string;
  pin_code: string;
  recipient_reviewed: string;
  sender_reviewed: string;
  shipments: object[]
  shipping_amount: string;
  status: string;
  total_quantity: number;
  total_weight: number;
  updated_at: string;
  deleted_at: string;
}

export type OrderContextType = {
  order: IOrder[];
}