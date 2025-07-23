export type Data = {
  lable: "Total Expense" | "Avg Expense" | "This Month" | "Top Category"; // use union for known values
  value: number;
  otherInfo: string;
  currency: string;
};
export type SummaryCardsProps = {
  data: Data[];
  isLoading: boolean;
};
