import { Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login.jsx'
import SignUp from './pages/SignUp.jsx'
import SelectionPage from './pages/SelectionPage.jsx'
import Resources from './pages/Resources.jsx'
import QuizPage from './pages/QuizPage.jsx'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/selection" element={<SelectionPage />} />
      <Route path="/resources" element={<Resources />} />
      <Route path="/quiz/:subject" element={<QuizPage />} />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  )
}

export default App
