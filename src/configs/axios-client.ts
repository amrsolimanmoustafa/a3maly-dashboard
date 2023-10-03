import axios from "axios";

const axiosClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL
});

axiosClient.defaults.headers.common = {
  "Content-Type": "application/json",
  "Accept-Language": 'ar',
  "Access-Control-Allow-Origin": "*",
  "Accept": "application/json",

};

export default axiosClient;