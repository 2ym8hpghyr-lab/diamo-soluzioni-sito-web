import Link from 'next/link'
import Image from 'next/image'
import { getRealProjects } from '@/data/projects'

const BLUEPRINT_BG = (
  <div
    className="absolute inset-0 pointer-events-none select-none"
    aria-hidden
    style={{
      backgroundImage: "url('/assets/diamo/blueprint-texture-bg.webp')",
      backgroundSize: 'cover',
      backgroundPosition: 'center center',
      backgroundRepeat: 'no-repeat',
      zIndex: 0,
      opacity: 1,
    }}
  />
)

export default function ProjectsPreview() {
  const realProjects = getRealProjects()

  if (realProjects.length === 0) {
    return (
      <section className="py-20 relative overflow-hidden" style={{ backgroundColor: '#F5EFE8' }} aria-labelledby="projects-heading">
        {BLUEPRINT_BG}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6" style={{ zIndex: 10 }}>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-gold mb-3">Portfolio</p>
              <h2
                id="projects-heading"
                className="font-extrabold text-graphite"
                style={{ fontSize: 'clamp(1.6rem, 3vw, 2.2rem)' }}
              >
                I nostri lavori
              </h2>
            </div>
            <Link
              href="/progetti"
              className="text-sm font-semibold text-teal hover:text-teal-dark transition-colors flex-shrink-0 flex items-center gap-1"
            >
              Vedi portfolio
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
          <div className="rounded-2xl border-2 border-dashed border-concrete/80 bg-white/60 p-12 text-center">
            <p className="font-semibold text-graphite mb-2">Fotografie in arrivo</p>
            <p className="text-sm text-gray-400 max-w-md mx-auto">
              Le foto dei lavori reali di Diamo Soluzioni verranno inserite qui.
            </p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-20 relative overflow-hidden" style={{ backgroundColor: '#F5EFE8' }} aria-labelledby="projects-heading">
      {BLUEPRINT_BG}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6" style={{ zIndex: 10 }}>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-gold mb-3">Portfolio</p>
            <h2
              id="projects-heading"
              className="font-extrabold text-graphite"
              style={{ fontSize: 'clamp(1.6rem, 3vw, 2.2rem)' }}
            >
              I nostri lavori
            </h2>
          </div>
          <Link
            href="/progetti"
            className="text-sm font-semibold text-teal flex-shrink-0 flex items-center gap-1"
          >
            Vedi portfolio
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {realProjects.slice(0, 6).map(p => (
            <Link
              key={p.slug}
              href={`/progetti/${p.slug}`}
              className="ds-card group rounded-2xl overflow-hidden bg-white hover:shadow-card-hover transition-shadow"
            >
              <div className="relative h-52 overflow-hidden bg-concrete">
                <Image
                  src={p.cover}
                  alt={p.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>
              <div className="p-5">
                <p className="text-xs font-bold uppercase tracking-wide text-gold mb-1">{p.category}</p>
                <h3 className="font-bold text-graphite group-hover:text-teal transition-colors">{p.title}</h3>
                <p className="flex items-center gap-1 text-xs font-medium mt-2" style={{ color: '#B88A32' }}>
                  <svg className="w-3 h-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" aria-hidden>
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                  {p.location}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
