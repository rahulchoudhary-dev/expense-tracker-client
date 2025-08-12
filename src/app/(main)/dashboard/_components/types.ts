export type Category = {
  id: number;
  name: string;
};

export type PaymentMethod = {
  id: number;
  name: string;
};

export type Attachment = {
  id?: number;
  url?: string;
  filename?: string;
  uploadedAt?: string;
  mimeType?: string;
  size?: number;
  attachmentUrl?: string;
};

export type Expense = {
  id: number;
  amount: number;
  date: any; // ISO format
  description: string;
  userId: number;
  categoryId: number;
  paymentMethodId: number;
  createdAt: string;
  updatedAt: string;
  Category: Category;
  PaymentMethod: PaymentMethod;
  attachments: Attachment[];
};

export type ExpenseDataTable = {
  id: string;
  amount: number;
  Category: any;
  PaymentMethod: any;
  date?: string | Date;
};

export type AddExpenseDrawerProps = {
  open: boolean;
  onOpenChange: () => void;
  expenseData?: Expense;
  isEditMode: boolean;
};
export type ExpenseFormData = {
  date: any;
  description: string;
  amount: number;
  categoryId: number;
  paymentMethodId: number;
  userId?: string;
};
export type AttachmentUploaderProps = {
  attachmentFiles: File[];
  setAttachmentFiles: React.Dispatch<React.SetStateAction<File[]>>;
  isViewExpense?: boolean;
  uploadAttachmentHandler?: () => void;
  isPending?: boolean;
};
export type FullCalendarEvent = {
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
};
