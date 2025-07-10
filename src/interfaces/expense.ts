export interface iExpenseFormData {
  date: Date;
  description: string;
  amount: string;
  categoryId: string;
  paymentMethodId: string;
  userId?: string;
}
