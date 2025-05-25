# 🏥 Patient Registration App

This is a **frontend-only web app** built with React using Next.js and PGlite, deployed using vercel.

---

## ✅ Features

- ✅ Register new patients using a validated form
- ✅ Execute raw SQL queries via a browser-based interface
- ✅ Persistent storage using IndexedDB (via PGlite)
- ✅ True multi-tab support using a shared Web Worker
- ✅ SQL query results rendered in a clean HTML table

---

## Live Demo

[https://patient-registration-app-zeta.vercel.app](https://patient-registration-app-zeta.vercel.app)

---

## Tech Stack

- [Next.js](https://nextjs.org/)
- [React](https://react.dev/)
- [PGlite](https://pglite.dev/) (Postgres in the browser)
- Shared Web Worker for multi-tab synchronization
- IndexedDB for local persistence

---

## 📦 Setup Instructions

1. Clone the repo:

```bash
git clone https://github.com/SohanKsheersagar/patient-registration-app.git
cd patient-registration-app
```

2. Install dependencies:

```bash
npm install
```

3. Start development server:

```bash
npm run dev
```

4. Open the app in your browser:

- Register page: http://localhost:3000
- SQL query page: http://localhost:3000/query

---

## Multi-Tab Synchronization

This app uses a **PGliteWorker** to synchronize a single Postgres-like database across multiple browser tabs:

- All tabs read/write to the same `idb://patients-db` database
- Synchronization is handled via leader election using `@electric-sql/pglite/worker`
- Powered by a shared worker (`public/my-pglite-worker.js`)

> ✅ Real-time query results in one tab reflect data inserted from another

---

## How to Test It

1. Open two tabs:
   - Tab A: https://patient-registration-app-zeta.vercel.app
   - Tab B: same link, go to `/query`
2. In Tab A, register a new patient
3. In Tab B, run:

```sql
SELECT * FROM patients;
```

4. ✅ See the updated data immediately

---

## Folder Structure

```
components/
  PatientForm.js
  SQLQueryBox.js

lib/
  database.js             ← connects to shared PGlite worker

public/
  my-pglite-worker.js     ← worker that runs the DB engine

app/
  page.js                 ← main registration page
  query/page.js           ← SQL query interface
```

---

## Challenges Faced

- `PGlite` is single-connection by default → solved using `PGliteWorker` with leader election
- Web Workers in Next.js require proper ESM config → fixed using `esmExternals: 'loose'`
- Dynamic import paths for workers in Next.js → used `new URL(..., import.meta.url)` or fallback via `window.location.origin`


