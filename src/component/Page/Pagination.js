// import React, { useEffect, useState } from "react";
// import { Card, Row, Col, Container } from "react-bootstrap";
// import ReactPaginate from "react-paginate";

// export default function Pagination({ data }) {
//   const [offset, setOffset] = useState(0);
//   const [loading, setLoading] = useState(false);

//   const [pageNumber, setPageNumber] = useState(1);
//   const [pageCount, setPageCount] = useState([]);
//   const dataPerPage = 10;
//   const pageVisited = pageNumber * dataPerPage;
//   const firstPage = pageVisited - dataPerPage;
//   const [totalData, setTotalData] = useState(0)

//
//   const displayData = data?.results?.slice(pageVisited, pageVisited + dataPerPage).map((data => {
//     setTotalData(data);
//   }))

//   for(let i = 1; i <= Math.ceil(totalData / dataPerPage); i++){
//     pageCount.push(i);
//   }

//   useEffect(() => {
//     setPageCount(data.count);

//   }, [offset]);

//   const handlePageChange = ({selected}) => {
//     setPageNumber(selected);

//     setOffset((selected + 1) * perPage);
//   };
//   return (
//     <Container>
//       {pageCount > 1 ? <ReactPaginate
//         previousLabel={"previous"}
//         nextLabel={"next"}
//         pageCount={pageCount}
//         onPageChange={handlePageChange}
//         containerClassName={"pagination"}
//         previousLinkClassName={"previousBtn"}
//         nextLinkClassName={"nextBtn"}
//         disabledClassName={"paginationDisabled"}
//         subContainerClassName={"pages pagination"}
//         activeClassName={"paginationActive"}
//       />:null}
//     </Container>
//   );
// }

import React, { useState, useEffect } from "react";

const Pagination = ({ data }) => {
  const [totalPages, setTotalPages] = useState(0);
  useEffect(() => {
    setTotalPages(data?.count);
    console.log(data, "pageee");
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [nextPageData, setNextPageData] = useState();
  const [prevPageData, setPrevPageData] = useState();

  const [isPrevDisable, setIsPrevdisable] = useState(false);
  const [isNextDisable, setIsNextdisable] = useState(false);

  const getPrevPage = () => {
    setIsNextdisable(false);
    if (currentPage > 1) {
      setIsPrevdisable(false);
      setCurrentPage(currentPage - 1);
      setPrevPageData(data?.previous);
    }
    else if(currentPage === 1){
      setIsPrevdisable(true);
      setIsNextdisable(false);
    }
    else{
      setIsPrevdisable(false);
      setIsNextdisable(false);
    }
  };

  const getNextPage = () => {
    setIsPrevdisable(false);
    if (currentPage < totalPages) {
      setIsNextdisable(false);
      setCurrentPage(currentPage + 1);
      setNextPageData(data?.next);
    } else if(currentPage === totalPages){
      setIsNextdisable(true);
    }
    else{
      setIsPrevdisable(false);
      setIsNextdisable(false);
    }
  };

  return (
    <>
      <div className="pagination-btn">
        {isPrevDisable ?  "" : <button          
          onClick={(e) => {
            getPrevPage(e);
          }}
        >
          Prev
        </button>}
          {/* {for(let page = 1; page <= totalPages; page++){
        <p>

          {page} of {totalPages}
        </p>
        }} */}
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
