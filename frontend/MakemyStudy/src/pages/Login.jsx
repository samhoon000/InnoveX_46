import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import GradientCard from '../components/GradientCard.jsx'
import PrimaryButton from '../components/PrimaryButton.jsx'

export default function Login() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [touched, setTouched] = useState({ email: false, password: false })

  const emailValid = useMemo(() => /.+@.+\..+/.test(email), [email])
  const passwordValid = useMemo(() => /^(?=.*[A-Za-z])(?=.*\d).{6,}$/.test(password), [password])
  const formValid = emailValid && passwordValid

  function handleSubmit(e) {
    e.preventDefault()
    if (!formValid) return
    navigate('/nickname')
  }

  return (
    <div className="w-full">
      <GradientCard className="max-w-md mx-auto">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold font-display tracking-tight">Welcome Back</h1>
          <p className="text-slate-500 mt-2">Sign in to continue to your planner</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              className="w-full rounded-xl border border-white/40 bg-white/70 backdrop-blur placeholder-slate-400 px-4 py-3 shadow-soft focus:outline-none focus:ring-2 focus:ring-fuchsia-300/70"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onBlur={() => setTouched((t) => ({ ...t, email: true }))}
            />
            {!emailValid && touched.email && (
              <p className="text-sm text-rose-500 mt-1">Enter a valid email address.</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              className="w-full rounded-xl border border-white/40 bg-white/70 backdrop-blur placeholder-slate-400 px-4 py-3 shadow-soft focus:outline-none focus:ring-2 focus:ring-fuchsia-300/70"
              placeholder="At least 6 characters with letters and numbers"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onBlur={() => setTouched((t) => ({ ...t, password: true }))}
            />
            {!passwordValid && touched.password && (
              <p className="text-sm text-rose-500 mt-1">Min 6 chars, include letters and numbers.</p>
            )}
          </div>
          <PrimaryButton type="submit" disabled={!formValid} className="w-full">
            Log In
          </PrimaryButton>
        </form>
      </GradientCard>
    </div>
  )
}


