import { createContext, Dispatch, useState, useEffect } from "react";
import axios from "../configs/axios-client";
import {
  get_drivers,
  restore_driver,
  suspend_driver,
  get_drivers_requests,
  get_driver,
  approve_driver,
  reject_driver
} from "../environment/apis";

export const DriverContext = createContext<driverContextType | undefined>(undefined);

const DriverContextProvider = ({ children }: any) => {
  const [drivers, setDrivers] = useState<any[]>([]);
  const [selectedDriver, setSelectedDriver] = useState<any>({});
  const [driversRequests, setDriversRequests] = useState<any[]>([]);
  const [countRequests, setCountRequests] = useState(0);
  const [count, setCount] = useState(0);

  // Drivers requests fetching
  const fetchDriversRequests = (page: number, rowsPerPage: number, filter?: string) => {
    axios
      .get(get_drivers_requests(page, rowsPerPage, filter))
      .then((res) => {
        setDriversRequests(res.data.data);
        setCountRequests(res.data.meta.total);
      })
      .catch((error) => {});
  };

  // Getting a single driver
  const getDriver = (id: string) => {
    axios
      .get(get_driver(id))
      .then((res) => {
        setSelectedDriver(res.data.data);
      })
      .catch((error) => {});
  };

  // Approve driver join request
  const approveDriver=(id: string)=>{
    axios.post(approve_driver(id))
    .catch((err)=> console.log(err))
  };
   // reject driver join request
   const rejectDriver=(id: string)=>{
    axios.post(reject_driver(id))
    .catch((err)=> console.log(err))
  };
  // Drivers fetching
  const fetchDrivers = (page: number, rowsPerPage: number, filter?: string) => {
    axios
      .get(get_drivers(page, rowsPerPage, filter))
      .then((res) => {
        setDrivers(res.data.data);
        setCount(res.data.meta.total);
      })
      .catch((error) => {});
  };

  const suspendDriver = (id: string) => {
    //get driver by index
    const driverIndex = drivers.findIndex((driver) => driver.id === id);
    const singleDriver = drivers[driverIndex];
    if (singleDriver?.deleted_at == null)
      axios
        .delete(suspend_driver(id))
        .then((res) => {
          //set singledriver deletedat to current datetime
          singleDriver.deleted_at = new Date().toUTCString();
          setDrivers([...drivers]);
        })
        .catch((error) => {});
    else
      axios
        .put(restore_driver(id))
        .then((res) => {
          singleDriver.deleted_at = null;
          setDrivers([...drivers]);
        })
        .catch((error) => {});
  };

  return (
    <DriverContext.Provider
      value={{
        fetchDrivers,
        fetchDriversRequests,
        drivers,
        driversRequests,
        count,
        countRequests,
        suspendDriver,
        selectedDriver,
        getDriver,
        approveDriver,
        rejectDriver
      }}
    >
      {children}
    </DriverContext.Provider>
  );
};

export default DriverContextProvider;

export type driverContextType = {
  fetchDrivers: (page: number, rowsPerPage: number, filter?: string) => void;
  fetchDriversRequests: (page: number, rowsPerPage: number, filter?: string) => void;
  drivers: any[];
  driversRequests: any[];
  count: number;
  countRequests: number;
  suspendDriver: (id: string) => void;
  selectedDriver: any;
  getDriver: (id: string) => void;
  approveDriver: (id:string)=> void;
  rejectDriver: (id:string)=> void;
};
