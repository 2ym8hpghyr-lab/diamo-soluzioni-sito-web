import Image from 'next/image'
import Link from 'next/link'
import { business } from '@/config/business'

export default function Areas() {
  return (
    <section
      className="relative overflow-hidden"
      style={{ minHeight: 'clamp(620px,70vh,760px)' }}
      aria-labelledby="areas-heading"
    >
      <Image
        src="/assets/diamo/zone-servite-premium-bg.webp"
        alt=""
        fill
        className="object-cover"
        style={{ objectPosition: '70% 50%' }}
        sizes="100vw"
      />
      <div
        className="absolute inset-0"
        aria-hidden
        style={{ background: 'linear-gradient(90deg,rgba(23,23,20,.93) 0%,rgba(23,23,20,.68) 48%,rgba(23,23,20,.18) 100%)' }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-20 lg:py-24 flex items-center" style={{ minHeight: 'inherit' }}>
        <div className="max-w-xl">
          <p className="text-xs font-bold uppercase tracking-[0.18em] mb-4" style={{ color: '#F4BE12' }}>ZONE SERVITE</p>
          <div className="w-10 h-0.5 mb-7" style={{ backgroundColor: '#B88A32' }} aria-hidden />
          <h2
            id="areas-heading"
            className="font-extrabold text-white mb-5"
            style={{ fontSize: 'clamp(1.6rem,3vw,2.4rem)' }}
          >
            Operiamo a Merlino,<br />Lodi e Milano Sud.
          </h2>
          <p className="text-base leading-relaxed mb-10" style={{ color: 'rgba(248,248,245,0.70)' }}>
            Un&apos;impresa locale, presente davvero sul territorio. Sopralluoghi chiari, tempi concreti, lavori fatti bene.
          </p>

          <div className="flex flex-wrap gap-2 mb-10">
            {business.areas.map(area => (
              <span
                key={area}
                className="px-4 py-2 rounded-full text-xs font-semibold"
                style={{
                  backgroundColor: 'rgba(248,248,245,0.10)',
                  color: 'rgba(248,248,245,0.85)',
                  border: '1px solid rgba(248,248,245,0.20)',
                }}
              >
                {area}
              </span>
            ))}
          </div>

          <Link
            href="/contatti"
            prefetch={false}
            className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl font-bold text-sm transition-all hover:-translate-y-0.5"
            style={{ backgroundColor: '#F4BE12', color: '#1E2A2E' }}
          >
            Verifica la tua zona
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  )
}
