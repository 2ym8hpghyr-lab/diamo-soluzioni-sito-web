import Link from 'next/link'
import { business } from '@/config/business'
import QuoteWizard from '@/components/sections/QuoteWizard'

const PIN_ICON = (
  <svg className="w-3 h-3 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
  </svg>
)

export default function Hero() {
  return (
    <section
      id="preventivatore"
      className="relative overflow-hidden"
      aria-label="Hero principale"
    >
      {/* Foto di sfondo LCP */}
      <div
        className="absolute inset-0 pointer-events-none hero-bg-img"
        aria-hidden
        style={{
          backgroundImage: 'url(/assets/diamo/hero-home-materiali-lavorazione-v2.webp)',
          backgroundSize: 'cover',
          backgroundPosition: '70% 50%',
        }}
      />
      {/* Overlay caldo: forte a sinistra, trasparente a destra + vignettatura inferiore */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden
        style={{ background: 'linear-gradient(90deg,rgba(20,18,13,.94) 0%,rgba(20,18,13,.82) 36%,rgba(20,18,13,.50) 58%,rgba(20,18,13,.12) 100%), linear-gradient(to top,rgba(20,18,13,.35) 0%,transparent 28%)' }}
      />
      <div
        className="absolute left-0 top-0 bottom-0 w-0.5 pointer-events-none"
        aria-hidden
        style={{ background: 'linear-gradient(to bottom, transparent, #F4BE12 30%, #F4BE12 70%, transparent)' }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-16 lg:py-24">
        <div className="flex flex-col lg:flex-row items-start gap-12 lg:gap-16">

          {/* Sinistra ~55% */}
          <div className="flex-[0_0_auto] lg:w-[52%]">
            <p
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] mb-8 px-3 py-1.5 rounded-full"
              style={{ color: '#F4BE12', backgroundColor: 'rgba(244,190,18,0.12)', border: '1px solid rgba(244,190,18,0.25)' }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-gold" />
              Impresa Edile · Merlino (LO) · Milano Sud · Lodi
            </p>

            <h1
              className="font-extrabold leading-[1.1] text-white mb-4"
              style={{ fontSize: 'clamp(2rem, 4vw, 3.25rem)' }}
            >
              Ristrutturazioni a Lodi<br />
              <span style={{ color: '#F4BE12' }}>e Milano Sud.</span>
            </h1>

            <p
              className="font-extrabold leading-[1.15] text-white/80 mb-6"
              style={{ fontSize: 'clamp(1.15rem, 2.2vw, 1.55rem)' }}
            >
              Costruiamo soluzioni destinate a durare —<br />
              edilizia e impianti chiavi in mano.
            </p>

            <p className="text-lg leading-relaxed mb-8 max-w-lg text-white/65">
              Un unico interlocutore per ogni fase: sopralluogo gratuito, preventivo scritto, consegna nei tempi concordati.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 mb-10">
              <Link
                href="/#preventivatore"
                className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl font-bold text-sm transition-all hover:-translate-y-0.5"
                style={{ backgroundColor: '#F4BE12', color: '#1E2A2E' }}
              >
                Ottieni una stima con l&apos;AI
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
              <Link
                href="/contatti"
                className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl font-semibold text-sm border border-white/30 text-white hover:border-gold hover:text-gold transition-all"
              >
                Parla con un tecnico
              </Link>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <a
                href={`tel:${business.phone.primaryRaw}`}
                className="flex items-center gap-2.5 text-sm font-semibold text-white/85 hover:text-gold transition-colors"
              >
                <span className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: 'rgba(244,190,18,0.15)' }}>
                  <svg className="w-4 h-4 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </span>
                {business.phone.primary}
              </a>
              <div className="w-px h-5 bg-white/20 hidden sm:block" />
              <a
                href={business.whatsapp.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm font-semibold text-white/85 hover:text-gold transition-colors"
              >
                <span className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: 'rgba(37,211,102,0.15)' }}>
                  <svg className="w-4 h-4" fill="#25D366" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                </span>
                WhatsApp
              </a>
            </div>

            <div className="mt-10 pt-8 border-t border-white/10 space-y-5">
              <div className="grid grid-cols-2 gap-6">
                {[
                  { label: 'Sopralluogo', value: 'Gratuito' },
                  { label: 'Preventivo', value: 'Dettagliato' },
                ].map(item => (
                  <div key={item.label}>
                    <p className="text-xs text-white/50">{item.label}</p>
                    <p className="font-extrabold text-white text-base mt-0.5">{item.value}</p>
                  </div>
                ))}
              </div>

              <div>
                <p className="text-xs text-white/50 mb-2">Zone servite</p>
                <div className="flex flex-wrap gap-1.5">
                  {business.areas.map(area => (
                    <span
                      key={area}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold"
                      style={{ backgroundColor: 'rgba(244,190,18,0.12)', color: '#F4BE12', border: '1px solid rgba(244,190,18,0.22)' }}
                    >
                      {PIN_ICON}
                      {area}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Destra ~45% — form wizard */}
          <div className="w-full lg:flex-1">
            <QuoteWizard />
          </div>

        </div>
      </div>
    </section>
  )
}
