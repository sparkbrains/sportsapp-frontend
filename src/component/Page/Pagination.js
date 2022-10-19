import React, { useState, useEffect } from "react";
const Pagination = ({ data,sendPageNumber }) => {
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [isPrevDisable, setIsPrevDisable] = useState(false);
  const [isNextDisable, setIsNextDisable] = useState(false);
  useEffect(() => {
    if (Object.keys(data)?.length) {
      let count = Math.ceil(data?.count / 10)
      setTotalPages(count);
    }
  }, [data]);
  const getPrevPage = () => {
    if (currentPage > 1) {
      setIsPrevDisable(false);
      setCurrentPage(currentPage - 1);
      sendPageNumber(currentPage - 1)
    } else {
      setIsPrevDisable(true);
    }
  };

  const getNextPage = () => {
    if (currentPage < totalPages) {
      setIsNextDisable(false);
      setCurrentPage(currentPage + 1);
      sendPageNumber(currentPage + 1)

    } else {
      setIsNextDisable(true);
    }
  };

  return (
    <>
      <div className="pagination-btn">
        {isPrevDisable ? "" : <button
          onClick={(e) => {
            getPrevPage(e);
          }}
        >
          Prev
        </button>}
        <ul>
        {
          [...Array(totalPages)].map((d,key)=> <li onClick={()=>{setCurrentPage(key + 1);sendPageNumber(key + 1)}}>{key+1}</li>)
        }
        </ul>
        {isNextDisable ? "" : <button
          onClick={(e) => {
            getNextPage(e);
          }}
        >
          Next
        </button>}
      </div>
    </>
  );
};

export default Pagination;
