import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { business, whatsappUrl } from '@/config/business'

export const metadata: Metadata = {
  title: 'Contatti — Preventivo Gratuito',
  description:
    'Contatta Diamo Soluzioni: sopralluogo gratuito a Lodi, Merlino, Melegnano e Milano Sud. Chiama, scrivi su WhatsApp o usa il preventivatore AI.',
  alternates: { canonical: `${business.siteUrl}/contatti` },
  openGraph: {
    url: `${business.siteUrl}/contatti`,
    images: [{ url: `${business.siteUrl}/assets/diamo/contatti-cantiere-bg.webp`, alt: 'Contatta Diamo Soluzioni — Sopralluogo gratuito a Lodi e Milano Sud' }],
  },
}

const WA_MESSAGE = 'Buongiorno, ho visitato il vostro sito e vorrei informazioni per un sopralluogo gratuito.'

const PHONE_SVG = (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
  </svg>
)
const WA_SVG = (
  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
)
const EMAIL_SVG = (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
)

export default function ContattiPage() {
  return (
    <>
      {/* Header */}
      <section className="py-16 relative overflow-hidden">
        {/* Foto cantiere — Stefan Lehner, Unsplash free license */}
        <div
          className="absolute inset-0 pointer-events-none"
          aria-hidden
          style={{
            backgroundImage: "url('/assets/diamo/contatti-cantiere-bg.webp')",
            backgroundSize: 'cover',
            backgroundPosition: 'center center',
            backgroundRepeat: 'no-repeat',
          }}
        />
        <div
          className="absolute inset-0 pointer-events-none"
          aria-hidden
          style={{ background: 'linear-gradient(135deg, rgba(21,54,62,0.91) 0%, rgba(21,54,62,0.75) 100%)' }}
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6" style={{ zIndex: 10 }}>
          <nav className="flex items-center gap-2 text-xs mb-8" style={{ color: 'rgba(248,248,245,0.55)' }} aria-label="Breadcrumb">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <span aria-current="page" style={{ color: 'rgba(248,248,245,0.85)' }}>Contatti</span>
          </nav>
          <div className="flex items-start gap-4 mb-10">
            <div className="w-1 self-stretch rounded-full flex-shrink-0 mt-1" style={{ backgroundColor: '#F4BE12' }} aria-hidden />
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] mb-3" style={{ color: '#F4BE12' }}>CONTATTI</p>
              <h1
                className="font-extrabold mb-4 text-white"
                style={{ fontSize: 'clamp(1.8rem,4vw,2.8rem)' }}
              >
                Il tuo progetto merita<br />un confronto concreto.
              </h1>
              <p className="text-base leading-relaxed max-w-xl" style={{ color: 'rgba(248,248,245,0.72)' }}>
                Sopralluogo gratuito senza impegno. Ti rispondiamo entro poche ore, anche nei weekend.
              </p>
            </div>
          </div>

          {/* 3 card contatto */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <a
              href={`tel:${business.phone.primaryRaw}`}
              className="ds-card group flex flex-col gap-4 p-7 rounded-2xl bg-warm-white hover:shadow-card-hover transition-all"
            >
              <div className="w-12 h-12 rounded-xl flex items-center justify-center text-teal transition-all group-hover:bg-teal group-hover:text-white" style={{ backgroundColor: 'rgba(31,72,82,0.08)' }}>
                {PHONE_SVG}
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-wide mb-1" style={{ color: '#9CA3AF' }}>Telefono</p>
                <p className="font-bold text-lg leading-tight" style={{ color: '#1E2A2E' }}>{business.phone.primary}</p>
              </div>
              <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-teal group-hover:gap-2.5 transition-all">
                Chiama ora
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </span>
            </a>

            <a
              href={whatsappUrl(WA_MESSAGE)}
              target="_blank"
              rel="noopener noreferrer"
              className="ds-card group flex flex-col gap-4 p-7 rounded-2xl bg-warm-white hover:shadow-card-hover transition-all"
            >
              <div className="w-12 h-12 rounded-xl flex items-center justify-center text-teal transition-all group-hover:bg-teal group-hover:text-white" style={{ backgroundColor: 'rgba(31,72,82,0.08)' }}>
                {WA_SVG}
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-wide mb-1" style={{ color: '#9CA3AF' }}>WhatsApp</p>
                <p className="font-bold text-lg leading-tight" style={{ color: '#1E2A2E' }}>Risposta rapida</p>
              </div>
              <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-teal group-hover:gap-2.5 transition-all">
                Scrivi su WhatsApp
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </span>
            </a>

            <a
              href={`mailto:${business.email}`}
              className="ds-card group flex flex-col gap-4 p-7 rounded-2xl bg-warm-white hover:shadow-card-hover transition-all"
            >
              <div className="w-12 h-12 rounded-xl flex items-center justify-center text-teal transition-all group-hover:bg-teal group-hover:text-white" style={{ backgroundColor: 'rgba(31,72,82,0.08)' }}>
                {EMAIL_SVG}
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-wide mb-1" style={{ color: '#9CA3AF' }}>Email</p>
                <p className="font-bold text-lg leading-tight" style={{ color: '#1E2A2E' }}>{business.email}</p>
              </div>
              <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-teal group-hover:gap-2.5 transition-all">
                Manda una email
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </span>
            </a>
          </div>
        </div>
      </section>

      {/* Preventivatore 7 + Info azienda 5 */}
      <section className="py-16 relative overflow-hidden" style={{ backgroundColor: '#F8F8F5' }}>
        <div
          className="absolute inset-0 pointer-events-none"
          aria-hidden
          style={{
            backgroundImage: "url('/assets/diamo/preventivatore-intonaco-mattoni.webp')",
            backgroundSize: 'cover',
            backgroundPosition: 'center center',
            backgroundRepeat: 'no-repeat',
            opacity: 0.30,
            zIndex: 0,
          }}
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6" style={{ zIndex: 10 }}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

            {/* Col 7: preventivatore con immagine */}
            <div className="lg:col-span-7 relative overflow-hidden rounded-2xl" style={{ minHeight: '380px' }}>
              <Image
                src="/assets/diamo/DS_CONTATTI_MATERIALI_LAVORAZIONE_01.webp"
                alt=""
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 58vw"
              />
              <div
                className="absolute inset-0"
                aria-hidden
                style={{ background: 'linear-gradient(135deg,rgba(21,54,62,0.95) 0%,rgba(21,54,62,0.88) 50%,rgba(21,54,62,0.72) 100%)' }}
              />
              <div className="relative z-10 p-8 lg:p-10 flex flex-col h-full justify-between" style={{ minHeight: '380px' }}>
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.18em] mb-3" style={{ color: '#F4BE12' }}>PREVENTIVATORE AI</p>
                  <h2 className="font-extrabold text-white mb-4" style={{ fontSize: 'clamp(1.4rem,2.5vw,1.9rem)' }}>
                    Scopri quanto costa<br />il tuo progetto
                  </h2>
                  <p className="text-base leading-relaxed mb-8" style={{ color: 'rgba(248,248,245,0.70)' }}>
                    In 2 minuti ottieni una stima orientativa basata sulle nostre tariffe reali.
                    Zero impegno, zero burocrazia.
                  </p>
                </div>
                <Link
                  href="/#preventivatore"
                  className="inline-flex items-center gap-2 px-7 py-4 rounded-xl font-bold text-sm w-fit transition-all hover:-translate-y-0.5"
                  style={{ backgroundColor: '#F4BE12', color: '#1E2A2E' }}
                >
                  Calcola la stima
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Link>
              </div>
            </div>

            {/* Col 5: pannello pietra */}
            <div className="lg:col-span-5 rounded-2xl p-8" style={{ backgroundColor: '#1E2A2E' }}>
              <h2 className="font-extrabold text-white mb-6" style={{ fontSize: 'clamp(1.2rem,2vw,1.5rem)' }}>
                Qui quando serve.
              </h2>

              <div className="pb-5 mb-5" style={{ borderBottom: '1px solid rgba(248,248,245,0.08)' }}>
                <p className="text-xs font-bold uppercase tracking-wide mb-3" style={{ color: '#B88A32' }}>Sede operativa</p>
                <p className="font-semibold text-white text-sm mb-1">{business.legalName}</p>
                <p className="text-sm" style={{ color: 'rgba(248,248,245,0.60)' }}>{business.address.street}</p>
                <p className="text-sm" style={{ color: 'rgba(248,248,245,0.60)' }}>{business.address.postalCode} {business.address.city} ({business.address.province})</p>
                <p className="text-xs mt-2" style={{ color: 'rgba(248,248,245,0.35)' }}>P.IVA {business.vatId}</p>
              </div>

              <div className="pb-5 mb-5" style={{ borderBottom: '1px solid rgba(248,248,245,0.08)' }}>
                <p className="text-xs font-bold uppercase tracking-wide mb-3" style={{ color: '#B88A32' }}>Disponibilità</p>
                <p className="font-semibold text-white text-sm">Rispondiamo entro poche ore, anche nel weekend.</p>
              </div>

              <div>
                <p className="text-xs font-bold uppercase tracking-wide mb-3" style={{ color: '#B88A32' }}>Le nostre garanzie</p>
                <ul className="space-y-2.5">
                  {[
                    'Sopralluogo gratuito senza impegno',
                    'Preventivo scritto entro 48h',
                    'Un solo referente per tutta la durata',
                    'Copertura: Lodi e Milano Sud',
                  ].map(g => (
                    <li key={g} className="flex items-start gap-2.5">
                      <span className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5" style={{ backgroundColor: 'rgba(184,138,50,0.20)', border: '1px solid rgba(184,138,50,0.35)' }}>
                        <svg className="w-2.5 h-2.5" fill="none" stroke="#B88A32" viewBox="0 0 24 24" aria-hidden>
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      </span>
                      <span className="text-sm" style={{ color: 'rgba(248,248,245,0.72)' }}>{g}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
