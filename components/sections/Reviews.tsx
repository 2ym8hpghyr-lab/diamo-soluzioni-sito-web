'use client'
import Image from 'next/image'
import { useEffect, useRef } from 'react'
import { getPublishedReviews, getAverageRating } from '@/data/reviews'
import { business } from '@/config/business'

type GtagFn = (...args: unknown[]) => void
function trackEvent(name: string, params?: Record<string, unknown>) {
  const w = window as unknown as { gtag?: GtagFn }
  if (typeof window !== 'undefined' && w.gtag) {
    w.gtag('event', name, params)
  }
}

function Stars({ count, filled }: { count: number; filled: boolean }) {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} className="w-4 h-4 flex-shrink-0" fill={filled ? '#F4BE12' : 'none'} stroke="#F4BE12" strokeWidth={1.5} viewBox="0 0 24 24" aria-hidden>
          <path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
        </svg>
      ))}
    </>
  )
}

export default function Reviews() {
  const sectionRef = useRef<HTMLElement>(null)
  const publishedReviews = getPublishedReviews()
  const avgRating = getAverageRating()

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          trackEvent('review_section_view')
          observer.disconnect()
        }
      },
      { threshold: 0.3 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  if (!publishedReviews.length) return null

  return (
    <section ref={sectionRef} aria-labelledby="reviews-heading">
      {/* Header con sfondo fotografico */}
      <div className="relative overflow-hidden py-20 lg:py-24">
        <Image
          src="/assets/diamo/recensioni-diamo-soluzioni-premium.webp"
          alt=""
          fill
          className="object-cover"
          style={{ objectPosition: '65% 50%' }}
          sizes="100vw"
        />
        <div
          className="absolute inset-0"
          aria-hidden
          style={{ background: 'linear-gradient(90deg,rgba(20,18,13,.92) 0%,rgba(20,18,13,.76) 42%,rgba(20,18,13,.42) 68%,rgba(20,18,13,.12) 100%)' }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
          <p className="text-xs font-bold uppercase tracking-[0.18em] mb-4" style={{ color: '#F4BE12' }}>
            FIDUCIA COSTRUITA SUL CAMPO
          </p>
          <div className="w-10 h-0.5 mb-7" style={{ backgroundColor: '#B88A32' }} aria-hidden />
          <h2
            id="reviews-heading"
            className="font-extrabold text-white mb-4"
            style={{ fontSize: 'clamp(1.6rem,3vw,2.4rem)' }}
          >
            Lavori ben fatti.<br />Clienti che lo confermano.
          </h2>
          <p className="text-base max-w-xl leading-relaxed mb-6" style={{ color: 'rgba(248,248,245,0.65)' }}>
            Recensioni vere, raccolte dal profilo Google di Diamo Soluzioni.
          </p>

          {/* Rating aggregato */}
          <div className="flex items-center gap-3">
            <div role="img" className="flex items-center gap-0.5" aria-label={`${avgRating} su 5 stelle`}>
              <Stars count={5} filled />
            </div>
            <span className="font-extrabold text-white text-lg">{avgRating.toFixed(1)}</span>
            <span className="text-sm" style={{ color: 'rgba(248,248,245,0.55)' }}>
              · {publishedReviews.length} recensioni Google
            </span>
          </div>
        </div>
      </div>

      {/* Griglia card */}
      <div className="py-14" style={{ backgroundColor: '#1E2A2E' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {publishedReviews.map(review => (
              <article
                key={review.name}
                className="rounded-2xl p-6 flex flex-col gap-4"
                style={{
                  backgroundColor: 'rgba(248,248,245,0.05)',
                  border: '1px solid rgba(248,248,245,0.08)',
                }}
              >
                <div role="img" className="flex items-center gap-0.5" aria-label={`${review.rating} stelle su 5`}>
                  <Stars count={review.rating} filled />
                </div>
                <p className="text-sm leading-relaxed flex-1" style={{ color: 'rgba(248,248,245,0.82)' }}>
                  &ldquo;{review.text}&rdquo;
                </p>
                <div>
                  <p className="font-semibold text-sm text-white">{review.name}</p>
                  {review.projectTag && (
                    <p className="text-xs mt-0.5" style={{ color: '#B88A32' }}>{review.projectTag}</p>
                  )}
                  <p className="text-xs mt-0.5" style={{ color: 'rgba(248,248,245,0.35)' }}>{review.date}</p>
                </div>
              </article>
            ))}
          </div>

          {/* Link al profilo Google */}
          {business.social.googleBusiness && (
            <div className="text-center">
              <a
                href={business.social.googleBusiness}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold transition-opacity hover:opacity-80"
                style={{ backgroundColor: 'rgba(248,248,245,0.08)', color: 'rgba(248,248,245,0.75)', border: '1px solid rgba(248,248,245,0.15)' }}
                aria-label="Leggi tutte le recensioni di Diamo Soluzioni su Google (apre in una nuova scheda)"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
                Leggi tutte le recensioni su Google
              </a>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
