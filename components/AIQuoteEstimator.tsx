'use client'
import { useState } from 'react'
import { business, whatsappUrl } from '@/config/business'
import { formatEur } from '@/config/pricing'

type Step = 1 | 2 | 3 | 4 | 5 | 'result' | 'contact'

const SERVICE_TYPES = [
  { id: 'ristrutturazione_completa', label: 'Ristrutturazione completa' },
  { id: 'bagno_piccolo', label: 'Rifacimento bagno' },
  { id: 'cucina', label: 'Cucina' },
  { id: 'pavimento', label: 'Pavimenti' },
  { id: 'tinteggiatura', label: 'Tinteggiatura' },
  { id: 'cappotto', label: 'Facciata / Cappotto' },
  { id: 'infissi', label: 'Infissi' },
  { id: 'impianto_idraulico', label: 'Impianto idraulico' },
  { id: 'impianto_elettrico', label: 'Impianto elettrico' },
  { id: 'altro', label: 'Altro' },
]

const PROPERTY_TYPES = ['Appartamento', 'Villa/Casa', 'Locale commerciale', 'Altro']
const PROPERTY_CONDITIONS = ['Buone condizioni', 'Da rinnovare', 'Da ristrutturare', 'Nessuna idea']
const TIMINGS = ['Meno di 1 mese', '1–3 mesi', '3–6 mesi', 'Non ho fretta']

interface QuoteState {
  serviceId: string
  serviceLabel: string
  propertyType: string
  size: string
  condition: string
  city: string
  timing: string
  description: string
  minTotal: number
  maxTotal: number
}

const DISCLAIMER =
  'Stima orientativa — non costituisce un preventivo contrattuale. Il prezzo definitivo viene stabilito dopo sopralluogo gratuito e verifica tecnica.'

export default function AIQuoteEstimator() {
  const [step, setStep] = useState<Step>(1)
  const [loading, setLoading] = useState(false)
  const [quote, setQuote] = useState<QuoteState | null>(null)
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [contactSent, setContactSent] = useState(false)
  const [contactError, setContactError] = useState('')
  const [leadId] = useState(() => `DS-${Date.now().toString(36).toUpperCase()}`)

  // Step 1
  const [serviceId, setServiceId] = useState('')
  const [serviceLabel, setServiceLabel] = useState('')
  // Step 2
  const [propertyType, setPropertyType] = useState('')
  const [size, setSize] = useState('')
  const [condition, setCondition] = useState('')
  const [city, setCity] = useState('')
  const [timing, setTiming] = useState('')
  // Step 3
  const [description, setDescription] = useState('')

  async function handleEstimate() {
    setLoading(true)
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          mode: 'estimate',
          leadId,
          serviceId,
          serviceLabel,
          propertyType,
          size,
          condition,
          city,
          timing,
          description,
        }),
      })
      const data = await res.json()
      setQuote({
        serviceId,
        serviceLabel,
        propertyType,
        size,
        condition,
        city,
        timing,
        description,
        minTotal: data.minTotal ?? 0,
        maxTotal: data.maxTotal ?? 0,
      })
      setStep('result')

      // Evento analytics (architettura pronta, ID da configurare)
      type GtagFn = (...args: unknown[]) => void
      const w = window as unknown as { gtag?: GtagFn }
      if (typeof window !== 'undefined' && w.gtag) {
        w.gtag('event', 'ai_quote_complete', { service: serviceId, city, lead_id: leadId })
      }
    } catch {
      setQuote({
        serviceId, serviceLabel, propertyType, size, condition, city, timing, description,
        minTotal: 0, maxTotal: 0,
      })
      setStep('result')
    } finally {
      setLoading(false)
    }
  }

  async function handleContact(e: React.FormEvent) {
    e.preventDefault()
    setContactError('')
    const phoneOk = /^[\d\s+\-()\\.]{7,20}$/.test(phone)
    if (!name.trim() || !phoneOk) {
      setContactError('Inserisci nome e numero di telefono validi.')
      return
    }
    setLoading(true)
    try {
      await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          leadId,
          name,
          email,
          phone,
          service: serviceLabel,
          city,
          size,
          description,
          estimate: quote ? `${formatEur(quote.minTotal)} – ${formatEur(quote.maxTotal)}` : '',
          source: 'ai_estimator',
        }),
      })
      setContactSent(true)
    } catch {
      setContactError('Errore di invio. Chiamaci al ' + business.phone.primary)
    } finally {
      setLoading(false)
    }
  }

  function buildWhatsAppMessage() {
    const range = quote ? `${formatEur(quote.minTotal)} – ${formatEur(quote.maxTotal)}` : 'da definire'
    return `Buongiorno Diamo Soluzioni, ho appena usato il preventivatore del sito (rif. ${leadId}).
Servizio: ${serviceLabel}
Zona: ${city || 'da definire'}
Metratura: ${size || 'da definire'} mq
Descrizione: ${description}
Stima indicativa ricevuta: ${range}

Vorrei sapere quando è possibile un sopralluogo gratuito.`
  }

  const cardClass = 'bg-white rounded-2xl shadow-card overflow-hidden'
  const headerClass = 'px-6 pt-6 pb-4 border-b border-concrete'

  // ─── STEP 1: tipo lavoro ──────────────────────────────────────────────────
  if (step === 1) {
    return (
      <div className={cardClass}>
        <div className={headerClass}>
          <div className="flex items-center gap-3 mb-1">
            <div className="w-8 h-8 rounded-full bg-teal flex items-center justify-center">
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <p className="font-bold text-graphite text-sm">Stima il tuo progetto</p>
              <p className="text-xs text-gray-400">Passo 1 di 5</p>
            </div>
          </div>
          <div className="mt-3 flex gap-1">
            {[1,2,3,4,5].map(n => (
              <div key={n} className="flex-1 h-1 rounded-full" style={{ backgroundColor: n === 1 ? '#F4BE12' : '#ECEDE9' }} />
            ))}
          </div>
        </div>
        <div className="px-6 py-5">
          <p className="font-semibold text-graphite text-sm mb-4">Che lavoro devi fare?</p>
          <div className="grid grid-cols-2 gap-2">
            {SERVICE_TYPES.map(s => (
              <button
                key={s.id}
                onClick={() => { setServiceId(s.id); setServiceLabel(s.label); setStep(2) }}
                className="text-left px-4 py-3 rounded-xl border text-sm font-medium transition-all hover:border-teal hover:bg-warm-white"
                style={{ borderColor: '#ECEDE9', color: '#1E2A2E' }}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    )
  }

  // ─── STEP 2: dettagli immobile ────────────────────────────────────────────
  if (step === 2) {
    const canProceed = propertyType && condition && city
    return (
      <div className={cardClass}>
        <div className={headerClass}>
          <div className="flex items-center justify-between mb-1">
            <p className="font-bold text-graphite text-sm">{serviceLabel}</p>
            <button onClick={() => setStep(1)} className="text-xs text-gray-400 hover:text-graphite transition-colors">← Indietro</button>
          </div>
          <p className="text-xs text-gray-400 mb-3">Passo 2 di 5</p>
          <div className="flex gap-1">
            {[1,2,3,4,5].map(n => (
              <div key={n} className="flex-1 h-1 rounded-full" style={{ backgroundColor: n <= 2 ? '#F4BE12' : '#ECEDE9' }} />
            ))}
          </div>
        </div>
        <div className="px-6 py-5 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wide">Tipo di immobile</label>
            <div className="grid grid-cols-2 gap-2">
              {PROPERTY_TYPES.map(t => (
                <button
                  key={t}
                  onClick={() => setPropertyType(t)}
                  className="text-sm px-3 py-2.5 rounded-xl border transition-all font-medium"
                  style={{
                    borderColor: propertyType === t ? '#1F4852' : '#ECEDE9',
                    backgroundColor: propertyType === t ? '#1F4852' : 'white',
                    color: propertyType === t ? 'white' : '#1E2A2E',
                  }}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label htmlFor="size" className="block text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wide">
              Metratura (mq) <span className="font-normal normal-case text-gray-400">— facoltativo</span>
            </label>
            <input
              id="size"
              type="number"
              min="1"
              max="5000"
              placeholder="es. 75"
              value={size}
              onChange={e => setSize(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-concrete text-sm focus:outline-none focus:border-teal transition-colors"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wide">Stato attuale</label>
            <div className="grid grid-cols-2 gap-2">
              {PROPERTY_CONDITIONS.map(c => (
                <button
                  key={c}
                  onClick={() => setCondition(c)}
                  className="text-sm px-3 py-2.5 rounded-xl border transition-all font-medium text-left"
                  style={{
                    borderColor: condition === c ? '#1F4852' : '#ECEDE9',
                    backgroundColor: condition === c ? '#1F4852' : 'white',
                    color: condition === c ? 'white' : '#1E2A2E',
                  }}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label htmlFor="city" className="block text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wide">Comune</label>
            <input
              id="city"
              type="text"
              placeholder="es. Lodi, Melegnano, San Donato Milanese…"
              value={city}
              onChange={e => setCity(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-concrete text-sm focus:outline-none focus:border-teal transition-colors"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wide">Tempistica</label>
            <div className="grid grid-cols-2 gap-2">
              {TIMINGS.map(t => (
                <button
                  key={t}
                  onClick={() => setTiming(t)}
                  className="text-xs px-3 py-2.5 rounded-xl border transition-all font-medium"
                  style={{
                    borderColor: timing === t ? '#1F4852' : '#ECEDE9',
                    backgroundColor: timing === t ? '#1F4852' : 'white',
                    color: timing === t ? 'white' : '#1E2A2E',
                  }}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
          <button
            disabled={!canProceed}
            onClick={() => setStep(3)}
            className="w-full py-3 rounded-xl font-bold text-sm transition-all disabled:opacity-40"
            style={{ backgroundColor: '#F4BE12', color: '#1E2A2E' }}
          >
            Continua →
          </button>
        </div>
      </div>
    )
  }

  // ─── STEP 3: descrizione libera ───────────────────────────────────────────
  if (step === 3) {
    return (
      <div className={cardClass}>
        <div className={headerClass}>
          <div className="flex items-center justify-between mb-1">
            <p className="font-bold text-graphite text-sm">Descrivi il progetto</p>
            <button onClick={() => setStep(2)} className="text-xs text-gray-400 hover:text-graphite transition-colors">← Indietro</button>
          </div>
          <p className="text-xs text-gray-400 mb-3">Passo 3 di 5</p>
          <div className="flex gap-1">
            {[1,2,3,4,5].map(n => (
              <div key={n} className="flex-1 h-1 rounded-full" style={{ backgroundColor: n <= 3 ? '#F4BE12' : '#ECEDE9' }} />
            ))}
          </div>
        </div>
        <div className="px-6 py-5 space-y-4">
          <div>
            <label htmlFor="desc" className="block text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wide">
              Raccontaci cosa vuoi ottenere
            </label>
            <textarea
              id="desc"
              rows={4}
              placeholder="Es.: voglio rifare completamente il bagno: demo, nuovi impianti, gres 60×60, doccia walk-in, sanitari sospesi…"
              value={description}
              onChange={e => setDescription(e.target.value)}
              maxLength={1000}
              className="w-full px-4 py-3 rounded-xl border border-concrete text-sm focus:outline-none focus:border-teal transition-colors resize-none"
            />
            <p className="text-xs text-gray-400 text-right mt-1">{description.length}/1000</p>
          </div>
          <button
            onClick={() => setStep(4)}
            className="w-full py-3 rounded-xl font-bold text-sm transition-all"
            style={{ backgroundColor: '#F4BE12', color: '#1E2A2E' }}
          >
            Continua →
          </button>
        </div>
      </div>
    )
  }

  // ─── STEP 4: foto (opzionale) ─────────────────────────────────────────────
  if (step === 4) {
    return (
      <div className={cardClass}>
        <div className={headerClass}>
          <div className="flex items-center justify-between mb-1">
            <p className="font-bold text-graphite text-sm">Foto (opzionale)</p>
            <button onClick={() => setStep(3)} className="text-xs text-gray-400 hover:text-graphite transition-colors">← Indietro</button>
          </div>
          <p className="text-xs text-gray-400 mb-3">Passo 4 di 5</p>
          <div className="flex gap-1">
            {[1,2,3,4,5].map(n => (
              <div key={n} className="flex-1 h-1 rounded-full" style={{ backgroundColor: n <= 4 ? '#F4BE12' : '#ECEDE9' }} />
            ))}
          </div>
        </div>
        <div className="px-6 py-5 space-y-4">
          <p className="text-sm text-gray-600 leading-relaxed">
            Se hai foto dello spazio attuale puoi condividerle via WhatsApp dopo aver ricevuto la stima. Non sono necessarie adesso.
          </p>
          <button
            onClick={handleEstimate}
            disabled={loading}
            className="w-full py-3.5 rounded-xl font-bold text-sm transition-all disabled:opacity-60 flex items-center justify-center gap-2"
            style={{ backgroundColor: '#1F4852', color: 'white' }}
          >
            {loading ? (
              <>
                <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Sto elaborando…
              </>
            ) : (
              <>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                Calcola la mia stima
              </>
            )}
          </button>
          <button
            onClick={() => setStep(3)}
            className="w-full py-2.5 text-sm text-gray-400 hover:text-graphite transition-colors"
          >
            ← Torna alla descrizione
          </button>
        </div>
      </div>
    )
  }

  // ─── RISULTATO ────────────────────────────────────────────────────────────
  if (step === 'result' && quote) {
    const hasRange = quote.minTotal > 0 && quote.maxTotal > 0

    return (
      <div className={cardClass}>
        <div className={headerClass} style={{ background: 'linear-gradient(135deg, #1F4852, #15363E)' }}>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gold flex items-center justify-center">
              <svg className="w-4 h-4 text-graphite" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div>
              <p className="font-bold text-white text-sm">La tua pre-stima</p>
              <p className="text-xs text-white/60">Rif. {leadId}</p>
            </div>
          </div>
        </div>

        <div className="px-6 py-5 space-y-5">
          {/* Dati intervento */}
          <div className="text-xs text-gray-500 space-y-1 bg-warm-white rounded-xl p-4">
            <p><span className="font-semibold text-graphite">Intervento:</span> {quote.serviceLabel}</p>
            {quote.city && <p><span className="font-semibold text-graphite">Zona:</span> {quote.city}</p>}
            {quote.size && <p><span className="font-semibold text-graphite">Metratura:</span> {quote.size} mq</p>}
          </div>

          {/* Range prezzo */}
          {hasRange ? (
            <div className="text-center py-4">
              <p className="text-xs uppercase tracking-widest text-gray-400 mb-2">Range orientativo</p>
              <p className="font-extrabold text-graphite" style={{ fontSize: '1.8rem' }}>
                {formatEur(quote.minTotal)}&nbsp;–&nbsp;{formatEur(quote.maxTotal)}
              </p>
            </div>
          ) : (
            <div className="text-center py-4 bg-concrete rounded-xl">
              <p className="text-sm text-gray-500">
                Per questo intervento è necessario un sopralluogo prima di fornire una stima.
              </p>
            </div>
          )}

          <p className="text-xs text-gray-400 leading-relaxed italic text-center">{DISCLAIMER}</p>

          {/* CTA */}
          <div className="space-y-2.5">
            <button
              onClick={() => setStep('contact')}
              className="w-full py-3.5 rounded-xl font-bold text-sm"
              style={{ backgroundColor: '#F4BE12', color: '#1E2A2E' }}
            >
              Prenota sopralluogo gratuito
            </button>
            <a
              href={whatsappUrl(buildWhatsAppMessage())}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 border border-concrete hover:border-teal transition-colors text-graphite"
            >
              <svg className="w-4 h-4" fill="#25D366" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Invia su WhatsApp
            </a>
            <a
              href={`tel:${business.phone.primaryRaw}`}
              className="w-full py-3 rounded-xl text-sm text-center text-gray-400 hover:text-teal transition-colors font-medium"
            >
              Oppure chiama: {business.phone.primary}
            </a>
          </div>
        </div>
      </div>
    )
  }

  // ─── RACCOLTA CONTATTI (solo dopo aver visto la stima) ────────────────────
  if (step === 'contact') {
    if (contactSent) {
      return (
        <div className={cardClass}>
          <div className="p-8 text-center">
            <div className="w-14 h-14 rounded-full bg-teal flex items-center justify-center mx-auto mb-5">
              <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <p className="font-extrabold text-graphite text-lg mb-2">Richiesta inviata!</p>
            <p className="text-sm text-gray-500 leading-relaxed mb-6">
              Ti contatteremo presto per concordare il sopralluogo gratuito.
              Rif. <strong>{leadId}</strong>
            </p>
            <a
              href={whatsappUrl(buildWhatsAppMessage())}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm border border-concrete"
            >
              Conferma anche su WhatsApp
            </a>
          </div>
        </div>
      )
    }

    return (
      <div className={cardClass}>
        <div className={headerClass}>
          <div className="flex items-center justify-between">
            <p className="font-bold text-graphite text-sm">Ricevi il riepilogo completo</p>
            <button onClick={() => setStep('result')} className="text-xs text-gray-400 hover:text-graphite transition-colors">← Stima</button>
          </div>
          <p className="text-xs text-gray-400 mt-1">Passo 5 di 5</p>
        </div>
        <div className="px-6 py-5">
          <p className="text-sm text-gray-500 mb-5 leading-relaxed">
            Inserisci i tuoi riferimenti per ricevere il riepilogo della stima e fissare il sopralluogo.
          </p>
          <form onSubmit={handleContact} noValidate className="space-y-3">
            <div>
              <label htmlFor="contact-name" className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wide">Nome *</label>
              <input
                id="contact-name"
                type="text"
                required
                autoComplete="name"
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="Mario Rossi"
                className="w-full px-4 py-2.5 rounded-xl border border-concrete text-sm focus:outline-none focus:border-teal transition-colors"
              />
            </div>
            <div>
              <label htmlFor="contact-phone" className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wide">Telefono *</label>
              <input
                id="contact-phone"
                type="tel"
                required
                autoComplete="tel"
                value={phone}
                onChange={e => setPhone(e.target.value)}
                placeholder="+39 344 461 9461"
                className="w-full px-4 py-2.5 rounded-xl border border-concrete text-sm focus:outline-none focus:border-teal transition-colors"
              />
            </div>
            <div>
              <label htmlFor="contact-email" className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wide">
                Email <span className="font-normal normal-case text-gray-400">— facoltativa</span>
              </label>
              <input
                id="contact-email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="mario@email.it"
                className="w-full px-4 py-2.5 rounded-xl border border-concrete text-sm focus:outline-none focus:border-teal transition-colors"
              />
            </div>

            {contactError && (
              <p className="text-xs text-red-500 bg-red-50 rounded-lg px-3 py-2" role="alert">{contactError}</p>
            )}

            <p className="text-xs text-gray-400 leading-relaxed">
              I tuoi dati sono usati solo per contattarti riguardo a questo progetto.
            </p>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-xl font-bold text-sm transition-all disabled:opacity-60"
              style={{ backgroundColor: '#F4BE12', color: '#1E2A2E' }}
            >
              {loading ? 'Invio in corso…' : 'Prenota sopralluogo gratuito'}
            </button>
          </form>
        </div>
      </div>
    )
  }

  return null
}
