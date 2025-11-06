import { useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext.jsx'
import '../styles.css'

const schemes = ['2021', '2022']

export default function Scheme() {
  const navigate = useNavigate()
  const { scheme, setScheme } = useApp()

  return (
    <div className="page-container">
      <div className="card-container">
        <div className="card">
          <h2 className="section-heading">Select Your Scheme</h2>
          <div className="scheme-grid">
            {schemes.map((s) => (
              <button
                key={s}
                onClick={() => setScheme(s)}
                className={`card-btn ${scheme === s ? 'selected' : ''}`}
              >
                Scheme {s}
              </button>
            ))}
          </div>
          <button
            disabled={!scheme}
            onClick={() => navigate('/select')}
            className="btn btn-gradient"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  )
}


