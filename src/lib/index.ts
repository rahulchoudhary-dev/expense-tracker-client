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
  (response) => response.data,
  async (error) => {
    const originalRequest = error.config;

    // if (error.response?.status === 401 && !originalRequest._retry) {
    //   originalRequest._retry = true;
    //   try {
    //     const res = await axios.post(
    //       "/auth/refresh",
    //       {},
    //       { withCredentials: true }
    //     );

    //     const newAccessToken = res.data.access_token;
    //     localStorage.setItem("access_token", newAccessToken);

    //     // retry original request
    //     originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
    //     return axiosConfig(originalRequest);
    //   } catch (refreshError) {
    //     // redirect to login
    //     localStorage.removeItem("access_token");
    //     window.location.href = "/auth/login";
    //     return Promise.reject(refreshError);
    //   }
    // }

    return Promise.reject(error);
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
