import { setAuthTokens } from "@/redux/slices/userSlice";
import { store } from "@/redux/store";
import axios from "axios";
import { endpoints } from "./endpoints";

const axiosConfig = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
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

export default axiosConfig;
