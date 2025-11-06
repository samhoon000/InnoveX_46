export default function Container({ children, className = '' }) {
  return (
    <div className={`w-full max-w-xl mx-auto ${className}`}>
      {children}
    </div>
  )
}



