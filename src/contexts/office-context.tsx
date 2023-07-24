import { createContext, Dispatch, useState, useEffect } from "react";
import axiosClient from "../configs/axios-client";
import { get_office, get_offices, get_cities } from "../environment/apis";

type citiesType = {};
export const OfficeContext = createContext<officeContextType | undefined>(undefined);

const OfficeContextProvider = ({ children }: any) => {
  const [offices, setOffices] = useState<any[]>([]);
  const [cities, setCities] = useState<any>([]);
  const [selectedOffice, setSelectedOffice] = useState<any>({});
  const [count, setCount] = useState(0);

  // Fetch offices
  const fetchOffices = (page: number, rowsPerPage: number, filter?: string) => {
    axiosClient
      .get(get_offices(page, rowsPerPage, filter))
      .then((res) => {
        setOffices(res.data.data);
        setCount(res.data.meta.total);
      })
      .catch((error) => {});
  };

  // Get single Office
  const getOffice = (id: string) => {
    axiosClient
      .get(get_office(id))
      .then((res) => {
        setSelectedOffice(res.data.data);
      })
      .catch((error) => {});
  };
  // Fetch all cities
  const fetchCities = () => {
    axiosClient
      .get(get_cities())
      .then((res) => {
        setCities(res.data.data);
      })
      .catch((error) => {});
  };
  return (
    <OfficeContext.Provider
      value={{
        offices,
        selectedOffice,
        count,
        fetchOffices,
        getOffice,
        fetchCities,
        cities,
      }}
    >
      {children}
    </OfficeContext.Provider>
  );
};

export default OfficeContextProvider;

export type officeContextType = {
  offices: any[];
  count: number;
  selectedOffice: any;
  fetchOffices: (page: number, rowsPerPage: number, filter?: string) => void;
  fetchCities: () => void;
  cities: any;
  getOffice: (id: string) => void;
};
