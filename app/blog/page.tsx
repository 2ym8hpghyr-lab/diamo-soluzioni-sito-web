import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { business } from '@/config/business'
import { posts } from '@/data/blog'

export const metadata: Metadata = {
  title: 'Blog — Guide su ristrutturazioni a Lodi',
  description: 'Articoli pratici su costi, tempi e permessi per ristrutturazioni, bagni, infissi e impianti a Lodi e Milano Sud. A cura di Diamo Soluzioni.',
  alternates: { canonical: `${business.siteUrl}/blog` },
  openGraph: {
    title: 'Blog Diamo Soluzioni — Guide su ristrutturazioni a Lodi',
    description: 'Articoli pratici su costi, tempi e permessi per ristrutturazioni a Lodi e provincia.',
    url: `${business.siteUrl}/blog`,
    siteName: business.name,
    type: 'website',
    images: [{ url: `${business.siteUrl}/progetti/ristrutturazione-appartamento-lodi/camera-letto-finita.jpg`, alt: 'Blog Diamo Soluzioni — Guide su ristrutturazioni a Lodi' }],
  },
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('it-IT', { day: 'numeric', month: 'long', year: 'numeric' })
}

export default function BlogPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden py-20 lg:py-28" style={{ backgroundColor: '#1F4852' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
          <nav className="flex items-center gap-2 text-xs mb-8" style={{ color: 'rgba(248,248,245,0.50)' }} aria-label="Breadcrumb">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <span style={{ color: 'rgba(248,248,245,0.85)' }}>Blog</span>
          </nav>
          <p className="text-xs font-bold uppercase tracking-[0.18em] mb-4" style={{ color: '#F4BE12' }}>
            GUIDE E CONSIGLI
          </p>
          <h1 className="font-extrabold text-white mb-4" style={{ fontSize: 'clamp(1.8rem,4vw,2.8rem)' }}>
            Blog Diamo Soluzioni
          </h1>
          <p className="text-base leading-relaxed max-w-2xl" style={{ color: 'rgba(248,248,245,0.75)' }}>
            Articoli pratici su costi, tempi, permessi e lavorazioni per ristrutturazioni a Lodi e provincia. Quello che nessuno ti dice prima di ristrutturare.
          </p>
        </div>
      </section>

      {/* Articoli */}
      <section className="py-16" style={{ backgroundColor: '#FAFAF7' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="space-y-8">
            {posts.map(post => (
              <article
                key={post.slug}
                className="bg-white rounded-2xl overflow-hidden border"
                style={{ borderColor: '#ECEDE9' }}
              >
                <div className="sm:flex">
                  {/* Immagine */}
                  <div className="relative sm:w-64 flex-shrink-0 aspect-[4/3] sm:aspect-auto">
                    <Image
                      src={post.coverImage}
                      alt={post.coverAlt}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 100vw, 256px"
                    />
                  </div>

                  {/* Contenuto card */}
                  <div className="p-6 flex flex-col justify-between gap-4">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: '#F4BE12' }}>
                        {formatDate(post.date)}
                      </p>
                      <h2 className="font-bold text-xl leading-snug mb-3" style={{ color: '#1E2A2E' }}>
                        <Link href={`/blog/${post.slug}`} className="hover:text-teal transition-colors">
                          {post.title}
                        </Link>
                      </h2>
                      <p className="text-sm leading-relaxed" style={{ color: '#4A5568' }}>
                        {post.excerpt}
                      </p>
                    </div>
                    <Link
                      href={`/blog/${post.slug}`}
                      className="inline-flex items-center gap-1.5 text-sm font-semibold transition-colors hover:gap-2.5"
                      style={{ color: '#1F4852' }}
                    >
                      Leggi l'articolo
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
