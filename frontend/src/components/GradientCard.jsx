export default function GradientCard({ children, className = '' }) {
  return (
    <div className={`p-8 bg-white/70 backdrop-blur-xl shadow-soft rounded-2xl ${className}`}>
      {children}
    </div>
  )
}


