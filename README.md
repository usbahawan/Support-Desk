# SupportDesk - Customer Support Ticket System

## Project Overview
A full stack web application to manage customer support tickets. Built with React on frontend and Node.js with Express on backend, using SQLite for database.

## Technology Stack
- Frontend: React
- Backend: Node.js, Express
- Database: SQLite (better-sqlite3)

## Setup Instructions

### Install Backend
cd backend
npm install

### Run Backend
cd backend
node index.js
Backend runs on http://localhost:3001

### Install Frontend
cd frontend
npm install

### Run Frontend
cd frontend
npm start
Frontend runs on http://localhost:3000

### Run Tests
cd backend
node tests.js

## API Endpoints
- POST /api/tickets - create a ticket
- GET /api/tickets - get all tickets
- GET /api/tickets/:id - get one ticket
- PATCH /api/tickets/:id/status - update ticket status
- GET /api/dashboard - get dashboard stats

## Duplicate Email Decision
I decided to allow duplicate emails. Same customer can have multiple tickets for different issues. Blocking duplicate emails would stop customers from creating new tickets which is bad for support.

## What I completed
- Create ticket with validation
- View all tickets with search and filter
- Ticket detail page
- Update ticket status
- Urgent ticket detection
- Dashboard statistics
- Automated tests

## What I did not complete
- Pagination - I ran out of time. I would implement it using LIMIT and OFFSET in SQL query and add page number buttons on frontend.

## Known Limitations
- No user authentication
- No pagination on ticket list

## Time Log
- Planning: 30 minutes
- Backend and database: 2 hours
- Frontend: 2 hours
- Tests: 30 minutes
- README: 30 minutes
- Total: 5 hours 30 minutes

## Assumptions
- One status can be updated at a time
- Urgent detection is handled by backend only
- SQLite is enough for this small application

## Declaration
I confirm that I completed this challenge without using generative AI, an AI coding assistant, or an AI-enabled editor. I understand the submitted code and can explain and modify it.