export type ExpenseParams = {
  page: number;
  limit: number;
  q?: string;
  month: number;
  year: number;
  categoryId?: string;
  paymentMethodId?: string;
};
