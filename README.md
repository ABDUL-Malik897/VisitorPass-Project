# VisitorPass - Visitor Pass Management System

## Overview

VisitorPass is a full-stack MERN application designed to digitize and streamline visitor management for offices, colleges, residential societies, and organizations.

The system allows users to register visitor requests, generate QR-based visitor passes, track request status, submit complaints, and receive approval updates. Administrators can review visitor requests, approve or reject entries, manage complaints, and view analytical reports.

---

## Features

### User Features

* User Registration & Login
* JWT Authentication
* Generate Visitor Entry Requests
* QR Code Generation for Approved Requests
* Real-Time Request Status Tracking
* Complaint Submission System
* Complaint Status Monitoring
* Profile Dashboard
* Automatic QR Expiry Handling
* Visit Completion Tracking

### Admin Features

* Secure Admin Dashboard
* Approve Visitor Requests
* Reject Visitor Requests
* Mark Visits as Completed
* Manage User Complaints
* Update Complaint Status
* View Visitor Reports
* Search Visitors
* Search Complaints
* Visitor Analytics

---

## Dashboard Statistics

The admin dashboard provides:

* Total Visitors
* Pending Requests
* Approved Requests
* Rejected Requests
* Pending Complaints

Reports include:

* Today's Visitors
* Weekly Visitor Count
* Most Common Visit Purpose
* Most Common Complaint Type

---

## Tech Stack

### Frontend

* React.js
* React Router DOM
* Axios
* Context API
* useReducer
* CSS3

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT Authentication
* bcrypt

### Database

* MongoDB Atlas

---

## Project Structure

frontend/
├── src/
│ ├── Authen/
│ ├── Components/
│ ├── Context/
│ ├── Hooks/
│ ├── Image/
│ ├── pages/
│ ├── QrEntry/
│ └── App.js

backend/
├── controllers/
├── middleware/
├── models/
├── routes/
├── server.js
└── .env

---

## Authentication

The application uses JWT-based authentication.

Users receive a token after successful login.

Protected routes ensure:

* Users can access only their dashboard, forms, and complaints.
* Admins can access dashboard, reports, visitor management, and complaint management.

---

## Visitor Workflow

1. User submits a visitor request.
2. Request is stored in MongoDB.
3. Admin reviews the request.
4. Admin approves or rejects the request.
5. Approved requests generate a QR code.
6. Visitor uses QR code for entry.
7. Visit can be marked as completed.
8. Expired visits automatically become inactive.

---

## Complaint Workflow

1. User submits a complaint.
2. Complaint status starts as Pending.
3. Admin updates complaint to:

   * In Progress
   * Resolved
4. Resolved complaints automatically close after a configured time period.

---

## Installation

### Clone Repository

```bash
git clone <repository-url>
cd VisitorPass
```

### Backend Setup

```bash
cd backend
npm install
```

Create `.env`

```env
PORT=4000
MONGO_URI=your_mongodb_connection_string
SECRET=your_jwt_secret
```

Start backend:

```bash
npm start
```

### Frontend Setup

```bash
cd frontend
npm install
npm start
```

---

## Environment Variables

Backend:

```env
PORT=
MONGO_URI=
SECRET=
```

---

## Future Improvements

* Email Notifications
* SMS Notifications
* Visitor Check-In / Check-Out System
* Role-Based Permissions
* PDF Visitor Pass Download
* Dark Mode
* Push Notifications
* Visitor History Export
* Analytics Dashboard Charts

---

## Deployment

Frontend:

* Vercel

Backend:

* Render

Database:

* MongoDB Atlas

---

## Author

Abdul Malik

B.Tech Computer Science Engineering

VisitorPass was developed as a full-stack MERN project to demonstrate authentication, authorization, QR-based visitor management, complaint handling, and admin dashboard functionality.
