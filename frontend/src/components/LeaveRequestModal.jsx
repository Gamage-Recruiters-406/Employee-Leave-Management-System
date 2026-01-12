import React from "react";

const LeaveRequestModal = ({ request, action, onClose, onApprove, onReject }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isApprove = action === 'approve';

  const handleSendEmail = async () => {
    setIsSubmitting(true);
    if (isApprove) {
      await onApprove(request.id);
    } else {
      await onReject(request.id);
    }
    setIsSubmitting(false);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
        {/* Header */}
        <div className="bg-blue-700 text-white px-6 py-4 rounded-t-lg flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Mail className="w-6 h-6" />
            <h2 className="text-xl font-semibold">Send Email</h2>
          </div>
          <button
            onClick={onClose}
            className="hover:bg-blue-600 p-1 rounded transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-4">
          <div className="space-y-3">
            <div>
              <span className="font-semibold text-gray-800">Employee Id: </span>
              <span className="text-gray-600">{request.employeeId}</span>
            </div>

            <div>
              <span className="font-semibold text-gray-800">Employee Name: </span>
              <span className="text-gray-600">{request.employeeName}</span>
            </div>

            <div>
              <span className="font-semibold text-gray-800">Employee Email: </span>
              <span className="text-gray-600">{request.employeeEmail}</span>
            </div>

            <div>
              <span className="font-semibold text-gray-800">Leave Type: </span>
              <span className="text-gray-600">{request.leaveType || 'Annual Leave'}</span>
            </div>

            <div>
              <span className="font-semibold text-gray-800">Start Date: </span>
              <span className="text-gray-600">{request.startDate}</span>
            </div>

            <div>
              <span className="font-semibold text-gray-800">End Date: </span>
              <span className="text-gray-600">{request.endDate}</span>
            </div>

            <div>
              <span className="font-semibold text-gray-800">Reason: </span>
              <span className="text-gray-600">{request.reason}</span>
            </div>
          </div>

          {/* Status Badge */}
          <div className="flex items-center gap-3 py-3">
            <div className={`flex items-center gap-2 ${
              isApprove ? 'text-green-600' : 'text-red-600'
            }`}>
              {isApprove ? (
                <div className="bg-green-500 rounded p-1">
                  <Check className="w-5 h-5 text-white" />
                </div>
              ) : (
                <div className="bg-red-500 rounded p-1">
                  <X className="w-5 h-5 text-white" />
                </div>
              )}
              <span className="text-xl font-semibold">
                {isApprove ? 'Approved' : 'Rejected'}
              </span>
            </div>
          </div>

          {/* Send Email Button */}
          <button
            onClick={handleSendEmail}
            disabled={isSubmitting}
            className="w-full bg-blue-700 hover:bg-blue-800 text-white font-semibold py-3 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Sending...' : 'Send Email'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default LeaveRequestModal;