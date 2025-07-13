interface YearlyExpenseData {
  month: string;
  monthIndex: number;
  totalExpenseAmount: number;
  year: number;
}

export interface iYearlyExpenseChartProps {
  data: YearlyExpenseData[];
  isLoading: boolean;
}
