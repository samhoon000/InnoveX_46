import { Link, useLocation } from 'react-router-dom'
import '../styles.css'

export default function Navbar() {
  const location = useLocation()
  const isAuthPage = location.pathname === '/login' || location.pathname === '/signup'

  // Don't show navbar on login/signup pages
  if (isAuthPage) {
    return null
  }

  return (
    <nav className="navbar">
      <div className="navbar-content">
        <div className="navbar-left">
          <Link to="/resources" className="navbar-link">
            <span className="navbar-icon">📚</span>
            <span>Learning Planner</span>
          </Link>
          <Link to="/resources" className="navbar-link">
            <span className="navbar-icon">📄</span>
            <span>Resources</span>
          </Link>
        </div>
        <div className="navbar-right">
          <Link to="/login" className="navbar-link">
            <span className="navbar-icon">👤</span>
            <span>Account</span>
          </Link>
        </div>
      </div>
    </nav>
  )
}

