import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <div className="flex justify-end items-center gap-4 mt-6">
      <button
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        className="px-4 py-2 border rounded disabled:opacity-50 hover:bg-gray-50 transition-colors disabled:hover:bg-white"
      >
        Previous
      </button>

      <span className="font-semibold">
        Page {currentPage} of {totalPages}
      </span>

      <button
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        className="px-4 py-2 border rounded disabled:opacity-50 hover:bg-gray-50 transition-colors disabled:hover:bg-white"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
