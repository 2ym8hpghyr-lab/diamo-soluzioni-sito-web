import Link from 'next/link'
import Image from 'next/image'
import { business } from '@/config/business'
import { services } from '@/data/services'
import CookieSettingsButton from './CookieSettingsButton'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer style={{ backgroundColor: '#F8F8F5' }} aria-label="Footer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14 lg:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Col 1: Brand */}
          <div>
            <Link href="/" className="flex items-center gap-3 mb-5">
              <Image
                src="/images/logo.jpg"
                alt="Diamo Soluzioni"
                width={40}
                height={40}
                className="rounded-lg"
              />
              <div>
                <p className="font-extrabold text-sm uppercase tracking-wide" style={{ color: '#1E2A2E' }}>Diamo Soluzioni</p>
                <p className="text-[10px] uppercase tracking-widest" style={{ color: '#6B5209' }}>Impresa Edile</p>
              </div>
            </Link>
            <p className="text-sm leading-relaxed mb-5" style={{ color: '#4A5568' }}>
              {business.description}
            </p>
            <div className="text-xs space-y-1" style={{ color: '#4B5563' }}>
              <p>P.IVA {business.vatId}</p>
              <p>{business.address.full}</p>
            </div>
          </div>

          {/* Col 2: Servizi max 6 */}
          <div>
            <h3 className="font-bold text-sm uppercase tracking-wide mb-4" style={{ color: '#1E2A2E' }}>Servizi</h3>
            <ul className="space-y-2.5">
              {services.slice(0, 6).map(s => (
                <li key={s.slug}>
                  <Link
                    href={`/servizi/${s.slug}`}
                    className="text-sm transition-colors hover:text-teal"
                    style={{ color: '#4A5568' }}
                  >
                    {s.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Azienda */}
          <div>
            <h3 className="font-bold text-sm uppercase tracking-wide mb-4" style={{ color: '#1E2A2E' }}>Azienda</h3>
            <ul className="space-y-2.5">
              {[
                { href: '/', label: 'Home' },
                { href: '/chi-siamo', label: 'Chi siamo' },
                { href: '/progetti', label: 'Portfolio progetti' },
                { href: '/blog', label: 'Blog' },
                { href: '/contatti', label: 'Contatti' },
                { href: '/#preventivatore', label: 'Preventivo AI' },
              ].map(l => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sm transition-colors hover:text-teal"
                    style={{ color: '#4A5568' }}
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Contatti — card carbone */}
          <div>
            <h3 className="font-bold text-sm uppercase tracking-wide mb-4" style={{ color: '#1E2A2E' }}>Contatti</h3>
            <div className="rounded-xl p-5 space-y-3.5" style={{ backgroundColor: '#1E2A2E' }}>
              <a
                href={`tel:${business.phone.primaryRaw}`}
                className="flex items-center gap-2.5 text-sm"
                style={{ color: 'rgba(248,248,245,0.75)' }}
              >
                <span className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: 'rgba(248,248,245,0.08)' }}>
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </span>
                {business.phone.primary}
              </a>
              <a
                href={business.whatsapp.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Scrivici su WhatsApp"
                className="flex items-center gap-2.5 text-sm"
                style={{ color: 'rgba(248,248,245,0.75)' }}
              >
                <span className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: 'rgba(248,248,245,0.08)' }}>
                  <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                </span>
                WhatsApp
              </a>
              <a
                href={`mailto:${business.email}`}
                className="flex items-center gap-2.5 text-sm"
                style={{ color: 'rgba(248,248,245,0.75)' }}
              >
                <span className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: 'rgba(248,248,245,0.08)' }}>
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </span>
                {business.email}
              </a>
              <div style={{ borderTop: '1px solid rgba(248,248,245,0.08)', paddingTop: '12px' }}>
                <p className="text-xs" style={{ color: 'rgba(248,248,245,0.65)' }}>
                  Lun–Ven {business.hours.weekdays}
                </p>
                <p className="text-xs mt-0.5" style={{ color: 'rgba(248,248,245,0.65)' }}>
                  Disponibili anche il weekend
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Zone servite */}
        <div className="mt-10 pt-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4" style={{ borderTop: '1px solid #ECEDE9' }}>
          <div>
            <p className="text-xs uppercase tracking-wider mb-2" style={{ color: '#4B5563' }}>Zone servite</p>
            <p className="text-xs" style={{ color: '#6B7280' }}>
              {business.areas.join(' · ')}
            </p>
          </div>
          <a
            href={business.social.googleBusiness}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-semibold transition-colors"
            style={{ color: '#6B5209' }}
          >
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            </svg>
            Lascia una recensione
          </a>
        </div>
      </div>

      {/* Copyright */}
      <div style={{ borderTop: '1px solid #ECEDE9' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex flex-col sm:flex-row justify-between items-center gap-2 text-xs" style={{ color: '#4B5563' }}>
          <p>© {year} {business.legalName} — P.IVA {business.vatId}</p>
          <div className="flex gap-4">
            <a href={business.social.googleBusiness} target="_blank" rel="noopener noreferrer" className="hover:text-graphite transition-colors">Recensioni Google</a>
            <Link href="/privacy-policy" className="hover:text-graphite transition-colors">Privacy</Link>
            <CookieSettingsButton />
            <Link href="/sitemap.xml" className="hover:text-graphite transition-colors">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
