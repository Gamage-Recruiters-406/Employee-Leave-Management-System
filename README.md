# 🏢 Employee Leave Management System

A modern, full-stack web application for managing employee leave requests with an intuitive user interface and robust backend API.

## 📋 Table of Contents
- [Overview](#-overview)
- [Features](#-features)
- [Tech Stack](#️-tech-stack)
- [Project Structure](#-project-structure)
- [Installation & Setup](#-installation--setup)
- [API Endpoints](#-api-endpoints)
- [Environment Variables](#-environment-variables)
- [Database Schema](#-database-schema)
- [Usage Guide](#-usage-guide)
- [Screenshots](#-screenshots)
- [Contributing](#-contributing)
- [License](#-license)

## 📋 Overview

The Employee Leave Management System streamlines the process of applying for, tracking, and managing employee leave requests. Built with React on the frontend and Node.js/Express on the backend, this system provides a seamless experience for employees to manage their leave applications efficiently.

### Key Highlights
- 🎯 **Role-Based Access** - Employee and Admin roles with specific permissions
- 🔒 **Secure Authentication** - JWT-based authentication with HTTP-only cookies
- 📊 **Leave Tracking** - Complete history and status tracking for all leave requests
- ⚡ **Real-time Updates** - Instant feedback on leave request submissions
- 📱 **Responsive Design** - Works perfectly on all devices

## ✨ Features

### 👤 Employee Features
- ✅ **User Registration & Login** - Secure account creation and authentication
- 📝 **Submit Leave Requests** - Apply for leave with start date, end date, and reason
- 📊 **View Leave History** - Track all submitted leave requests with pagination
- ⏱️ **Automatic Calculation** - System automatically calculates total leave days
- 🔔 **Real-time Status Updates** - View status (Pending, Approved, Rejected) with color-coded badges
- ✏️ **Update Leave Requests** - Modify pending leave requests before approval
- ❌ **Delete Requests** - Remove pending leave requests
- 🚪 **Secure Logout** - Safe session termination with data cleanup
- 👤 **Personalized Dashboard** - Display user name dynamically in header

### 🔐 Security Features
- 🔒 **JWT Authentication** - Secure token-based authentication
- 🍪 **HTTP-only Cookies** - Protected cookie storage for tokens
- 🔑 **Password Hashing** - Bcrypt encryption for all passwords
- 🛡️ **Protected Routes** - Middleware-based route protection
- ✅ **Input Validation** - Client and server-side validation
- 📝 **Audit Logging** - Complete audit trail of all actions

### 🎨 UI/UX Features
- 🎨 **Modern Interface** - Clean, professional design with Tailwind CSS
- 📱 **Fully Responsive** - Mobile-first design approach
- 🔔 **Beautiful Alerts** - SweetAlert2 notifications for user feedback
- 🎯 **Intuitive Navigation** - Easy-to-use interface
- 🌈 **Status Badges** - Color-coded status indicators (Pending/Approved/Rejected)
- 📄 **Pagination** - Efficient data display with pagination controls

## 🛠️ Tech Stack

### Frontend
- **React** 19.2.0 - Modern UI library for building user interfaces
- **Vite** 7.2.4 - Next-generation frontend build tool
- **React Router DOM** 7.11.0 - Declarative routing for React
- **Tailwind CSS** 3.4.19 - Utility-first CSS framework
- **SweetAlert2** 11.26.17 - Beautiful, responsive alert dialogs
- **Lucide React** 0.562.0 - Modern icon library
- **React Icons** 5.5.0 - Popular icon library
- **React Feather** 2.0.10 - Feather icons for React

### Backend
- **Node.js** - JavaScript runtime environment
- **Express** 5.2.1 - Fast, minimalist web framework
- **MongoDB** - NoSQL database for flexible data storage
- **Mongoose** 9.1.1 - Elegant MongoDB object modeling
- **JWT** (jsonwebtoken 9.0.3) - Secure authentication tokens
- **bcryptjs** 3.0.3 - Password hashing and encryption
- **cookie-parser** 1.4.7 - Parse and manage HTTP cookies
- **cors** 2.8.5 - Enable Cross-Origin Resource Sharing
- **dotenv** 17.2.3 - Environment variable management
- **colors** 1.4.0 - Console output styling

### Development Tools
- **Nodemon** 3.1.11 - Auto-restart server during development
- **ESLint** 9.39.1 - Code linting and quality checks
- **PostCSS** 8.5.6 - CSS transformation tool
- **Autoprefixer** 10.4.23 - Automatic CSS vendor prefixing

```
Employee-Leave-Management-System/
├── Backend/
│   ├── config/
│   │   └── db.js                     # Database configuration
│   ├── controllers/
│   │   ├── authController.js         # Authentication logic (register, login)
│   │   └── leaveController.js        # Leave management logic
│   ├── helpers/
│   │   └── authHelper.js             # Password hashing utilities
│   ├── middleware/
│   │   └── authMiddleware.js         # JWT verification & role checks
│   ├── models/
│   │   ├── AuditLog.js               # Audit log schema
│   │   ├── Leave.js                  # Leave request schema
│   │   └── User.js                   # User schema
│   ├── routes/
│   │   ├── authRoutes.js             # Authentication routes
│   │   └── leaveRoutes.js            # Leave management routes
│   ├── .env                          # Environment variables
│   ├── package.json                  # Backend dependencies
│   └── server.js                     # Main server file
│
├── frontend/
│   ├── public/                       # Static assets
│   ├── src/
│   │   ├── assets/                   # Images, fonts, etc.
│   │   ├── components/
│   │   │   ├── AlertNotification.jsx # Alert component
│   │   │   ├── Header.jsx            # App header with user info
│   │   │   ├── LeaveApplicationForm.jsx # Leave request form
│   │   │   ├── LeaveHistory.jsx      # Leave history container
│   │   │   ├── LeaveHistoryTable.jsx # Leave table display
│   │   │   ├── LeaveRequestModal.jsx # Admin leave request modal
│   │   │   ├── Pagination.jsx        # Pagination controls
│   │   │   ├── SendEmailModal.jsx    # Email notification modal
│   │   │   ├── StatsCard.jsx         # Statistics card component
│   │   │   └── StatusBadge.jsx       # Status indicator component
│   │   ├── data/
│   │   │   └── mockData.js           # Mock data for testing
│   │   ├── pages/
│   │   │   ├── AdminDashboard.jsx    # Admin dashboard (view/approve/reject)
│   │   │   ├── LeaveApplicationPage.jsx # Employee dashboard
│   │   │   ├── Login.jsx             # Login page
│   │   │   └── Register.jsx          # Registration page
│   │   ├── services/
│   │   │   └── api.jsx               # API service layer
│   │   ├── App.css                   # App styles
│   │   ├── App.jsx                   # Main app component
│   │   ├── index.css                 # Global styles
│   │   └── main.jsx                  # Entry point
│   ├── .env                          # Frontend environment variables
│   ├── eslint.config.js              # ESLint configuration
│   ├── index.html                    # HTML template
│   ├── package.json                  # Frontend dependencies
│   ├── postcss.config.js             # PostCSS configuration
│   ├── tailwind.config.js            # Tailwind CSS configuration
│   └── vite.config.js                # Vite configuration
│
└── README.md                         # Project documentation
```

## 🗄️ Database Schema

### User Model
```javascript
{
  _id: ObjectId,
  name: String (required, trimmed),
  email: String (required, unique, lowercase, validated),
  password: String (required, hashed, min: 6 chars),
  phone: String (required),
  role: String (enum: ['Employee', 'Admin'], default: 'Employee'),
  timestamps: true
}
```

### Leave Request Model
```javascript
{
  _id: ObjectId,
  userId: ObjectId (ref: 'User', required),
  startDate: Date (required),
  endDate: Date (required),
  reason: String (required, trimmed),
  totalDays: Number (required),
  status: String (enum: ['Pending', 'Approved', 'Rejected'], default: 'Pending'),
  reviewBy: ObjectId (ref: 'User'),
  timestamps: true
}
```

### Audit Log Model
```javascript
{
  _id: ObjectId,
  userId: ObjectId (ref: 'User', required),
  leaveId: ObjectId (ref: 'Leave'),
  action: String (required),
  timestamp: Date (default: Date.now)
}
```

### Database Relationships
- **User → Leave** (1:M) - One user can submit multiple leave requests
- **Admin → Leave Reviews** (1:M) - One admin can review multiple leaves
- **Leave → Audit Logs** (1:M) - One leave can have multiple audit entries

## 🚀 Installation & Setup

### Prerequisites
- **Node.js** (v16 or higher) - [Download](https://nodejs.org/)
- **MongoDB** (v4.4 or higher) - [Download](https://www.mongodb.com/try/download/community)
- **npm** or **yarn** package manager
- **Git** - [Download](https://git-scm.com/)

### Step 1: Clone the Repository
```bash
git clone https://github.com/Gamage-Recruiters-406/Employee-Leave-Management-System.git
cd Employee-Leave-Management-System
```

### Step 2: Backend Setup

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
MONGODB_URI=mongodb://localhost:27017/employee-leave-system
JWT_SECRET=your_super_secret_key_change_this_in_production
```

4. Start MongoDB (if not running):
```bash
# Windows
net start MongoDB

# macOS/Linux
sudo systemctl start mongod
```

5. Start the backend server:
```bash
# Development mode (with auto-restart)
npm run dev

# Production mode
npm start
```

Backend server will run on `http://localhost:8083`

### Step 3: Frontend Setup

1. Open a new terminal and navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the frontend directory (optional):
```env
VITE_API_BASE_URL=http://localhost:8083
```

4. Start the development server:
```bash
npm run dev
```

Frontend will run on `http://localhost:5173`

### Step 4: Create Admin Account (Optional)

To create an admin account for testing:

1. **Method 1: Using Registration Page**
   - Navigate to `http://localhost:5173/register`
   - Fill in the registration form
   - Select **"Admin"** from the Role Type dropdown
   - Complete registration

2. **Method 2: Update Existing User in MongoDB**
   - Open MongoDB Compass or MongoDB Shell
   - Find your database: `employee-leave-system`
   - Go to `users` collection
   - Update any user's role field to `"Admin"`

**Default Test Admin Credentials** (Create these for testing):
```
Email: admin@company.com
Password: admin123
Name: Admin User
Phone: 1234567890
Role: Admin
```

**Default Test Employee Credentials** (Create these for testing):
```
Email: employee@company.com
Password: employee123
Name: John Doe
Phone: 0987654321
Role: Employee
```

### Step 5: Access the Application

Open your browser and navigate to:
- **Frontend**: `http://localhost:5173`
- **Backend API**: `http://localhost:8083`

**Login with your credentials:**
- Admin users → Redirected to Admin Dashboard
- Employee users → Redirected to Leave Application Page

## 📡 API Endpoints

### Authentication Routes (`/api/auth`)

#### Register User
```http
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "phone": "1234567890",
  "role": "Employee"
}

Response: 201 Created
{
  "success": true,
  "message": "User registered successfully",
  "user": {
    "name": "John Doe",
    "email": "john@example.com",
    "role": "Employee"
  }
}
```

#### Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}

Response: 200 OK
{
  "success": true,
  "message": "Login successful",
  "user": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "Employee"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### Leave Management Routes - Employee (`/leaves`)

#### Create Leave Request
```http
POST /leaves
Authorization: Bearer <token>
Content-Type: application/json

{
  "startDate": "2026-01-15",
  "endDate": "2026-01-17",
  "reason": "Personal leave"
}

Response: 201 Created
{
  "success": true,
  "message": "Leave created successfully",
  "leave": { ... }
}
```

#### Get My Leave Requests
```http
GET /leaves/my
Authorization: Bearer <token>

Response: 200 OK
[
  {
    "_id": "507f1f77bcf86cd799439011",
    "startDate": "2026-01-15T00:00:00.000Z",
    "endDate": "2026-01-17T00:00:00.000Z",
    "reason": "Personal leave",
    "totalDays": 3,
    "status": "Pending",
    "userId": { ... }
  }
]
```

#### Update My Leave Request
```http
PUT /leaves/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "startDate": "2026-01-16",
  "endDate": "2026-01-18",
  "reason": "Updated reason"
}

Response: 200 OK
{
  "success": true,
  "message": "Leave updated successfully",
  "leave": { ... }
}
```

#### Delete Leave Request
```http
DELETE /leaves/:id
Authorization: Bearer <token>

Response: 200 OK
{
  "success": true,
  "message": "Leave deleted successfully"
}
```

### Leave Management Routes - Admin (`/leaves/admin`)

#### Get All Leave Requests
```http
GET /leaves/admin/all
Authorization: Bearer <admin-token>

Response: 200 OK
[
  {
    "_id": "...",
    "userId": { "name": "John Doe", "email": "..." },
    "startDate": "2026-01-15T00:00:00.000Z",
    "endDate": "2026-01-17T00:00:00.000Z",
    "reason": "Personal leave",
    "totalDays": 3,
    "status": "Pending"
  }
]
```

#### Update Leave Status (Approve/Reject)
```http
PUT /leaves/admin/:id/status
Authorization: Bearer <admin-token>
Content-Type: application/json

{
  "status": "Approved"
}

Response: 200 OK
{
  "success": true,
  "message": "Leave status updated successfully",
  "leave": { ... }
}
```

#### Get Audit Logs
```http
GET /leaves/admin/audit-logs
Authorization: Bearer <admin-token>

Response: 200 OK
[
  {
    "_id": "...",
    "userId": { "name": "John Doe" },
    "leaveId": "...",
    "action": "Leave Approved",
    "timestamp": "2026-01-09T10:30:00.000Z"
  }
]
```

## 🔧 Environment Variables

### Backend (.env)
```env
# Server Configuration
PORT=8083
DEV_MODE=development

# Database
MONGODB_URI=mongodb://localhost:27017/employee-leave-system

# Authentication
JWT_SECRET=your_super_secret_jwt_key_change_in_production
```

### Frontend (.env)
```env
# API Configuration
VITE_API_BASE_URL=http://localhost:8083
```

## 💻 Usage Guide

### 🔑 Test Credentials

For testing purposes, create these accounts:

#### Admin Account
```
Email: admin@company.com
Password: admin123
Name: Admin User
Phone: 1234567890
Role: Admin
```

#### Employee Account
```
Email: employee@company.com
Password: employee123
Name: John Doe
Phone: 0987654321
Role: Employee
```

**Note**: Register these accounts using the registration page (`/register`) or create them directly in MongoDB.

---

### For Employees

#### 1. Registration
1. Navigate to `/register`
2. Fill in your details:
   - Full Name (letters and spaces only)
   - Email Address (valid email format)
   - Phone Number (minimum 10 digits)
   - Password (minimum 6 characters)
   - Confirm Password
   - Role (select "Employee")
3. Click "Create Account"

#### 2. Login
1. Navigate to `/login`
2. Enter your email and password
3. Click "Sign In"
4. You'll be redirected to the Leave Application Page

#### 3. Apply for Leave
1. Select **Start Date** from the date picker
2. Select **End Date** from the date picker
3. Enter **Reason** for leave in the text area
4. Click **Submit** button
5. Confirmation alert will appear
6. Request appears in Leave History with "Pending" status

#### 4. View Leave History
- See all your leave requests in the table
- Status indicators:
  - 🟠 **Pending** - Waiting for approval
  - 🟢 **Approved** - Leave approved
  - 🔴 **Rejected** - Leave rejected
- Use pagination to navigate through multiple requests

#### 5. Update Leave Request
1. Find your pending leave request
2. Click "Edit" button
3. Modify dates or reason
4. Click "Update"
5. Note: Only pending requests can be edited

#### 6. Delete Leave Request
1. Find your pending leave request
2. Click "Delete" button
3. Confirm deletion
4. Request will be removed

#### 7. Logout
- Click the **Logout** button in the header
- Confirmation dialog appears
- Session data is cleared
- Redirected to login page

## 📊 Features Explained

### Authentication System
- **Registration**: Secure account creation with validation
- **Login**: JWT token-based authentication
- **Session Management**: HTTP-only cookies for security
- **Auto-login**: Token persistence for returning users
- **Secure Logout**: Complete session cleanup

### Leave Request System
- **Date Selection**: Calendar-based date pickers
- **Auto-calculation**: Total days computed automatically
- **Validation**: Prevents invalid date ranges
- **Status Tracking**: Real-time status updates
- **History**: Complete record of all requests

### User Interface
- **Responsive Design**: Works on all screen sizes
- **Modern UI**: Clean, professional interface
- **Color-coded Status**: Easy visual identification
- **Pagination**: Efficient data presentation
- **Alerts**: User-friendly notifications
- **Form Validation**: Real-time input feedback

### Security Features
- 🔒 **Password Hashing**: Bcrypt encryption
- 🔑 **JWT Tokens**: Secure authentication
- 🍪 **HTTP-only Cookies**: XSS protection
- 🛡️ **Protected Routes**: Middleware authorization
- ✅ **Input Validation**: SQL injection prevention
- 🔐 **Role-based Access**: Permission control

## 🎨 Customization

### Change Theme Colors
Edit `frontend/tailwind.config.js`:
```javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: '#your-color',
        secondary: '#your-color'
      }
    }
  }
}
```

### Modify API Port
Edit `Backend/.env`:
```env
PORT=your_preferred_port
```

### Update Database Name
Edit `Backend/.env`:
```env
MONGODB_URI=mongodb://localhost:27017/your_database_name
```

## 🐛 Troubleshooting

### Backend Issues

**Problem**: "Cannot connect to MongoDB"
```bash
Solution:
1. Ensure MongoDB is running
2. Check MONGODB_URI in .env
3. Verify MongoDB connection string
```

**Problem**: "Port already in use"
```bash
Solution:
1. Change PORT in Backend/.env
2. Or kill the process using the port:
   Windows: netstat -ano | findstr :8083
   Linux/Mac: lsof -i :8083
```

### Frontend Issues

**Problem**: "API connection failed"
```bash
Solution:
1. Ensure backend is running
2. Check VITE_API_BASE_URL in frontend/.env
3. Verify CORS settings in backend
```

**Problem**: "Dependencies installation failed"
```bash
Solution:
1. Delete node_modules folder
2. Delete package-lock.json
3. Run: npm install
```

## 📚 Additional Resources
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

## 📚 Additional Resources

- [React Documentation](https://react.dev/)
- [Express.js Guide](https://expressjs.com/)
- [MongoDB Manual](https://docs.mongodb.com/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [JWT.io](https://jwt.io/)
- [Vite Documentation](https://vitejs.dev/)

## 🔄 Development Workflow

### Building for Production

#### Backend
```bash
cd Backend
npm start
```

#### Frontend
```bash
cd frontend
npm run build
npm run preview
```

### Code Quality

#### Run Linting
```bash
cd frontend
npm run lint
```

#### Fix Linting Issues
```bash
npm run lint -- --fix
```

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/YourFeatureName
   ```
3. **Commit your changes**
   ```bash
   git commit -m "Add: Your feature description"
   ```
4. **Push to the branch**
   ```bash
   git push origin feature/YourFeatureName
   ```
5. **Open a Pull Request**

### Commit Message Guidelines
- `Add:` New feature or functionality
- `Fix:` Bug fix
- `Update:` Update existing functionality
- `Remove:` Remove code or files
- `Refactor:` Code refactoring
- `Docs:` Documentation changes

## 📜 License

This project is licensed under the **MIT License**.

```
MIT License

Copyright (c) 2026 Gamage Recruiters

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

## 👥 Team

**Gamage Recruiters - 406**

## 📞 Support

For issues, questions, or suggestions:
- Create an issue on [GitHub](https://github.com/Gamage-Recruiters-406/Employee-Leave-Management-System/issues)
- Email: support@gamage-recruiters.com

## 🎯 Future Enhancements

- [ ] Email notifications for leave approvals/rejections
- [ ] Leave balance tracking
- [ ] Calendar view for leave requests
- [ ] Department-wise leave management
- [ ] Leave type categorization (Sick, Vacation, Personal, etc.)
- [ ] Manager approval workflow
- [ ] Export leave reports (PDF, Excel)
- [ ] Dashboard analytics and charts
- [ ] Mobile app development
- [ ] Multiple language support
- [ ] Leave carry-forward functionality
- [ ] Holiday calendar integration
- [ ] Bulk leave operations
- [ ] Advanced filtering and search

## 📊 Project Statistics

- **Total Lines of Code**: 3000+
- **React Components**: 10+
- **API Endpoints**: 10+
- **Database Models**: 3
- **Total Dependencies**: 25+
- **Test Coverage**: Coming soon

## 🌟 Acknowledgments

- React team for the amazing framework
- MongoDB team for the flexible database solution
- Tailwind CSS for beautiful and efficient styling
- Express.js community for the robust backend framework
- SweetAlert2 for elegant alert dialogs
- All open-source contributors

## 🚀 Quick Start Commands

```bash
# Clone repository
git clone https://github.com/Gamage-Recruiters-406/Employee-Leave-Management-System.git

# Backend setup
cd Backend
npm install
npm run dev

# Frontend setup (in new terminal)
cd frontend
npm install
npm run dev
```

## 📸 Screenshots

*Coming soon - Screenshots will be added to showcase the application interface*

## 🔗 Related Projects

- [HR Management System](https://github.com/)
- [Employee Attendance System](https://github.com/)
- [Payroll Management](https://github.com/)

---

<div align="center">

### ⭐ Star this repository if you find it helpful!

**Made with ❤️ by Gamage Recruiters - 406**

[🐛 Report Bug](https://github.com/Gamage-Recruiters-406/Employee-Leave-Management-System/issues) · [✨ Request Feature](https://github.com/Gamage-Recruiters-406/Employee-Leave-Management-System/issues) · [📖 Documentation](https://github.com/Gamage-Recruiters-406/Employee-Leave-Management-System#readme)

**Version 1.0.0** | **Last Updated: January 2026**

</div>

---

## 📋 System Requirements

### Minimum Requirements
- **OS**: Windows 10, macOS 10.15, or Linux
- **RAM**: 4GB
- **Storage**: 500MB free space
- **Node.js**: v16 or higher
- **MongoDB**: v4.4 or higher
- **Browser**: Chrome 90+, Firefox 88+, Edge 90+, Safari 14+

### Recommended Requirements
- **RAM**: 8GB or more
- **Storage**: 1GB free space
- **Node.js**: v18 or higher (LTS)
- **MongoDB**: v6.0 or higher

---

*This README was last updated on January 9, 2026. For the most recent information, please check the repository.*