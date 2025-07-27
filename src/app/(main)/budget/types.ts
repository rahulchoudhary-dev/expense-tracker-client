interface Budget {
  id: number;
  userId: number;
  title: string;
  type: "monthly" | "yearly";
  month: number | null;
  year: number;
  amount: number;
  createdAt: string;
  updatedAt: string;
}
type BudgetFormValues = {
  title: string;
  type: "monthly" | "yearly";
  month: string | null;
  year: string;
  amount: string;
};
