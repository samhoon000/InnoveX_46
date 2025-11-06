export default function PrimaryButton({ children, className = '', gradient = 'from-fuchsia-500 to-sky-500', ...props }) {
  const base = 'inline-flex items-center justify-center rounded-xl bg-gradient-to-r text-white font-semibold shadow-soft hover:shadow-lg hover:brightness-105 active:brightness-95 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed px-5 py-3'
  return (
    <button className={`${base} ${gradient} ${className}`} {...props}>
      {children}
    </button>
  )
}


