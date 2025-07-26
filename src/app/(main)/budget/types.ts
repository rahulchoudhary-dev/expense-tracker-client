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
