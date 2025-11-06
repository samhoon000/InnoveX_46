import { useMemo, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useApp } from '../context/AppContext.jsx'
import '../styles.css'

export default function SignUp() {
  const navigate = useNavigate()
  const { setNickname } = useApp()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [nickname, setNicknameLocal] = useState('')
  const [touched, setTouched] = useState({ 
    email: false, 
    password: false, 
    confirmPassword: false,
    nickname: false 
  })

  const emailValid = useMemo(() => /.+@.+\..+/.test(email), [email])
  const passwordValid = useMemo(() => /^(?=.*[A-Za-z])(?=.*\d).{6,}$/.test(password), [password])
  const confirmPasswordValid = useMemo(() => password === confirmPassword && confirmPassword.length > 0, [password, confirmPassword])
  const nicknameValid = useMemo(() => nickname.trim().length > 0, [nickname])
  const formValid = emailValid && passwordValid && confirmPasswordValid && nicknameValid

  function handleSubmit(e) {
    e.preventDefault()
    if (!formValid) return
    setNickname(nickname)
    navigate('/selection')
  }

  return (
    <div className="split-page-container" style={{ paddingTop: '0' }}>
      <div className="split-page-left">
        <div className="split-card">
          <h1 className="split-heading">Create Your Account</h1>
          <p style={{ color: '#6b7280', marginBottom: '2rem', fontSize: '1rem', lineHeight: '1.6' }}>
            Join thousands of students achieving academic excellence with our learning resources.
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
              <input
                type="password"
                className="unified-input"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                onBlur={() => setTouched((t) => ({ ...t, confirmPassword: true }))}
              />
              {!confirmPasswordValid && touched.confirmPassword && (
                <p className="error-message">Passwords do not match.</p>
              )}
            </div>
            <div className="form-field">
              <label className="form-label">Enter your nickname</label>
              <input
                type="text"
                className="unified-input"
                placeholder="e.g., Ace, Coder, Learner"
                value={nickname}
                onChange={(e) => {
                  setNicknameLocal(e.target.value)
                  setNickname(e.target.value)
                }}
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
              Sign Up
            </button>
            <div className="form-links">
              <Link to="/login" className="form-link">Already have an account? Log In</Link>
            </div>
          </form>
        </div>
      </div>
      <div className="split-page-right">
        <div className="split-page-right-content">
          <h2>Start Your Learning Journey</h2>
          <p>Get access to comprehensive study materials, exam preparation tools, and personalized learning paths to help you succeed in your academic goals.</p>
        </div>
      </div>
    </div>
  )
}

