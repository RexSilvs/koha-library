# Library Management System

A Nuxt 3 frontend with Express backend for managing books, users, and borrowing records.

## Setup

### Frontend (Nuxt 3)
1. Navigate to the root directory: `cd C:\Users\user\finals`
2. Run `npm install`
3. Run `npm run dev`
4. Open `http://localhost:3000` in your browser.

### Backend (Express)
1. Navigate to the `backend` directory: `cd backend`
2. Run `npm install`
3. Make sure MongoDB is running locally.
   - If installed, start it with `mongod` in a separate terminal or start the MongoDB service.
4. Run `npm run dev`
5. The API is available at `http://localhost:3001`

## Features
- Manage Books with availability tracking
- Manage Users and membership details
- Create and return borrowing records
- Login system for admin and library users

## Authentication
- Admin credentials: `admin` / `admin123`
- Library users can log in using email or membership ID plus their password
- Register a new user at `/register`

## Design
- Clean dashboard layout with navigation
- Responsive card-based pages
- Table views for inventory and borrowing history