import { createContext, useContext, useMemo, useState } from 'react'

const AppContext = createContext(null)

export function AppProvider({ children }) {
  const [nickname, setNickname] = useState('')
  const [scheme, setScheme] = useState('')
  const [branch, setBranch] = useState('')
  const [semester, setSemester] = useState('')

  const value = useMemo(() => ({
    nickname,
    setNickname,
    scheme,
    setScheme,
    branch,
    setBranch,
    semester,
    setSemester,
  }), [nickname, scheme, branch, semester])

  return (
    <AppContext.Provider value={value}>{children}</AppContext.Provider>
  )
}

export function useApp() {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp must be used within AppProvider')
  return ctx
}


