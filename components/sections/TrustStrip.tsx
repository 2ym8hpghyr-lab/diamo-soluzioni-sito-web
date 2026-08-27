/* ─── TrustStrip — segnali di fiducia con icone SVG premium ─────
   Stile: lineare, stroke 1.5, 22×22 su viewBox 24×24.
   Container 40px, sfondo sabbia caldo, bordo pietra leggero.
   ─────────────────────────────────────────────────────────────── */

const S = {
  fill: 'none' as const,
  stroke: 'currentColor' as const,
  strokeWidth: 1.5,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
}

const signals = [
  {
    icon: (
      <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden {...S}>
        {/* Casa con check interno */}
        <path d="M3 11.5L12 3l9 8.5" />
        <path d="M5 10.5V20h5v-4.5h4V20h5V10.5" />
        <path d="M10 15l1.5 1.5L14 13" />
      </svg>
    ),
    label: 'Sopralluogo gratuito',
    desc: 'Veniamo da te senza impegno',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden {...S}>
        {/* Documento con righe tecniche */}
        <rect x="5" y="2" width="14" height="20" rx="1.5" />
        <path d="M9 7h6M9 11h6M9 15h4" />
      </svg>
    ),
    label: 'Preventivo dettagliato',
    desc: 'Scritto, prima di iniziare',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden {...S}>
        {/* Persona + check badge */}
        <circle cx="9" cy="7" r="3" />
        <path d="M3 20c0-3.3 2.7-6 6-6" />
        <path d="M15 14l2 2 4-4" />
      </svg>
    ),
    label: 'Un solo referente',
    desc: 'Dal sopralluogo alla consegna',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden {...S}>
        {/* Pin mappa */}
        <path d="M12 2C8.7 2 6 4.7 6 8c0 5.3 6 14 6 14s6-8.7 6-14c0-3.3-2.7-6-6-6z" />
        <circle cx="12" cy="8" r="2" />
      </svg>
    ),
    label: 'Lodi e Milano Sud',
    desc: 'Zona servita confermata',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden {...S}>
        {/* Telefono */}
        <path d="M5.5 2h3.4L11 7l-2.5 1.5a11 11 0 005 5L15 11l5 2v3.4A2.6 2.6 0 0117.4 19C9.7 19 5 14.3 5 6.6A2.6 2.6 0 015.5 2z" />
      </svg>
    ),
    label: 'Assistenza diretta',
    desc: 'Risponde il titolare',
  },
]

export default function TrustStrip() {
  return (
    <section className="bg-concrete border-b border-concrete" aria-label="Segnali di fiducia">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
        <div className="flex flex-wrap justify-center lg:justify-between gap-x-6 gap-y-4">
          {signals.map(s => (
            <div key={s.label} className="flex items-center gap-3 min-w-0">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 text-graphite"
                style={{
                  backgroundColor: 'rgba(248,245,240,0.95)',
                  border: '1px solid rgba(190,178,158,0.28)',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
                }}
              >
                {s.icon}
              </div>
              <div className="min-w-0">
                <p className="text-sm font-bold text-graphite leading-tight">{s.label}</p>
                <p className="text-xs text-gray-500 leading-tight">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
