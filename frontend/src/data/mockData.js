// Mock leave request data
export const mockLeaveRequests = [
  {
    id: 1,
    employeeId: 'FR-EM-010',
    employeeName: 'John Doe',
    employeeEmail: 'john.doe@company.com',
    startDate: '2025-08-01',
    endDate: '2025-08-02',
    totalDays: 1,
    reason: 'Vacation',
    leaveType: 'Annual Leave',
    status: 'Approved',
    appliedDate: '2025-07-15'
  },
  {
    id: 2,
    employeeId: 'FR-EM-002',
    employeeName: 'Jane Smith',
    employeeEmail: 'jane.smith@company.com',
    startDate: '2025-10-01',
    endDate: '2025-10-10',
    totalDays: 9,
    reason: 'Health issues',
    leaveType: 'Sick Leave',
    status: 'Rejected',
    appliedDate: '2025-09-20'
  },
  {
    id: 3,
    employeeId: 'FR-EM-008',
    employeeName: 'Mike Johnson',
    employeeEmail: 'mike.johnson@company.com',
    startDate: '2025-10-10',
    endDate: '2025-10-20',
    totalDays: 10,
    reason: 'Family time',
    leaveType: 'Annual Leave',
    status: 'Pending',
    appliedDate: '2025-09-25'
  },
  {
    id: 4,
    employeeId: 'FR-EM-015',
    employeeName: 'Sarah Williams',
    employeeEmail: 'sarah.williams@company.com',
    startDate: '2025-11-05',
    endDate: '2025-11-12',
    totalDays: 7,
    reason: 'Wedding ceremony',
    leaveType: 'Personal Leave',
    status: 'Pending',
    appliedDate: '2025-10-01'
  }
];

export default mockLeaveRequests;