import type { Metadata } from 'next'
import Image from 'next/image'

export const metadata: Metadata = {
  title: 'Progetti',
  description: 'Portfolio lavori Diamo Soluzioni — ristrutturazioni, pavimentazioni, facciate e impianti realizzati a Lodi, Milano e Lombardia.',
}

const projects = [
  {
    title: 'Ristrutturazione Appartamento',
    category: 'Ristrutturazione Completa',
    location: 'Lodi',
    image: 'https://images.unsplash.com/photo-1560185007-cde436f6a4d0?w=800&q=80',
  },
  {
    title: 'Rifacimento Facciata con Cappotto',
    category: 'Facciate & Cappotto Termico',
    location: 'Milano Sud',
    image: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=80',
  },
  {
    title: 'Pavimentazione Gres Grandi Formati',
    category: 'Pavimentazioni',
    location: 'Merlino (LO)',
    image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800&q=80',
  },
  {
    title: 'Ristrutturazione Bagno Design',
    category: 'Rifacimento Bagno',
    location: 'Monza',
    image: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=800&q=80',
  },
  {
    title: 'Sostituzione Infissi e Serramenti',
    category: 'Infissi & Serramenti',
    location: 'Crema',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
  },
  {
    title: 'Tinteggiatura e Finiture Interni',
    category: 'Imbiancatura',
    location: 'San Donato Milanese',
    image: 'https://images.unsplash.com/photo-1562663474-6cbb3eaa4d14?w=800&q=80',
  },
]

export default function ProgettiPage() {
  return (
    <div style={{ backgroundColor: '#0F1115', minHeight: '100vh' }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-20">
        <p
          className="text-xs font-semibold uppercase tracking-[0.15em] mb-4"
          style={{ color: '#C5A059' }}
        >
          Portfolio
        </p>
        <h1
          className="font-bold mb-4"
          style={{
            fontFamily: '"Plus Jakarta Sans", sans-serif',
            fontSize: 'clamp(1.8rem, 3vw, 2.5rem)',
            color: '#F3F4F6',
          }}
        >
          I Nostri Progetti
        </h1>
        <p className="mb-12 max-w-xl leading-relaxed" style={{ color: '#9CA3AF' }}>
          Ogni lavoro che realizziamo è una storia di fiducia. Ecco alcuni dei nostri interventi
          a Lodi, Milano e in tutta la Lombardia.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map(p => (
            <div
              key={p.title}
              className="rounded-xl overflow-hidden group"
              style={{ border: '1px solid rgba(255,255,255,0.08)' }}
            >
              <div className="relative h-52">
                <Image
                  src={p.image}
                  alt={`${p.title} — Diamo Soluzioni ${p.location}`}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute top-3 right-3">
                  <span
                    className="text-xs font-semibold px-3 py-1 rounded-full"
                    style={{ backgroundColor: 'rgba(197,160,89,0.9)', color: '#0F1115' }}
                  >
                    ✓ Ultimato
                  </span>
                </div>
              </div>
              <div className="p-5" style={{ backgroundColor: '#1A1D24' }}>
                <span className="text-xs font-semibold uppercase tracking-wide" style={{ color: '#C5A059' }}>
                  {p.category}
                </span>
                <h3
                  className="font-bold mt-1 mb-1"
                  style={{ fontFamily: '"Plus Jakarta Sans", sans-serif', color: '#F3F4F6' }}
                >
                  {p.title}
                </h3>
                <p className="text-sm" style={{ color: '#9CA3AF' }}>📍 {p.location}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
