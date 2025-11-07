import { useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext.jsx'
import '../styles.css'

const branches = ['CSE', 'ECE', 'AIML/DS', 'CIVIL', 'MECH']
const semesters = [ '1', '2', '3', '4', '5', '6', '7', '8']

export default function BranchSemester() {
  const navigate = useNavigate()
  const { branch, setBranch, semester, setSemester } = useApp()

  return (
    <div className="page-container">
      <div className="card-container">
        <div className="card">
          <h2 className="section-heading">Choose Branch & Semester</h2>
          <div className="branch-semester-grid">
            <div className="branch-semester-section">
              <p className="subsection-heading text-center">Branch</p>
              <div className="branch-semester-buttons">
                {branches.map((b) => (
                  <button
                    key={b}
                    onClick={() => setBranch(b)}
                    className={`card-btn ${branch === b ? 'selected' : ''}`}
                  >
                    {b}
                  </button>
                ))}
              </div>
            </div>
            <div className="branch-semester-section">
              <p className="subsection-heading text-center">Semester</p>
              <div className="branch-semester-buttons">
                {semesters.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSemester(s)}
                    className={`card-btn ${semester === s ? 'selected' : ''}`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <button
            disabled={!branch || !semester}
            onClick={() => navigate('/resources')}
            className="btn btn-gradient"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  )
}


