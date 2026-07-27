import type { Metadata } from 'next'
import Image from 'next/image'

export const metadata: Metadata = {
  title: 'Progetti',
  description: 'Portfolio lavori di Diamo Soluzioni — ristrutturazioni, pavimentazioni e impianti realizzati a Merlino e provincia di Lodi.',
}

// Aggiungere oggetti qui man mano che Denis fornisce foto reali
const projects: { title: string; category: string; location: string; image?: string }[] = []

export default function ProgettiPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-16">
      <p className="text-brand-accent text-sm font-bold uppercase tracking-widest mb-3">Portfolio</p>
      <h1 className="text-4xl font-black text-brand-dark mb-4">I Nostri Progetti</h1>
      <p className="text-gray-500 mb-12">
        Ogni lavoro che realizziamo è una storia di fiducia. Ecco alcuni dei nostri interventi.
      </p>
      {projects.length === 0 ? (
        <div className="text-center py-24 text-gray-400">
          <div className="text-6xl mb-4">📸</div>
          <p className="text-lg">Portfolio in aggiornamento — presto online le foto dei nostri lavori.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map(p => (
            <div key={p.title} className="rounded-2xl overflow-hidden shadow hover:shadow-lg transition">
              <div className="bg-gray-200 h-48 flex items-center justify-center text-gray-400">
                {p.image ? <Image src={p.image} alt={p.title} fill className="w-full h-full object-cover" /> : '📸'}
              </div>
              <div className="p-4">
                <span className="text-brand-accent text-xs font-bold uppercase">{p.category}</span>
                <h3 className="font-bold text-brand-dark mt-1">{p.title}</h3>
                <p className="text-gray-400 text-sm">📍 {p.location}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
