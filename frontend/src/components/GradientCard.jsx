export default function GradientCard({ children, className = '' }) {
  return (
    <div className={`p-8 sm:p-10 bg-white/80 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.08)] rounded-2xl border border-white/50 transition-all duration-300 ${className}`}>
      {children}
    </div>
  )
}


