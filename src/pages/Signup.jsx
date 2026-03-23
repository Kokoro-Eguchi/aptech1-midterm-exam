import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Pages.css'

function Signup() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  })
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    // Basic validation
    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
      alert('All fields are required')
      return
    }
    
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match')
      return
    }

    // Store user data in localStorage
    localStorage.setItem('userData', JSON.stringify({
      name: formData.name,
      email: formData.email,
    }))

    // Navigate to success page
    navigate('/success')
  }

  return (
    <div className="page-container">
      <div className="form-container">
        <h1>Create Account</h1>
        <form onSubmit={handleSubmit} className="signup-form">
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your full name"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm your password"
              required
            />
          </div>

          <button type="submit" className="btn btn-primary btn-block">
            Sign Up
          </button>
        </form>
      </div>
    </div>
  )
}

export default Signup
