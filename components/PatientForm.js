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
    console.log("pressed")
    e.preventDefault()
  
    if (!name || !age || !phone || !gender || !medicalHistory) {
      setError('Please fill in all fields before submitting.')
      return
    }
  
    if (isNaN(age) || parseInt(age) <= 0) {
      setError('Age must be a positive number.')
      return
    }
  
    const phoneRegex = /^[0-9]{10}$/
    if (!phoneRegex.test(phone)) {
      setError('Phone number must be exactly 10 digits.')
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
    <form onSubmit={handleSubmit} className="form-container">
    {error && <div className="error-message">{error}</div>}

    <div className="form-group">
        <label htmlFor="name">Name:</label>
        <input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter name" />
    </div>

    <div className="form-group">
        <label htmlFor="age">Age:</label>
        <input id="age" value={age} onChange={(e) => setAge(e.target.value)} type="number" placeholder="Enter age" />
    </div>

    <div className="form-group">
        <label htmlFor="phone">Phone Number:</label>
        <input id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} type="tel" placeholder="Enter phone number" />
    </div>

    <div className="form-group">
        <label htmlFor="gender">Gender:</label>
        <select id="gender" value={gender} onChange={(e) => setGender(e.target.value)}>
        <option value="">Select gender</option>
        <option value="male">Male</option>
        <option value="female">Female</option>
        <option value="other">Other</option>
        </select>
    </div>

    <div className="form-group">
        <label htmlFor="medicalHistory">Medical History:</label>
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
