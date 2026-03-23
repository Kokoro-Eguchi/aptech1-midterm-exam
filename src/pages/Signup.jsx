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

  const validateField = (name, formData) => {
    let error = '';
    switch (name) {
      case 'name':
        if (!nameRegex.test(formData.name)) {
          error = 'Name must be at least 2 characters and contain only letters and spaces.';
        }
        break;
      case 'username':
        if (!usernameRegex.test(formData.username)) {
          error = 'Username can only contain letters, numbers, dots, underscores, and hyphens.';
        }
        break;
      case 'email':
        if (!emailRegex.test(formData.email)) {
          error = 'Please enter a valid email address.';
        }
        break;
      case 'password':
        if (!passwordRegex.test(formData.password)) {
          error = 'Password must be 8-16 characters with at least one lowercase, one uppercase, one digit, and one special character.';
        }
        break;
      case 'confirmPassword':
        if (formData.password !== formData.confirmPassword) {
          error = 'Passwords doesn\'t match.';
        }
        break;
      default:
        break;
    }
    setErrors(prevErrors => ({
      ...prevErrors,
      [name]: error
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newFormData = {
      ...formData,
      [name]: value
    };
    setFormData(newFormData);
    validateField(name, newFormData);
    
    // If password changed, re-validate confirmPassword
    if (name === 'password') {
      validateField('confirmPassword', newFormData);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault()
    
    Object.keys(formData).forEach(key => validateField(key, formData[key]));
    
    const hasErrors = Object.values(errors).some(error => error !== '');
    const hasEmptyFields = Object.values(formData).some(value => value.trim() === '');
    
    if (!hasErrors && !hasEmptyFields) {
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
              onChange={handleChange}
              className={errors.name ? 'invalid' : ''}
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
              onChange={handleChange}
              className={errors.username ? 'invalid' : ''}
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
              onChange={handleChange}
              className={errors.email ? 'invalid' : ''}
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
              onChange={handleChange}
              className={errors.password ? 'invalid' : ''}
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
              onChange={handleChange}
              className={errors.confirmPassword ? 'invalid' : ''}
              placeholder="Confirm your password"
              required
            />
            {errors.confirmPassword && <span className="error">{errors.confirmPassword}</span>}
          </div>

          <button 
            type="submit" 
            className="btn btn-primary btn-block"
            disabled={Object.values(errors).some(error => error) || Object.values(formData).some(value => !value.trim())}
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  )
}

export default Signup

