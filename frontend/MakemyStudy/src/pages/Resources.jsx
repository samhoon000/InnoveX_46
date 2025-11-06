import { useApp } from '../context/AppContext.jsx'
import GradientCard from '../components/GradientCard.jsx'

const sampleSubjects = [
  { name: 'Data Structures', pdf: '#', yt: '#' },
  { name: 'Discrete Mathematics', pdf: '#', yt: '#' },
  { name: 'Computer Networks', pdf: '#', yt: '#' },
  { name: 'Operating Systems', pdf: '#', yt: '#' },
  { name: 'DBMS', pdf: '#', yt: '#' },
  { name: 'Web Technologies', pdf: '#', yt: '#' },
]

export default function Resources() {
  const { nickname, scheme, branch, semester } = useApp()

  return (
    <div className="w-full">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-display font-semibold">Your Resources</h2>
          <p className="text-slate-500 mt-1">
            {nickname ? `Hi ${nickname}, ` : ''}Scheme {scheme || '—'} · {branch || '—'} · Sem {semester || '—'}
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {sampleSubjects.map((s) => (
            <GradientCard key={s.name} className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-semibold text-lg">{s.name}</h3>
                  <p className="text-sm text-slate-500 mt-1">Curated study PDFs and videos</p>
                </div>
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-fuchsia-200 to-sky-200 text-slate-700 shadow-soft">📘</span>
              </div>
              <div className="mt-5 flex gap-3">
                <a href={s.pdf} className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-fuchsia-500 to-sky-500 text-white font-semibold shadow-soft hover:shadow-lg hover:brightness-105 active:brightness-95 transition-all duration-200 px-4 py-2">PDF</a>
                <a href={s.yt} className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-rose-500 to-orange-500 text-white font-semibold shadow-soft hover:shadow-lg hover:brightness-105 active:brightness-95 transition-all duration-200 px-4 py-2">YouTube</a>
              </div>
            </GradientCard>
          ))}
        </div>
      </div>
    </div>
  )
}


