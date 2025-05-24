'use client'
import SQLQueryBox from '../../components/SQLQueryBox'

export default function QueryPage() {
  return (
    <div className="page-center">
      <div>
        <h1>Run Raw SQL Query</h1>
        <SQLQueryBox />
      </div>
    </div>
  )
}
