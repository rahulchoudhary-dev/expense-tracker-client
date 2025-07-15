import { STORAGE_KEYS } from "@/constant";
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
    console.log("Error in axios interceptor:", error);
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const refreshToken = storage.get(STORAGE_KEYS.REFRESH_TOKEN);
        if (refreshToken) {
          const response = await axiosConfig.post(endpoints.refreshToken, {
            refreshToken,
          });
          const { newAccesssToken, newRefreshToken } = response.data;
          axiosConfig.defaults.headers.common.Authorization = `Bearer ${newAccesssToken}`;

          originalRequest.headers.Authorization = `Bearer ${newAccesssToken}`;
          storage.set(STORAGE_KEYS.ACCESS_TOKEN, newAccesssToken);
          storage.set(STORAGE_KEYS.REFRESH_TOKEN, newRefreshToken);
          return axiosConfig(originalRequest);
        }
      } catch (refreshError) {
        console.error("Token refresh failed:", refreshError);
        storage.remove("access_token");
        storage.remove("refresh_token");
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error?.response?.data);
  }
);

export const endpoints = {
  sigIn: "/auth/signIn",
  signUp: "/auth/signUp",
  refreshToken: "/auth/refresh-token",

  updateUser: "/user/update-user",
  getUser: "/user/get-user",
  deleteUser: "/user/delete-user",

  getCategories: "/categories",
  addCategory: "/categories",
  updateCategory: "/categories/:id",
  deleteCategory: "/categories/:id",

  getPaymentMethods: "/payment-methods",
  addPaymentMethod: "/payment-methods",
  updatePaymentMethod: "/payment-methods/:id",
  deletePaymentMethod: "/payment-methods/:id",

  getExpense: "/expense",
  addExpense: "/expense",
  deleteExpense: "/expense/:id",
  updateExpense: "/expense/:id",
  getExpenseSummary: "/expense/expense-summary",

  getAnalyticsYearlyExpenses: "/analytics-charts/yearly-expenses",
  getAnalyticsCategoryExpenses: "/analytics-charts/category-expenses",
};
export default axiosConfig;

export function replaceParams(path: string, params: any) {
  for (const key in params) {
    path = path.replace(`:${key}`, params[key]);
  }
  return path;
}
