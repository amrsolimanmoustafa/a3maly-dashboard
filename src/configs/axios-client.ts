import axios from "axios";

const axiosClient = axios.create({
  // baseURL: "http://localhost:3000/v1/admin/" // API URL,
  baseURL: "https://pronto.zbony.com/v1/company/", // API SERVER URL,
});

axiosClient.defaults.headers.common = {
  "Content-Type": "application/json",
  "Accept-Language": 'ar'
};

export default axiosClient;
