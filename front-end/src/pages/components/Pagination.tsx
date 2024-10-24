import React from 'react';
import '../../styles/pagination.css'

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  const handlePageClick = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  return (
    <div className="pagination">
      <button
        onClick={() => handlePageClick(1)}
        className={currentPage === 1 ? 'active' : ''}
      >
        1
      </button>

      <button
        onClick={() => handlePageClick(2)}
        className={currentPage === 2 ? 'active' : ''}
      >
        2
      </button>

      <button
        onClick={() => handlePageClick(3)}
        className={currentPage === 3 ? 'active' : ''}
      >
        3
      </button>

      <button
        onClick={() => handlePageClick(currentPage + 1)}
        disabled={currentPage >= totalPages}
        className="next-button"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
