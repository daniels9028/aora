import axios from "axios";

const AxiosLib = axios.create({
  baseURL: "http://192.168.220.113:8000/api/",
  withCredentials: true,
});

export default AxiosLib;
