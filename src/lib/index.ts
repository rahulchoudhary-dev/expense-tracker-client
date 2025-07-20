import { setAuthTokens } from "@/redux/slices/userSlice";
import { store } from "@/redux/store";
import axios from "axios";

const axiosConfig = axios.create({
  baseURL: "http://localhost:5000/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
});

axiosConfig.interceptors.request.use((config) => {
  const token = store.getState().user.access_token;
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
        const refreshToken = store.getState().user.refresh_token;
        if (refreshToken) {
          const response = await axiosConfig.post(endpoints.refreshToken, {
            refreshToken,
          });
          const { newAccesssToken, newRefreshToken } = response.data;
          axiosConfig.defaults.headers.common.Authorization = `Bearer ${newAccesssToken}`;

          originalRequest.headers.Authorization = `Bearer ${newAccesssToken}`;
          store.dispatch(
            setAuthTokens({
              access_token: newAccesssToken,
              refresh_token: newRefreshToken,
            })
          );

          return axiosConfig(originalRequest);
        }
      } catch (refreshError) {
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

  userProfileUpload: "/user/profile-upload",

  getCategories: "/categories",
  addCategory: "/categories",
  updateCategory: "/categories/:id",
  deleteCategory: "/categories/:id",

  getPaymentMethods: "/payment-methods",
  addPaymentMethod: "/payment-methods",
  updatePaymentMethod: "/payment-methods/:id",
  deletePaymentMethod: "/payment-methods/:id",

  getExpense: "/expense",
  getExpenseById: "/expense/:expenseId",
  addExpense: "/expense",
  deleteExpense: "/expense/:id",
  updateExpense: "/expense/:id",

  uploadExpenseAttachments: "/expense/upload-attachments",

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
