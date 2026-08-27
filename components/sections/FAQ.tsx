'use client'
import { useState, useId } from 'react'
import { business } from '@/config/business'

type GtagFn = (...args: unknown[]) => void
function trackEvent(name: string, params?: Record<string, unknown>) {
  const w = window as unknown as { gtag?: GtagFn }
  if (typeof window !== 'undefined' && w.gtag) {
    w.gtag('event', name, params)
  }
}

const faqs = [
  {
    q: 'Come funziona il sopralluogo gratuito?',
    a: 'Ci contatti via telefono, WhatsApp o preventivatore AI. Concordiamo una data, veniamo a vedere lo spazio, ascoltiamo le tue esigenze. Non c\'è nessun impegno e non ti chiediamo nulla per venire.',
  },
  {
    q: 'Quanto dura una ristrutturazione completa?',
    a: 'Dipende dalla metratura e dallo stato dell\'immobile. Un appartamento di 70–90 mq richiede in media 6–10 settimane lavorative. Prima di iniziare ti consegniamo un cronoprogramma dettagliato.',
  },
  {
    q: 'Il preventivo è vincolante?',
    a: 'Il preventivo che ti consegniamo è scritto e dettagliato. Ogni variazione in corso d\'opera viene discussa e approvata da te prima di essere eseguita. Nessuna sorpresa in fattura.',
  },
  {
    q: 'Devo lasciare casa durante i lavori?',
    a: 'Per ristrutturazioni totali è consigliabile. Per interventi parziali — solo bagno, solo pavimenti, solo pittura — spesso non è necessario. Lo valutiamo insieme al sopralluogo.',
  },
  {
    q: 'Lavorate anche nei comuni fuori da Lodi?',
    a: 'Sì, operiamo a Merlino, Lodi, Melegnano, San Donato Milanese, Paullo, Crema e nei comuni limitrofi. Contattaci per verificare la disponibilità nella tua zona.',
  },
  {
    q: 'Rilasciate certificazioni e dichiarazioni di conformità?',
    a: 'Sì. Per gli impianti elettrici rilasciamo la dichiarazione di conformità CEI. Per gli impianti idraulici la certificazione dell\'impianto. Tutto documentato e consegnato insieme alle chiavi.',
  },
  {
    q: 'Posso fornire io i materiali?',
    a: 'Sì, puoi acquistare i materiali autonomamente. In alternativa li scegliamo insieme in base al tuo budget: conosciamo fornitori locali e siamo in grado di aiutarti a orientarti.',
  },
  {
    q: 'La stima dell\'AI è attendibile?',
    a: 'La stima online è orientativa e basata su parametri medi di mercato. Non sostituisce un preventivo reale. Serve per avere un ordine di grandezza prima del sopralluogo. Il prezzo definitivo viene sempre stabilito dopo la verifica tecnica in loco.',
  },
]

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map(faq => ({
    '@type': 'Question',
    name: faq.q,
    acceptedAnswer: { '@type': 'Answer', text: faq.a },
  })),
}

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0)
  const uid = useId()

  return (
    <section className="relative overflow-hidden" style={{ backgroundColor: '#F8F8F5' }} aria-labelledby="faq-heading">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <div
        className="absolute inset-0 pointer-events-none select-none"
        aria-hidden
        style={{
          backgroundImage: "url('/assets/diamo/blueprint-texture-bg.webp')",
          backgroundSize: 'cover',
          backgroundPosition: 'center center',
          backgroundRepeat: 'no-repeat',
          opacity: 0.18,
          zIndex: 0,
        }}
      />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-20 lg:py-24" style={{ zIndex: 10 }}>
        <div className="flex flex-col lg:flex-row lg:gap-16 xl:gap-24">

          {/* Colonna sinistra 40% */}
          <div className="lg:w-5/12 mb-12 lg:mb-0 lg:pt-2">
            <p className="text-xs font-bold uppercase tracking-[0.18em] mb-4" style={{ color: '#B88A32' }}>FAQ</p>
            <div className="w-10 h-0.5 mb-7" style={{ backgroundColor: '#B88A32' }} aria-hidden />
            <h2
              id="faq-heading"
              className="font-extrabold mb-5"
              style={{ color: '#1E2A2E', fontSize: 'clamp(1.5rem,3vw,2.2rem)' }}
            >
              Le risposte<br />prima di iniziare.
            </h2>
            <p className="text-sm leading-relaxed mb-8" style={{ color: '#4A5568' }}>
              Hai domande prima di chiamare? Qui trovi le risposte alle domande più frequenti.
              Per qualsiasi altra cosa, siamo disponibili al telefono.
            </p>
            <a
              href={`tel:${business.phone.primaryRaw}`}
              className="inline-flex items-center gap-2.5 text-sm font-semibold transition-colors"
              style={{ color: '#1F4852' }}
            >
              <span className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: 'rgba(31,72,82,0.10)' }}>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </span>
              {business.phone.primary}
            </a>
          </div>

          {/* Colonna destra 60% */}
          <div className="lg:w-7/12">
            <div className="rounded-2xl overflow-hidden" style={{ border: '1px solid #ECEDE9', backgroundColor: '#FFFFFF' }}>
              {faqs.map((faq, i) => {
                const btnId = `${uid}-btn-${i}`
                const panelId = `${uid}-panel-${i}`
                const isOpen = open === i
                return (
                  <div key={i}>
                    <button
                      id={btnId}
                      className="w-full text-left px-6 py-5 flex items-start justify-between gap-4 transition-colors"
                      style={{ backgroundColor: isOpen ? '#F8F8F5' : undefined }}
                      onClick={() => {
                        if (!isOpen) trackEvent('faq_open', { question: faq.q })
                        setOpen(isOpen ? null : i)
                      }}
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                    >
                      <span className="font-semibold text-sm leading-relaxed" style={{ color: '#1E2A2E' }}>{faq.q}</span>
                      <svg
                        className="w-4 h-4 flex-shrink-0 mt-0.5"
                        style={{
                          color: '#1F4852',
                          transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                          transition: 'transform 200ms ease',
                        }}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    {isOpen && (
                      <div
                        id={panelId}
                        role="region"
                        aria-labelledby={btnId}
                        className="px-6 pb-5 pt-1"
                        style={{ borderTop: '1px solid #ECEDE9' }}
                      >
                        <p className="text-sm leading-relaxed" style={{ color: '#4A5568' }}>{faq.a}</p>
                      </div>
                    )}
                    {i < faqs.length - 1 && (
                      <div style={{ height: '1px', backgroundColor: '#ECEDE9' }} aria-hidden />
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
