import React from 'react';

const StatusBadge = ({ status }) => {
  const getStatusBadge = (status) => {
    switch (status) {
      case 'Approved':
        return 'bg-green-100 text-green-700';
      case 'Pending':
        return 'bg-orange-100 text-orange-700';
      case 'Rejected':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };

  return (
    <span className={`px-4 py-1 rounded-full font-semibold ${getStatusBadge(status)}`}>
      {status}
    </span>
  );
};

export default StatusBadge;
