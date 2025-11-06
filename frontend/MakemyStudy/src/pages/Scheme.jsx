import { useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext.jsx'
import GradientCard from '../components/GradientCard.jsx'
import PrimaryButton from '../components/PrimaryButton.jsx'

const schemes = ['2021', '2022']

export default function Scheme() {
  const navigate = useNavigate()
  const { scheme, setScheme } = useApp()

  return (
    <div className="w-full">
      <GradientCard className="max-w-2xl mx-auto">
        <h2 className="text-2xl font-semibold font-display text-center">Select Your Scheme</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
          {schemes.map((s) => (
            <button
              key={s}
              onClick={() => setScheme(s)}
              className={`rounded-2xl p-6 text-lg font-semibold shadow-soft transition transform hover:-translate-y-0.5 hover:shadow-lg bg-gradient-to-br from-fuchsia-100 to-sky-100 border border-white/50 ${scheme === s ? 'ring-2 ring-fuchsia-300' : ''}`}
            >
              Scheme {s}
            </button>
          ))}
        </div>
        <div className="mt-6 text-center">
          <PrimaryButton disabled={!scheme} onClick={() => navigate('/select')}>Continue</PrimaryButton>
        </div>
      </GradientCard>
    </div>
  )
}


