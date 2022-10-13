import React, { useEffect, useState } from "react";
import { Card, Row, Col, Container } from "react-bootstrap";
import ReactPaginate from "react-paginate";

export default function Pagination({ props }) {
  const [offset, setOffset] = useState(0);
  const [perPage] = useState(10);
  const [pageCount, setPageCount] = useState(0);
  const [playerData, setPlayerData] = useState([]);

  useEffect(() => {
    setPlayerData(props);
    
  }, [offset]);

  const handlePageClick = (e) => {
    const selectedPage = e.selected;
    console.log(selectedPage * perPage);

    setOffset((selectedPage + 1) * perPage);
  };
  return (
    <Container>
      <ReactPaginate
        previousLabel={"prev"}
        nextLabel={"next"}
        breakLabel={"..."}
        breakClassName={"break-me"}
        pageCount={pageCount}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={handlePageClick}
        containerClassName={"pagination"}
        subContainerClassName={"pages pagination"}
        activeClassName={"active"}
      />
    </Container>
  );
}
