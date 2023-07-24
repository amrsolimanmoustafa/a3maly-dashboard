export interface IOrderAddress {
  account: string;
  addressCity: string;
  avatar: string;
  details: string;
  flat_no: string;
  floor_no: string;
  latitude: number;
  longitude: number;
  name: string;
  phone: string;
  type: string;
}

export type OrderAddressContextType = {
  order: IOrderAddress[];
}