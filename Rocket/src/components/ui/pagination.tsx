import React, { useState } from "react";
import { Button } from "./button";
import { set } from "date-fns";

const Pagination = ({ currentPage, totalPages }) => {
  const [inputPage, setInputPage] = useState("");
  const [page, setPage] = useState(currentPage);

  const handleInputChange = (e) => {
    setInputPage(e.target.value);
  };

  const nextPage = () => {
    setPage(page + 1);
    setInputPage(page);
  };

  const previousPage = () => {
    if (page > 0) {
      setPage(page - 1);
      setInputPage(page);
    }
  };

  return (
    <div className="flex justify-between items-center space-x-3 float-right">
      <Button onClick={() => previousPage()} disabled={page === 1}>
        Previous
      </Button>
        <span>{page}</span> 
        <span> de {totalPages}</span>
      <Button onClick={() => nextPage()} disabled={page === totalPages}>
        Next
      </Button>
    </div>
  );
};

export default Pagination;
