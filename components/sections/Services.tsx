import Link from 'next/link'
import { services } from '@/data/services'

/* ─── Icone premium per servizio ────────────────────────────────
   Stile: lineare, stroke 1.5, bordi arrotondati, 28×28 su viewBox 24×24.
   Niente fill pesanti, nessun gradiente, nessun effetto stock.
   ─────────────────────────────────────────────────────────────── */

const S = {
  fill: 'none' as const,
  stroke: 'currentColor' as const,
  strokeWidth: 1.5,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
}

const serviceIcons: Record<string, React.ReactNode> = {
  'ristrutturazioni-chiavi-in-mano': (
    <svg viewBox="0 0 24 24" width="28" height="28" aria-hidden {...S}>
      {/* Casa */}
      <path d="M3 11.5L12 3l9 8.5" />
      <path d="M5 10.5V20h5v-5h4v5h5V10.5" />
      {/* Chiave piccola in basso a destra */}
      <circle cx="17" cy="18" r="1.8" />
      <path d="M18.6 17l1.9-1.9" />
      <path d="M19.8 15.8l1 1" />
    </svg>
  ),
  'ristrutturazione-bagno': (
    <svg viewBox="0 0 24 24" width="28" height="28" aria-hidden {...S}>
      {/* Vasca */}
      <path d="M4 14h16v3a3 3 0 01-3 3H7a3 3 0 01-3-3v-3z" />
      {/* Parete verticale con rubinetto */}
      <path d="M7 14V9a2.5 2.5 0 015 0" />
      {/* Piedi vasca */}
      <path d="M5 20l-.5 2.5M19 20l.5 2.5" />
    </svg>
  ),
  'pavimentazioni-rivestimenti': (
    <svg viewBox="0 0 24 24" width="28" height="28" aria-hidden {...S}>
      {/* Griglia posa piastrelle 2×2 + offset visivo */}
      <rect x="3" y="3" width="8" height="8" rx="0.8" />
      <rect x="13" y="3" width="8" height="8" rx="0.8" />
      <rect x="3" y="13" width="8" height="8" rx="0.8" />
      <rect x="13" y="13" width="8" height="8" rx="0.8" />
    </svg>
  ),
  'infissi-serramenti': (
    <svg viewBox="0 0 24 24" width="28" height="28" aria-hidden {...S}>
      {/* Finestra a 4 ante */}
      <rect x="2.5" y="2.5" width="19" height="19" rx="1.5" />
      <path d="M12 2.5v19" />
      <path d="M2.5 12h19" />
      {/* Maniglia centrale */}
      <path d="M12.5 10.5v3" strokeWidth={2.2} />
    </svg>
  ),
  'facciate-cappotto-termico': (
    <svg viewBox="0 0 24 24" width="28" height="28" aria-hidden {...S}>
      {/* Facciata / corpo edificio */}
      <rect x="3" y="9" width="18" height="12" rx="1" />
      {/* Linee strati cappotto */}
      <path d="M3 13.5h18" />
      <path d="M3 17.5h18" />
      {/* Timpano / tetto */}
      <path d="M8 9V6a1 1 0 011-1h6a1 1 0 011 1v3" />
    </svg>
  ),
  tinteggiatura: (
    <svg viewBox="0 0 24 24" width="28" height="28" aria-hidden {...S}>
      {/* Telaio rullo */}
      <rect x="3" y="3" width="15" height="7" rx="2" />
      {/* Rullo interno */}
      <rect x="4.5" y="4.5" width="12" height="4" rx="1" />
      {/* Manico */}
      <path d="M10.5 10v7" />
      {/* Base / vassoio vernice */}
      <path d="M7 17h7" />
    </svg>
  ),
  'impianti-idraulici': (
    <svg viewBox="0 0 24 24" width="28" height="28" aria-hidden {...S}>
      {/* Tubazione a L */}
      <path d="M5 3.5v7a2 2 0 002 2H16" />
      {/* Valvola */}
      <path d="M16 12.5h2.5" />
      <circle cx="20.5" cy="12.5" r="1.8" />
      {/* Goccia d'acqua */}
      <path d="M12 20.5c0 1.5-1.2 2.7-2.7 2.7S6.6 22 6.6 20.5C6.6 19 9.3 16 9.3 16s2.7 3 2.7 4.5z" />
    </svg>
  ),
  'impianti-elettrici': (
    <svg viewBox="0 0 24 24" width="28" height="28" aria-hidden {...S}>
      {/* Presa / socket da parete */}
      <rect x="4" y="4" width="16" height="16" rx="3" />
      {/* Pin fase + neutro */}
      <path d="M9 9.5v4M15 9.5v4" />
      {/* Terra */}
      <path d="M9 16h6" />
    </svg>
  ),
}

/* ─── Componente badge icona ──────────────────────────────────── */

function ServiceIconBadge({ slug }: { slug: string }) {
  return (
    <div
      className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5 flex-shrink-0 transition-all duration-300 text-graphite group-hover:text-teal group-hover:-translate-y-0.5"
      style={{
        backgroundColor: 'rgba(248,245,240,0.95)',
        border: '1px solid rgba(190,178,158,0.28)',
        boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
      }}
    >
      {serviceIcons[slug] ?? (
        <svg viewBox="0 0 24 24" width="28" height="28" aria-hidden {...S}>
          <rect x="3" y="3" width="18" height="18" rx="3" />
        </svg>
      )}
    </div>
  )
}

/* ─── Sezione servizi ─────────────────────────────────────────── */

export default function Services() {
  return (
    <section
      className="services-section py-20 bg-white relative overflow-hidden"
      aria-labelledby="services-heading"
    >
      <div
        className="services-bg absolute pointer-events-none select-none"
        aria-hidden
        style={{ top: 0, left: 0, right: 0, bottom: '-120px', zIndex: 0 }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative" style={{ zIndex: 10 }}>

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-gold mb-3">Cosa facciamo</p>
            <h2
              id="services-heading"
              className="font-extrabold text-graphite"
              style={{ fontSize: 'clamp(1.6rem, 3vw, 2.2rem)' }}
            >
              Un interlocutore, tutte le competenze
            </h2>
          </div>
          <Link
            href="/servizi"
            className="text-sm font-semibold text-teal hover:text-teal-dark transition-colors flex-shrink-0 flex items-center gap-1"
          >
            Tutti i servizi
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        {/* Card grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {services.map(service => (
            <Link
              key={service.slug}
              href={`/servizi/${service.slug}`}
              className="ds-card group rounded-2xl hover:shadow-card-hover transition-all bg-warm-white hover:bg-white flex flex-col p-5"
            >
              <ServiceIconBadge slug={service.slug} />
              <h3 className="font-bold text-graphite text-sm mb-2 group-hover:text-teal transition-colors leading-tight">
                {service.name}
              </h3>
              <p className="text-xs text-gray-500 leading-relaxed flex-1">{service.shortDesc}</p>
              <div className="mt-4 flex items-center gap-1 text-xs font-semibold text-teal opacity-0 group-hover:opacity-100 transition-opacity">
                Scopri
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  )
}
