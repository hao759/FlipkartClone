import axios from "axios";
import { baseUrl } from "../urlConfig";

const token = window.localStorage.getItem("token");

const axiosIntance = axios.create({
  baseURL: "http://localhost:2000",
  headers: {
    Authorization: token ? `Bearer ${token}` : "",
  },
});
export default axiosIntance;
