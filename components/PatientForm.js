'use client'
import React, { useState } from 'react'
import { getDb } from '../lib/database'

const PatientForm = () => {
  const [name, setName] = useState('')
  const [age, setAge] = useState('')
  const [phone, setPhone] = useState('')
  const [gender, setGender] = useState('')
  const [medicalHistory, setMedicalHistory] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!name || !age || !phone || !gender || !medicalHistory) {
      setError(' Please fill in all fields before submitting.')
      return
    }

    const db = await getDb()
    if (!db) return

    await db.query(
      'INSERT INTO patients (name, age, phone, gender, medical_history) VALUES ($1, $2, $3, $4, $5)',
      [name, parseInt(age), phone, gender, medicalHistory]
    )

    alert('Patient registered!')
    setName('')
    setAge('')
    setPhone('')
    setGender('')
    setMedicalHistory('')
    setError('')
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '300px' }}>
      <div>
        {errors.name && <p style={{ color: 'red', margin: 0 }}>{errors.name}</p>}
        <label htmlFor="name">Name:</label><br />
        <input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter name" />
      </div>

      <div>
        {errors.age && <p style={{ color: 'red', margin: 0 }}>{errors.age}</p>}
        <label htmlFor="age">Age:</label><br />
        <input id="age" value={age} onChange={(e) => setAge(e.target.value)} type="number" placeholder="Enter age" />
      </div>

      <div>
        {errors.phone && <p style={{ color: 'red', margin: 0 }}>{errors.phone}</p>}
        <label htmlFor="phone">Phone Number:</label><br />
        <input id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} type="tel" placeholder="Enter phone number" />
      </div>

      <div>
        {errors.gender && <p style={{ color: 'red', margin: 0 }}>{errors.gender}</p>}
        <label htmlFor="gender">Gender:</label><br />
        <select id="gender" value={gender} onChange={(e) => setGender(e.target.value)}>
          <option value="">Select gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
      </div>

      <div>
        {errors.medicalHistory && <p style={{ color: 'red', margin: 0 }}>{errors.medicalHistory}</p>}
        <label htmlFor="medicalHistory">Medical History:</label><br />
        <textarea
          id="medicalHistory"
          value={medicalHistory}
          onChange={(e) => setMedicalHistory(e.target.value)}
          placeholder="Describe medical history"
          rows={4}
        />
      </div>

      <button type="submit">Register Patient</button>
    </form>
  )
}

export default PatientForm
