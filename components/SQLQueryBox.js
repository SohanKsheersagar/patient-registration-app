'use client'
import React, { useState } from 'react'
import {getDb} from '@/lib/database'

const SQLQueryBox = () => {
  const [query, setQuery] = useState('SELECT * FROM patients;')
  const [results, setResults] = useState(null)
  const [error, setError] = useState('')

  const handleRunQuery = async () => {
    setError('')
    try {
      const db = await getDb()
      if (!db) return
      const result = await db.query(query)
      setResults(result.rows)
    } catch (err) {
      console.error(err)
      setError('Invalid SQL query.')
    }
  }

  return (
    <div className="sql-box">
      <textarea
        rows={4}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="sql-input"
      />
      <br />
      <button className="run-button" onClick={handleRunQuery}>
        Run Query
      </button>

      {error && <p className="error-message">{error}</p>}

      {results && results.length > 0 && (
        <div className="result-box">
          <h4>Results:</h4>
          <table className="results-table">
            <thead>
              <tr>
                {Object.keys(results[0]).map((col) => (
                  <th key={col}>{col}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {results.map((row, i) => (
                <tr key={i}>
                  {Object.values(row).map((val, j) => (
                    <td key={j}>{val}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {results && results.length === 0 && (
        <p style={{ marginTop: '1rem' }}>No results found.</p>
      )}
    </div>
  )
}

export default SQLQueryBox
