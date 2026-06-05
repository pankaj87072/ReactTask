import { useState } from "react";

function Pagination({currentPage,setCurrentPage,totalPages = 5}) {

  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "10px",
        justifyContent: "center",
        marginTop: "20px",
      }}
    >
      {/* Previous Button */}
      <button onClick={handlePrev} disabled={currentPage === 1}>
        ◀
      </button>
      {currentPage}
      {/* Next Button */}
      <button onClick={handleNext} disabled={currentPage === totalPages}>
        ▶
      </button>
    </div>
  );
}

export default Pagination;