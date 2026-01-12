import React from 'react';
import LeaveHistoryTable from './LeaveHistoryTable';
import Pagination from './Pagination';

const LeaveHistory = ({ leaves, currentPage, totalPages, onPageChange }) => {
  return (
    <div className="bg-white p-10 rounded-lg shadow">
      <h2 className="text-3xl font-semibold mb-4">Leave History</h2>
      
      <LeaveHistoryTable leaves={leaves} />
      
      <Pagination 
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={onPageChange}
      />
    </div>
  );
};

export default LeaveHistory;
