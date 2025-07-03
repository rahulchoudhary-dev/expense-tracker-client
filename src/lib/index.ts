import axios from "axios";

const axiosConfig = axios.create({
  baseURL: "http://localhost:5000/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
});

export const endpoints = {
  createUser: "/auth/user",
  getExpenses: "/expenses",
  addExpense: "/expenses/add",
  deleteExpense: "/expenses/delete",
  updateExpense: "/expenses/update",
};
export default axiosConfig;
