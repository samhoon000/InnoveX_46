import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext.jsx'
import Navbar from '../components/Navbar.jsx'
import '../styles.css'

export default function QuizPage() {
  const { subject } = useParams()
  const navigate = useNavigate()
  const { branch, semester } = useApp()
  const [quizQuestions, setQuizQuestions] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [answers, setAnswers] = useState({})
  const [submitted, setSubmitted] = useState(false)
  const [score, setScore] = useState(null)

  // Fetch quiz data when component mounts
  useEffect(() => {
    if (!subject) {
      setError('No subject specified')
      return
    }

    setLoading(true)
    setError(null)

    const decodedSubject = decodeURIComponent(subject)

    console.log('Fetching quiz for subject:', decodedSubject)

    fetch(`http://localhost:5000/api/quiz/${subject}`)
      .then((res) => {
        console.log('Quiz response status:', res.status)
        if (!res.ok) {
          return res.json().then(errData => {
            throw new Error(errData.error || `Failed to fetch quiz: ${res.status} ${res.statusText}`)
          })
        }
        return res.json()
      })
      .then((data) => {
        console.log('Quiz data received:', data)
        setQuizQuestions(data || [])
        setLoading(false)
        // Initialize answers object
        const initialAnswers = {}
        if (data && data.length > 0) {
          data.forEach((_, index) => {
            initialAnswers[index] = ''
          })
        }
        setAnswers(initialAnswers)
      })
      .catch((err) => {
        console.error('Error fetching quiz:', err)
        setError(err.message || 'Failed to fetch quiz')
        setLoading(false)
      })
  }, [subject])

  // Handle answer selection
  const handleAnswerChange = (questionIndex, selectedAnswer) => {
    if (submitted) return // Don't allow changes after submission

    setAnswers((prev) => ({
      ...prev,
      [questionIndex]: selectedAnswer,
    }))
  }

  // Handle quiz submission
  const handleSubmit = () => {
    if (submitted) return

    let correctCount = 0
    const totalQuestions = quizQuestions.length

    quizQuestions.forEach((question, index) => {
      if (answers[index] === question.answer) {
        correctCount++
      }
    })

    setScore({ correct: correctCount, total: totalQuestions })
    setSubmitted(true)
  }

  return (
    <>
      <Navbar />
      <div className="quiz-page-container">
        <div className="quiz-content-wrapper">
          {/* Header */}
          <div className="quiz-header">
            <h1 className="quiz-main-title">Quiz - {decodeURIComponent(subject || '')}</h1>
            <p className="quiz-subtitle">
              {branch && semester
                ? `${branch} · Semester ${semester}`
                : 'Select branch and semester to take quiz'}
            </p>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="quiz-loading-container">
              <div className="quiz-loading-spinner"></div>
              <div className="quiz-loading-text">Fetching quiz...</div>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="quiz-error-container">
              <p className="quiz-error-text">Error: {error}</p>
              <p className="quiz-error-hint">
                Make sure the backend server is running and MongoDB is connected.
              </p>
              <button
                onClick={() => navigate('/resources')}
                className="quiz-back-button"
              >
                Back to Resources
              </button>
            </div>
          )}

          {/* Quiz Questions */}
          {quizQuestions.length > 0 && !loading && !error && (
            <div className="quiz-questions-container">
              {quizQuestions.map((question, questionIndex) => (
                <div key={questionIndex} className="quiz-question-card">
                  <div className="quiz-question-header">
                    <span className="quiz-question-number">
                      Question {questionIndex + 1}
                    </span>
                  </div>
                  <h3 className="quiz-question-text">{question.question}</h3>
                  <div className="quiz-options-container">
                    {['a', 'b', 'c', 'd'].map((option) => (
                      <label
                        key={option}
                        className={`quiz-option-label ${
                          submitted && answers[questionIndex] === option
                            ? answers[questionIndex] === question.answer
                              ? 'quiz-option-correct'
                              : 'quiz-option-incorrect'
                            : ''
                        } ${
                          submitted && option === question.answer
                            ? 'quiz-option-correct-answer'
                            : ''
                        } ${submitted ? 'quiz-option-disabled' : ''}`}
                      >
                        <input
                          type="radio"
                          name={`question-${questionIndex}`}
                          value={option}
                          checked={answers[questionIndex] === option}
                          onChange={() => handleAnswerChange(questionIndex, option)}
                          disabled={submitted}
                          className="quiz-radio-input"
                        />
                        <span className="quiz-option-letter">{option.toUpperCase()}.</span>
                        <span className="quiz-option-text">{question.options[option]}</span>
                      </label>
                    ))}
                  </div>
                </div>
              ))}

              {/* Submit Button */}
              {!submitted && (
                <div className="quiz-submit-container">
                  <button
                    onClick={handleSubmit}
                    className="quiz-submit-button"
                    disabled={Object.keys(answers).some(
                      (key) => answers[key] === ''
                    )}
                  >
                    Submit Quiz
                  </button>
                </div>
              )}

              {/* Score Display */}
              {submitted && score && (
                <div className="quiz-score-container">
                  <div className="quiz-score-card">
                    <h2 className="quiz-score-title">Quiz Results</h2>
                    <div className="quiz-score-display">
                      <span className="quiz-score-text">
                        You scored <span className="quiz-score-number">{score.correct}</span>/{' '}
                        <span className="quiz-score-number">{score.total}</span> correct.
                      </span>
                    </div>
                    <div className="quiz-score-percentage">
                      Score: {Math.round((score.correct / score.total) * 100)}%
                    </div>
                    <button
                      onClick={() => navigate('/resources')}
                      className="quiz-back-button"
                    >
                      Back to Resources
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* No Questions Message */}
          {!loading && !error && quizQuestions.length === 0 && (
            <div className="quiz-no-questions">
              <p>No quiz questions available for this subject.</p>
              <button
                onClick={() => navigate('/resources')}
                className="quiz-back-button"
              >
                Back to Resources
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

