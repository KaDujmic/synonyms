# Synonyms

A full-stack web application for searching, discovering, and contributing synonyms. Built with a TypeScript/React frontend and an Express/TypeScript backend.

---

## Features

- 🔍 **Smart Search:** Instantly find synonyms for any word.
- ➕ **Add Your Own:** Contribute new words and synonyms to the database.
- 🎲 **Random Discovery:** Explore random words and expand your vocabulary.
- ⚡ **Modern UI:** Responsive, clean, and user-friendly interface.
- 🛡️ **Robust API:** Type-safe, RESTful backend with error handling.

---

## Tech Stack

- **Frontend:** React 19, TypeScript, Vite, Redux Toolkit, MUI, LESS
- **Backend:** Express, TypeScript, ts-node, nodemon
- **API:** RESTful, CORS-enabled, error-handled
- **Testing:** (Add details if you have tests)
- **Dev Tools:** ESLint, Prettier, VSCode recommended extensions

---

## Project Structure

```
synonyms/
  backend/         # Express + TypeScript API
    src/
      controllers/
      data/
      errors/
      middleware/
      routes/
      services/
      types/
    package.json
    tsconfig.json

  client/          # React + TypeScript frontend
    src/
      api/
      components/
      features/
      hooks/
      pages/
      routing/
      styles/
      types/
    package.json
    tsconfig.json
    vite.config.ts

  bruno-synonym/   # API request collections (Bruno)
  README.md
```

---

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- npm

### Backend

```bash
cd backend
npm install
npm start
```
- Runs on [http://localhost:3000](http://localhost:3000)

### Frontend

```bash
cd client
npm install
npm run dev
```
- Runs on [http://localhost:5173](http://localhost:5173)

---

## API Endpoints

- `GET /synonym/:searchTerm` — Get synonyms for a word
- `GET /synonym/search/:searchTerm` — Search for words starting with a prefix
- `POST /synonym` — Add a new word and its synonyms
- (See `backend/src/routes/synonym-routes.ts` for more)

---

## Environment Variables

- Backend: (Add `.env` details if needed)
- Frontend: (Add Vite env details if needed)

---

## Scripts

### Backend

- `npm start` — Start backend with nodemon
- `npm run test` — (Placeholder)

### Frontend

- `npm run dev` — Start frontend in dev mode
- `npm run build` — Build for production
- `npm run preview` — Preview production build
- `npm run lint` — Lint code
- `npm run test` -- Run Playwright tests
- `npm run test:ui` -- Run Playwright tests with UI

---

## Bruno

There is a bruno collection, which you can import to postman if you like or open it in the Bruno app 