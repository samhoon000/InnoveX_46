import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext.jsx'
import GradientCard from '../components/GradientCard.jsx'
import PrimaryButton from '../components/PrimaryButton.jsx'

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
    <div className="w-full">
      <GradientCard className="max-w-md mx-auto text-center">
        <h2 className="text-2xl font-semibold font-display">Choose a Nickname</h2>
        <p className="text-slate-500 mt-2">Well use this to personalize your experience</p>
        <form onSubmit={handleContinue} className="mt-6 space-y-4">
          <input
            className="w-full rounded-xl border border-white/40 bg-white/70 backdrop-blur placeholder-slate-400 px-4 py-3 shadow-soft focus:outline-none focus:ring-2 focus:ring-fuchsia-300/70"
            placeholder="e.g., Ace, Coder, Learner"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
          />
          <PrimaryButton type="submit" className="w-full">Continue</PrimaryButton>
        </form>

        {showGreeting && (
          <div className="mt-6 transition-opacity duration-300">
            <p className="text-lg">Hello, <span className="font-semibold">{nickname}</span> 44B</p>
            <PrimaryButton className="mt-4" onClick={() => navigate('/scheme')}>Next</PrimaryButton>
          </div>
        )}
      </GradientCard>
    </div>
  )
}


