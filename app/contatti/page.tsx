import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contatti',
  description: 'Contatta Diamo Soluzioni — impresa edile a Merlino (LO). Telefono, email e richiesta preventivo gratuito.',
}

export default function ContattiPage() {
  return (
    <div style={{ backgroundColor: '#0F1115', minHeight: '100vh' }}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-20">
        <p
          className="text-xs font-semibold uppercase tracking-[0.15em] mb-4"
          style={{ color: '#C5A059' }}
        >
          Contatti
        </p>
        <h1
          className="font-bold mb-8"
          style={{
            fontFamily: '"Plus Jakarta Sans", sans-serif',
            fontSize: 'clamp(1.8rem, 3vw, 2.5rem)',
            color: '#F3F4F6',
          }}
        >
          Parliamo del Tuo Progetto
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <a
            href="tel:+393444619461"
            className="flex flex-col gap-3 p-6 rounded-xl transition-colors hover:border-[rgba(197,160,89,0.3)]"
            style={{
              backgroundColor: '#1A1D24',
              border: '1px solid rgba(255,255,255,0.08)',
            }}
          >
            <span className="text-3xl">📞</span>
            <span className="font-semibold" style={{ color: '#F3F4F6' }}>Chiamaci</span>
            <span className="font-medium" style={{ color: '#C5A059' }}>+39 344 461 9461</span>
          </a>
          <a
            href="mailto:pellumbmurgu@gmail.com"
            className="flex flex-col gap-3 p-6 rounded-xl transition-colors hover:border-[rgba(197,160,89,0.3)]"
            style={{
              backgroundColor: '#1A1D24',
              border: '1px solid rgba(255,255,255,0.08)',
            }}
          >
            <span className="text-3xl">✉</span>
            <span className="font-semibold" style={{ color: '#F3F4F6' }}>Scrivici</span>
            <span className="text-sm font-medium" style={{ color: '#C5A059' }}>pellumbmurgu@gmail.com</span>
          </a>
          <div
            className="flex flex-col gap-3 p-6 rounded-xl"
            style={{
              backgroundColor: '#1A1D24',
              border: '1px solid rgba(255,255,255,0.08)',
            }}
          >
            <span className="text-3xl">📍</span>
            <span className="font-semibold" style={{ color: '#F3F4F6' }}>Dove Siamo</span>
            <span className="text-sm" style={{ color: '#9CA3AF' }}>Merlino (LO)<br />Lombardia, Italia</span>
          </div>
        </div>

        <div
          className="rounded-xl p-6"
          style={{
            backgroundColor: '#1A1D24',
            border: '1px solid rgba(197,160,89,0.2)',
          }}
        >
          <h2 className="font-semibold mb-3" style={{ color: '#F3F4F6' }}>
            Sopralluogo Gratuito
          </h2>
          <p className="text-sm" style={{ color: '#9CA3AF' }}>
            Offriamo sopralluogo e preventivo gratuito senza impegno. Contattaci per fissare un appuntamento
            comodo per te. Operiamo a Merlino, Lodi, Melegnano e in tutta la provincia.
          </p>
        </div>
      </div>
    </div>
  )
}
