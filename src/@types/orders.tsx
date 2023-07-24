import { IOrderAddress } from '@/@types/order-addresse';

export interface current_branch {
  "name": string;
  "id": string;
}

export interface IOrders {
  shipping_amount: string;
  id: string;
  number: string;
  status: string;
  addresses: IOrderAddress[];
  amount: string;
  current_branch: current_branch;
  created_at: string;
  updated_at: string;
  deleted_at: string;
  driver:any
}

export type OrderContextType = {
  order: IOrders[];
}