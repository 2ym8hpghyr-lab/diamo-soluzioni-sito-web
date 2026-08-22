import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { services, getServiceBySlug } from '@/data/services'
import { business } from '@/config/business'

const servicePhotos: Record<string, string> = {
  'ristrutturazioni-chiavi-in-mano': '/illustrazioni/ristrutturazioni.png',
  'ristrutturazione-bagno':          '/illustrazioni/bagno.png',
  'pavimentazioni-rivestimenti':     '/illustrazioni/pavimentazioni.png',
  'infissi-serramenti':              '/illustrazioni/infissi.png',
  'facciate-cappotto-termico':       '/illustrazioni/facciate.png',
  'tinteggiatura':                   '/illustrazioni/tinteggiatura.png',
  'impianti-idraulici':              '/illustrazioni/impianti-idraulici.png',
  'impianti-elettrici':              '/illustrazioni/impianti-elettrici.png',
}

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return services.map(s => ({ slug: s.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const service = getServiceBySlug(slug)
  if (!service) return {}
  return {
    title: service.seoTitle,
    description: service.seoDesc,
    alternates: { canonical: `${business.siteUrl}/servizi/${slug}` },
    openGraph: {
      title: service.seoTitle,
      description: service.seoDesc,
      url: `${business.siteUrl}/servizi/${slug}`,
    },
  }
}

export default async function ServizioPage({ params }: Props) {
  const { slug } = await params
  const service = getServiceBySlug(slug)
  if (!service) notFound()

  const heroBg = servicePhotos[slug]

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: business.siteUrl },
      { '@type': 'ListItem', position: 2, name: 'Servizi', item: `${business.siteUrl}/servizi` },
      { '@type': 'ListItem', position: 3, name: service.name, item: `${business.siteUrl}/servizi/${slug}` },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* Hero servizio */}
      <section className="relative overflow-hidden py-16 lg:py-20">
        {/* Foto di sfondo specifica del servizio */}
        {heroBg && (
          <Image
            src={heroBg}
            alt=""
            fill
            className="object-cover"
            sizes="100vw"
            priority
            aria-hidden
          />
        )}
        {/* Overlay Deep Teal */}
        <div
          className="absolute inset-0 pointer-events-none"
          aria-hidden
          style={{ background: 'linear-gradient(135deg, rgba(31,72,82,0.90) 0%, rgba(21,54,62,0.87) 100%)' }}
        />
        {/* Bordo gold sinistro */}
        <div
          className="absolute left-0 top-0 bottom-0 w-0.5 pointer-events-none"
          aria-hidden
          style={{ background: 'linear-gradient(to bottom, transparent, #F4BE12 30%, #F4BE12 70%, transparent)' }}
        />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs text-white/50 mb-8" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-white/80 transition-colors">Home</Link>
            <span>/</span>
            <Link href="/servizi" className="hover:text-white/80 transition-colors">Servizi</Link>
            <span>/</span>
            <span className="text-white/80">{service.name}</span>
          </nav>

          <div className="max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-gold mb-4">Servizio</p>
            <h1
              className="font-extrabold text-white mb-5"
              style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)' }}
            >
              {service.name}
            </h1>
            <p className="text-lg text-white/70 leading-relaxed mb-8">{service.description}</p>
            <div className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold" style={{ backgroundColor: 'rgba(244,190,18,0.15)', color: '#F4BE12', border: '1px solid rgba(244,190,18,0.3)' }}>
              ✦ {service.benefit}
            </div>
          </div>
        </div>
      </section>

      {/* Cosa comprende */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14">
            <div>
              <h2 className="font-extrabold text-graphite text-xl mb-6">Cosa comprende</h2>
              <ul className="space-y-3">
                {service.features.map(f => (
                  <li key={f} className="flex items-start gap-3">
                    <span className="w-5 h-5 rounded-full bg-teal flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    <span className="text-sm text-gray-600 leading-relaxed">{f}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* CTA laterale */}
            <div className="bg-warm-white rounded-2xl p-8">
              <p className="font-extrabold text-graphite text-lg mb-2">Vuoi sapere quanto costa?</p>
              <p className="text-sm text-gray-500 mb-6 leading-relaxed">
                Usa il preventivatore AI per avere un ordine di grandezza in pochi minuti.
                Poi fissiamo un sopralluogo gratuito.
              </p>
              <div className="space-y-3">
                <Link
                  href={`/?service=${service.slug}#preventivatore`}
                  className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl font-bold text-sm"
                  style={{ backgroundColor: '#F4BE12', color: '#1E2A2E' }}
                >
                  Stima con il preventivatore AI
                </Link>
                <a
                  href={business.whatsapp.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-3 rounded-xl font-semibold text-sm border border-concrete hover:border-teal transition-colors text-graphite"
                >
                  Scrivi su WhatsApp
                </a>
                <a
                  href={`tel:${business.phone.primaryRaw}`}
                  className="block text-center w-full py-2.5 text-sm text-gray-400 hover:text-teal transition-colors"
                >
                  {business.phone.primary}
                </a>
              </div>
              <p className="text-xs text-gray-400 mt-5 text-center">Sopralluogo gratuito · Preventivo scritto · Senza impegno</p>
            </div>
          </div>
        </div>
      </section>

      {/* Zone servite */}
      <section className="py-10 bg-concrete">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3">Zone servite</p>
          <div className="flex flex-wrap gap-2">
            {business.areas.map(area => (
              <span key={area} className="px-3 py-1.5 rounded-full text-xs font-semibold bg-white text-graphite border border-concrete shadow-card">
                {area}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      {service.faq.length > 0 && (
        <section className="py-16 bg-white">
          <div className="max-w-3xl mx-auto px-4 sm:px-6">
            <h2 className="font-extrabold text-graphite text-xl mb-8">Domande frequenti</h2>
            <div className="space-y-5">
              {service.faq.map((item, i) => (
                <div key={i} className="border-b border-concrete pb-5 last:border-0">
                  <h3 className="font-bold text-graphite text-sm mb-2">{item.q}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{item.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA finale */}
      <section className="py-14" style={{ background: 'linear-gradient(135deg, #1F4852 0%, #15363E 100%)' }}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="font-extrabold text-white text-2xl mb-4">
            Hai bisogno di {service.name.toLowerCase()}?
          </h2>
          <p className="text-white/70 mb-8">
            Contattaci per un sopralluogo gratuito nella tua zona.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href={`/?service=${service.slug}#preventivatore`}
              className="px-7 py-3.5 rounded-xl font-bold text-sm"
              style={{ backgroundColor: '#F4BE12', color: '#1E2A2E' }}
            >
              Ottieni una stima
            </Link>
            <Link
              href="/contatti"
              className="px-7 py-3.5 rounded-xl font-semibold text-sm border border-white/30 text-white hover:border-gold hover:text-gold transition-all"
            >
              Contattaci
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
