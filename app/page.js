'use client'

import { useEffect } from 'react'
import { getDb } from '@/lib/database'
import PatientForm from '@/components/PatientForm'

export default function Home() {
  useEffect(() => {
    getDb().then((db) => {
      if (db) console.log('Pglite DB initialized')
    })
  }, [])

  return (
    <div>
      <h1>Patient Registration App</h1>
      <PatientForm/>
    </div>
  );
}
