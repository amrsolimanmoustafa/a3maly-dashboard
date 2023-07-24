export interface ICompanyInformation {
    id: string;
    avatar?: string;
    name: string;
    address: string;
    city?: string;
    state?: string;
    country: string;
    zipcode?: number;
    phone?: string;
    email?: string;
    website?: string;
    timezone?: string;
}