# Synonyms

A full-stack web application for searching, discovering, and contributing synonyms. Built with a TypeScript/React frontend and an Express/TypeScript backend.

---

## Features

- 🔍 **Smart Search:** Instantly find synonyms for any word.
- ➕ **Add Your Own:** Contribute new words and synonyms to the database.
- 🎲 **Random Discovery:** Explore random words and expand your vocabulary.

---

## Tech Stack

- **Frontend:** React 19, TypeScript, Vite, Redux Toolkit, MUI, LESS
- **Backend:** Express, TypeScript, ts-node, nodemon
- **API:** RESTful, CORS-enabled, error-handled
- **Testing:** Playwright for end-to-end testing

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
      translations/
      types/
    package.json
    tsconfig.json
    vite.config.ts

  bruno-synonym/   # API request collections (Bruno)
  tests/           # Playwright tests
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
- `POST /synonym` — Create a new word and its synonyms
- `POST /synonym/:word/add` — Add synonyms to an existing word
- `GET /synonym/random` — Get a random word from the database
- `GET /synonym/:word/available/:searchTerm` — Search for available synonyms to add

---

## Environment Variables

- Backend: (Add `.env` details if needed)
- Frontend: (Add Vite env details if needed)

---

## Scripts

### Backend

- `npm start` — Start backend with nodemon

### Frontend

- `npm run dev` — Start frontend in dev mode
- `npm run build` — Build for production
- `npm run preview` — Preview production build
- `npm run test` — Run Playwright tests
- `npm run test:ui` — Run Playwright tests with UI

---

## Bruno

There is a bruno collection, which you can import to postman if you like or open it in the Bruno app