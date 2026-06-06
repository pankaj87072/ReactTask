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
    justifyContent: "center",
    alignItems: "center",
    gap: "15px",
    marginTop: "20px",
  }}
>
  <button
    onClick={handlePrev}
    disabled={currentPage === 1}
    style={{
      padding: "8px 14px",
      borderRadius: "6px",
      border: "none",
      cursor: "pointer",
    }}
  >
    ◀ Prev
  </button>

  <span style={{ fontWeight: "600" }}>
    Page {currentPage}
  </span>

  <button
    onClick={handleNext}
    disabled={currentPage === totalPages}
    style={{
      padding: "8px 14px",
      borderRadius: "6px",
      border: "none",
      cursor: "pointer",
    }}
  >
    Next ▶
  </button>
</div>
  );
}

export default Pagination;