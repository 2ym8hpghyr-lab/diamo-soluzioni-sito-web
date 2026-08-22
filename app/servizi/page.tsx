import type { Metadata } from 'next'
import Link from 'next/link'
import { services } from '@/data/services'
import { business } from '@/config/business'

export const metadata: Metadata = {
  title: 'Servizi Edili a Lodi e Milano Sud',
  description:
    'Ristrutturazioni chiavi in mano, pavimentazioni, infissi, facciate, impianti e tinteggiatura a Lodi, Merlino, Melegnano e Milano Sud. Sopralluogo gratuito.',
  alternates: { canonical: `${business.siteUrl}/servizi` },
  openGraph: { url: `${business.siteUrl}/servizi` },
}

export default function ServiziPage() {
  return (
    <>
      {/* Header */}
      <section
        className="relative py-16"
        style={{ background: 'linear-gradient(135deg, #1F4852 0%, #15363E 100%)' }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <nav className="flex items-center gap-2 text-xs text-white/50 mb-8" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-white/80 transition-colors">Home</Link>
            <span>/</span>
            <span className="text-white/80">Servizi</span>
          </nav>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-gold mb-4">Cosa facciamo</p>
          <h1
            className="font-extrabold text-white mb-5"
            style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)' }}
          >
            Tutti i servizi edili
          </h1>
          <p className="text-lg text-white/70 max-w-xl leading-relaxed">
            Un unico interlocutore per ogni intervento: dalla ristrutturazione completa agli impianti,
            dalle pavimentazioni alle facciate. Operiamo a Lodi, Merlino e Milano Sud.
          </p>
        </div>
      </section>

      {/* Griglia servizi */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map(s => (
              <Link
                key={s.slug}
                href={`/servizi/${s.slug}`}
                className="ds-card group p-7 rounded-2xl hover:shadow-card-hover transition-all bg-warm-white hover:bg-white"
              >
                <h2 className="font-bold text-graphite text-base mb-2 group-hover:text-teal transition-colors leading-tight">
                  {s.name}
                </h2>
                <p className="text-sm text-gray-500 leading-relaxed mb-4">{s.description}</p>
                <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-teal">
                  Scopri il servizio
                  <svg className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-14 bg-concrete">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="font-extrabold text-graphite text-2xl mb-4">Hai un progetto in mente?</h2>
          <p className="text-gray-500 mb-8">
            Usa il preventivatore AI per un ordine di grandezza, poi ti contatteremo per il sopralluogo.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/#preventivatore"
              className="px-7 py-3.5 rounded-xl font-bold text-sm"
              style={{ backgroundColor: '#F4BE12', color: '#1E2A2E' }}
            >
              Preventivo AI
            </Link>
            <Link
              href="/contatti"
              className="px-7 py-3.5 rounded-xl font-semibold text-sm border border-concrete hover:border-teal text-graphite transition-all"
            >
              Contattaci
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
