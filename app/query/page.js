'use client'
import SQLQueryBox from '../../components/SQLQueryBox'
import Link from 'next/link'
export default function QueryPage() {
  return (
    <div className="page-center">
      <div>
        <h1>Run Raw SQL Query</h1>
        <SQLQueryBox />
        <Link href="/">
          <button style={{ marginTop: '1rem' }}> Go to Registration form </button>
        </Link>
      </div>
    </div>
  )
}
