import { Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login.jsx'
import Nickname from './pages/Nickname.jsx'
import Scheme from './pages/Scheme.jsx'
import BranchSemester from './pages/BranchSemester.jsx'
import Resources from './pages/Resources.jsx'

function App() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-pink-50 via-purple-50 to-sky-50 text-slate-800">
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/nickname" element={<Nickname />} />
        <Route path="/scheme" element={<Scheme />} />
        <Route path="/select" element={<BranchSemester />} />
        <Route path="/resources" element={<Resources />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </div>
  )
}

export default App
