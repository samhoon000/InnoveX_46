export default function PrimaryButton({ children, className = '', gradient = 'from-fuchsia-500 to-sky-500', ...props }) {
  const base = 'inline-flex items-center justify-center rounded-xl bg-gradient-to-r text-white font-semibold shadow-[0_4px_14px_rgba(0,0,0,0.15)] hover:shadow-[0_6px_20px_rgba(0,0,0,0.2)] hover:brightness-110 active:brightness-95 active:scale-[0.98] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-[0_4px_14px_rgba(0,0,0,0.15)] disabled:hover:brightness-100'
  return (
    <button className={`${base} ${gradient} ${className}`} {...props}>
      {children}
    </button>
  )
}


