import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { business } from '@/config/business'
import { territories, getTerritoryBySlug } from '@/data/territories'
import { getProjectBySlug } from '@/data/projects'

export const dynamicParams = false

interface Props {
  params: Promise<{ territorio: string }>
}

export async function generateStaticParams() {
  return territories.map(t => ({ territorio: t.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { territorio } = await params
  const t = getTerritoryBySlug(territorio)
  if (!t) return {}
  return {
    title: t.seoTitle,
    description: t.seoDesc,
    alternates: { canonical: `${business.siteUrl}/${territorio}` },
    openGraph: {
      title: t.seoTitle,
      description: t.seoDesc,
      url: `${business.siteUrl}/${territorio}`,
      images: [{ url: `${business.siteUrl}/progetti/ristrutturazione-appartamento-lodi/camera-letto-finita.jpg`, alt: `Diamo Soluzioni — Ristrutturazioni a ${t.city}` }],
    },
  }
}

export default async function TerritorioPage({ params }: Props) {
  const { territorio } = await params
  const t = getTerritoryBySlug(territorio)
  if (!t) notFound()

  const relatedProjects = t.relatedProjectSlugs
    .map(s => getProjectBySlug(s))
    .filter(Boolean)

  return (
    <>
      {/* Header */}
      <section
        className="relative py-20 overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #1F4852 0%, #15363E 100%)' }}
      >
        <div
          className="absolute left-0 top-0 bottom-0 w-0.5"
          aria-hidden
          style={{ background: 'linear-gradient(to bottom, transparent, #F4BE12 30%, #F4BE12 70%, transparent)' }}
        />
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <nav className="flex items-center gap-2 text-xs mb-10" style={{ color: 'rgba(248,248,245,0.50)' }} aria-label="Breadcrumb">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <span style={{ color: 'rgba(248,248,245,0.85)' }}>{t.city}</span>
          </nav>

          <p className="text-xs font-bold uppercase tracking-[0.18em] mb-4" style={{ color: '#F4BE12' }}>
            IMPRESA EDILE · {t.city.toUpperCase()} ({t.province})
          </p>
          <div className="w-10 h-0.5 mb-7" style={{ backgroundColor: '#B88A32' }} aria-hidden />

          <h1
            className="font-extrabold text-white mb-4 leading-[1.1]"
            style={{ fontSize: 'clamp(1.9rem, 4vw, 3rem)' }}
          >
            {t.h1Line1}<br />
            <span style={{ color: '#F4BE12' }}>{t.h1Line2Gold}</span>
          </h1>
          <p className="text-lg max-w-2xl leading-relaxed" style={{ color: 'rgba(248,248,245,0.72)' }}>
            {t.subtitle}
          </p>

          <div className="flex flex-col sm:flex-row gap-3 mt-8">
            <a
              href={business.whatsapp.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl font-bold text-sm transition-all hover:-translate-y-0.5"
              style={{ backgroundColor: '#F4BE12', color: '#1E2A2E' }}
            >
              Richiedi sopralluogo gratuito
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </a>
            <a
              href={`tel:${business.phone.primaryRaw}`}
              className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl font-semibold text-sm border border-white/30 text-white hover:border-gold transition-all"
            >
              {business.phone.primary}
            </a>
          </div>
        </div>
      </section>

      {/* Intro */}
      <section className="py-14" style={{ backgroundColor: '#F8F8F5' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] mb-4" style={{ color: '#1F4852' }}>
                PERCHÉ SCEGLIERE NOI A {t.city.toUpperCase()}
              </p>
              <p className="text-base leading-relaxed text-gray-700 mb-6">{t.intro}</p>
              <p className="text-sm leading-relaxed text-gray-500">{t.localContext}</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: 'Sopralluogo', value: 'Gratuito' },
                { label: 'Preventivo', value: 'Entro 48h' },
                { label: 'Referente', value: 'Unico' },
                { label: 'Subappalti', value: 'Zero' },
              ].map(item => (
                <div
                  key={item.label}
                  className="rounded-2xl p-5"
                  style={{ backgroundColor: 'rgba(31,72,82,0.07)', border: '1px solid rgba(31,72,82,0.10)' }}
                >
                  <p className="text-xs text-gray-500 mb-1">{item.label}</p>
                  <p className="font-extrabold text-graphite text-base">{item.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Servizi principali nella zona */}
      <section className="py-14 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <p className="text-xs font-bold uppercase tracking-[0.18em] mb-2" style={{ color: '#F4BE12' }}>
            COSA FACCIAMO A {t.city.toUpperCase()}
          </p>
          <div className="w-10 h-0.5 mb-8" style={{ backgroundColor: '#B88A32' }} aria-hidden />
          <h2 className="font-extrabold text-graphite mb-10" style={{ fontSize: 'clamp(1.3rem, 2.5vw, 2rem)' }}>
            I servizi più richiesti in questa zona
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {t.mainServices.map(s => (
              <Link
                key={s.slug}
                href={`/servizi/${s.slug}`}
                className="group rounded-2xl p-6 border border-concrete hover:border-teal hover:shadow-card transition-all"
                style={{ backgroundColor: '#F8F8F5' }}
              >
                <p className="font-bold text-graphite text-sm mb-2 group-hover:text-teal transition-colors">{s.label}</p>
                <p className="text-xs leading-relaxed text-gray-500">{s.localNote}</p>
                <span className="inline-flex items-center gap-1 text-xs font-semibold text-teal mt-4 group-hover:gap-2 transition-all">
                  Scopri
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Conoscenza locale */}
      <section className="py-14" style={{ backgroundColor: '#F8F8F5' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <p className="text-xs font-bold uppercase tracking-[0.18em] mb-2" style={{ color: '#F4BE12' }}>
            CONOSCENZA LOCALE
          </p>
          <div className="w-10 h-0.5 mb-8" style={{ backgroundColor: '#B88A32' }} aria-hidden />
          <h2 className="font-extrabold text-graphite mb-10" style={{ fontSize: 'clamp(1.3rem, 2.5vw, 2rem)' }}>
            Quello che sappiamo su {t.city}
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {t.localKnowledge.map((item, i) => (
              <div
                key={i}
                className="rounded-2xl p-7 bg-white"
                style={{ border: '1px solid rgba(31,72,82,0.10)' }}
              >
                <p className="font-bold text-graphite text-sm mb-3">{item.heading}</p>
                <p className="text-sm leading-relaxed text-gray-600">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lavori correlati */}
      {relatedProjects.length > 0 && (
        <section className="py-14 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <p className="text-xs font-bold uppercase tracking-[0.18em] mb-2" style={{ color: '#F4BE12' }}>
              LAVORI REALI
            </p>
            <div className="w-10 h-0.5 mb-8" style={{ backgroundColor: '#B88A32' }} aria-hidden />
            <h2 className="font-extrabold text-graphite mb-10" style={{ fontSize: 'clamp(1.3rem, 2.5vw, 2rem)' }}>
              Progetti simili a quello che cerchi
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedProjects.map(p => p && (
                <Link
                  key={p.slug}
                  href={`/progetti/${p.slug}`}
                  className="group rounded-2xl overflow-hidden border border-concrete hover:shadow-card transition-all"
                >
                  <div
                    className="h-44 bg-cover bg-center"
                    style={{ backgroundImage: `url(${p.cover})` }}
                  />
                  <div className="p-5">
                    <p className="text-xs font-bold uppercase tracking-wide mb-1" style={{ color: '#B88A32' }}>{p.category}</p>
                    <p className="font-bold text-graphite text-sm group-hover:text-teal transition-colors">{p.title}</p>
                    <p className="text-xs text-gray-400 mt-1">📍 {p.location}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FAQ */}
      <section className="py-14" style={{ backgroundColor: '#F8F8F5' }}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <p className="text-xs font-bold uppercase tracking-[0.18em] mb-2" style={{ color: '#F4BE12' }}>
            DOMANDE FREQUENTI
          </p>
          <div className="w-10 h-0.5 mb-8" style={{ backgroundColor: '#B88A32' }} aria-hidden />
          <h2 className="font-extrabold text-graphite mb-8" style={{ fontSize: 'clamp(1.3rem, 2.5vw, 2rem)' }}>
            Domande su {t.city}
          </h2>
          <div className="space-y-4">
            {t.faq.map((item, i) => (
              <div
                key={i}
                className="rounded-2xl p-7 bg-white"
                style={{ border: '1px solid rgba(31,72,82,0.10)' }}
              >
                <p className="font-bold text-graphite text-sm mb-2">{item.q}</p>
                <p className="text-sm leading-relaxed text-gray-600">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA finale */}
      <section className="py-16" style={{ backgroundColor: '#1E2A2E' }}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <p className="font-extrabold text-white mb-3" style={{ fontSize: 'clamp(1.4rem, 2.5vw, 2rem)' }}>
            {t.cta}
          </p>
          <p className="text-sm mb-8" style={{ color: 'rgba(248,248,245,0.60)' }}>
            Sopralluogo gratuito · Preventivo scritto · Senza impegno
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href={business.whatsapp.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl font-bold text-sm transition-all hover:-translate-y-0.5"
              style={{ backgroundColor: '#F4BE12', color: '#1E2A2E' }}
            >
              Scrivi su WhatsApp
            </a>
            <a
              href={`tel:${business.phone.primaryRaw}`}
              className="inline-flex items-center justify-center px-7 py-4 rounded-xl font-semibold text-sm border border-white/25 text-white hover:border-gold transition-all"
            >
              {business.phone.primary}
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
