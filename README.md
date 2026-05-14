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

## Vercel Deployment
1. Push the root project to GitHub (already done).
2. Create a new Vercel project from your `koha-library` repository.
3. Vercel will use `vercel.json` to build the frontend with `npm run generate`.
4. Add the environment variable `NUXT_PUBLIC_API_BASE` with your backend URL, for example:
   - `https://your-backend.example.com`
5. Deploy the frontend to Vercel.

> Note: The `backend/` Express API is not deployed by Vercel in this setup. Host it separately or convert it to serverless endpoints.
