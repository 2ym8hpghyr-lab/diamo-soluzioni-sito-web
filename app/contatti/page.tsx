import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { business } from '@/config/business'
import ContactCards from '@/components/contatti/ContactCards'

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
          <ContactCards />
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
