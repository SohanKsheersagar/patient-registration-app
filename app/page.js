'use client'

import { useEffect } from 'react'
import { getDb } from '../lib/database'

export default function Home() {
  useEffect(() => {
    getDb().then((db) => {
      if (db) console.log('Pglite DB initialized')
    })
  }, [])

  return <h1>Patient Registration App</h1>
}
