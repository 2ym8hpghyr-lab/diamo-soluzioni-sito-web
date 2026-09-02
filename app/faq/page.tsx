import type { Metadata } from 'next'
import Link from 'next/link'
import { business } from '@/config/business'
import FAQ from '@/components/sections/FAQ'

export const metadata: Metadata = {
  title: 'FAQ — Domande Frequenti',
  description:
    'Risposte chiare su preventivi, sopralluogo gratuito, tempi di lavoro e zone operative di Diamo Soluzioni a Lodi, Merlino e Milano Sud.',
  alternates: { canonical: `${business.siteUrl}/faq` },
  openGraph: {
    url: `${business.siteUrl}/faq`,
    images: [{ url: `${business.siteUrl}/progetti/ristrutturazione-appartamento-lodi/camera-letto-finita.jpg`, alt: 'FAQ Diamo Soluzioni — Domande frequenti su ristrutturazioni a Lodi' }],
  },
}

export default function FAQPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden py-20">
        <div
          className="absolute inset-0 pointer-events-none"
          aria-hidden
          style={{
            backgroundImage: "url('/assets/diamo/faq-hero-bg.webp')",
            backgroundSize: 'cover',
            backgroundPosition: '40% center',
            backgroundRepeat: 'no-repeat',
          }}
        />
        <div
          className="absolute inset-0 pointer-events-none"
          aria-hidden
          style={{ background: 'linear-gradient(90deg, rgba(21,54,62,0.95) 0%, rgba(21,54,62,0.82) 50%, rgba(21,54,62,0.60) 100%)' }}
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6" style={{ zIndex: 10 }}>
          <nav className="flex items-center gap-2 text-xs mb-8" style={{ color: 'rgba(248,248,245,0.55)' }} aria-label="Breadcrumb">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <span style={{ color: 'rgba(248,248,245,0.85)' }}>FAQ</span>
          </nav>
          <p className="text-xs font-bold uppercase tracking-[0.18em] mb-4" style={{ color: '#F4BE12' }}>DOMANDE FREQUENTI</p>
          <div className="w-10 h-0.5 mb-7" style={{ backgroundColor: '#B88A32' }} aria-hidden />
          <h1
            className="font-extrabold text-white mb-5 max-w-2xl"
            style={{ fontSize: 'clamp(1.8rem,4vw,3rem)' }}
          >
            Hai domande<br />prima di iniziare?
          </h1>
          <p className="text-base max-w-xl leading-relaxed" style={{ color: 'rgba(248,248,245,0.70)' }}>
            Risposte chiare su preventivi, sopralluogo, tempi e zone operative.
            Per tutto il resto, siamo al telefono.
          </p>
        </div>
      </section>

      {/* FAQ accordion */}
      <FAQ />

      {/* CTA */}
      <section className="py-16" style={{ backgroundColor: '#1E2A2E' }}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-xs font-bold uppercase tracking-[0.18em] mb-3" style={{ color: '#B88A32' }}>NON HAI TROVATO RISPOSTA?</p>
          <h2 className="font-extrabold text-white mb-4" style={{ fontSize: 'clamp(1.3rem,2.5vw,1.8rem)' }}>
            Chiamaci. È più semplice.
          </h2>
          <p className="text-sm leading-relaxed mb-8" style={{ color: 'rgba(248,248,245,0.65)' }}>
            Siamo sempre reperibili. Sopralluogo gratuito senza impegno.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href={`tel:${business.phone.primaryRaw}`}
              className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl font-bold text-sm transition-all hover:-translate-y-0.5"
              style={{ backgroundColor: '#F4BE12', color: '#1E2A2E' }}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              {business.phone.primary}
            </a>
            <a
              href={business.whatsapp.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl font-semibold text-sm transition-all hover:-translate-y-0.5"
              style={{ border: '1px solid rgba(248,248,245,0.25)', color: '#F8F8F5' }}
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Scrivi su WhatsApp
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
