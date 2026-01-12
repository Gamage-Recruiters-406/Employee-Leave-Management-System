import React from 'react';
import StatusBadge from './StatusBadge';

const LeaveHistoryTable = ({ leaves }) => {
  return (
    <table className="w-full border text-xl">
      <thead className="bg-blue-600 text-white">
        <tr>
          <th className="p-4 text-left">Start Date</th>
          <th className="p-4 text-left">End Date</th>
          <th className="p-4 text-left">Days</th>
          <th className="p-4 text-left">Reason</th>
          <th className="p-4 text-left">Status</th>
        </tr>
      </thead>
      <tbody>
        {leaves.map((leave) => (
          <tr key={leave.id} className="border-b hover:bg-gray-50 transition-colors">
            <td className="p-4">{leave.startDate}</td>
            <td className="p-4">{leave.endDate}</td>
            <td className="p-4">{leave.totalDays}</td>
            <td className="p-4">{leave.reason}</td>
            <td className="p-4">
              <StatusBadge status={leave.status} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default LeaveHistoryTable;
