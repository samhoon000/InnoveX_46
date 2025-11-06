import { useMemo, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useApp } from '../context/AppContext.jsx'
import '../styles.css'

export default function Login() {
  const navigate = useNavigate()
  const { nickname, setNickname } = useApp()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [touched, setTouched] = useState({ email: false, password: false, nickname: false })

  const emailValid = useMemo(() => /.+@.+\..+/.test(email), [email])
  const passwordValid = useMemo(() => /^(?=.*[A-Za-z])(?=.*\d).{6,}$/.test(password), [password])
  const nicknameValid = useMemo(() => nickname.trim().length > 0, [nickname])
  const formValid = emailValid && passwordValid && nicknameValid

  function handleSubmit(e) {
    e.preventDefault()
    if (!formValid) return
    navigate('/selection')
  }

  return (
    <div className="split-page-container" style={{ paddingTop: '0' }}>
      <div className="split-page-left">
        <div className="split-card">
          <h1 className="split-heading">Welcome to Learning Resources & Exam Planner</h1>
          <p style={{ color: '#6b7280', marginBottom: '2rem', fontSize: '1rem', lineHeight: '1.6' }}>
            Sign in to continue to your personalized learning experience
          </p>
          <form onSubmit={handleSubmit} className="unified-form">
            <div className="form-field">
              <input
                type="email"
                className="unified-input"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onBlur={() => setTouched((t) => ({ ...t, email: true }))}
              />
              {!emailValid && touched.email && (
                <p className="error-message">Enter a valid email address.</p>
              )}
            </div>
            <div className="form-field">
              <input
                type="password"
                className="unified-input"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onBlur={() => setTouched((t) => ({ ...t, password: true }))}
              />
              {!passwordValid && touched.password && (
                <p className="error-message">Min 6 chars, include letters and numbers.</p>
              )}
            </div>
            <div className="form-field">
              <label className="form-label">Enter your nickname</label>
              <input
                type="text"
                className="unified-input"
                placeholder="e.g., Ace, Coder, Learner"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                onBlur={() => setTouched((t) => ({ ...t, nickname: true }))}
              />
              {!nicknameValid && touched.nickname && (
                <p className="error-message">Please enter a nickname.</p>
              )}
            </div>
            <button
              type="submit"
              disabled={!formValid}
              className="unified-button"
            >
              Log In
            </button>
            <div className="form-links">
              <a href="#" className="form-link">Forgot password?</a>
              <Link to="/signup" className="form-link">Don't have an account? Sign Up</Link>
            </div>
          </form>
        </div>
      </div>
      <div className="split-page-right">
        <div className="split-page-right-content">
          <h2>Unlock Your Academic Success</h2>
          <p>Access curated learning resources and exam preparation tools designed to help you excel in your studies.</p>
        </div>
      </div>
    </div>
  )
}


