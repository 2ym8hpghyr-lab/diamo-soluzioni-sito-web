'use client'
import { useEffect, useState } from 'react'

interface Review {
  author_name: string
  rating: number
  text: string
  time: number
  profile_photo_url: string
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map(n => (
        <svg
          key={n}
          viewBox="0 0 20 20"
          className="w-4 h-4"
          fill={n <= rating ? '#C5A059' : '#374151'}
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  )
}

export default function Reviews() {
  const [reviews, setReviews] = useState<Review[]>([])
  const [rating, setRating] = useState(5.0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/reviews')
      .then(r => r.json())
      .then(data => {
        setReviews(data.reviews ?? [])
        setRating(data.rating ?? 5.0)
      })
      .finally(() => setLoading(false))
  }, [])

  return (
    <section className="py-24" style={{ backgroundColor: '#0F1115' }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <p
            className="text-xs font-semibold uppercase tracking-[0.15em] mb-4"
            style={{ color: '#C5A059' }}
          >
            Dicono di Noi
          </p>
          <h2
            className="font-bold mb-4"
            style={{
              fontFamily: '"Plus Jakarta Sans", sans-serif',
              fontSize: 'clamp(1.8rem, 3vw, 2.5rem)',
              color: '#F3F4F6',
              letterSpacing: '-0.02em',
            }}
          >
            Recensioni dei Clienti
          </h2>

          {/* Badge Google */}
          <div
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium"
            style={{
              backgroundColor: '#1A1D24',
              border: '1px solid rgba(197,160,89,0.3)',
              color: '#F3F4F6',
            }}
          >
            <span style={{ color: '#C5A059' }}>★</span>
            <span>
              <strong style={{ color: '#C5A059' }}>{rating.toFixed(1)}/5.0</strong>
              {' '}— Recensioni verificate Google Maps
            </span>
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="rounded-xl p-5 animate-pulse"
                style={{ backgroundColor: '#1A1D24', height: '180px' }}
              />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {reviews.slice(0, 8).map((r, i) => (
              <div
                key={i}
                className="rounded-xl p-5 flex flex-col gap-3"
                style={{
                  backgroundColor: '#1A1D24',
                  border: '1px solid rgba(255,255,255,0.08)',
                }}
              >
                <StarRating rating={r.rating} />
                <p
                  className="text-sm leading-relaxed flex-1 line-clamp-4"
                  style={{ color: '#D1D5DB' }}
                >
                  &ldquo;{r.text}&rdquo;
                </p>
                <div>
                  <p className="text-sm font-semibold" style={{ color: '#F3F4F6' }}>
                    {r.author_name}
                  </p>
                  <p className="text-xs" style={{ color: '#9CA3AF' }}>
                    {new Date(r.time * 1000).toLocaleDateString('it-IT', { month: 'long', year: 'numeric' })}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="text-center mt-10">
          <a
            href="https://g.page/r/diamo-soluzioni/review"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-medium transition-colors duration-200"
            style={{ color: '#C5A059' }}
          >
            Vedi tutte le recensioni su Google Maps →
          </a>
        </div>
      </div>
    </section>
  )
}
