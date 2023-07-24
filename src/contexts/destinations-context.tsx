import { createContext, useState } from "react";
import axios from "../configs/axios-client";
import { get_destinations_pricing,add_destinations_pricing,edit_destinations_pricing,delete_destinations_pricing,fetch_branches,get_destination } from '@/environment/apis';
import { IDestinationsPricing } from '@/@types/destinations-pricing';
import axiosClient from "../configs/axios-client";

export const DestinationsContext = createContext<DestinationsContextType | undefined>(undefined);

const DestinationsContextProvider = ({ children }: any) => {
  const [destinations, setDestinations] = useState<IDestinationsPricing[]>([]);
  const [selectedDestination, setSelectedDestination] = useState<any>();
  const [branches, setBranches] = useState<string[]>([]);
  const [count, setCount] = useState(0);


  const fetchDestinations = (page: number, rowsPerPage:number , filter?:string) => {
    axios
      .get(get_destinations_pricing(page, rowsPerPage, filter))
      .then((res) => {
        setDestinations(res.data.data)
        setCount(res.data.meta.total)
      })
      .catch((error) => {
      });
  }
  const getDestination = (id: string) => {
    axiosClient
      .get(get_destination(id))
      .then((res) => {
        setSelectedDestination(res.data.data);
      })
      .catch((error) => {});
  };
  const addDestinationsPricing = async(formData:any)=>{ 
    try {
      const res =  await await axiosClient.post(add_destinations_pricing(),formData)
      //Todo : remove all console.log
      console.log(res?.data?.message);
      return true;
    } catch (error:any) {
      console.log(error?.response?.data?.message);
      return false;
    }
  }
  const editDestinationsPricing = async(id:string,formData:any)=>{ 
    try {
      const res =  await await axiosClient.put(edit_destinations_pricing(id),formData)
    //Todo : remove all console.log
    console.log(res?.data?.message);
    return true;
  } catch (error:any) {
    console.log(error?.response?.data?.message);
    return false;
  }
}

  const fetchBranches = async() => {
    axios
      .get(fetch_branches())
      .then((res) => {
        setBranches(res.data.data)
        
      })
      .catch((error) => {
      });
  }
  const deleteDestinationsPricing = async(id: string) => {
    try {
      const res =  await  axiosClient.delete(delete_destinations_pricing(id))
      return true;
    } catch (error:any) {
      return false;
    }
  };


  return(
    <DestinationsContext.Provider
      value={{
        destinations,
        count,
        branches,
        selectedDestination,
        fetchDestinations,
        addDestinationsPricing,
        editDestinationsPricing,
        fetchBranches,
        deleteDestinationsPricing,
        getDestination
      }}
    >
      {children}
    </DestinationsContext.Provider>
  );
}

export default DestinationsContextProvider;

export type DestinationsContextType = {
  fetchDestinations: (page: number, rowsPerPage: number, filter?: string) => void;
  addDestinationsPricing: (formData:any) => Promise<boolean>;
  editDestinationsPricing: (id:string,formData:any) => Promise<boolean>;
  fetchBranches:()=>void;
  deleteDestinationsPricing:(id:string)=>Promise<boolean>;
  getDestination:(id:string)=>void;
  branches:string[];
  destinations: IDestinationsPricing[];
  count: number;
  selectedDestination:IDestinationsPricing|undefined;
}