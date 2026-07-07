# VisitorPass – Smart Visitor Management System

<p align="center">
  <img src="frontend/src/Image/Screenshot 2026-04-23 000604.png" alt="VisitorPass Logo" width="180"/>
</p>

<p align="center">
  <b>A Secure MERN Stack Visitor Management System with QR-Based Entry, Role-Based Authentication, Employee Approval, Complaint Management, Security Check-In/Check-Out, Analytics, and Reports.</b>
</p>

---

# Table of Contents

- Overview
- Features
- Technology Stack
- Project Structure
- Installation Guide
- Environment Variables
- Running the Application
- User Roles
- System Workflow
- Database Schema
- API Documentation
- Future Enhancements
- Author

---

# Overview

VisitorPass is a full-stack Visitor Management System developed using the MERN Stack.

The application digitizes the complete visitor entry process inside an organization.

Instead of maintaining manual visitor registers, visitors can register online, generate a QR-based visitor pass, receive approval from administrators, and check in/check out through the security department using QR code scanning.

The system also includes complaint management, employee approval workflow, dashboard analytics, reports, Excel export, pagination, searching, authentication, authorization, and role-based access control.

---

# Features

## Visitor Module

- Visitor Registration
- QR Pass Generation
- Visitor Approval Status
- Complaint Registration
- Visit History
- Profile Management
- QR Expiry Validation

---

## Admin Module

- Secure Login
- Dashboard
- Visitor Approval
- Visitor Rejection
- Complaint Management
- Employee Approval
- Reports Dashboard
- Search Visitors
- Search Complaints
- Pagination
- Excel Report Export

---

## Employee Module

- Employee Registration
- Employee Login
- Admin Approval Required
- Employee Dashboard
- Statistics Dashboard

---

## Security Module

- Security Login
- QR Code Scanner
- Visitor Check-In
- Visitor Check-Out
- Security Dashboard
- Check Logs

---

## Authentication

- JWT Authentication
- Password Hashing using bcrypt
- Protected Routes
- Role-Based Authorization

---

## Reports

- Total Visitors
- Daily Visitors
- Weekly Visitors
- Most Common Visit Purpose
- Most Common Complaint Type
- Export Visitors to Excel

---

## Search

Implemented Search Functionality in:

- Visitor Dashboard
- Employee Dashboard
- Complaint Dashboard
- Check Logs

---

## Pagination

Pagination is implemented for:

- Visitors
- Employees
- Complaints
- Check Logs

---

# Technology Stack

## Frontend

- React.js
- React Router DOM
- Axios
- Context API
- HTML5
- CSS3

---

## Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcrypt
- validator

---

## Third Party Libraries

- EmailJS
- QRCode
- html5-qrcode
- xlsx
- chart.js
- react-chartjs-2

---

# Project Structure

```
VisitorPass
│
├── backend
│   ├── controllers
│   ├── middleware
│   ├── models
│   ├── routes
│   ├── uploads
│   ├── server.js
│   └── .env
│
├── frontend
│   ├── src
│   │   ├── Authen
│   │   ├── Components
│   │   ├── Context
│   │   ├── Hooks
│   │   ├── Image
│   │   ├── pages
│   │   ├── QrEntry
│   │   ├── utils
│   │   └── api.js
│   │
│   └── package.json
│
└── README.md
```

---

# Installation Guide

## Clone Repository

```bash
git clone https://github.com/yourusername/VisitorPass.git
```

---

## Backend Setup

```bash
cd backend
npm install
```

Start backend

```bash
npm run dev
```

---

## Frontend Setup

```bash
cd frontend
npm install
npm start
```

---

# Environment Variables

Create a `.env` file inside the backend folder.

```
PORT=5000

MONGO_URL=Your MongoDB Connection String

SECRET=Your JWT Secret

EMAIL_ADMIN=Your Gmail

EMAIL_PASS=Your Gmail App Password
```

---

# Running the Application

Backend

```
http://localhost:5000
```

Frontend

```
http://localhost:3000
```

---

# User Roles

The system supports four different user roles.

## Visitor

- Register
- Login
- Generate QR
- Raise Complaint
- View Status

---

## Admin

- Manage Visitors
- Manage Complaints
- Approve Employees
- Generate Reports
- View Logs

---

## Employee

- Register
- Login
- View Dashboard
- View Statistics

---

## Security

- Scan QR
- Check-In Visitors
- Check-Out Visitors
- View Security Statistics

---

# System Workflow

Visitor Registration

↓

Admin Approval

↓

QR Pass Generated

↓

Visitor Receives QR via Email

↓

Security Scans QR

↓

Visitor Checked In

↓

Visitor Checked Out

↓

Logs Stored in Database

---

# Database Schema Documentation

## User Collection

| Field | Type | Description |
|---------|------|------------|
| name | String | User Name |
| email | String | Unique Email |
| password | String | Encrypted Password |
| role | String | user/admin/security |

---

## Employee Collection

| Field | Type |
|---------|------|
| name | String |
| email | String |
| password | String |
| department | String |
| designation | String |
| status | Pending / Approved |

---

## Visitor Collection

| Field | Type |
|---------|------|
| Name | String |
| Email | String |
| Phone | String |
| Gender | String |
| VisitDate | Date |
| VisitTime | String |
| Purpose | String |
| Employee | String |
| Status | Pending / Approved / Rejected |
| ExpiryTime | Date |

---

## Complaint Collection

| Field | Type |
|---------|------|
| Name | String |
| Email | String |
| ComplaintType | String |
| Message | String |
| Status | Pending / In Progress / Resolved |

---

## CheckLog Collection

| Field | Type |
|---------|------|
| Visitor | ObjectId |
| CheckIn | Date |
| CheckOut | Date |
| Status | Checked In / Checked Out |

---

# API Endpoint Documentation

## Authentication

### User Signup

```
POST /users/signup
```

### User Login

```
POST /users/login
```

---

## Employee

### Employee Signup

```
POST /employee/signup
```

### Employee Login

```
POST /employee/login
```

### Get Employees

```
GET /employee
```

### Approve Employee

```
PATCH /employee/:id
```

---

## Visitors

### Create Visitor

```
POST /visitors
```

### Get Visitors

```
GET /visitors
```

### Update Visitor

```
PATCH /visitors/:id
```

### Delete Visitor

```
DELETE /visitors/:id
```

---

## Complaints

### Create Complaint

```
POST /complaints
```

### Get Complaints

```
GET /complaints
```

### Update Complaint

```
PATCH /complaints/:id
```

---

## Security

### Scan QR

```
POST /checklog/scan
```

### Get Check Logs

```
GET /checklog/logs
```

### Security Statistics

```
GET /checklog/stats
```

---

# Security Features

- JWT Authentication
- Password Encryption
- Protected APIs
- Role-Based Access
- Email Verification
- QR Expiry Validation

---

# Future Enhancements

- Mobile Application
- SMS Notification
- Face Recognition
- Visitor Photo Capture
- Visitor Badge Printing
- Real-time Notifications
- Cloud Storage
- Audit Logs
- Multi-Organization Support

---

# Author

**Abdul Malik**

B.Tech Computer Science & Engineering

Full Stack MERN Developer

LinkedIn:
[Abdul Malik](https://www.linkedin.com/in/abdul-malik2004/)

GitHub:
[Abdul Malik](https://github.com/ABDUL-Malik897)

---

## License

This project is developed for educational and learning purposes.

© 2026 Abdul Malik. All Rights Reserved.
