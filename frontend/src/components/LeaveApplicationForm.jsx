import React from 'react';

const LeaveApplicationForm = ({ formData, onFormChange, onSubmit, onCancel }) => {
  return (
    <div className="bg-white p-10 rounded-lg shadow mb-8">
      <h2 className="text-3xl font-semibold mb-4">Apply for Leave</h2>

      <div className="grid grid-cols-2 gap-6 mb-6">
        <input
          type="date"
          className="p-4 border rounded"
          value={formData.startDate}
          onChange={(e) => onFormChange({ ...formData, startDate: e.target.value })}
        />
        <input
          type="date"
          className="p-4 border rounded"
          value={formData.endDate}
          onChange={(e) => onFormChange({ ...formData, endDate: e.target.value })}
        />
      </div>

      <input
        type="text"
        className="w-full p-4 border rounded mb-6"
        placeholder="Reason (optional)"
        value={formData.reason}
        onChange={(e) => onFormChange({ ...formData, reason: e.target.value })}
      />

      <div className="flex justify-end gap-4">
        <button 
          onClick={onCancel}
          className="px-6 py-4 border rounded hover:bg-gray-50 transition-colors"
        >
          Cancel
        </button>
        <button
          onClick={onSubmit}
          className="px-6 py-4 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default LeaveApplicationForm;
