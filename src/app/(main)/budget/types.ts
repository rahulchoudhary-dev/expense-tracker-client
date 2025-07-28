export interface Budget {
  id: number;
  userId: number;
  title: string;
  type: "monthly" | "yearly";
  month: number | null;
  year: number | string;
  amount: number;
  createdAt: string;
  updatedAt: string;
}
export type BudgetFormValues = {
  title: string;
  type: "monthly" | "yearly";
  month: string | null;
  year: string;
  amount: string;
  usedAmount?: number;
};
