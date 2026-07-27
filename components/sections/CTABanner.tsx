import Link from 'next/link'

export default function CTABanner() {
  return (
    <section
      className="py-16"
      style={{
        background: 'linear-gradient(135deg, #1A1D24 0%, #0F1115 100%)',
        borderTop: '1px solid rgba(255,255,255,0.08)',
      }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row items-center justify-between gap-8">
        <div>
          <p
            className="text-xs font-semibold uppercase tracking-[0.15em] mb-3"
            style={{ color: '#C5A059' }}
          >
            Inizia Oggi
          </p>
          <h2
            className="font-bold mb-2"
            style={{
              fontFamily: '"Plus Jakarta Sans", sans-serif',
              fontSize: 'clamp(1.5rem, 2.5vw, 2rem)',
              color: '#F3F4F6',
            }}
          >
            Hai un Progetto in Mente?
          </h2>
          <p style={{ color: '#9CA3AF' }}>
            Contattaci per un preventivo gratuito e senza impegno. Operiamo in tutta la Lombardia.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 flex-shrink-0">
          <Link
            href="/contatti"
            className="font-semibold px-8 py-3.5 rounded-lg transition-colors duration-200 text-center text-sm whitespace-nowrap"
            style={{ backgroundColor: '#C5A059', color: '#0F1115', borderRadius: '8px' }}
          >
            Richiedi Preventivo Gratuito →
          </Link>
          <a
            href="tel:+393444619461"
            className="font-semibold px-8 py-3.5 rounded-lg transition-colors duration-200 text-center text-sm whitespace-nowrap"
            style={{
              backgroundColor: 'transparent',
              color: '#F3F4F6',
              border: '1px solid rgba(255,255,255,0.2)',
              borderRadius: '8px',
            }}
          >
            📞 +39 344 461 9461
          </a>
        </div>
      </div>
    </section>
  )
}
