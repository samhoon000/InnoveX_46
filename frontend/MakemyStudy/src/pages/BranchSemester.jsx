import { useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext.jsx'
import GradientCard from '../components/GradientCard.jsx'
import PrimaryButton from '../components/PrimaryButton.jsx'

const branches = ['CSE', 'ECE', 'AIML/DS']
const semesters = ['3', '4', '5']

export default function BranchSemester() {
  const navigate = useNavigate()
  const { branch, setBranch, semester, setSemester } = useApp()

  return (
    <div className="w-full">
      <GradientCard className="max-w-3xl mx-auto">
        <h2 className="text-2xl font-semibold font-display text-center">Choose Branch & Semester</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <div>
            <p className="text-sm text-slate-500 mb-2">Branch</p>
            <div className="grid grid-cols-3 gap-3">
              {branches.map((b) => (
                <button
                  key={b}
                  onClick={() => setBranch(b)}
                  className={`rounded-xl px-4 py-3 bg-white/70 border border-white/40 shadow-soft hover:shadow-lg transition ${branch === b ? 'ring-2 ring-sky-300' : ''}`}
                >
                  {b}
                </button>
              ))}
            </div>
          </div>
          <div>
            <p className="text-sm text-slate-500 mb-2">Semester</p>
            <div className="grid grid-cols-3 gap-3">
              {semesters.map((s) => (
                <button
                  key={s}
                  onClick={() => setSemester(s)}
                  className={`rounded-xl px-4 py-3 bg-white/70 border border-white/40 shadow-soft hover:shadow-lg transition ${semester === s ? 'ring-2 ring-fuchsia-300' : ''}`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-8 text-center">
          <PrimaryButton disabled={!branch || !semester} onClick={() => navigate('/resources')}>Continue</PrimaryButton>
        </div>
      </GradientCard>
    </div>
  )
}


