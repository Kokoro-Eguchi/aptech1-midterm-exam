import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './Pages.css'

function Profile() {
  const [userData, setUserData] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    // Get user data from localStorage
    const storedData = localStorage.getItem('userData')
    if (storedData) {
      setUserData(JSON.parse(storedData))
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('userData')
    navigate('/')
  }

  return (
    <div className="page-container">
      <div className="profile-container">
        <h1>User Profile</h1>
        {userData ? (
          <>
            <div className="profile-card">
              <div className="profile-field">
                <label>Name:</label>
                <span>{userData.name}</span>
              </div>
              <div className="profile-field">
                <label>Email:</label>
                <span>{userData.email}</span>
              </div>
            </div>
            <div className="button-group">
              <Link to="/" className="btn btn-secondary">
                Back to Home
              </Link>
              <button onClick={handleLogout} className="btn btn-danger">
                Logout
              </button>
            </div>
          </>
        ) : (
          <>
            <p className="no-data">No user data found. Please sign up first.</p>
            <Link to="/signup" className="btn btn-primary">
              Go to Signup
            </Link>
          </>
        )}
      </div>
    </div>
  )
}

export default Profile
