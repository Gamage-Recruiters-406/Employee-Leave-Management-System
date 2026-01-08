# Employee Leave Management System

A modern, full-stack web application for managing employee leave requests with an intuitive user interface and robust backend API.

## 📋 Overview

The Employee Leave Management System streamlines the process of applying for, tracking, and managing employee leave requests. Built with React on the frontend and Node.js/Express on the backend, this system provides a seamless experience for both employees and administrators.

## ✨ Features

### Employee Features
- 📝 **Submit Leave Requests** - Apply for leave with start date, end date, and reason
- 📊 **View Leave History** - Track all leave requests with status indicators
- ⏱️ **Automatic Calculation** - System automatically calculates total leave days
- 🔔 **Real-time Status Updates** - See leave request status (Pending, Approved, Rejected)
- 🚪 **Secure Logout** - Safe session termination with data cleanup
- ❌ **Delete Requests** - Remove pending leave requests

### Admin Features
- 👀 **View All Requests** - Access to all employee leave requests
- ✅ **Approve/Reject Leaves** - Manage leave request approvals with reviewer tracking
- 📈 **Track Leave Records** - Monitor leave patterns and history
- 📋 **Audit Logging** - Complete audit trail of all leave-related actions

### System Features
- 🔐 **JWT Authentication** - Secure token-based authentication with HTTP-only cookies
- 📱 **Responsive Design** - Works seamlessly on desktop and mobile devices
- ⚡ **Fast Performance** - Optimized with Vite for quick load times
- 🎨 **Modern UI** - Clean interface built with Tailwind CSS
- 🔄 **Real-time Validation** - Client and server-side form validation
- 📝 **Audit Trail** - Comprehensive logging of all system actions

## 🛠️ Tech Stack

### Frontend
- **React** 19.2.0 - UI library
- **Vite** 7.2.4 - Build tool and dev server
- **Tailwind CSS** 3.4.19 - Utility-first CSS framework
- **SweetAlert2** 11.26.17 - Beautiful alert dialogs
- **Lucide React** - Icon library

### Backend
- **Node.js** - Runtime environment
- **Express** 5.2.1 - Web framework
- **MongoDB** with Mongoose 9.1.1 - Database and ODM
- **JWT** (jsonwebtoken 9.0.3) - Authentication
- **bcryptjs** 3.0.3 - Password hashing
- **cookie-parser** 1.4.7 - Cookie management

## 📁 Project Structure

```
Employee-Leave-Management-System/
├── Backend/
│   ├── controllers/
│   │   ├── authController.js
│   │   └── leaveController.js
│   ├── middleware/
│   │   └── authMiddleware.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Leave.js
│   │   └── AuditLog.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   └── leaveRoutes.js
│   ├── config/
│   ├── helpers/
│   ├── server.js
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Header.jsx
│   │   │   ├── LeaveApplicationForm.jsx
│   │   │   ├── LeaveHistory.jsx
│   │   │   ├── LeaveHistoryTable.jsx
│   │   │   ├── Pagination.jsx
│   │   │   └── StatusBadge.jsx
│   │   ├── pages/
│   │   │   └── LeaveApplicationPage.jsx
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── public/
│   ├── package.json
│   └── vite.config.js
│
└── README.md
```

## 🗄️ Database Schema

### User Entity
```
User {
  _id: ObjectId
  name: String
  email: String (unique)
  phoneNumber: String
  password: String (hashed)
  role: String (employee/admin)
}
```

### Leave Request Entity
```
LeaveRequest {
  id: ObjectId
  userId: ObjectId (ref: User)
  startDate: Date
  endDate: Date
  reason: String
  totalDays: Number
  status: String (Pending/Approved/Rejected)
  reviewBy: ObjectId (ref: User - admin who reviewed)
}
```

### Audit Log Entity
```
AuditLog {
  _id: ObjectId
  userId: ObjectId (ref: User)
  leaveId: ObjectId (ref: LeaveRequest)
  action: String
  time: Date
}
```

### Relationships
- **User → Leave Request** (1:M) - One user can have multiple leave requests
- **User → Review** (1:M) - One admin can review multiple leave requests
- **Leave Request → Audit Log** (1:M) - One leave request can have multiple audit entries

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (running instance)
- npm or yarn package manager

### Backend Setup

1. Navigate to the Backend directory:
```bash
cd Backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the Backend directory:
```env
PORT=8083
DEV_MODE=development
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
```

4. Start the backend server:
```bash
npm run dev
```

The backend server will run on `http://localhost:8083`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The frontend will run on `http://localhost:5173`

## 📡 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
  - Body: `{ name, email, phoneNumber, password, role }`
- `POST /api/auth/login` - User login
  - Body: `{ email, password }`

### Leave Management (Employee)
- `POST /leaves` - Create a new leave request
  - Body: `{ startDate, endDate, reason }`
  - Auth: Required (JWT Token)
- `GET /leaves/my` - Get current user's leave requests
  - Auth: Required (JWT Token)
- `DELETE /leaves/:id` - Delete a leave request
  - Auth: Required (JWT Token)

### Leave Management (Admin)
- `GET /leaves/admin/all` - Get all leave requests
  - Auth: Required (Admin role)
- `PUT /leaves/admin/:id/status` - Update leave request status
  - Body: `{ status }` (Approved/Rejected)
  - Auth: Required (Admin role)
  - Note: Automatically records reviewer information and creates audit log

## 💻 Usage

### For Employees

1. **Login** to the system with your credentials
2. **Apply for Leave**:
   - Select start date and end date
   - Provide a reason for leave
   - Click Submit
3. **View Leave History** - See all your past and pending requests with status
4. **Logout** - Securely end your session

### For Administrators

1. **Login** with admin credentials
2. **View All Requests** - Access complete leave request list
3. **Manage Requests**:
   - Approve or reject leave requests
   - View employee leave history
   - Review information is automatically recorded
4. **Monitor** - Track leave patterns and statistics
5. **Audit Trail** - Review complete history of all actions

## 📊 Data Flow & System Architecture

### Leave Request Workflow
1. **Employee** submits a leave request with dates and reason
2. **System** validates dates and calculates total days
3. **Request** is stored in database with "Pending" status
4. **Admin** reviews the request
5. **Admin** approves/rejects the request
6. **System** records reviewer information (review by field)
7. **Audit Log** is created with action details (user, leave, action, timestamp)
8. **Employee** can view updated status in leave history

### User Roles
- **Employee**: Can create, view own requests, and delete pending requests
- **Admin**: Can view all requests, approve/reject, and access audit logs

## 🔒 Security Features

- JWT token-based authentication
- HTTP-only cookies for secure token storage
- Password hashing with bcryptjs
- Protected API routes with middleware
- Role-based access control (Employee/Admin)
- Client-side and server-side validation
- CORS configuration for API security
- Audit logging for accountability and traceability

## 🎨 UI Components

- **Header** - Navigation and user information
- **LeaveApplicationForm** - Form for submitting leave requests
- **LeaveHistory** - Table view of leave requests with pagination
- **StatusBadge** - Visual indicators for leave status
- **Pagination** - Navigate through leave history

## 📝 Leave Request Validation

- Start date must be today or a future date
- End date cannot be before start date
- All fields (dates and reason) are required
- Automatic calculation of total leave days
- Real-time form validation with user feedback
- Duplicate request prevention
- Status tracking (Pending → Approved/Rejected)

## 🔍 Key Features Explained

### Audit Logging
Every significant action in the system is logged:
- User who performed the action
- Leave request affected
- Type of action (Create, Approve, Reject, Delete)
- Timestamp of the action

This provides complete traceability and accountability for compliance and monitoring purposes.

### Reviewer Tracking
When an admin approves or rejects a leave request:
- The admin's user ID is stored in the `reviewBy` field
- The action is logged in the audit trail
- Employees can see who reviewed their request

### Role-Based Access
- **Employees** can only view and manage their own leave requests
- **Admins** have full access to all requests and can approve/reject them
- Middleware enforces role-based permissions on protected routes

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.

## 👥 Authors

**Gamage Recruiters**

## 🙏 Acknowledgments

- React and Vite communities
- Tailwind CSS team
- MongoDB and Mongoose developers
- Express.js contributors

---

For any questions or support, please open an issue in the repository.