import React from "react";
import ResponsivePagination from "react-responsive-pagination";
import "./cutomeStyles/TableStyle.css";
interface TablePaginationProps {
  count: number;
  pageData: any;
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
        current={pageData.page}
        total={Math.ceil(count / pageData.limit)}
        onPageChange={(pageNumber) =>
          setPageData({ ...pageData, page: pageNumber })
        }
      />
    );
  }
);

export default TablePagination;
