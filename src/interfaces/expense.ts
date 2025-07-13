import { iExpenseData } from "@/app/(main)/dashboard/_components/ExpenseTableColumns";

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

export interface iExpenseDataTableProps {
  data: iExpenseData[];
  columns?: any;
  isLoading: boolean;
  pageData: any;
  setPageData: any;
  count: number;
}
