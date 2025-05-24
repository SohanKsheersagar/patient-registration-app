'use client'
import Link from 'next/link'
import PatientForm from '../components/PatientForm'

export default function HomePage() {
  return (
    <div className="page-center">
      <div>
        <h1>Patient Registration App</h1>
        <PatientForm />
        <Link href="/query">
          <button style={{ marginTop: '1rem' }}> Go to SQL Query Page</button>
        </Link>
      </div>
    </div>
  )
}
