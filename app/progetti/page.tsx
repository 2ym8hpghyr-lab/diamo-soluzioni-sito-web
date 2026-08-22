import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { getRealProjects } from '@/data/projects'
import { business } from '@/config/business'

export const metadata: Metadata = {
  title: 'Portfolio Progetti',
  description:
    'Lavori reali di Diamo Soluzioni: ristrutturazioni, pavimentazioni, infissi, bagni e impianti a Lodi, Merlino e Milano Sud.',
  alternates: { canonical: `${business.siteUrl}/progetti` },
  openGraph: { url: `${business.siteUrl}/progetti` },
}

export default function ProgettiPage() {
  const realProjects = getRealProjects()

  return (
    <>
      {/* Hero editoriale */}
      <section
        className="relative overflow-hidden"
        style={{ height: 'clamp(500px,55vh,560px)' }}
        aria-label="Portfolio hero"
      >
        <Image
          src="/assets/diamo/diamo-soluzioni-portfolio-hero-originale.webp"
          alt=""
          fill
          priority
          className="object-cover"
          style={{ objectPosition: '70% 50%' }}
          sizes="100vw"
        />
        <div
          className="absolute inset-0"
          aria-hidden
          style={{ background: 'linear-gradient(90deg,rgba(21,54,62,.93) 0%,rgba(21,54,62,.78) 42%,rgba(21,54,62,.40) 65%,rgba(21,54,62,.08) 100%)' }}
        />

        <div className="absolute inset-0 flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full">
            <nav className="flex items-center gap-2 text-xs text-white/50 mb-8" aria-label="Breadcrumb">
              <Link href="/" className="hover:text-white/80 transition-colors">Home</Link>
              <span>/</span>
              <span className="text-white/80">Progetti</span>
            </nav>
            <p className="text-xs font-bold uppercase tracking-[0.18em] mb-4" style={{ color: '#F4BE12' }}>PROGETTI REALI</p>
            <div className="w-10 h-0.5 mb-7" style={{ backgroundColor: '#B88A32' }} aria-hidden />
            <h1
              className="font-extrabold text-white mb-5"
              style={{ fontSize: 'clamp(1.8rem,4vw,3rem)' }}
            >
              I nostri lavori.<br />Costruiti per durare.
            </h1>
            <p className="text-base text-white/70 max-w-xl leading-relaxed mb-8">
              Case vere, problemi reali, soluzioni costruite bene.
            </p>
            <Link
              href="/contatti"
              className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl font-bold text-sm transition-all hover:-translate-y-0.5"
              style={{ backgroundColor: '#F4BE12', color: '#1E2A2E' }}
            >
              Parlaci del tuo progetto
            </Link>
          </div>
        </div>
      </section>

      {/* Griglia progetti */}
      <section className="py-16 relative overflow-hidden" style={{ backgroundColor: '#F5EFE8' }}>
        <div
          className="absolute inset-0 pointer-events-none select-none"
          aria-hidden
          style={{
            backgroundImage: "url('/assets/diamo/blueprint-texture-bg.webp')",
            backgroundSize: 'cover',
            backgroundPosition: 'center center',
            backgroundRepeat: 'no-repeat',
            zIndex: 0,
          }}
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6" style={{ zIndex: 10 }}>
          {realProjects.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {realProjects.map(p => (
                <Link
                  key={p.slug}
                  href={`/progetti/${p.slug}`}
                  className="ds-card group rounded-2xl overflow-hidden bg-warm-white hover:shadow-card-hover transition-shadow"
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
                    <h2 className="font-bold text-graphite group-hover:text-teal transition-colors">{p.title}</h2>
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
          ) : (
            <p className="text-gray-400 text-center py-16">Progetti in arrivo.</p>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 relative overflow-hidden">
        {/* Foto cantiere Unsplash — Milivoj Kuhar, free to use */}
        <div
          className="absolute inset-0 pointer-events-none"
          aria-hidden
          style={{
            backgroundImage: "url('/assets/diamo/cta-cantiere-bg.webp')",
            backgroundSize: 'cover',
            backgroundPosition: 'center center',
            backgroundRepeat: 'no-repeat',
          }}
        />
        {/* Overlay scuro per leggibilità */}
        <div
          className="absolute inset-0 pointer-events-none"
          aria-hidden
          style={{ background: 'linear-gradient(135deg, rgba(21,54,62,0.88) 0%, rgba(21,54,62,0.72) 100%)' }}
        />
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 text-center" style={{ zIndex: 10 }}>
          <h2 className="font-extrabold text-white text-2xl mb-4">Hai un progetto simile?</h2>
          <p className="mb-8" style={{ color: 'rgba(248,248,245,0.72)' }}>Contattaci per un sopralluogo gratuito senza impegno.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/#preventivatore"
              className="px-7 py-3.5 rounded-xl font-bold text-sm transition-all hover:-translate-y-0.5"
              style={{ backgroundColor: '#F4BE12', color: '#1E2A2E' }}
            >
              Ottieni una stima
            </Link>
            <Link
              href="/contatti"
              className="px-7 py-3.5 rounded-xl font-semibold text-sm transition-all hover:-translate-y-0.5"
              style={{ border: '1px solid rgba(248,248,245,0.30)', color: '#F8F8F5' }}
            >
              Contattaci
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
