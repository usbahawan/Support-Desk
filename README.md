# SupportDesk - Customer Support Ticket System

## Project Overview
A full-stack web application designed to manage and organize customer support tickets. The application allows customers to submit tickets with automatic validation and urgent detection, and enables support staff to view, filter, search, and update ticket statuses via a management dashboard.

## Technology Stack
- **Frontend**: React (built with Create React App)
- **Backend**: Node.js, Express
- **Database**: SQLite (managed via `better-sqlite3` for synchronous database operations)
- **Testing**: Node.js core assert module for automated API testing

## Setup Instructions

### Database Setup
The application uses SQLite, which does not require installing a standalone database server. 
- The database schema is defined and initialized automatically when the backend server starts. 
- Running `node index.js` in the `backend` folder will automatically create the `tickets.db` SQLite database file and initialize the `tickets` table if it does not already exist.

### How to Run the Backend
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install backend dependencies:
   ```bash
   npm install
   ```
3. Run the backend server:
   ```bash
   node index.js
   ```
   *The backend server runs locally on **http://localhost:3001**.*

### How to Run the Frontend
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install frontend dependencies:
   ```bash
   npm install
   ```
3. Run the frontend development server:
   ```bash
   npm start
   ```
   *The frontend portal runs locally on **http://localhost:3000**.*

### How to Run the Tests
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Run the automated API test suite:
   ```bash
   node tests.js
   ```

## API Endpoint Summary
- **POST `/api/tickets`**: Creates a support ticket (with name, email, subject, description, priority, and optional urgency).
- **GET `/api/tickets`**: Retrieves all support tickets.
- **GET `/api/tickets/:id`**: Retrieves a single ticket by its ID.
- **PATCH `/api/tickets/:id/status`**: Updates the status of a ticket (`open`, `in progress`, or `closed`).
- **GET `/api/dashboard`**: Retrieves statistics for total, open, in-progress, closed, and urgent tickets.

## Duplicate Email Decision
I decided to allow duplicate emails. A single customer may experience multiple separate issues over time and needs to be able to create new tickets for each one. Restricting submissions to unique emails would block active customers from seeking support for subsequent issues.

## Initiative Feature Explanation
### **Automated Urgent Ticket Detection**
To streamline support ticketing, I implemented an automated urgency assessment:
- When a ticket is submitted, the backend analyzes the description for the keyword `"urgent"` (case-insensitive) or checks the explicit urgency flag.
- If detected, the ticket is automatically marked as `is_urgent = 1` in the database.
- These urgent tickets are highlighted visually in the frontend interface and tracked separately on the statistics dashboard, helping support agents prioritize critical issues immediately.

## Known Limitations
- **No User Authentication**: Anyone can view, search, and update ticket statuses.
- **No Pagination**: The ticket list displays all records at once, which could degrade performance if there are thousands of tickets.

## What You Would Build Next
1. **Pagination**: Implement cursor-based or offset-based pagination in the backend (`LIMIT` / `OFFSET` in SQL queries) and page selection controls in the React frontend to handle scaling.
2. **User Authentication & Authorization**: Add role-based login (e.g., Customer vs. Support Agent) using JWTs to restrict status changes and dashboard access to authorized staff.
3. **Email Notifications**: Integrate Nodemailer or an external email service to notify customers when their ticket status updates.
4. **Rich Text Support**: Allow markdown or HTML in ticket descriptions for better clarity.

## Assumptions Made
- One status update is performed at a time.
- Urgent detection keyword scanning is handled server-side to maintain a reliable source of truth.
- SQLite is sufficient for this application's target scale.

## Time Log
- Planning: 30 minutes
- Backend and database: 2 hours
- Frontend: 2 hours
- Tests: 30 minutes
- README: 30 minutes
- Total: 5 hours 30 minutes

## Declaration
I confirm that I completed this challenge without using generative AI, an AI coding assistant, or an AI-enabled editor. I understand the submitted code and can explain and modify it.