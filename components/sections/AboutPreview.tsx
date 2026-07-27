import Image from 'next/image'
import Link from 'next/link'

const stats = [
  { value: '250+', label: 'Progetti Realizzati' },
  { value: '100+', label: 'Clienti Soddisfatti' },
  { value: '15+', label: 'Anni di Esperienza' },
]


export default function AboutPreview() {
  return (
    <section className="py-24" style={{ backgroundColor: '#F8F9FA' }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col lg:flex-row gap-14 items-center">
        {/* Testo */}
        <div className="flex-1">
          <p
            className="text-xs font-semibold uppercase tracking-[0.15em] mb-4"
            style={{ color: '#C5A059' }}
          >
            Chi Siamo
          </p>
          <h2
            className="font-bold leading-tight mb-6"
            style={{
              fontFamily: '"Plus Jakarta Sans", sans-serif',
              fontSize: 'clamp(1.8rem, 3vw, 2.5rem)',
              color: '#0F1115',
              letterSpacing: '-0.02em',
            }}
          >
            Esperienza, Competenza,{' '}
            <span style={{ color: '#C5A059' }}>Risultati che Durano.</span>
          </h2>
          <p className="leading-[1.65] mb-8 max-w-lg" style={{ color: '#4B5563', fontSize: '1.05rem' }}>
            Da anni trasformiamo idee in realtà concrete, con competenza, affidabilità e attenzione
            ai dettagli. Operiamo a Lodi, Milano, Monza e in tutta la Lombardia con professionalità
            e rispetto delle tempistiche.
          </p>

          <div className="grid grid-cols-3 gap-6 mb-8">
            {stats.map(s => (
              <div key={s.label}>
                <div
                  className="text-3xl font-bold mb-1"
                  style={{ fontFamily: '"Plus Jakarta Sans", sans-serif', color: '#C5A059' }}
                >
                  {s.value}
                </div>
                <div className="text-xs uppercase tracking-wide" style={{ color: '#6B7280' }}>
                  {s.label}
                </div>
              </div>
            ))}
          </div>

          <Link
            href="/chi-siamo"
            className="inline-flex items-center gap-2 font-semibold text-sm px-6 py-3 rounded-lg transition-colors duration-200"
            style={{ backgroundColor: '#0F1115', color: '#F3F4F6', borderRadius: '8px' }}
          >
            Scopri la nostra storia →
          </Link>
        </div>

        {/* Griglia immagini */}
        <div className="flex-1 grid grid-cols-2 gap-3 max-w-lg w-full">
          <div className="relative rounded-xl overflow-hidden row-span-2 min-h-[300px]">
            <Image
              src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&q=80"
              alt="Cantiere edile professionale — Diamo Soluzioni Lodi"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 50vw, 25vw"
            />
          </div>
          <div className="relative rounded-xl overflow-hidden min-h-[140px]">
            <Image
              src="https://images.unsplash.com/photo-1565008447742-97f6f38c985c?w=600&q=80"
              alt="Ristrutturazione interni moderni Milano"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 50vw, 25vw"
            />
          </div>
          <div className="relative rounded-xl overflow-hidden min-h-[140px]">
            <Image
              src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=600&q=80"
              alt="Pavimentazione professionale gres porcellanato Lodi"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 50vw, 25vw"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
