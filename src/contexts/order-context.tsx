import { createContext, useState } from "react";
import axios from "../configs/axios-client";
import {
  get_orders,
  get_order,
  cancel_order,
  accept_order,
  assign_order,
  get_order_by_number, recive_order
} from '@/environment/apis';
import { IOrder } from '@/@types/order';
import { Filter } from '@/@types/filter';

export const OrderContext = createContext<orderContextType | undefined>(undefined);

const OrderContextProvider = ({ children }: any) => {
  const [orders, setOrders] = useState<any[]>([]);
  const [order, setOrder] = useState<IOrder>();
  const [count, setCount] = useState(0);

  const fetchOrders = (page: number, rowsPerPage:number , filter?:Filter[]) => {
    axios
      .get(get_orders(page, rowsPerPage, filter))
      .then((res) => {
        setOrders(res.data.data);
        setCount(res.data.meta.total);
      })
      .catch((error) => {
      });
  };

  const fetchOrder = (id: string) => {
    if (/^\d+$/.test(id)) {
      axios
        .get(get_order_by_number(id))
        .then((res) => {
          setOrder(res.data.data)
        })
        .catch((error) => {});
    } else {
      axios
        .get(get_order(id))
        .then((res) => {
          setOrder(res.data.data)
        })
        .catch((error) => {});
    }
  }

  const reciveOrder = (orderNumber: string) => {
    axios
      .post(recive_order(orderNumber))
      .then((res) => {

      })
      .catch((err) =>{});
  }

  const cancelOrder = (id: string)=> {
    //get order by index
    const orderIndex = orders.findIndex((order) => order.id === id);
    const singleOrder = orders[orderIndex];
    axios
      .post(cancel_order(id))
      .then((res) => {
        //set singleorder canceldat to current datetime
        singleOrder.canceld_at = new Date().toUTCString();
        singleOrder.status = "CANCELED"
        setOrders([...orders]);
        setOrder(singleOrder)
      })
      .catch((error) => {
      });
  }

  const acceptOrder = (id: string)=> {
    //get order by index
    const orderIndex = orders.findIndex((order) => order.id === id);
    const singleOrder = orders[orderIndex];
    axios
      .post(accept_order(id))
      .then((res) => {
        //set singleorder canceldat to current datetime
        singleOrder.accept_at = new Date().toUTCString();
        singleOrder.status = "ACCEPTED"
        setOrders([...orders]);
        setOrder(singleOrder)
      })
      .catch((error) => {
      });
  }
  const assignDriver = async(orderID: string,driverID: string)=>{ 
    try {
      const res =   await axios.post(assign_order(orderID,driverID))
      //Todo : remove all console.log
      console.log(res?.data?.message);
      return true;
    } catch (error:any) {
      console.log(error?.response?.data?.message);
      return false;
    }
  }

  return (
    <OrderContext.Provider
      value={{
        orders,
        order,
        count,
        fetchOrders,
        fetchOrder,
        reciveOrder,
        cancelOrder,
        acceptOrder,
        assignDriver
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};

export default OrderContextProvider;

export type orderContextType = {
  fetchOrders: (page: number, rowsPerPage: number, filter?: Filter[]) => void;
  fetchOrder: (id: string) => void;
  reciveOrder: (orderNumber: string) => void;
  orders: any[];
  order: any;
  count: number;
  cancelOrder: (id: string) => void;
  acceptOrder: (id: string) => void;
  assignDriver :(orderID: string,driverID: string)=>Promise<any>; 
};
