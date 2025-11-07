import { useApp } from '../context/AppContext.jsx'
import Navbar from '../components/Navbar.jsx'
import '../styles.css'

const sampleSubjects = [
  { name: 'Mathematics for CSE', pdf: '#', yt: '#' },
  { name: 'Digital dessign and computer organisation', pdf: '#', yt: '#' },
  { name: 'Operating System', pdf: '#', yt: '#' },
  { name: 'Data structures and applications', pdf: '#', yt: '#' },
  { name: 'C++', pdf: '#', yt: '#' },
  { name: 'OOPS with Java', pdf: '#', yt: '#' },
]

const previousYearPapers = [
  
  { year: '2023', semester: '3', paper: '#', solution: '#' },
  { year: '2022', semester: '3', paper: '#', solution: '#' },
  { year: '2021', semester: '3', paper: '#', solution: '#' },
]

export default function Resources() {
  const { nickname, scheme, branch, semester } = useApp()

  return (
    <>
      <Navbar />
      <div className="unified-page-container">
        <div className="resources-page-wrapper">
          <div className="resources-header-section">
            <h1 className="unified-heading" style={{ textAlign: 'center' }}>Your Learning Resources</h1>
            <p className="resources-info"><b>
              {nickname ? `Hi ${nickname}! ` : ''}Scheme {scheme || '—'} · {branch || '—'} · Sem {semester || '—'}
            </b></p>
          </div>

          <div className="resources-section">
            <h2 className="resources-section-title">Subjects</h2>
            <div className="resources-grid">
              {sampleSubjects.map((s) => (
                <div key={s.name} className="resource-card">
                  <h3 className="resource-card-title">{s.name}</h3>
                  <div className="resource-card-buttons">
                    <button className="resource-btn">PDF</button>
                    <button className="resource-btn">YouTube</button>
                     <button className="resource-btn">PYQ</button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="resources-section">
            <h2 className="resources-section-title">GATE Questions</h2>
            <div className="resources-grid">
              {previousYearPapers.map((paper, index) => (
                <div key={index} className="resource-card">
                  <h3 className="resource-card-title">Year {paper.year}</h3>
                  <div className="resource-card-buttons">
                    <button className="resource-btn">Question Paper</button>
                    <button className="resource-btn">Solution</button>
                  </div>
                </div>

              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}


