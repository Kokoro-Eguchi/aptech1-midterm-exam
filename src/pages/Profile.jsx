import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './Pages.css'

function Profile() {
  const getInitialData = () => {
    const storedData = localStorage.getItem('userData')
    return storedData ? JSON.parse(storedData) : null
  }

  const [userData, setUserData] = useState(getInitialData)
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState(() => {
    const data = getInitialData()
    return data ? { name: data.name, email: data.email } : { name: '', email: '' }
  })
  const navigate = useNavigate()

  const handleEdit = () => {
    setFormData({ name: userData.name, email: userData.email })
    setIsEditing(true)
  }

  const handleSave = () => {
    const updatedData = { ...userData, ...formData }
    setUserData(updatedData)
    localStorage.setItem('userData', JSON.stringify(updatedData))
    setIsEditing(false)
  }

  const handleCancel = () => {
    setIsEditing(false)
  }

  return (
    <div classname ="page-container">
      <div className="profile-container">
        <h1>Racer's Profile</h1>
        {userData ? (
          <>
            <div className="profile-card">
              <div className="profile-field">
                <label>Name:</label>
                {isEditing ? (
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="edit-input"
                  />
                ) : (
                  <span>{userData.name}</span>
                )}
              </div>
              <div className="profile-field">
                <label>Email:</label>
                {isEditing ? (
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="edit-input"
                  />
                ) : (
                  <span>{userData.email}</span>
                )}
              </div>
            </div>
            <div className="button-group">
              {isEditing ? (
                <>
                  <button onClick={handleSave} className="btn btn-primary">
                    Save
                  </button>
                  <button onClick={handleCancel} className="btn btn-secondary">
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <button onClick={handleEdit} className="btn btn-primary">
                    Edit Profile
                  </button>
                  <Link to="/" className="btn btn-secondary">
                    Back to Home
                  </Link>
                  <button onClick={() => { localStorage.removeItem('userData'); navigate('/'); }} className="btn btn-danger">
                    Logout
                  </button>
                </>
              )}
            </div>
          </>
        ) : (
          <>
            <p className="no-data">No Racer data found. Please sign up first.</p>
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
