import React from "react";
import RowCount from "./RowCount";
import PageNav from "./PageNav";
import { useState, useEffect } from "react";

const Pagination = ({ data, setVisibleData, page }) => {
  // pagination logic
  const [curPage, setCurPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(
    localStorage.getItem("eventsPerPage")
      ? localStorage.getItem("eventsPerPage")
      : 5
  );
  const totalNoOfPages = () => Math.ceil(data.length / rowsPerPage);
  const changeRowsPerPage = (rowsPerPage) => {
    //   switch to first page before making changes
    setCurPage(1);
    setRowsPerPage(parseInt(rowsPerPage));
    localStorage.setItem("eventsPerPage", parseInt(rowsPerPage));
  };
  useEffect(() => {
    setCurPage(1);
  }, [page]);
  useEffect(() => {
    setVisibleData(
      data.slice(
        rowsPerPage * (curPage - 1),
        Math.min(data.length, rowsPerPage * (curPage - 1) + rowsPerPage)
      )
    );
  }, [curPage, rowsPerPage, data, setVisibleData]);

  return (
    <>
      <div className="text-center mb-2">
        <RowCount curVal={rowsPerPage} setVal={changeRowsPerPage} />
      </div>
      <div className="text-center">
        <PageNav
          currentPage={curPage}
          setCurPage={setCurPage}
          totalNoOfPages={totalNoOfPages}
        />
      </div>
    </>
  );
};

export default Pagination;
