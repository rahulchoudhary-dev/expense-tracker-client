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
  deleteExpenseAttachment: "/expense/delete-attachment/:attachmentId",

  getExpenseSummary: "/expense/expense-summary",

  getAnalyticsYearlyExpenses: "/analytics-charts/yearly-expenses",
  getAnalyticsCategoryExpenses: "/analytics-charts/category-expenses",
};
