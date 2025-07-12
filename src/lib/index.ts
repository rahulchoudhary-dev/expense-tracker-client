import { storage } from "@/utils/storageUtils";
import axios from "axios";
import { string } from "yup";

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
  getExpense: "/expense",
  getExpenseSummary: "/expense/expense-summary",
  addExpense: "/expense",
  deleteExpense: "/expenses/:id",
  updateExpense: "/expenses/:id",
  getCategories: "/categories",
  getPaymentMethods: "payment-methods",
};
export default axiosConfig;

export function replaceParams(path: string, params: any) {
  for (const key in params) {
    path = path.replace(`:${key}`, params[key]);
  }
  return path;
}
