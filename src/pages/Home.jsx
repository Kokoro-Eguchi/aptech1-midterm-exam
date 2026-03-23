import { Link } from 'react-router-dom'
import './Pages.css'

function Home() {
  return (
    <div className="page-container">
      <div className="page-content">
        <h1>Welcome to Steel Ball Run!</h1>
        <p>This is where your journey for the ultimate race across america with the prize money of $50,000,000 begins!</p>
        <div className="button-group">
          <Link to="/signup" className="btn btn-primary">
            Get Started
          </Link>
          <Link to="/profile" className="btn btn-secondary">
            View Profile
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Home
