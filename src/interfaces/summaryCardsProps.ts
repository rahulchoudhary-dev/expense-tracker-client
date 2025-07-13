export interface iData {
  lable: "Total Expense" | "Avg Expense" | "This Month" | "Top Category"; // use union for known values
  value: number;
  otherInfo: string;
  name?: string;
}
export interface iSummaryCardsProps {
  data: iData[];
  isLoading: boolean;
}
