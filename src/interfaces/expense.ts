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

// Type Definitions
export interface Attachment {
  id?: number;
  attachmentUrl: string;
  public_id?: string;
  format?: string;
  resource_type?: string;
  userId?: number;
  expenseId?: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface Category {
  id: number;
  name: string;
}

export interface PaymentMethod {
  id: number;
  name: string;
}

export interface Expense {
  id: number;
  amount: number;
  date: string;
  description: string;
  userId: number;
  categoryId: number;
  paymentMethodId: number;
  createdAt?: string;
  updatedAt?: string;
  Category: Category;
  PaymentMethod: PaymentMethod;
  attachments?: Attachment[];
}

export interface FullCalendarEvent {
  id: string;
  title: string;
  date: string;
  backgroundColor: string;
  borderColor: string;
  extendedProps: {
    amount: number;
    description: string;
    category: string;
    paymentMethod: string;
    attachments: Attachment[];
    fullExpense: Expense;
  };
}

// Category color mapping
export const categoryColors: { [key: string]: string } = {
  Transportation: "#3B82F6", // Blue
  Shopping: "#10B981", // Green
  Utilities: "#F59E0B", // Yellow
  Entertainment: "#8B5CF6", // Purple
  Food: "#EF4444", // Red
  Healthcare: "#06B6D4", // Cyan
  Other: "#6B7280", // Gray
};
