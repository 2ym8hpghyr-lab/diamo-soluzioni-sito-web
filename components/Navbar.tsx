'use client'
import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { business, whatsappUrl } from '@/config/business'
import { services } from '@/data/services'

type GtagFn = (...args: unknown[]) => void
function trackEvent(name: string, params?: Record<string, unknown>) {
  const w = window as unknown as { gtag?: GtagFn }
  if (typeof window !== 'undefined' && w.gtag) {
    w.gtag('event', name, params)
  }
}

const WA_MESSAGE = 'Buongiorno, ho visitato il vostro sito e vorrei informazioni per un sopralluogo gratuito.'

const mainLinks = [
  { href: '/chi-siamo', label: 'Chi siamo' },
  { href: '/progetti', label: 'Progetti' },
  { href: '/blog', label: 'Blog' },
  { href: '/faq', label: 'FAQ' },
  { href: '/contatti', label: 'Contatti' },
]

const navServiceIcons: Record<string, React.ReactNode> = {
  house: (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.25 12l8.954-8.955a1.5 1.5 0 012.122 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
    </svg>
  ),
  droplets: (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
    </svg>
  ),
  grid: (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
    </svg>
  ),
  'square-dashed': (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15" />
    </svg>
  ),
  layers: (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6.429 9.75L2.25 12l4.179 2.25m0-4.5l5.571 3 5.571-3m-11.142 0L2.25 7.5 12 2.25l9.75 5.25-4.179 2.25m0 0L21.75 12l-4.179 2.25m0 0l4.179 2.25L12 21.75 2.25 16.5l4.179-2.25m11.142 0l-5.571 3-5.571-3" />
    </svg>
  ),
  paintbrush: (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42" />
    </svg>
  ),
  zap: (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
    </svg>
  ),
  bolt: (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z" />
    </svg>
  ),
}

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [servicesOpen, setServicesOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const closeAll = () => {
    setMenuOpen(false)
    setServicesOpen(false)
  }

  return (
    <header
      className="sticky top-0 z-50"
      style={{
        backgroundColor: scrolled ? 'rgba(255,255,255,0.97)' : '#ffffff',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid #ECEDE9',
      }}
    >
      {/* Shadow overlay — opacity transition è composita (GPU), non richiede repaint */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden
        style={{
          boxShadow: '0 2px 16px rgba(30,42,46,0.1)',
          opacity: scrolled ? 1 : 0,
          transition: 'opacity 300ms',
        }}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-6">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 flex-shrink-0" onClick={closeAll}>
          <Image
            src="/images/logo.jpg"
            alt="Diamo Soluzioni"
            width={40}
            height={40}
            className="rounded-lg"
          />
          <div className="leading-tight">
            <p className="font-extrabold text-sm uppercase tracking-wide text-graphite">
              Diamo Soluzioni
            </p>
            <p className="text-[10px] uppercase tracking-widest" style={{ color: '#F4BE12' }}>
              Impresa Edile
            </p>
          </div>
        </Link>

        {/* Nav desktop */}
        <nav className="hidden md:flex items-center gap-1 flex-1 justify-center" aria-label="Navigazione principale">

          {/* Dropdown Servizi */}
          <div className="relative">
            <button
              onClick={() => setServicesOpen(v => !v)}
              className="flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium text-graphite hover:bg-concrete transition-colors"
              aria-expanded={servicesOpen}
              aria-haspopup="true"
            >
              Servizi
              <svg className={`w-3.5 h-3.5 transition-transform ${servicesOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {servicesOpen && (
              <>
                <div className="fixed inset-0 z-10" onClick={() => setServicesOpen(false)} aria-hidden />
                <div
                  className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-72 bg-white rounded-2xl shadow-card-hover border border-concrete z-20 p-2"
                  role="menu"
                >
                  {services.map(s => (
                    <Link
                      key={s.slug}
                      href={`/servizi/${s.slug}`}
                      className="flex items-start gap-3 p-3 rounded-xl hover:bg-warm-white transition-colors group"
                      role="menuitem"
                      onClick={closeAll}
                    >
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 text-teal" style={{ backgroundColor: 'rgba(31,72,82,0.08)' }}>
                        {navServiceIcons[s.icon] ?? <span className="text-xs font-bold">{s.name.charAt(0)}</span>}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-graphite group-hover:text-teal transition-colors">{s.name}</p>
                        <p className="text-xs text-gray-500 mt-0.5 line-clamp-1">{s.shortDesc}</p>
                      </div>
                    </Link>
                  ))}
                  <div className="border-t border-concrete mt-1 pt-1">
                    <Link
                      href="/servizi"
                      className="flex items-center gap-2 p-3 rounded-xl text-sm font-semibold text-teal hover:bg-warm-white transition-colors"
                      onClick={closeAll}
                    >
                      Vedi tutti i servizi →
                    </Link>
                  </div>
                </div>
              </>
            )}
          </div>

          {mainLinks.map(l => (
            <Link
              key={l.href}
              href={l.href}
              className="px-3 py-2 rounded-lg text-sm font-medium text-graphite hover:bg-concrete transition-colors"
              onClick={closeAll}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        {/* CTA desktop */}
        <div className="hidden md:flex items-center gap-3 flex-shrink-0">
          <a
            href={`tel:${business.phone.primaryRaw}`}
            className="text-sm font-semibold text-teal hover:text-teal-dark transition-colors"
            onClick={() => trackEvent('click_phone', { location: 'navbar_desktop' })}
          >
            {business.phone.primary}
          </a>
          <Link
            href="/#preventivatore"
            className="px-5 py-2.5 rounded-xl text-sm font-bold transition-all hover:shadow-gold"
            style={{ backgroundColor: '#F4BE12', color: '#1E2A2E' }}
          >
            Preventivo AI
          </Link>
        </div>

        {/* Hamburger mobile */}
        <button
          className="md:hidden p-2 rounded-lg hover:bg-concrete transition-colors"
          onClick={() => setMenuOpen(v => !v)}
          aria-label={menuOpen ? 'Chiudi menu' : 'Apri menu'}
          aria-expanded={menuOpen}
        >
          <svg className="w-5 h-5 text-graphite" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {menuOpen
              ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            }
          </svg>
        </button>
      </div>

      {/* Menu mobile */}
      {menuOpen && (
        <div className="md:hidden border-t border-concrete bg-white px-4 pb-6 pt-4">
          <nav aria-label="Menu mobile">
            <p className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-2 px-1">Servizi</p>
            {services.map(s => (
              <Link
                key={s.slug}
                href={`/servizi/${s.slug}`}
                className="block py-2.5 px-1 text-sm font-medium text-graphite border-b border-concrete/60 last:border-0"
                onClick={closeAll}
              >
                {s.name}
              </Link>
            ))}
            <div className="mt-4 pt-4 border-t border-concrete space-y-1">
              {mainLinks.map(l => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="block py-2.5 px-1 text-sm font-medium text-graphite"
                  onClick={closeAll}
                >
                  {l.label}
                </Link>
              ))}
            </div>
            <div className="mt-4 space-y-3">
              <a
                href={`tel:${business.phone.primaryRaw}`}
                className="flex items-center gap-3 w-full py-3 px-4 rounded-xl border border-concrete text-sm font-semibold text-graphite"
                onClick={() => trackEvent('click_phone', { location: 'navbar_mobile' })}
              >
                <svg className="w-4 h-4 text-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                {business.phone.primary}
              </a>
              <a
                href={whatsappUrl(WA_MESSAGE)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 w-full py-3 px-4 rounded-xl border border-concrete text-sm font-semibold text-graphite"
                onClick={() => trackEvent('click_whatsapp', { location: 'navbar_mobile' })}
              >
                <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24" aria-hidden style={{ color: '#25D366' }}>
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                WhatsApp
              </a>
              <Link
                href="/#preventivatore"
                className="flex items-center justify-center gap-2 w-full py-3 px-4 rounded-xl text-sm font-bold"
                style={{ backgroundColor: '#F4BE12', color: '#1E2A2E' }}
                onClick={closeAll}
              >
                Ottieni Preventivo AI
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
