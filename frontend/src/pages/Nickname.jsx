import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext.jsx'
import '../styles.css'

export default function Nickname() {
  const navigate = useNavigate()
  const { nickname, setNickname } = useApp()
  const [showGreeting, setShowGreeting] = useState(false)

  function handleContinue(e) {
    e.preventDefault()
    if (!nickname.trim()) return
    setShowGreeting(true)
  }

  return (
    <div className="page-container">
      <div className="card-container">
        <div className="card text-center">
          <h2 className="page-heading">Choose a Nickname</h2>
          <form onSubmit={handleContinue} className="form-container">
            <div className="form-group">
              <input
                className="input"
                placeholder="e.g., Ace, Coder, Learner"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
              />
            </div>
            <div className="form-group">
              <button
                type="submit"
                className="btn btn-secondary"
              >
                Continue
              </button>
            </div>
          </form>

          {showGreeting && (
            <div className="greeting fade-in">
              <p className="greeting-text">
                Hello, <span className="greeting-nickname">{nickname}</span> 👋
              </p>
              <button
                onClick={() => navigate('/scheme')}
                className="btn btn-gradient"
              >
                Next
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
