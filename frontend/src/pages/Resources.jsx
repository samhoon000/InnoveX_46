import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext.jsx'
import Navbar from '../components/Navbar.jsx'
import '../styles.css'

export default function Resources() {
  const navigate = useNavigate()
  const { nickname, scheme, branch, semester } = useApp()
  const [subjects, setSubjects] = useState([])
  const [selectedSubject, setSelectedSubject] = useState(null)
  const [moduleData, setModuleData] = useState(null)
  const [selectedModule, setSelectedModule] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [loadingModules, setLoadingModules] = useState(false)

  // Handle quiz button click
  const handleStartQuiz = (subject) => {
    if (subject) {
      const encodedSubject = encodeURIComponent(subject)
      navigate(`/quiz/${encodedSubject}`)
    }
  }

  // Fetch subjects when branch and semester are available
  useEffect(() => {
    if (!branch || !semester) {
      setSubjects([])
      setSelectedSubject(null)
      setModuleData(null)
      setSelectedModule(null)
      return
    }

    setLoading(true)
    setError(null)
    setSelectedSubject(null)
    setModuleData(null)
    setSelectedModule(null)

    // Branch is already "CSE" from SelectionPage
    const branchCode = branch.toUpperCase()
    
    console.log('Fetching subjects for:', branchCode, semester)
    
    fetch(`http://localhost:5000/api/subjects/${branchCode}/${semester}`)
      .then((res) => {
        console.log('Response status:', res.status)
        if (!res.ok) {
          return res.json().then(errData => {
            throw new Error(errData.error || `Failed to fetch subjects: ${res.status} ${res.statusText}`)
          })
        }
        return res.json()
      })
      .then((data) => {
        console.log('Subjects data:', data)
        setSubjects(data.subjects || [])
        setLoading(false)
      })
      .catch((err) => {
        console.error('Error fetching subjects:', err)
        setError(err.message || 'Failed to fetch subjects')
        setLoading(false)
      })
  }, [branch, semester])

  // Fetch module data when a subject is selected
  const handleSubjectClick = async (subjectName) => {
    setSelectedSubject(subjectName)
    setModuleData(null)
    setSelectedModule(null)
    setLoadingModules(true)
    setError(null)

    try {
      const branchCode = branch.toUpperCase()
      const encodedSubject = encodeURIComponent(subjectName)
      
      console.log('Fetching modules for subject:', subjectName, 'branch:', branchCode, 'sem:', semester)
      
      const response = await fetch(
        `http://localhost:5000/api/modules/${encodedSubject}?branch=${branchCode}&sem=${semester}`
      )

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.error || `Failed to fetch modules: ${response.status} ${response.statusText}`)
      }

      const data = await response.json()
      console.log('Module data received:', data)
      setModuleData(data)
      setLoadingModules(false)
    } catch (err) {
      console.error('Error fetching module data:', err)
      setError(err.message || 'Failed to fetch module data')
      setLoadingModules(false)
    }
  }

  // Handle module selection to show its resources
  const handleModuleClick = (moduleIndex) => {
    setSelectedModule(moduleIndex)
  }

  return (
    <>
      <Navbar />
      <div className="resources-page-container">
        <div className="resources-content-wrapper">
          {/* Header */}
          <div className="resources-header">
            <h1 className="resources-main-title">
              Your Learning Resources
            </h1>
            <p className="resources-subtitle">
              {nickname && <b>Hi {nickname}! </b>}
              {scheme && <b>Scheme {scheme} · </b>}
              {branch && semester
                ? `${branch} · Semester ${semester}`
                : 'Select branch and semester to view resources'}
            </p>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="loading-container">
              <div className="loading-text">Loading subjects...</div>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="error-container">
              <p className="error-text">Error: {error}</p>
              <p className="error-hint">
                Make sure the backend server is running and MongoDB is connected.
              </p>
            </div>
          )}

          {/* Subjects Grid */}
          {!loading && !error && subjects.length > 0 && (
            <div className="subjects-section">
              <h2 className="subjects-section-title">Select a Subject</h2>
              <div className="subjects-grid">
                {subjects.map((subject, index) => (
                  <button
                    key={index}
                    onClick={() => handleSubjectClick(subject)}
                    className={`subject-card-btn ${
                      selectedSubject === subject
                        ? 'subject-card-btn-selected'
                        : ''
                    }`}
                  >
                    <div className="subject-card-title">{subject}</div>
                    {selectedSubject === subject && (
                      <div className="subject-selected-indicator">Selected</div>
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* No Subjects Message */}
          {!loading && !error && subjects.length === 0 && branch && semester && (
            <div className="no-subjects-message">
              <p>No subjects found for the selected branch and semester.</p>
            </div>
          )}

          {/* Loading Modules */}
          {loadingModules && (
            <div className="loading-container">
              <div className="loading-text">Loading module data...</div>
            </div>
          )}

          {/* Module Buttons Display */}
          {moduleData && !loadingModules && (
            <div className="module-data-container">
              <div className="module-data-header">
                <h2 className="module-data-title">
                  {moduleData.subject}
                </h2>
                <p className="module-data-meta">
                  {moduleData.branch} · Semester {moduleData.sem}
                </p>
                {/* Quiz Button */}
                {selectedSubject && (
                  <div className="subject-quiz-button-container">
                    <button
                      onClick={() => handleStartQuiz(selectedSubject)}
                      className="subject-quiz-button"
                    >
                      Take Quiz
                    </button>
                  </div>
                )}
              </div>

              {moduleData.modules && moduleData.modules.length > 0 ? (
                <>
                  <div className="modules-buttons-section">
                    <h3 className="modules-buttons-title">Select a Module</h3>
                    <div className="modules-buttons-grid">
                      {moduleData.modules.map((module, index) => (
                        <button
                          key={index}
                          onClick={() => handleModuleClick(index)}
                          className={`module-button ${
                            selectedModule === index ? 'module-button-selected' : ''
                          }`}
                        >
                          {module.moduleName}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Selected Module Resources */}
                  {selectedModule !== null && moduleData.modules[selectedModule] && (
                    <div className="module-resources-container">
                      <div className="module-resources-card">
                        <h3 className="module-resources-name">
                          {moduleData.modules[selectedModule].moduleName}
                        </h3>

                        {/* YouTube Links */}
                        {moduleData.modules[selectedModule].youtubeLinks && 
                         moduleData.modules[selectedModule].youtubeLinks.length > 0 && (
                          <div className="module-links-section">
                            <h4 className="module-links-title">
                              YouTube Links
                            </h4>
                            <div className="module-links-list">
                              {moduleData.modules[selectedModule].youtubeLinks.map((link, linkIndex) => (
                                <a
                                  key={linkIndex}
                                  href={link}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="module-link"
                                >
                                  🎥 {link}
                                </a>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* PDF Links */}
                        {moduleData.modules[selectedModule].pdfLinks && 
                         moduleData.modules[selectedModule].pdfLinks.length > 0 && (
                          <div className="module-links-section">
                            <h4 className="module-links-title">
                              PDF Links
                            </h4>
                            <div className="module-links-list">
                              {moduleData.modules[selectedModule].pdfLinks.map((link, linkIndex) => (
                                <a
                                  key={linkIndex}
                                  href={link}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="module-link"
                                >
                                  📄 {link}
                                </a>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <div className="no-modules-message">
                  <p>No modules available for this subject.</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  )
}
