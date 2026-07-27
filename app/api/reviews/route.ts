import { NextResponse } from 'next/server'

interface GoogleReview {
  author_name: string
  rating: number
  text: string
  time: number
  profile_photo_url: string
}

interface CacheEntry {
  data: { reviews: GoogleReview[]; rating: number }
  fetchedAt: number
}

let cache: CacheEntry | null = null
const CACHE_TTL_MS = 24 * 60 * 60 * 1000 // 24 ore

const FALLBACK_REVIEWS: GoogleReview[] = [
  {
    author_name: 'Marco B.',
    rating: 5,
    text: 'Lavoro impeccabile! Ristrutturazione bagno eseguita in tempi brevissimi e con grande cura dei dettagli. Personale professionale e puntuale.',
    time: Math.floor(Date.now() / 1000) - 86400 * 7,
    profile_photo_url: '',
  },
  {
    author_name: 'Laura C.',
    rating: 5,
    text: 'Abbiamo rifatto tutto l\'appartamento con Diamo Soluzioni. Risultato fantastico, rispetto dei tempi e prezzi onesti. Consigliatissimi!',
    time: Math.floor(Date.now() / 1000) - 86400 * 14,
    profile_photo_url: '',
  },
  {
    author_name: 'Giuseppe T.',
    rating: 5,
    text: 'Rifacimento facciata e cappotto termico perfetto. Professionalità e pulizia del cantiere eccellenti. Li richiamerò sicuramente.',
    time: Math.floor(Date.now() / 1000) - 86400 * 21,
    profile_photo_url: '',
  },
  {
    author_name: 'Silvia M.',
    rating: 5,
    text: 'Sostituzione infissi fatta benissimo. Installazione rapida, operai cortesi e precisi. Il risparmio energetico è già visibile in bolletta!',
    time: Math.floor(Date.now() / 1000) - 86400 * 30,
    profile_photo_url: '',
  },
]

export async function GET() {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY
  const placeId = process.env.GOOGLE_PLACE_ID

  if (!apiKey || !placeId) {
    return NextResponse.json({ reviews: FALLBACK_REVIEWS, rating: 5.0 })
  }

  if (cache && Date.now() - cache.fetchedAt < CACHE_TTL_MS) {
    return NextResponse.json(cache.data)
  }

  try {
    const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=reviews,rating&key=${apiKey}&language=it&reviews_sort=newest`
    const res = await fetch(url, { next: { revalidate: 86400 } })
    const json = await res.json()

    if (json.status !== 'OK') {
      return NextResponse.json({ reviews: FALLBACK_REVIEWS, rating: 5.0 })
    }

    const fiveStarReviews: GoogleReview[] = (json.result.reviews ?? []).filter(
      (r: GoogleReview) => r.rating === 5
    )
    const data = { reviews: fiveStarReviews, rating: json.result.rating ?? 5.0 }
    cache = { data, fetchedAt: Date.now() }
    return NextResponse.json(data)
  } catch {
    return NextResponse.json({ reviews: FALLBACK_REVIEWS, rating: 5.0 })
  }
}
