export interface Category {
  id: number;
  name: string;
}

export interface PaymentMethod {
  id: number;
  name: string;
}

export interface ExpenseDetailsDialogProps {
  expenseId: number | null;
  isOpen: boolean;
  onClose: () => void;
}

export interface Attachment {
  id: number;
  attachmentUrl: string;
  public_id: string;
  format: string;
  resource_type: string;
  userId: number;
  expenseId: number;
  createdAt: string;
  updatedAt: string;
}

export interface Expense {
  id: number;
  amount: number;
  date: string;
  description: string;
  userId: number;
  categoryId: number;
  paymentMethodId: number;
  createdAt: string;
  updatedAt: string;
  Category: Category;
  PaymentMethod: PaymentMethod;
  attachments: Attachment[];
}

export interface AttachmentGridProps {
  attachments: Attachment[];
  onView: (attachment: Attachment) => void;
  onDelete: (attachmentId: number) => void;
  deletingAttachmentId: number | null;
}

export interface AttachmentViewerProps {
  attachment: Attachment | null;
  isOpen: boolean;
  onClose: () => void;
}
