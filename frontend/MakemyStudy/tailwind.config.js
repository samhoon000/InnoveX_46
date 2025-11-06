/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Plus Jakarta Sans"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        sans: ['"Plus Jakarta Sans"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 10px 30px rgba(0,0,0,0.08)',
      },
      backgroundImage: {
        'pastel-1': 'linear-gradient(135deg, #fbc2eb 0%, #a6c1ee 100%)',
        'pastel-2': 'linear-gradient(135deg, #ffd1ff 0%, #c2e9fb 100%)',
        'pastel-3': 'linear-gradient(135deg, #fdfbfb 0%, #ebedee 100%)',
      },
    },
  },
  plugins: [],
}


