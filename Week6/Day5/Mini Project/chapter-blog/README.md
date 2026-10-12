# Chapter Blog

A small full-stack blog application built with React, Vite, Tailwind CSS, and an Express API. Visitors can browse, search, and filter articles. Admin users can create, edit, and delete articles after signing in.

## Features

- Browse articles and view article details
- Search articles and filter by category
- Admin-only article creation, editing, and deletion
- JWT authentication stored in an HttpOnly cookie
- Session restoration after a page refresh and logout
- SWR caching for the article list
- Responsive layouts and a not-found page

## Project structure

```text
chapter-blog/
├── backend/    # Express API, authentication, and seed reference data
└── frontend/   # React application built with Vite
```

## Requirements

- Node.js and npm

## Setup

### 1. Configure MongoDB Atlas and the backend

Create a MongoDB Atlas cluster, create a database user, and allow your development IP address in Atlas Network Access. Copy the application connection string from Atlas and replace its username, password, and cluster placeholders.

From the project root, install backend dependencies and create the local environment file:

```powershell
cd backend
npm install
Copy-Item .env.example .env
```

Open `backend/.env` and set `MONGODB_URI` to your private Atlas connection string. The example URI uses the database name `mydatabase`; the app uses the database name included in your URI. Also replace the example `JWT_SECRET` with a long, random secret. Keep `.env` private; do not commit it. The `.env.example` file documents the required variables without containing real credentials.

The backend uses these environment variables:

| Variable | Purpose |
| --- | --- |
| `PORT` | Port the API server listens on (the example uses `3000`) |
| `JWT_SECRET` | Secret used to sign and verify login tokens |
| `MONGODB_URI` | MongoDB connection string, including the database name |

### 2. Install frontend dependencies

Open a second terminal from the project root:

```powershell
cd frontend
npm install
```

## Run the application

Start the backend in one terminal:

```powershell
cd backend
npm run dev
```

Start the frontend in another terminal:

```powershell
cd frontend
npm run dev
```

Open the Vite URL shown in the frontend terminal (normally `http://localhost:5173`). The API runs at `http://localhost:3000`.

## API routes

| Method | Route | Access | Description |
| --- | --- | --- | --- |
| `GET` | `/api/health` | Public | Check that the API is running |
| `GET` | `/api/articles` | Public | Get all articles |
| `GET` | `/api/articles/:id` | Public | Get one article |
| `POST` | `/api/auth` | Public | Sign in and set the token cookie |
| `GET` | `/api/auth/me` | Signed in | Restore the current session |
| `POST` | `/api/auth/logout` | Public | Clear the token cookie |
| `POST` | `/api/articles` | Admin | Create an article |
| `PATCH` | `/api/articles/:id` | Admin | Update an article |
| `DELETE` | `/api/articles/:id` | Admin | Delete an article |

The frontend and backend are configured for local development on ports `5173` and `3000`. Authenticated browser requests include cookies; the API enables credentialed CORS for the frontend origin.

## Demo accounts

Development account seed data is in `backend/db/accountSeed.js`. Passwords are stored as bcrypt hashes. Use the project’s configured credentials when testing; do not reuse real passwords in this demo project.

## Database storage

On backend startup, the app connects to MongoDB but does not insert seed data. The files `backend/db/seed.js` and `backend/db/accountSeed.js` are retained as reference data; the six articles and two accounts have already been added to the configured database. Articles and accounts are stored in separate `articles` and `accounts` collections.

New, edited, and deleted articles are saved in MongoDB. SWR caches fetched data in the running frontend, but MongoDB is the persistent storage.

## Useful commands

Run these commands from the `frontend` directory:

```powershell
npm run build
npm run lint
```

Run these commands from the `backend` directory:

```powershell
npm run dev
npm start
```