// Clients API
import { Filter } from "@/@types/filter";
import { filtersString } from '@/utils/generate-filter-string';

export const clients = "/api/v1/auth/register";
export const get_client = (id: string) => `/clients/${id}`;
export const get_clients = (page: number = 1, rowsPerPage: number = 10, filter?: string) =>
  `/clients?page=${page + 1}&limit=${rowsPerPage}&filters=${filter!=undefined ?`username<>${filter}&filters=name<>${filter}&filters=phone<>${filter}`: ""}`;
export const suspend_client = (id: string) => `/clients/suspend/${id}`;
export const restore_client = (id: string) => `/clients/restore/${id}`;

// Contact Messages API

export const get_contact_messages = (page: number = 1, rowsPerPage: number = 10, filter?: string) =>
  `/contacts?page=${page + 1}&limit=${rowsPerPage}`;

export const get_contact_message = (id: string) => `/contacts/${id}`;

//Admins API
export const get_admin = (id: string) => `/admins/${id}`;
export const get_admins = (page: number = 1, rowsPerPage: number = 10,  filter?: Filter[]) =>
  `/admins?page=${page + 1}&limit=${rowsPerPage}&${filtersString(filter)}`;
export const suspend_admin = (id: string) => `/admins/${id}`;
export const restore_admin = (id: string) => `/admins/restore/${id}`;
export const add_admin = () => `/admins`;
export const edit_admin = (id: string) => `/admins/${id}`;

export const post_Notification = () => "/notifications/send";