export interface iExpenseFormData {
  date: Date;
  description: string;
  amount: string;
  categoryId: string;
  paymentMethodId: string;
  userId?: string;
}

export interface iExpenseParams {
  page: number;
  limit: number;
  q?: string;
  month: number;
  year: number;
  categoryId?: string;
  paymentMethodId?: string;
}
export interface iExpenseDataTable {
  id: string;
  amount: number;
  Category: any;
  PaymentMethod: any;
  date?: string | Date;
}

export interface iExpenseDataTableProps {
  data: iExpenseDataTable[];
  columns?: any;
  isLoading: boolean;
  pageData: any;
  setPageData: any;
  count: number;
}
