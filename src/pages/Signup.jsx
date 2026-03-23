import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Pages.css'

function Signup() {
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  })
  const [errors, setErrors] = useState({})
  const navigate = useNavigate()

  const nameRegex = /^[A-Za-z ]{2,}$/;
  const usernameRegex = /^[A-Za-z0-9._-]+$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,16}$/;

  const validate = (data) => {
    const newErrors = {};
    if (!nameRegex.test(data.name)) {
      newErrors.name = 'Name must be at least 2 characters and contain only letters and spaces.';
    }
    if (!usernameRegex.test(data.username)) {
      newErrors.username = 'Username can only contain letters, numbers, dots, underscores, and hyphens.';
    }
    if (!emailRegex.test(data.email)) {
      newErrors.email = 'Please enter a valid email address.';
    }
    if (!passwordRegex.test(data.password)) {
      newErrors.password = 'Password must be 8-16 characters with at least one lowercase, one uppercase, one digit, and one special character.';
    }
    if (data.password !== data.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match.';
    }
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault()
    
    const validationErrors = validate(formData);
    setErrors(validationErrors);
    
    if (Object.keys(validationErrors).length === 0) {
      localStorage.setItem('userData', JSON.stringify({
        name: formData.name,
        username: formData.username,
        email: formData.email,
      }))

      navigate('/success')
    }
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
              onChange={(e) => setFormData({...formData, [e.target.name]: e.target.value})}
              placeholder="Enter your full name"
              required
            />
            {errors.name && <span className="error">{errors.name}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={(e) => setFormData({...formData, [e.target.name]: e.target.value})}
              placeholder="Enter your username"
              required
            />
            {errors.username && <span className="error">{errors.username}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, [e.target.name]: e.target.value})}
              placeholder="Enter your email"
              required
            />
            {errors.email && <span className="error">{errors.email}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={(e) => setFormData({...formData, [e.target.name]: e.target.value})}
              placeholder="Enter your password"
              required
            />
            {errors.password && <span className="error">{errors.password}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={(e) => setFormData({...formData, [e.target.name]: e.target.value})}
              placeholder="Confirm your password"
              required
            />
            {errors.confirmPassword && <span className="error">{errors.confirmPassword}</span>}
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

