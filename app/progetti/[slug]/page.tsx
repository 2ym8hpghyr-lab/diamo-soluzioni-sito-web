import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { projects, getProjectBySlug } from '@/data/projects'
import { business } from '@/config/business'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return projects.filter(p => p.isReal).map(p => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const project = getProjectBySlug(slug)
  if (!project) return {}
  return {
    title: `${project.title} a ${project.location}`,
    description: project.description,
    alternates: { canonical: `${business.siteUrl}/progetti/${slug}` },
    openGraph: {
      title: project.title,
      description: project.description,
      url: `${business.siteUrl}/progetti/${slug}`,
      images: [{
        url: `${business.siteUrl}${project.cover}`,
        width: 1200,
        height: 630,
        alt: project.coverAlt,
      }],
    },
  }
}

export default async function ProgettoPage({ params }: Props) {
  const { slug } = await params
  const project = getProjectBySlug(slug)
  if (!project || !project.isReal) notFound()

  const gallery = project.gallery ?? [project.cover]
  const galleryAlts = project.galleryAlts ?? gallery.map((_, i) => i === 0 ? project.coverAlt : `${project.title} — immagine ${i + 1}`)

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: business.siteUrl },
          { '@type': 'ListItem', position: 2, name: 'Progetti', item: `${business.siteUrl}/progetti` },
          { '@type': 'ListItem', position: 3, name: project.title, item: `${business.siteUrl}/progetti/${project.slug}` },
        ],
      },
      {
        '@type': 'CreativeWork',
        '@id': `${business.siteUrl}/progetti/${project.slug}`,
        name: project.title,
        description: project.description,
        image: `${business.siteUrl}${project.cover}`,
        ...(project.year ? { dateCreated: String(project.year) } : {}),
        creator: {
          '@type': 'Organization',
          name: business.name,
          url: business.siteUrl,
        },
        locationCreated: {
          '@type': 'Place',
          name: project.location,
        },
        ...(project.caseStudy?.serviceSlug ? {
          about: {
            '@type': 'Service',
            url: `${business.siteUrl}/servizi/${project.caseStudy.serviceSlug}`,
            name: project.category,
          },
        } : {}),
      },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Header */}
      <section
        className="relative py-16"
        style={{ background: 'linear-gradient(135deg, #1F4852 0%, #15363E 100%)' }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <nav className="flex items-center gap-2 text-xs text-white/50 mb-8" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-white/80 transition-colors">Home</Link>
            <span>/</span>
            <Link href="/progetti" className="hover:text-white/80 transition-colors">Progetti</Link>
            <span>/</span>
            <span className="text-white/80">{project.title}</span>
          </nav>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-gold mb-4">{project.category}</p>
          <h1
            className="font-extrabold text-white mb-3"
            style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)' }}
          >
            {project.title}<br />
            <span style={{ color: '#F4BE12', fontSize: '0.65em', fontWeight: 700 }}>a {project.location}</span>
          </h1>
          <p className="text-white/60 text-sm">📍 {project.location}</p>
        </div>
      </section>

      {/* Cover + galleria */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">

          {/* Foto cover grande */}
          <div className="relative w-full rounded-2xl overflow-hidden mb-6" style={{ aspectRatio: '16/9' }}>
            <Image
              src={gallery[0]}
              alt={galleryAlts[0]}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 768px) 100vw, 1200px"
            />
          </div>

          {/* Galleria griglia */}
          {gallery.length > 1 && (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {gallery.slice(1).map((img, i) => (
                <div key={i} className="relative rounded-xl overflow-hidden" style={{ aspectRatio: '4/3' }}>
                  <Image
                    src={img}
                    alt={galleryAlts[i + 1] ?? `${project.title} — immagine ${i + 2}`}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 640px) 50vw, 33vw"
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Descrizione + CTA */}
      <section className="py-12 bg-concrete">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <div>
              {project.caseStudy ? (
                <div className="space-y-6">
                  <div>
                    <h2 className="font-extrabold text-graphite text-xl mb-3">Il progetto</h2>
                    <p className="text-gray-600 leading-relaxed">{project.description}</p>
                  </div>

                  {/* Durata e fascia costo */}
                  {(project.caseStudy.duration || project.caseStudy.costRange) && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {project.caseStudy.duration && (
                        <div className="rounded-xl p-4" style={{ backgroundColor: 'rgba(31,72,82,0.06)', border: '1px solid rgba(31,72,82,0.12)' }}>
                          <p className="text-xs font-bold uppercase tracking-wide mb-1" style={{ color: '#1F4852' }}>Durata</p>
                          <p className="text-sm text-gray-700">{project.caseStudy.duration}</p>
                        </div>
                      )}
                      {project.caseStudy.costRange && (
                        <div className="rounded-xl p-4" style={{ backgroundColor: 'rgba(244,190,18,0.08)', border: '1px solid rgba(244,190,18,0.2)' }}>
                          <p className="text-xs font-bold uppercase tracking-wide mb-1" style={{ color: '#B88A32' }}>Fascia indicativa</p>
                          <p className="text-sm text-gray-700">{project.caseStudy.costRange}</p>
                        </div>
                      )}
                    </div>
                  )}

                  <div>
                    <h3 className="font-bold text-graphite text-sm uppercase tracking-wide mb-2">La situazione di partenza</h3>
                    <p className="text-gray-600 leading-relaxed text-sm">{project.caseStudy.problem}</p>
                  </div>
                  <div>
                    <h3 className="font-bold text-graphite text-sm uppercase tracking-wide mb-2">Come l&apos;abbiamo affrontato</h3>
                    <p className="text-gray-600 leading-relaxed text-sm">{project.caseStudy.solution}</p>
                  </div>
                  {project.caseStudy.materials && project.caseStudy.materials.length > 0 && (
                    <div>
                      <h3 className="font-bold text-graphite text-sm uppercase tracking-wide mb-2">Materiali utilizzati</h3>
                      <ul className="space-y-1">
                        {project.caseStudy.materials.map(m => (
                          <li key={m} className="flex items-start gap-2 text-sm text-gray-600">
                            <span className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0" style={{ backgroundColor: '#F4BE12' }} />
                            {m}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  <div className="rounded-xl p-4" style={{ backgroundColor: 'rgba(31,72,82,0.06)', border: '1px solid rgba(31,72,82,0.12)' }}>
                    <h3 className="font-bold text-graphite text-sm uppercase tracking-wide mb-2">Il risultato</h3>
                    <p className="text-gray-600 leading-relaxed text-sm">{project.caseStudy.result}</p>
                  </div>
                  {project.caseStudy.serviceSlug && (
                    <Link
                      href={`/servizi/${project.caseStudy.serviceSlug}`}
                      className="inline-flex items-center gap-2 text-sm font-semibold text-teal hover:gap-3 transition-all"
                    >
                      Scopri il servizio correlato
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  )}
                </div>
              ) : (
                <>
                  <h2 className="font-extrabold text-graphite text-xl mb-4">Il progetto</h2>
                  <p className="text-gray-600 leading-relaxed">{project.description}</p>
                </>
              )}
            </div>
            <div className="bg-white rounded-2xl p-8">
              <p className="font-extrabold text-graphite text-lg mb-2">Hai un progetto simile?</p>
              <p className="text-sm text-gray-500 mb-6 leading-relaxed">
                Contattaci per un sopralluogo gratuito. Ti forniamo un preventivo scritto senza impegno.
              </p>
              <div className="space-y-3">
                <a
                  href={business.whatsapp.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Scrivi a Diamo Soluzioni su WhatsApp"
                  className="flex items-center justify-center w-full py-3.5 rounded-xl font-bold text-sm"
                  style={{ backgroundColor: '#F4BE12', color: '#1E2A2E' }}
                >
                  Scrivi su WhatsApp
                </a>
                <a
                  href={`tel:${business.phone.primaryRaw}`}
                  className="flex items-center justify-center w-full py-3 rounded-xl font-semibold text-sm border border-concrete hover:border-teal transition-colors text-graphite"
                >
                  {business.phone.primary}
                </a>
              </div>
              <p className="text-xs text-gray-400 mt-4 text-center">Sopralluogo gratuito · Preventivo scritto · Senza impegno</p>
            </div>
          </div>
        </div>
      </section>

      {/* Torna al portfolio */}
      <section className="py-10 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <Link
            href="/progetti"
            className="inline-flex items-center gap-2 text-sm font-semibold text-teal hover:gap-3 transition-all"
          >
            <svg className="w-4 h-4 rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            Tutti i progetti
          </Link>
        </div>
      </section>
    </>
  )
}
