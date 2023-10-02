import axios from "axios";

const axiosClient = axios.create({
  baseURL: "http://194.163.137.50/admin",
});

axiosClient.defaults.headers.common = {
  "Content-Type": "application/json",
  "Accept-Language": 'ar',
  "Access-Control-Allow-Origin": "*",
  "Accept": "application/json",

};

export default axiosClient;