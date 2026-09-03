'use client'
import Link from 'next/link'
import { business, whatsappUrl } from '@/config/business'
import { trackEvent } from '@/lib/analytics'

const WA_MESSAGE = 'Buongiorno, ho visitato il vostro sito e vorrei informazioni per un sopralluogo gratuito.'

export default function FinalCTA() {
  return (
    <section style={{ backgroundColor: '#1E2A2E' }} aria-labelledby="cta-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">

        {/* Aggancio visivo alle recensioni sopra */}
        <div className="flex items-center justify-center gap-2 mb-6">
          <div style={{ height: '1px', width: '32px', backgroundColor: 'rgba(248,248,245,0.15)' }} aria-hidden />
          <div className="flex items-center gap-1.5">
            <svg className="w-3 h-3 rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden style={{ color: '#B88A32' }}>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
            <p className="text-xs font-medium" style={{ color: 'rgba(248,248,245,0.75)' }}>
              Ogni cantiere lì sopra è iniziato con una chiamata. Il tuo?
            </p>
          </div>
          <div style={{ height: '1px', width: '32px', backgroundColor: 'rgba(248,248,245,0.15)' }} aria-hidden />
        </div>

        {/* Barra CTA */}
        <div
          className="flex flex-col md:flex-row items-center justify-between gap-6 rounded-2xl px-8 py-7"
          style={{ border: '1px solid rgba(248,248,245,0.10)', backgroundColor: 'rgba(248,248,245,0.05)' }}
        >
          {/* Testo */}
          <div className="flex items-center gap-5">
            <div className="w-1 self-stretch rounded-full flex-shrink-0" style={{ backgroundColor: '#F4BE12', minHeight: '48px' }} aria-hidden />
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.16em] mb-1" style={{ color: '#F4BE12' }}>Inizia da qui</p>
              <h2
                id="cta-heading"
                className="font-extrabold text-white"
                style={{ fontSize: 'clamp(1.1rem,1.8vw,1.35rem)' }}
              >
                Hai un progetto in mente?
              </h2>
              <p className="text-sm mt-1" style={{ color: 'rgba(248,248,245,0.75)' }}>
                Sopralluogo gratuito · Risposta in poche ore
              </p>
            </div>
          </div>

          {/* Azioni */}
          <div className="flex items-center gap-3 flex-shrink-0 flex-wrap justify-center md:justify-end">
            <Link
              href="/#preventivatore"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-bold text-sm transition-all hover:-translate-y-0.5 hover:shadow-lg"
              style={{ backgroundColor: '#F4BE12', color: '#1E2A2E' }}
              onClick={() => trackEvent('click_estimator', { location: 'final_cta' })}
            >
              Ottieni la stima
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
            <a
              href={whatsappUrl(WA_MESSAGE)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm transition-all hover:-translate-y-0.5"
              style={{ border: '1px solid rgba(248,248,245,0.20)', color: '#F8F8F5' }}
              onClick={() => trackEvent('click_whatsapp', { location: 'final_cta' })}
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              WhatsApp
            </a>
            <a
              href={`tel:${business.phone.primaryRaw}`}
              className="hidden sm:inline-flex items-center gap-1.5 text-sm font-medium transition-colors"
              style={{ color: 'rgba(248,248,245,0.75)' }}
              onClick={() => trackEvent('click_phone', { location: 'final_cta' })}
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              {business.phone.primary}
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
