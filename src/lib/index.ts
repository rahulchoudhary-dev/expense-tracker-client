import { storage } from "@/utils/storageUtils";
import axios from "axios";

const axiosConfig = axios.create({
  baseURL: "http://localhost:5000/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
});

axiosConfig.interceptors.request.use((config) => {
  const token = storage.get("access_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

axiosConfig.interceptors.response.use(
  (response) => response.data, // success case
  async (error) => {
    const originalRequest = error.config;

    return Promise.reject(error?.response?.data);
  }
);

export const endpoints = {
  sigIn: "/auth/signIn",
  signUp: "/auth/signUp",
  getExpenses: "/expenses",
  addExpense: "/expenses/add",
  deleteExpense: "/expenses/delete",
  updateExpense: "/expenses/update",
};
export default axiosConfig;
