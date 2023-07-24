// Clients API
import { Filter } from "@/@types/filter";
import { filtersString } from '@/utils/generate-filter-string';

export const clients = "/api/v1/auth/register";
export const get_client = (id: string) => `/clients/${id}`;
export const get_clients = (page: number = 1, rowsPerPage: number = 10, filter?: string) =>
  `/clients?page=${page + 1}&limit=${rowsPerPage}&filters=${filter!=undefined ?`username<>${filter}&filters=name<>${filter}&filters=phone<>${filter}`: ""}`;
export const suspend_client = (id: string) => `/clients/suspend/${id}`;
export const restore_client = (id: string) => `/clients/restore/${id}`;

// Drivers API &limit=10&filters=name%3Dtest&filters=id%3Dtest
export const get_driver = (id: string) => `/drivers/${id}`;
export const get_drivers = (page: number = 1, rowsPerPage: number = 10, filter?: string) =>
  `/drivers?page=${page + 1}&limit=${rowsPerPage}&filters=${filter!=undefined ?`username<>${filter}&filters=name<>${filter}&filters=phone<>${filter}`: ""}`;
export const get_drivers_requests = (page: number = 1, rowsPerPage: number = 10, filter?: string) =>
  `/drivers/join-requests?page=${page + 1}&limit=${rowsPerPage}&filters=${filter!=undefined ?`username<>${filter}&filters=name<>${filter}&filters=phone<>${filter}`: ""}`;
export const suspend_driver = (id: string) => `/drivers/suspend/${id}`;
export const restore_driver = (id: string) => `/drivers/restore/${id}`;
export const approve_driver = (id: string) => `/drivers/approve-join-requests?user_id=${id}`;
export const reject_driver = (id: string) => `/drivers/reject-join-requests?user_id=${id}`;
// Vehicles API

export const get_vehicle = (id: string) => `/vehicles/${id}`;

export const get_all_vehicles = (page: number = 1, rowsPerpage: number = 10, filter?: string) =>
  `/vehicles?page=${
    page + 1
  }&limit=${rowsPerpage}&filters=${filter!=undefined ?`username<>${filter}&filters=name<>${filter}&filters=phone<>${filter}`: ""}&includes=user&includes=brand&includes=brand_model&includes=images`;

export const get_verified_vehicles = (
  page: number = 1,
  rowsPerpage: number = 10,
  filter?: string
) =>
  `/vehicles?page=${
    page + 1
  }&limit=${rowsPerpage}&filters=status%3DVERIFIED&includes=user&includes=brand&includes=brand_model&includes=images`;
export const get_inreview_vehicles = (
  page: number = 1,
  rowsPerpage: number = 10,
  filter?: string
) =>
  `/vehicles?page=${
    page + 1
  }&limit=${rowsPerpage}&filters=status%3DINREVIEW&includes=user&includes=brand&includes=brand_model&includes=images`;
export const suspend_vehicle = (id: string) => `/vehicles/${id}`;
export const restore_vehicle = (id: string) => `/vehicles/restore/${id}`;
export const get_vehicle_driver = (id: string) => `/drivers/${id}`;

// Orders API

export const get_orders = (page: number = 1, rowsPerPage: number = 10, filter?: Filter[]) =>
  `/shipping-orders?page=${page + 1}&limit=${rowsPerPage}&${filtersString(filter)}`;
export const get_order = (id: string) => `/shipping-orders/${id}`;
export const get_order_by_number = (orderNumber: string) => `/shipping-orders/number/${orderNumber}`;
export const recive_order = (orderNumber: string) => `/shipping-orders/recive/${orderNumber}`;
export const cancel_order = (id: string) => `/shipping-orders/cancel/${id}`;
export const accept_order = (id: string) => `/shipping-orders/accept/${id}`;
export const assign_order = (orderID: string,driverID: string) => `/shipping-orders/${orderID}/assign-driver/${driverID}`;

// Contact Messages API

export const get_contact_messages = (page: number = 1, rowsPerPage: number = 10, filter?: string) =>
  `/contacts?page=${page + 1}&limit=${rowsPerPage}`;

export const get_contact_message = (id: string) => `/contacts/${id}`;

// Shipping Offices API
export const get_office = (id: string) => `/branches/${id}`;
export const get_offices = (page: number = 1, rowsPerPage: number = 10, filter?: string) =>
  `/branches?page=${page + 1}&limit=${rowsPerPage}&filters=${filter!=undefined ?`phone<>${filter}&filters=name<>${filter}`: ""}`;
export const get_cities = () => `/branches/cities`;
export const add_office = "/branches";
export const edit_office = (id: string) => `/branches/${id}`;

// Financials API
export const get_transactions = (page: number = 1, rowsPerPage: number = 10, filter?: string) => `/financials/transactions?page=${page + 1}&limit=${rowsPerPage}&filters=${filter!=undefined ?`username<>${filter}&filters=name<>${filter}&filters=phone<>${filter}`: ""}`;

export const get_financials_account_balance = () => `/financials/account-balance`;

export const get_financials_drivers_balance = (page: number = 1, rowsPerPage: number = 10, filter?: string) => `/financials/drivers-balance?page=${page + 1}&limit=${rowsPerPage}&filters=${filter!=undefined ?`username<>${filter}&filters=name<>${filter}&filters=phone<>${filter}`: ""}`;

//destinations
export const get_destinations_pricing = (page: number = 1, rowsPerPage: number = 10, filter?: string) => `/destinations?page=${page + 1}&limit=${rowsPerPage}&filters=${filter!=undefined ?`username<>${filter}&filters=name<>${filter}&filters=phone<>${filter}`: ""}`;
export const add_destinations_pricing = ()=> `/destinations`
export const edit_destinations_pricing = (id: string)=> `/destinations/${id}`;
export const delete_destinations_pricing = (id: string)=> `/destinations/${id}`;
export const fetch_branches = ()=> `/branches`
export const get_destination = (id:string)=> `/destinations/${id}`

//Admins API
export const get_admin = (id: string) => `/admins/${id}`;
export const get_admins = (page: number = 1, rowsPerPage: number = 10,  filter?: Filter[]) =>
  `/admins?page=${page + 1}&limit=${rowsPerPage}&${filtersString(filter)}`;
export const suspend_admin = (id: string) => `/admins/${id}`;
export const restore_admin = (id: string) => `/admins/restore/${id}`;
export const add_admin = () => `/admins`;
export const edit_admin = (id: string) => `/admins/${id}`;

export const post_Notification = () => "/notifications/send";