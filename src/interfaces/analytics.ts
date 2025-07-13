interface YearlyExpenseData {
  month: string;
  monthIndex: number;
  totalExpenseAmount: number;
  year: number;
}

export interface iYearlyExpenseChartProps {
  data: YearlyExpenseData[];
}

interface CategoryData {
  categoryName: string;
  totalExpenseAmount: number;
}

export interface iCategoryExpensePieChartProps {
  data: CategoryData[];
}
