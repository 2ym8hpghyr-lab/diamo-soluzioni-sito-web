'use client'
import Link from 'next/link'
import { trackEvent } from '@/lib/analytics'

interface Service {
  slug: string
  name: string
  shortDesc: string
}

export default function RelatedServices({ services }: { services: Service[] }) {
  if (services.length === 0) return null
  return (
    <div className="mt-14 pt-10" style={{ borderTop: '1px solid #ECEDE9' }}>
      <h2 className="font-bold text-lg mb-6" style={{ color: '#1E2A2E' }}>Leggi anche</h2>
      <div className="grid sm:grid-cols-3 gap-4">
        {services.map(s => (
          <Link
            key={s.slug}
            href={`/servizi/${s.slug}`}
            onClick={() => trackEvent('service_view_from_blog', { service_slug: s.slug })}
            className="rounded-xl p-4 border transition-all hover:border-teal hover:shadow-sm"
            style={{ borderColor: '#ECEDE9', backgroundColor: '#ffffff' }}
          >
            <p className="font-semibold text-sm leading-snug mb-1" style={{ color: '#1E2A2E' }}>{s.name}</p>
            <p className="text-xs leading-relaxed" style={{ color: '#6B7280' }}>{s.shortDesc}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}
