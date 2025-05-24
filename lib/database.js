import { PGlite } from '@electric-sql/pglite'

let db

export async function getDb() {
  if (typeof window === 'undefined') return null  

  if (!db) {
    db = new PGlite('idb://patients-db')  
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
