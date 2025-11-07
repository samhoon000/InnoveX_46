import { useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext.jsx'
import Navbar from '../components/Navbar.jsx'
import '../styles.css'

export default function SelectionPage() {
  const navigate = useNavigate()
  const { scheme, setScheme, branch, setBranch, semester, setSemester } = useApp()

  const canContinue = scheme && branch && semester

  function handleContinue() {
    if (canContinue) {
      navigate('/resources')
    }
  }

  return (
    <>
      <Navbar />
      <div className="split-page-container">
        <div className="split-page-left">
          <div className="split-card">
            <h1 className="split-heading">Select Your Details</h1>
            <p style={{ color: '#6b7280', marginBottom: '2rem', fontSize: '1rem', lineHeight: '1.6' }}>
              Choose your academic scheme, branch, and current semester to get personalized resources.
            </p>
            <form onSubmit={(e) => { e.preventDefault(); handleContinue(); }} className="unified-form">
              <div className="form-field">
                <label className="form-label">Scheme</label>
                <select
                  className="unified-select"
                  value={scheme}
                  onChange={(e) => setScheme(e.target.value)}
                >
                  <option value="">Select Scheme</option>
                  <option value="2021">2021</option>
                  <option value="2022">2022</option>
                </select>
              </div>
              <div className="form-field">
                <label className="form-label">Branch</label>
                <select
                  className="unified-select"
                  value={branch}
                  onChange={(e) => setBranch(e.target.value)}
                >
                  <option value="">Select Branch</option>
                  <option value="CSE">CSE</option>
                  <option value="ECE">ECE</option>
                  <option value="AIML/DS">AIML/DS</option>
                  <option value="CIVIL">CIVIL</option>
                  <option value="MECH">MECH</option>


                </select>
              </div>
              <div className="form-field">
                <label className="form-label">Semester</label>
                <select
                  className="unified-select"
                  value={semester}
                  onChange={(e) => setSemester(e.target.value)}
                >
                  <option value="">Select Semester</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                  <option value="7">7</option>
                  <option value="8">8</option>
                </select>
              </div>
              <button
                type="submit"
                disabled={!canContinue}
                className="unified-button"
              >
                Continue
              </button>
            </form>
          </div>
        </div>
        <div className="split-page-right">
          <div className="split-page-right-content">
            <h2>Personalize Your Learning</h2>
            <p>Select your academic details to access customized study materials, exam papers, and resources tailored to your curriculum.</p>
          </div>
        </div>
      </div>
    </>
  )
}

