'use client'
import SQLQueryBox from '@/components/SQLQueryBox'
import Link from 'next/link'
const QueryPage =()=> {
  return (
    <div className="page-center">
      <div>
        <h1>Run SQL Query</h1>
        <SQLQueryBox/>
        <Link href="/">
          <button style={{ marginTop: '1rem' }}> Go to Registration form </button>
        </Link>
      </div>
    </div>
  )
}

export default QueryPage