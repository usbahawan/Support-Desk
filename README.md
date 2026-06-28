# SupportDesk - Mini Customer Support Ticket System

## What is this?
This is a full stack web app for managing customer support tickets. 
I built it using React for frontend, Node.js and Express for backend 
and SQLite for storing data.

## Tech Stack
- React (frontend)
- Node.js + Express (backend)
- SQLite with better-sqlite3
- CSS for basic styling

## Database Setup
I used SQLite so no extra software needed to install.
When backend runs for first time it automatically creates a 
tickets.db file in the backend folder. Thats where all data is saved.

## How to Run

### Backend
cd backend
npm install
node index.js
runs on http://localhost:3001

### Frontend
cd frontend
npm install
npm start
runs on http://localhost:3000

### Tests
cd backend
node tests.js

## API Endpoints
- POST /api/tickets → create ticket
- GET /api/tickets → get all tickets
- GET /api/tickets/:id → get one ticket
- PATCH /api/tickets/:id/status → update status
- GET /api/dashboard → dashboard stats

## Duplicate Email Decision
I allowed duplicate emails. A customer might have more than one 
problem so they should be able to open multiple tickets. 
If i blocked duplicate emails the customer wouldnt be able to 
create a new ticket which doesnt make sense for a support system.

Good side: customers can submit as many tickets as they need
Bad side: cant automatically group tickets from same customer

## What I added extra (Initiative Feature)
I added search and filter on the tickets list page. Users can 
search by name, email or subject. They can also filter by 
priority and by status. I added this because without search 
it would be hard to find a specific ticket if there are many.
In future i would add date filter and sorting by different columns.

## What I finished
- ticket creation form with validation
- view all tickets with search and filter
- ticket detail page
- status update
- urgent ticket detection
- dashboard with stats
- 2 automated tests

## What I didnt finish
- Pagination: i ran out of time. To implement it i would use 
LIMIT and OFFSET in the SQL query and add page buttons on frontend.

## What I would do next
- add pagination
- send email when status changes
- let tickets be assigned to team members
- export tickets to CSV file

## Limitations
- no login system
- no pagination
- no email notifications

## Time spent
- planning: 30 min
- backend: 2 hours
- frontend: 2 hours
- tests: 30 min
- readme: 30 min
- total: around 5.5 hours

## Declaration
I confirm that I completed this challenge without using generative AI, 
an AI coding assistant, or an AI-enabled editor. I understand the 
submitted code and can explain and modify it.