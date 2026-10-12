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
├── backend/    # Express API, authentication, and in-memory seed data
└── frontend/   # React application built with Vite
```

## Requirements

- Node.js and npm

## Setup

### 1. Configure the backend

From the project root, install backend dependencies:

```powershell
cd backend
npm install
Copy-Item .env.example .env
```

Open `backend/.env` and replace the example `JWT_SECRET` with a long, random secret. Keep `.env` private; do not commit it. The `.env.example` file documents the required variables without containing a real secret.

The backend uses these environment variables:

| Variable | Purpose |
| --- | --- |
| `PORT` | Port the API server listens on (the example uses `3000`) |
| `JWT_SECRET` | Secret used to sign and verify login tokens |

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

Development accounts are defined in `backend/db/connect.js`. Their passwords are stored as bcrypt hashes. Use the project’s configured credentials when testing; do not reuse real passwords in this demo project.

## Data storage note

Articles are currently stored in memory using `backend/db/seed.js`. New, edited, and deleted articles are not saved to a database and will reset to the seed data when the backend restarts. SWR caches fetched data in the running frontend; it is not persistent storage.

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