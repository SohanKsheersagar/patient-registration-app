'use client'

import { useEffect } from 'react'
import { getDb } from '@/lib/database'
import PatientForm from '@/components/PatientForm'

export default function Home() {
  return (
    <div className="page-center">
      <div>
        <h1>Patient Registration App</h1>
        <PatientForm />
      </div>
    </div>
  )
}
