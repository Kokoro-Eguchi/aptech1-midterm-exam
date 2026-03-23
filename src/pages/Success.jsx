import { Link } from 'react-router-dom'
import './Pages.css'

function Success() {
  return (
    <div className="page-container">
      <div className="success-container">
        <div className="success-icon">✓</div>
        <h1>Niceu Niceu</h1>
        <p>Your account has been created successfully. You Are now a true jojo and ready to race in Steel Ball Run!</p>
        <p>Welcome to Steel Ball Run! We're excited to have you on board.</p>
        <div className="button-group">
          <Link to="/profile" className="btn btn-primary">
            Go to Profile
          </Link>
          <Link to="/" className="btn btn-secondary">
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Success
