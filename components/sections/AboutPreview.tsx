const stats = [
  { value: '250+', label: 'Progetti Realizzati' },
  { value: '100+', label: 'Clienti Soddisfatti' },
  { value: '15+', label: 'Anni di Esperienza' },
]

export default function AboutPreview() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 flex flex-col lg:flex-row gap-12 items-center">
        <div className="flex-1">
          <p className="text-brand-accent text-sm font-bold uppercase tracking-widest mb-3">Chi Siamo</p>
          <h2 className="text-4xl font-black text-brand-dark leading-tight mb-6">
            ESPERIENZA, COMPETENZA,{' '}
            <span className="text-brand-accent">RISULTATI CHE DURANO.</span>
          </h2>
          <p className="text-gray-600 mb-6 leading-relaxed">
            Da anni trasformiamo idee in realtà concrete, con competenza, affidabilità e attenzione
            ai dettagli. Ogni progetto è per noi una sfida da affrontare con passione e responsabilità.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-8">
            {stats.map(s => (
              <div key={s.label} className="flex items-center gap-3">
                <div className="text-3xl font-black text-brand-accent">{s.value}</div>
                <div className="text-xs text-gray-500 uppercase tracking-wide leading-tight">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="flex-1 grid grid-cols-2 gap-4">
          {/* Immagini stock — da sostituire con foto reali */}
          <div className="bg-gray-300 rounded-xl h-48 flex items-center justify-center text-gray-500 text-sm">📸 Foto lavoro</div>
          <div className="bg-gray-400 rounded-xl h-32 flex items-center justify-center text-gray-500 text-sm mt-8">📸 Foto lavoro</div>
          <div className="bg-gray-400 rounded-xl h-32 flex items-center justify-center text-gray-500 text-sm">📸 Foto lavoro</div>
          <div className="bg-gray-300 rounded-xl h-48 flex items-center justify-center text-gray-500 text-sm">📸 Foto lavoro</div>
        </div>
      </div>
    </section>
  )
}
