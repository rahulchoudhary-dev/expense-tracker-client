import { iExpenseParams } from "@/interfaces/expense";
import React from "react";
import ResponsivePagination from "react-responsive-pagination";
import "./cutomeStyles/TableStyle.css";
interface TablePaginationProps {
  count: number;
  pageData: iExpenseParams;
  setPageData: React.Dispatch<
    React.SetStateAction<{
      page: number;
      limit: number;
      [key: string]: any;
    }>
  >;
}

const TablePagination: React.FC<TablePaginationProps> = React.memo(
  ({ count, pageData, setPageData }) => {
    return (
      <ResponsivePagination
        // className="flex bg-gray-100  rounded-4xl space-x-2 text-2xl font-medium text-gray-700"
        current={pageData.page + 1}
        total={Math.ceil(count / pageData.limit)}
        onPageChange={(pageNumber) =>
          setPageData({ ...pageData, page: pageNumber - 1 })
        }
      />
    );
  }
);

export default TablePagination;
