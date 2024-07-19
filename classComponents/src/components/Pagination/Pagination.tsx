interface PaginationProps {
  currentPage: number;
  onPageChange: (page: number) => void;
  totalResults: number;
  resultsPerPage: number;
}

const Pagination = ({ currentPage, onPageChange, totalResults, resultsPerPage }: PaginationProps) => {
  const totalPages = Math.ceil(totalResults / resultsPerPage);

  const handlePrevious = () => {
    if (currentPage > 1) onPageChange(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) onPageChange(currentPage + 1);
  };

  return (
    <div className="pagination">
      <button onClick={handlePrevious} disabled={currentPage === 1}>
        Previous
      </button>
      <span>Page {currentPage} of {totalPages}</span>
      <button onClick={handleNext} disabled={currentPage === totalPages}>
        Next
      </button>
    </div>
  );
};

export default Pagination;