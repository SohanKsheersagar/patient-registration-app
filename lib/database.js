import { PGliteWorker } from '@electric-sql/pglite/worker'

let db

export async function getDb() {
  if (typeof window === 'undefined') return null

  if (!db) {
    db = new PGliteWorker(
      new Worker(new URL('../public/my-pglite-worker.js', import.meta.url), {
        type: 'module'
      }),
      {
        id: 'patients-db'
      }
    )

    await db.exec(`
      CREATE TABLE IF NOT EXISTS patients (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        age INTEGER,
        phone TEXT,
        gender TEXT,
        medical_history TEXT
      );
    `)
  }

  return db
}
