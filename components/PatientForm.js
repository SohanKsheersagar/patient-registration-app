'use client'
import React, { useState } from 'react'
import { getDb } from '../lib/database'

const PatientForm = () => {
  const [name, setName] = useState('')
  const [age, setAge] = useState('')
  const [email, setEmail] = useState('')
  const [gender, setGender] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!name || !age || !email || !gender) {
      setError(' Please fill in all fields before submitting.')
      return
    }

    const db = await getDb()
    if (!db) return

    await db.query(
      'INSERT INTO patients (name, age, email, gender) VALUES ($1, $2, $3, $4)',
      [name, parseInt(age), email, gender]
    )

    alert('✅ Patient registered!')
    setName('')
    setAge('')
    setEmail('')
    setGender('')
    setError('')
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxWidth: '300px' }}>
      {error && <div style={{ color: 'red' }}>{error}</div>}

      <div>
        <label htmlFor="name">Name:</label><br />
        <input id="name" name="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter name" />
      </div>

      <div>
        <label htmlFor="age">Age:</label><br />
        <input id="age" name="age" value={age} onChange={(e) => setAge(e.target.value)} type="number" placeholder="Enter age" />
      </div>

      <div>
        <label htmlFor="email">Email:</label><br />
        <input id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Enter email" />
      </div>

      <div>
        <label htmlFor="gender">Gender:</label><br />
        <select id="gender" name="gender" value={gender} onChange={(e) => setGender(e.target.value)}>
          <option value="">Select gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
      </div>

      <button type="submit">Register Patient</button>
    </form>
  )
}

export default PatientForm
