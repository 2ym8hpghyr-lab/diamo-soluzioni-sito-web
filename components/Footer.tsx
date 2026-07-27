import Link from 'next/link'

const quickLinks = [
  { href: '/', label: 'Home' },
  { href: '/chi-siamo', label: 'Chi Siamo' },
  { href: '/servizi', label: 'Servizi' },
  { href: '/progetti', label: 'Portfolio Progetti' },
  { href: '/contatti', label: 'Contatti' },
]

const serviceLinks = [
  'Ristrutturazioni Chiavi in Mano',
  'Infissi e Serramenti',
  'Imbiancatura e Tinteggiatura',
  'Facciate e Cappotto Termico',
  'Pavimentazioni e Rivestimenti',
  'Impianti Idraulici ed Elettrici',
]

export default function Footer() {
  return (
    <footer style={{ backgroundColor: '#0F1115', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Col 1: Info Azienda */}
          <div>
            <h3
              className="font-bold text-base mb-1"
              style={{ fontFamily: '"Plus Jakarta Sans", sans-serif', color: '#F3F4F6' }}
            >
              Diamo Soluzioni
            </h3>
            <p className="text-xs mb-4" style={{ color: '#C5A059' }}>Costruiamo Valore</p>
            <p className="text-sm leading-relaxed mb-4" style={{ color: '#9CA3AF' }}>
              Impresa edile specializzata in ristrutturazioni complete, infissi, facciate e impianti.
              Sede a Merlino (LO), operiamo in tutta la Lombardia.
            </p>
            <p className="text-xs" style={{ color: '#6B7280' }}>
              P.IVA 12870260960<br />
              Sede: Via Roma 1, 26833 Merlino (LO)
            </p>
          </div>

          {/* Col 2: Link Rapidi */}
          <div>
            <h4 className="font-semibold text-sm mb-4 uppercase tracking-wide" style={{ color: '#F3F4F6' }}>
              Link Rapidi
            </h4>
            <ul className="flex flex-col gap-2.5">
              {quickLinks.map(l => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sm transition-colors duration-200 hover:text-brand-accent"
                    style={{ color: '#9CA3AF' }}
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Servizi Principali */}
          <div>
            <h4 className="font-semibold text-sm mb-4 uppercase tracking-wide" style={{ color: '#F3F4F6' }}>
              Servizi
            </h4>
            <ul className="flex flex-col gap-2.5">
              {serviceLinks.map(s => (
                <li key={s}>
                  <Link
                    href="/servizi"
                    className="text-sm transition-colors duration-200 hover:text-brand-accent"
                    style={{ color: '#9CA3AF' }}
                  >
                    {s}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Contatti */}
          <div>
            <h4 className="font-semibold text-sm mb-4 uppercase tracking-wide" style={{ color: '#F3F4F6' }}>
              Contatti
            </h4>
            <div className="flex flex-col gap-3">
              <a
                href="tel:+393444619461"
                className="flex items-center gap-2 text-sm transition-colors duration-200"
                style={{ color: '#9CA3AF' }}
              >
                <span>📞</span>
                <span>+39 344 461 9461</span>
              </a>
              <a
                href="tel:+393534375609"
                className="flex items-center gap-2 text-sm transition-colors duration-200"
                style={{ color: '#9CA3AF' }}
              >
                <span>📞</span>
                <span>+39 353 437 5609</span>
              </a>
              <a
                href="mailto:pellumbmurgu@gmail.com"
                className="flex items-center gap-2 text-sm transition-colors duration-200"
                style={{ color: '#9CA3AF' }}
              >
                <span>✉</span>
                <span>pellumbmurgu@gmail.com</span>
              </a>
              <p className="flex items-center gap-2 text-sm" style={{ color: '#9CA3AF' }}>
                <span>📍</span>
                <span>Merlino (LO), Lombardia</span>
              </p>
              <div
                className="mt-2 px-4 py-2.5 rounded-lg text-xs font-medium text-center"
                style={{
                  backgroundColor: 'rgba(197,160,89,0.1)',
                  border: '1px solid rgba(197,160,89,0.25)',
                  color: '#C5A059',
                }}
              >
                ★ Verificato su Google Maps
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        className="border-t"
        style={{ borderColor: 'rgba(255,255,255,0.06)' }}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-5 flex flex-col sm:flex-row justify-between items-center gap-2 text-xs" style={{ color: '#6B7280' }}>
          <p>© 2026 Diamo Soluzioni di Murgu Pellumb — P.IVA 12870260960</p>
          <p>Lodi · Milano · Monza · Pavia · Crema · Lombardia</p>
        </div>
      </div>
    </footer>
  )
}
