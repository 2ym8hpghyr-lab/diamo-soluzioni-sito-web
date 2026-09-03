'use client'

import { useState, useEffect, useRef, useId } from 'react'
import { business, whatsappUrl } from '@/config/business'
import { formatEur } from '@/config/pricing'
import { SERVICE_SLUG_MAP } from '@/config/wizard'
import { trackEvent } from '@/lib/analytics'

/* ─────────────────────────────────────────────────────────────
   TIPI
   ───────────────────────────────────────────────────────────── */

type WizardStep = 1 | 2 | 3 | 4 | 5 | 'summary' | 'contact' | 'sent' | 'error'
type ContactMethod = 'phone' | 'whatsapp' | 'email'

interface ServiceOption {
  id: string
  label: string
  icon: JSX.Element
}

interface WizardState {
  serviceId: string
  serviceLabel: string
  serviceOther: string
  city: string
  size: string
  description: string
  timing: string
  timingNote: string
  photos: File[]
}

interface EstimateResult {
  minTotal: number
  maxTotal: number
}

/* ─────────────────────────────────────────────────────────────
   ICONE INLINE (stile lucide, stroke-based, senza dipendenze)
   ───────────────────────────────────────────────────────────── */

const stroke = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.8,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
}

const IconHouse = (
  <svg viewBox="0 0 24 24" width="20" height="20" {...stroke} aria-hidden>
    <path d="M3 11.5 12 4l9 7.5" />
    <path d="M5 10v10h14V10" />
    <path d="M10 20v-6h4v6" />
  </svg>
)
const IconBath = (
  <svg viewBox="0 0 24 24" width="20" height="20" {...stroke} aria-hidden>
    <path d="M4 12h16v3a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4v-3Z" />
    <path d="M6 12V6a2 2 0 0 1 2-2h1a2 2 0 0 1 2 2" />
    <path d="M5 20l-1 2M19 20l1 2" />
  </svg>
)
const IconFloor = (
  <svg viewBox="0 0 24 24" width="20" height="20" {...stroke} aria-hidden>
    <rect x="3" y="4" width="18" height="16" rx="1" />
    <path d="M3 10h18M3 15h18M9 4v16M15 4v16" />
  </svg>
)
const IconPaint = (
  <svg viewBox="0 0 24 24" width="20" height="20" {...stroke} aria-hidden>
    <path d="M4 4h14v5H4z" />
    <path d="M18 6h2v4h-8v3" />
    <path d="M10 13h4v4h-4z" />
    <path d="M12 17v4" />
  </svg>
)
const IconWall = (
  <svg viewBox="0 0 24 24" width="20" height="20" {...stroke} aria-hidden>
    <rect x="3" y="4" width="18" height="16" />
    <path d="M3 9h18M3 15h18M9 4v5M15 9v6M9 15v5" />
  </svg>
)
const IconDoor = (
  <svg viewBox="0 0 24 24" width="20" height="20" {...stroke} aria-hidden>
    <rect x="3" y="2" width="18" height="20" rx="1" />
    <rect x="7" y="6" width="10" height="12" rx="0.5" />
    <circle cx="15.5" cy="12" r="0.8" fill="currentColor" stroke="none" />
  </svg>
)
const IconDroplet = (
  <svg viewBox="0 0 24 24" width="20" height="20" {...stroke} aria-hidden>
    <path d="M12 2C12 2 4 10 4 15a8 8 0 0 0 16 0c0-5-8-13-8-13Z" />
  </svg>
)
const IconBolt = (
  <svg viewBox="0 0 24 24" width="20" height="20" {...stroke} aria-hidden>
    <path d="M13 2 4.5 13.5H11L10 22l9.5-11.5H14L13 2Z" />
  </svg>
)
const IconMore = (
  <svg viewBox="0 0 24 24" width="20" height="20" {...stroke} aria-hidden>
    <circle cx="5" cy="12" r="1.5" />
    <circle cx="12" cy="12" r="1.5" />
    <circle cx="19" cy="12" r="1.5" />
  </svg>
)
const IconArrowRight = (
  <svg viewBox="0 0 24 24" width="16" height="16" {...stroke} aria-hidden>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
)
const IconArrowLeft = (
  <svg viewBox="0 0 24 24" width="16" height="16" {...stroke} aria-hidden>
    <path d="M19 12H5M11 6l-6 6 6 6" />
  </svg>
)
const IconSpinner = (
  <svg viewBox="0 0 24 24" width="18" height="18" className="animate-spin" aria-hidden>
    <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeOpacity="0.25" strokeWidth="3" />
    <path d="M12 3a9 9 0 0 1 9 9" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
  </svg>
)
const IconUpload = (
  <svg viewBox="0 0 24 24" width="18" height="18" {...stroke} aria-hidden>
    <path d="M12 15V4M7 9l5-5 5 5" />
    <path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2" />
  </svg>
)

/* ─────────────────────────────────────────────────────────────
   COSTANTI DI DOMINIO
   Mantengono compatibilità con l'API `/api/chat` mode=estimate.
   ───────────────────────────────────────────────────────────── */

const SERVICES: ServiceOption[] = [
  { id: 'ristrutturazione_completa', label: 'Ristrutturazione completa', icon: IconHouse },
  { id: 'bagno_piccolo',            label: 'Bagno',                      icon: IconBath    },
  { id: 'pavimento',                label: 'Pavimenti e rivestimenti',   icon: IconFloor   },
  { id: 'tinteggiatura',            label: 'Tinteggiatura',              icon: IconPaint   },
  { id: 'impianto_idraulico',       label: 'Impianto idraulico',         icon: IconDroplet },
  { id: 'impianto_elettrico',       label: 'Impianto elettrico',         icon: IconBolt    },
  { id: 'infissi',                  label: 'Infissi e serramenti',       icon: IconDoor    },
  { id: 'cappotto',                 label: 'Cappotto termico',           icon: IconWall    },
  { id: 'altro',                    label: 'Altro',                      icon: IconMore    },
]

const SIZE_PRESETS = [
  { label: '< 20 mq', value: '15' },
  { label: '20–50 mq', value: '35' },
  { label: '50–100 mq', value: '75' },
  { label: '> 100 mq', value: '150' },
]

const TIMING_OPTIONS = [
  'Prima possibile',
  'Entro 1–2 mesi',
  'Entro 6 mesi',
  'Non ho ancora una data',
]

const TOTAL_STEPS = 5

/* ─────────────────────────────────────────────────────────────
   COMPONENTE
   ───────────────────────────────────────────────────────────── */

export default function QuoteWizard() {
  const statusId = useId()
  const [step, setStep] = useState<WizardStep>(1)
  const [state, setState] = useState<WizardState>({
    serviceId: '',
    serviceLabel: '',
    serviceOther: '',
    city: '',
    size: '',
    description: '',
    timing: '',
    timingNote: '',
    photos: [],
  })

  // Reference sopravvive tra i render per l'ID lead
  const [leadId] = useState(() => `DS-${Date.now().toString(36).toUpperCase()}`)

  // Preseleziona il servizio dal parametro URL ?service=<slug-pagina>
  // Compatibile con back/forward: la URL con ?service= è già nel history stack,
  // quindi tornando avanti il componente si rimonta e ri-esegue questo effetto.
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const slug = params.get('service') ?? ''
    const serviceId = SERVICE_SLUG_MAP[slug]
    if (!serviceId) return
    const opt = SERVICES.find(s => s.id === serviceId)
    if (opt) {
      setState(s => ({ ...s, serviceId: opt.id, serviceLabel: opt.label }))
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  // Stima
  const [estimate, setEstimate] = useState<EstimateResult | null>(null)
  const [estimating, setEstimating] = useState(false)
  const [estimateFailed, setEstimateFailed] = useState(false)

  // Contatti
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [contactMethod, setContactMethod] = useState<ContactMethod>('phone')
  const [privacyOk, setPrivacyOk] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [formError, setFormError] = useState('')

  // Focus management: quando cambia step, sposta il focus all'inizio del pannello
  const panelRef = useRef<HTMLDivElement>(null)
  const isFirstRender = useRef(true)
  const estimatorStartFired = useRef(false)
  useEffect(() => {
    // Salta il focus al mount iniziale: evita che il browser aggiorni
    // il candidato LCP al momento dell'idratazione React
    if (isFirstRender.current) { isFirstRender.current = false; return }
    const el = panelRef.current
    if (!el) return
    const t = setTimeout(() => {
      const first = el.querySelector<HTMLElement>('[data-autofocus="true"]')
      if (first) first.focus({ preventScroll: true })
      else el.focus({ preventScroll: true })
    }, 30)
    return () => clearTimeout(t)
  }, [step])

  /* ── Helpers ─────────────────────────────────────────────── */

  const update = <K extends keyof WizardState>(k: K, v: WizardState[K]) =>
    setState(s => ({ ...s, [k]: v }))

  function goToStep(next: WizardStep) {
    if (next === 2 && step === 1 && !estimatorStartFired.current) {
      trackEvent('estimator_start', { service: state.serviceId })
      estimatorStartFired.current = true
    }
    setStep(next)
  }

  function selectService(opt: ServiceOption) {
    update('serviceId', opt.id)
    update('serviceLabel', opt.label)
  }

  const effectiveServiceLabel =
    state.serviceId === 'altro' && state.serviceOther.trim()
      ? state.serviceOther.trim()
      : state.serviceLabel

  const step1Ready = state.serviceId !== '' && (state.serviceId !== 'altro' || state.serviceOther.trim().length > 1)
  const step2Ready = state.city.trim().length >= 2
  const step3Ready = state.size.trim().length > 0 || state.size === 'unknown'
  const step4Ready = state.description.trim().length >= 5
  const step5Ready = state.timing.trim().length > 0

  /* ── Stima: chiama /api/chat mode=estimate (invariato) ──── */

  async function requestEstimate() {
    setEstimating(true)
    setEstimateFailed(false)
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          mode: 'estimate',
          leadId,
          serviceId: state.serviceId,
          serviceLabel: effectiveServiceLabel,
          propertyType: '',
          size: state.size === 'unknown' ? '' : state.size,
          condition: '',
          city: state.city,
          timing: state.timing,
          description: state.description,
        }),
      })
      if (!res.ok) throw new Error('HTTP ' + res.status)
      const data = await res.json()
      const min = Number(data?.minTotal) || 0
      const max = Number(data?.maxTotal) || 0
      if (min > 0 && max > 0) {
        setEstimate({ minTotal: min, maxTotal: max })
        trackEvent('estimator_complete', { service: state.serviceId, city: state.city })
      } else {
        setEstimate(null)
      }
    } catch {
      setEstimate(null)
      setEstimateFailed(true)
    } finally {
      setEstimating(false)
    }
  }

  // Quando entriamo nel riepilogo, richiediamo la stima una volta sola
  useEffect(() => {
    if (step === 'summary' && !estimate && !estimating && !estimateFailed) {
      requestEstimate()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step])

  /* ── Invio lead ──────────────────────────────────────────── */

  function buildWhatsAppMessage() {
    const range = estimate ? `${formatEur(estimate.minTotal)} – ${formatEur(estimate.maxTotal)}` : 'da definire'
    return `Buongiorno Diamo Soluzioni, ho compilato il preventivatore del sito (rif. ${leadId}).
Lavoro: ${effectiveServiceLabel}
Zona: ${state.city || 'da definire'}
Metratura: ${state.size && state.size !== 'unknown' ? state.size + ' mq' : 'da definire'}
Tempistica: ${state.timing}${state.timingNote ? ' — ' + state.timingNote : ''}
Descrizione: ${state.description}
Stima indicativa: ${range}

Vorrei sapere quando è possibile un sopralluogo gratuito.`
  }

  async function submitLead(e: React.FormEvent) {
    e.preventDefault()
    setFormError('')

    const phoneOk = /^[\d\s+\-().]{7,20}$/.test(phone)
    if (!name.trim()) {
      setFormError('Inserisci il tuo nome.')
      return
    }
    if (!phoneOk) {
      setFormError('Inserisci un numero di telefono valido.')
      return
    }
    if (!privacyOk) {
      setFormError('Per procedere devi accettare l’informativa privacy.')
      return
    }

    setSubmitting(true)
    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          leadId,
          name: name.trim(),
          email: email.trim(),
          phone: phone.trim(),
          serviceLabel: effectiveServiceLabel,
          city: state.city,
          size: state.size === 'unknown' ? '' : state.size,
          description: [
            state.description,
            `Canale preferito: ${{ phone: 'Telefono', whatsapp: 'WhatsApp', email: 'Email' }[contactMethod] ?? contactMethod}`,
          ].filter(Boolean).join('\n\n'),
          timing: state.timing + (state.timingNote ? ' — ' + state.timingNote : ''),
          contactMethod,
          minTotal: estimate?.minTotal,
          maxTotal: estimate?.maxTotal,
          source: 'quote_wizard',
        }),
      })
      if (!res.ok) throw new Error('HTTP ' + res.status)
      trackEvent('form_submit', { service: effectiveServiceLabel, contact_method: contactMethod })
      setStep('sent')
    } catch {
      setStep('error')
    } finally {
      setSubmitting(false)
    }
  }

  /* ── Progress bar ────────────────────────────────────────── */

  const progressStep =
    step === 'summary' || step === 'contact' || step === 'sent' || step === 'error'
      ? TOTAL_STEPS
      : (step as number)
  const progressPct = Math.min(100, (progressStep / TOTAL_STEPS) * 100)

  /* ── Render helpers ──────────────────────────────────────── */

  const primaryBtn =
    'inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-bold text-sm transition-all hover:-translate-y-[1px] disabled:opacity-40 disabled:hover:translate-y-0 focus:outline-none focus-visible:ring-4 focus-visible:ring-gold/50'
  const ghostBtn =
    'inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-semibold text-sm text-graphite/70 hover:text-graphite transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-teal/40'
  const inputCls =
    'w-full px-4 py-3 rounded-xl border border-concrete text-sm bg-white text-graphite placeholder:text-graphite/75 focus:outline-none focus:border-teal focus-visible:ring-2 focus-visible:ring-teal/30 transition-colors'

  /* ── CARD WIZARD ─────────────────────────────────────────────── */

  return (
    <>
      <div
        ref={panelRef}
        tabIndex={-1}
        className="rounded-2xl shadow-[0_18px_48px_-16px_rgba(0,0,0,0.55)] outline-none focus:outline-none"
        style={{ backgroundColor: '#FAFAF7' }}
      >
              {/* Header del modulo */}
              <div className="px-6 pt-6 pb-4 border-b" style={{ borderColor: '#ECEDE9' }}>
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div>
                    <p className="font-extrabold text-graphite text-[17px] leading-tight">
                      Scopri quanto può costare il tuo progetto
                    </p>
                    <p className="text-xs text-graphite/75 mt-0.5">Ottieni una prima stima indicativa in circa 2 minuti.</p>
                  </div>
                  <span
                    className="text-[10px] font-bold uppercase tracking-[0.14em] px-2.5 py-1 rounded-full whitespace-nowrap"
                    style={{ backgroundColor: 'rgba(244,190,18,0.18)', color: '#6B5209' }}
                  >
                    Preventivatore AI
                  </span>
                </div>

                {/* Progress */}
                <div>
                  <p className="text-[11px] font-semibold text-graphite/75 mb-1.5">
                    Domanda {Math.min(progressStep, TOTAL_STEPS)} di {TOTAL_STEPS}
                  </p>
                  <div
                    className="h-1.5 rounded-full overflow-hidden"
                    style={{ backgroundColor: '#ECEDE9' }}
                    role="progressbar"
                    aria-label={`Avanzamento del preventivatore: domanda ${Math.min(progressStep, TOTAL_STEPS)} di ${TOTAL_STEPS}`}
                    aria-valuemin={0}
                    aria-valuemax={TOTAL_STEPS}
                    aria-valuenow={Math.min(progressStep, TOTAL_STEPS)}
                  >
                    <div
                      className="h-full w-full origin-left motion-safe:transition-transform motion-safe:duration-300 motion-safe:ease-out"
                      style={{ backgroundColor: '#F4BE12', transform: `scaleX(${progressPct / 100})` }}
                    />
                  </div>
                </div>
              </div>

              {/* Corpo — con aria-live per aggiornamenti di stato */}
              <div
                className="px-6 py-6"
                aria-live="polite"
                aria-atomic="false"
                id={statusId}
              >
                {/* ─── STEP 1 ─────────────────────────────── */}
                {step === 1 && (
                  <div className="motion-safe:animate-[fadeIn_.15s_ease-out]">
                    <label className="block text-sm font-semibold text-graphite mb-4">
                      Che lavoro vuoi realizzare?
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {SERVICES.map((opt, idx) => {
                        const selected = state.serviceId === opt.id
                        return (
                          <button
                            key={opt.id}
                            type="button"
                            data-autofocus={idx === 0 ? 'true' : undefined}
                            onClick={() => selectService(opt)}
                            aria-pressed={selected}
                            className="group flex items-center gap-3 text-left px-4 py-3 rounded-xl border text-sm font-medium transition-transform motion-safe:hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal/40 min-h-[44px]"
                            style={{
                              borderColor: selected ? '#1F4852' : '#ECEDE9',
                              backgroundColor: selected ? '#1F4852' : 'white',
                              color: selected ? 'white' : '#1E2A2E',
                            }}
                          >
                            <span
                              className="flex-shrink-0"
                              style={{ color: selected ? '#F4BE12' : '#1F4852' }}
                            >
                              {opt.icon}
                            </span>
                            <span className="leading-snug">{opt.label}</span>
                          </button>
                        )
                      })}
                    </div>

                    {state.serviceId === 'altro' && (
                      <div className="mt-3 motion-safe:animate-[fadeIn_.15s_ease-out]">
                        <label htmlFor="qw-other" className="block text-xs font-semibold text-graphite/75 mb-1.5">
                          Descrivi brevemente il tipo di lavoro
                        </label>
                        <input
                          id="qw-other"
                          type="text"
                          value={state.serviceOther}
                          onChange={e => update('serviceOther', e.target.value)}
                          placeholder="es. rifacimento tetto, controsoffitto..."
                          className={inputCls}
                          maxLength={120}
                        />
                      </div>
                    )}

                    <div className="mt-6 flex items-center justify-end">
                      <button
                        type="button"
                        onClick={() => goToStep(2)}
                        disabled={!step1Ready}
                        aria-disabled={!step1Ready}
                        className={primaryBtn}
                        style={{ backgroundColor: '#F4BE12', color: '#1E2A2E' }}
                      >
                        Continua {IconArrowRight}
                      </button>
                    </div>
                  </div>
                )}

                {/* ─── STEP 2 ─────────────────────────────── */}
                {step === 2 && (
                  <div className="motion-safe:animate-[fadeIn_.15s_ease-out]">
                    <label htmlFor="qw-city" className="block text-sm font-semibold text-graphite mb-2">
                      Dove si trova l’immobile?
                    </label>
                    <p className="text-xs text-graphite/75 mb-3">Ci aiuta a valutare tempi e trasferte.</p>
                    <input
                      id="qw-city"
                      type="text"
                      data-autofocus="true"
                      value={state.city}
                      onChange={e => update('city', e.target.value)}
                      placeholder="es. Lodi, Melegnano, San Donato..."
                      autoComplete="address-level2"
                      className={inputCls}
                      maxLength={120}
                    />

                    <div className="mt-6 flex items-center justify-between">
                      <button type="button" onClick={() => goToStep(1)} className={ghostBtn}>
                        {IconArrowLeft} Indietro
                      </button>
                      <button
                        type="button"
                        onClick={() => goToStep(3)}
                        disabled={!step2Ready}
                        aria-disabled={!step2Ready}
                        className={primaryBtn}
                        style={{ backgroundColor: '#F4BE12', color: '#1E2A2E' }}
                      >
                        Continua {IconArrowRight}
                      </button>
                    </div>
                  </div>
                )}

                {/* ─── STEP 3 ─────────────────────────────── */}
                {step === 3 && (
                  <div className="motion-safe:animate-[fadeIn_.15s_ease-out]">
                    <label htmlFor="qw-size" className="block text-sm font-semibold text-graphite mb-2">
                      Quanto è grande l’area?
                    </label>
                    <p className="text-xs text-graphite/75 mb-3">Anche una stima approssimativa va bene.</p>

                    <div className="relative">
                      <input
                        id="qw-size"
                        type="number"
                        inputMode="numeric"
                        min={1}
                        max={5000}
                        data-autofocus="true"
                        value={state.size === 'unknown' ? '' : state.size}
                        onChange={e => update('size', e.target.value)}
                        placeholder="es. 75"
                        className={inputCls + ' pr-14'}
                      />
                      <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-semibold text-graphite/75 pointer-events-none">
                        mq
                      </span>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-3">
                      {SIZE_PRESETS.map(p => {
                        const active = state.size === p.value
                        return (
                          <button
                            key={p.label}
                            type="button"
                            onClick={() => update('size', p.value)}
                            aria-pressed={active}
                            className="text-xs px-3 py-2.5 rounded-xl border font-semibold transition-transform motion-safe:hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal/40 min-h-[44px]"
                            style={{
                              borderColor: active ? '#1F4852' : '#ECEDE9',
                              backgroundColor: active ? '#1F4852' : 'white',
                              color: active ? 'white' : '#1E2A2E',
                            }}
                          >
                            {p.label}
                          </button>
                        )
                      })}
                    </div>

                    <button
                      type="button"
                      onClick={() => update('size', 'unknown')}
                      aria-pressed={state.size === 'unknown'}
                      className="mt-3 text-xs font-semibold text-teal underline underline-offset-4 hover:text-teal-dark transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-teal/40 rounded"
                    >
                      Non lo so
                    </button>

                    <div className="mt-6 flex items-center justify-between">
                      <button type="button" onClick={() => goToStep(2)} className={ghostBtn}>
                        {IconArrowLeft} Indietro
                      </button>
                      <button
                        type="button"
                        onClick={() => goToStep(4)}
                        disabled={!step3Ready}
                        aria-disabled={!step3Ready}
                        className={primaryBtn}
                        style={{ backgroundColor: '#F4BE12', color: '#1E2A2E' }}
                      >
                        Continua {IconArrowRight}
                      </button>
                    </div>
                  </div>
                )}

                {/* ─── STEP 4 ─────────────────────────────── */}
                {step === 4 && (
                  <div className="motion-safe:animate-[fadeIn_.15s_ease-out]">
                    <label htmlFor="qw-desc" className="block text-sm font-semibold text-graphite mb-2">
                      Descrivici la situazione attuale
                    </label>
                    <p className="text-xs text-graphite/75 mb-3">
                      Descrivi brevemente lo stato attuale e cosa vorresti realizzare.
                    </p>
                    <textarea
                      id="qw-desc"
                      rows={5}
                      data-autofocus="true"
                      value={state.description}
                      onChange={e => update('description', e.target.value)}
                      maxLength={1000}
                      placeholder="es. Bagno anni '90 da rifare completamente, pareti con umidità..."
                      className={inputCls + ' resize-none'}
                    />
                    <p className="text-[11px] text-graphite/75 text-right mt-1">
                      {state.description.length}/1000
                    </p>

                    <div className="mt-6 flex items-center justify-between">
                      <button type="button" onClick={() => goToStep(3)} className={ghostBtn}>
                        {IconArrowLeft} Indietro
                      </button>
                      <button
                        type="button"
                        onClick={() => goToStep(5)}
                        disabled={!step4Ready}
                        aria-disabled={!step4Ready}
                        className={primaryBtn}
                        style={{ backgroundColor: '#F4BE12', color: '#1E2A2E' }}
                      >
                        Continua {IconArrowRight}
                      </button>
                    </div>
                  </div>
                )}

                {/* ─── STEP 5 ─────────────────────────────── */}
                {step === 5 && (
                  <div className="motion-safe:animate-[fadeIn_.15s_ease-out]">
                    <label className="block text-sm font-semibold text-graphite mb-2">
                      Quando vorresti iniziare?
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-3">
                      {TIMING_OPTIONS.map((t, idx) => {
                        const active = state.timing === t
                        return (
                          <button
                            key={t}
                            type="button"
                            data-autofocus={idx === 0 ? 'true' : undefined}
                            onClick={() => update('timing', t)}
                            aria-pressed={active}
                            className="text-left text-sm px-4 py-3 rounded-xl border font-medium transition-transform motion-safe:hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal/40 min-h-[44px]"
                            style={{
                              borderColor: active ? '#1F4852' : '#ECEDE9',
                              backgroundColor: active ? '#1F4852' : 'white',
                              color: active ? 'white' : '#1E2A2E',
                            }}
                          >
                            {t}
                          </button>
                        )
                      })}
                    </div>

                    <label htmlFor="qw-timing-note" className="block text-xs font-semibold text-graphite/75 mb-1.5">
                      Note aggiuntive <span className="font-normal text-graphite/75">— facoltative</span>
                    </label>
                    <input
                      id="qw-timing-note"
                      type="text"
                      value={state.timingNote}
                      onChange={e => update('timingNote', e.target.value)}
                      placeholder="es. da fine mese, preferibilmente in settimana..."
                      className={inputCls}
                      maxLength={160}
                    />

                    {/* Upload facoltativo */}
                    <div className="mt-4">
                      <label
                        htmlFor="qw-photos"
                        className="flex items-center gap-3 px-4 py-3 rounded-xl border-2 border-dashed cursor-pointer transition-colors hover:border-teal focus-within:border-teal"
                        style={{ borderColor: '#ECEDE9', color: '#1E2A2E' }}
                      >
                        <span style={{ color: '#1F4852' }}>{IconUpload}</span>
                        <span className="text-sm">
                          <span className="font-semibold">Aggiungi foto</span>{' '}
                          <span className="text-graphite/75">— facoltativo, aiuta a stimare meglio</span>
                        </span>
                      </label>
                      <input
                        id="qw-photos"
                        type="file"
                        accept="image/*"
                        multiple
                        className="sr-only"
                        onChange={e => {
                          const files = Array.from(e.target.files ?? []).slice(0, 6)
                          update('photos', files)
                        }}
                      />
                      {state.photos.length > 0 && (
                        <p className="text-xs text-graphite/75 mt-2">
                          {state.photos.length} file selezionat{state.photos.length === 1 ? 'o' : 'i'} — li invierai a
                          fine invio via WhatsApp o email.
                        </p>
                      )}
                    </div>

                    <div className="mt-6 flex items-center justify-between">
                      <button type="button" onClick={() => goToStep(4)} className={ghostBtn}>
                        {IconArrowLeft} Indietro
                      </button>
                      <button
                        type="button"
                        onClick={() => goToStep('summary')}
                        disabled={!step5Ready}
                        aria-disabled={!step5Ready}
                        className={primaryBtn}
                        style={{ backgroundColor: '#F4BE12', color: '#1E2A2E' }}
                      >
                        Vedi riepilogo {IconArrowRight}
                      </button>
                    </div>
                  </div>
                )}

                {/* ─── RIEPILOGO ─────────────────────────── */}
                {step === 'summary' && (
                  <div className="motion-safe:animate-[fadeIn_.15s_ease-out]">
                    <p className="font-extrabold text-graphite text-base mb-1">Ecco cosa abbiamo raccolto</p>
                    <p className="text-xs text-graphite/75 mb-5">
                      Rif. <strong>{leadId}</strong>. Puoi modificare qualsiasi risposta.
                    </p>

                    <ul className="space-y-3 mb-5">
                      <SummaryRow label="Lavoro" value={effectiveServiceLabel} onEdit={() => goToStep(1)} />
                      <SummaryRow label="Zona" value={state.city} onEdit={() => goToStep(2)} />
                      <SummaryRow
                        label="Metratura"
                        value={state.size === 'unknown' || !state.size ? 'Da definire' : `${state.size} mq`}
                        onEdit={() => goToStep(3)}
                      />
                      <SummaryRow label="Situazione" value={state.description} onEdit={() => goToStep(4)} />
                      <SummaryRow
                        label="Tempistica"
                        value={state.timing + (state.timingNote ? ' — ' + state.timingNote : '')}
                        onEdit={() => goToStep(5)}
                      />
                    </ul>

                    {/* Stima AI */}
                    <div
                      className="rounded-xl overflow-hidden mb-4"
                      style={{ border: '1px solid rgba(184,138,50,0.30)' }}
                    >
                      {/* Header badge AI */}
                      <div
                        className="flex items-center gap-2 px-4 py-2.5"
                        style={{ backgroundColor: 'rgba(30,42,46,0.08)', borderBottom: '1px solid rgba(184,138,50,0.18)' }}
                      >
                        <svg className="w-3.5 h-3.5 flex-shrink-0" fill="none" stroke="#B88A32" viewBox="0 0 24 24" aria-hidden>
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                        </svg>
                        <span className="text-[10px] font-bold uppercase tracking-[0.18em]" style={{ color: '#B88A32' }}>
                          Stima generata dall&apos;AI
                        </span>
                      </div>

                      {/* Corpo stima */}
                      <div className="p-4 text-center" style={{ backgroundColor: '#1E2A2E' }}>
                        {estimating ? (
                          <div className="flex flex-col items-center gap-2 py-3">
                            <div className="flex items-center gap-2 text-white/80 text-sm">
                              <span style={{ color: '#F4BE12' }}>{IconSpinner}</span>
                              L&apos;AI sta analizzando le tue informazioni…
                            </div>
                            <p className="text-[11px]" style={{ color: 'rgba(248,248,245,0.75)' }}>
                              Elaborazione in corso, un momento.
                            </p>
                          </div>
                        ) : estimate ? (
                          <>
                            <p className="text-[10px] uppercase tracking-[0.2em] mb-2" style={{ color: 'rgba(248,248,245,0.75)' }}>
                              Fascia orientativa stimata dall&apos;AI
                            </p>
                            <p className="font-extrabold" style={{ fontSize: '1.7rem', color: '#F4BE12', lineHeight: 1.1 }}>
                              {formatEur(estimate.minTotal)}&nbsp;–&nbsp;{formatEur(estimate.maxTotal)}
                            </p>
                            <div className="mt-3 pt-3" style={{ borderTop: '1px solid rgba(248,248,245,0.08)' }}>
                              <p className="text-[11px] leading-relaxed" style={{ color: 'rgba(248,248,245,0.75)' }}>
                                Questa stima è prodotta dall&apos;AI sulla base dei dati che hai fornito.
                                Il costo reale dipende da difficoltà tecniche, condizioni dell&apos;immobile,
                                materiali scelti e accessi al cantiere. Il preventivo definitivo viene
                                stabilito dopo sopralluogo gratuito.
                              </p>
                            </div>
                          </>
                        ) : (
                          <div className="py-2">
                            <p className="text-sm mb-1" style={{ color: 'rgba(248,248,245,0.85)' }}>
                              Non è stato possibile produrre una stima automatica.
                            </p>
                            <p className="text-[11px]" style={{ color: 'rgba(248,248,245,0.75)' }}>
                              Riceverai una valutazione personalizzata entro 24 ore dopo aver inviato la richiesta.
                            </p>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <button type="button" onClick={() => goToStep(5)} className={ghostBtn}>
                        {IconArrowLeft} Torna alle domande
                      </button>
                      <button
                        type="button"
                        onClick={() => goToStep('contact')}
                        className={primaryBtn}
                        style={{ backgroundColor: '#F4BE12', color: '#1E2A2E' }}
                      >
                        Continua {IconArrowRight}
                      </button>
                    </div>
                  </div>
                )}

                {/* ─── FORM CONTATTI ─────────────────────── */}
                {step === 'contact' && (
                  <form onSubmit={submitLead} noValidate className="motion-safe:animate-[fadeIn_.15s_ease-out]">
                    <p className="font-extrabold text-graphite text-base mb-1">
                      Come possiamo ricontattarti?
                    </p>
                    <p className="text-xs text-graphite/75 mb-5">
                      Ti mandiamo il riepilogo e concordiamo un sopralluogo gratuito.
                    </p>

                    <div className="space-y-3">
                      <div>
                        <label htmlFor="qw-name" className="block text-xs font-semibold text-graphite/75 mb-1.5 uppercase tracking-wide">
                          Nome <span className="text-red-500">*</span>
                        </label>
                        <input
                          id="qw-name"
                          type="text"
                          data-autofocus="true"
                          required
                          autoComplete="name"
                          value={name}
                          onChange={e => setName(e.target.value)}
                          placeholder="Mario Rossi"
                          className={inputCls}
                        />
                      </div>

                      <div>
                        <label htmlFor="qw-phone" className="block text-xs font-semibold text-graphite/75 mb-1.5 uppercase tracking-wide">
                          Telefono <span className="text-red-500">*</span>
                        </label>
                        <input
                          id="qw-phone"
                          type="tel"
                          required
                          autoComplete="tel"
                          value={phone}
                          onChange={e => setPhone(e.target.value)}
                          placeholder="+39 344 461 9461"
                          className={inputCls}
                        />
                        <p className="text-[11px] text-graphite/75 mt-1.5 leading-relaxed">
                          Usiamo il tuo numero solo per contattarti riguardo a questa richiesta.
                        </p>
                      </div>

                      <div>
                        <label htmlFor="qw-email" className="block text-xs font-semibold text-graphite/75 mb-1.5 uppercase tracking-wide">
                          Email <span className="font-normal normal-case text-graphite/75">— facoltativa</span>
                        </label>
                        <input
                          id="qw-email"
                          type="email"
                          autoComplete="email"
                          value={email}
                          onChange={e => setEmail(e.target.value)}
                          placeholder="mario@email.it"
                          className={inputCls}
                        />
                      </div>

                      <fieldset className="pt-1">
                        <legend className="block text-xs font-semibold text-graphite/75 mb-2 uppercase tracking-wide">
                          Metodo di contatto preferito
                        </legend>
                        <div className="grid grid-cols-3 gap-2">
                          {[
                            { id: 'phone' as ContactMethod, label: 'Telefono' },
                            { id: 'whatsapp' as ContactMethod, label: 'WhatsApp' },
                            { id: 'email' as ContactMethod, label: 'Email' },
                          ].map(m => {
                            const active = contactMethod === m.id
                            return (
                              <label
                                key={m.id}
                                className="cursor-pointer text-center text-xs px-3 py-2.5 rounded-xl border font-semibold transition-all focus-within:ring-2 focus-within:ring-teal/40 min-h-[44px] flex items-center justify-center"
                                style={{
                                  borderColor: active ? '#1F4852' : '#ECEDE9',
                                  backgroundColor: active ? '#1F4852' : 'white',
                                  color: active ? 'white' : '#1E2A2E',
                                }}
                              >
                                <input
                                  type="radio"
                                  name="contact-method"
                                  value={m.id}
                                  checked={active}
                                  onChange={() => setContactMethod(m.id)}
                                  className="sr-only"
                                />
                                {m.label}
                              </label>
                            )
                          })}
                        </div>
                      </fieldset>

                      <div className="space-y-2.5 pt-2">
                        <label className="flex items-start gap-2.5 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={privacyOk}
                            onChange={e => setPrivacyOk(e.target.checked)}
                            required
                            className="mt-0.5 w-4 h-4 accent-teal cursor-pointer flex-shrink-0"
                          />
                          <span className="text-xs text-graphite/70 leading-relaxed">
                            Ho letto e accetto l’
                            <a
                              href="/privacy-policy"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="underline underline-offset-2 text-teal hover:text-teal-dark"
                            >
                              informativa privacy
                            </a>{' '}
                            <span className="text-red-500">*</span>
                          </span>
                        </label>
                      </div>

                      {formError && (
                        <p
                          role="alert"
                          aria-describedby={statusId}
                          className="text-xs text-red-600 bg-red-50 rounded-lg px-3 py-2 border border-red-100"
                        >
                          {formError}
                        </p>
                      )}

                      <p className="text-[11px] text-graphite/75 leading-relaxed italic">
                        La stima è indicativa. Il preventivo definitivo può richiedere una verifica tecnica o un
                        sopralluogo.
                      </p>

                      <button
                        type="submit"
                        disabled={submitting}
                        className={primaryBtn + ' w-full py-3.5 mt-1'}
                        style={{ backgroundColor: '#F4BE12', color: '#1E2A2E' }}
                      >
                        {submitting ? (
                          <>
                            {IconSpinner} Invio in corso…
                          </>
                        ) : (
                          <>Ricevi la tua stima {IconArrowRight}</>
                        )}
                      </button>
                      <p className="text-center text-[11px] text-graphite/75 mt-1">
                        Risposta entro poche ore · Nessun impegno
                      </p>

                      <div className="text-center pt-1">
                        <a
                          href={whatsappUrl(buildWhatsAppMessage())}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label="Richiedi un preventivo su WhatsApp"
                          className="text-xs font-semibold text-graphite/75 hover:text-teal transition-colors underline underline-offset-4"
                        >
                          Preferisci parlarne con noi? → Contattaci su WhatsApp
                        </a>
                      </div>

                      <div className="flex items-center justify-center pt-1">
                        <button type="button" onClick={() => goToStep('summary')} className={ghostBtn}>
                          {IconArrowLeft} Torna al riepilogo
                        </button>
                      </div>
                    </div>
                  </form>
                )}

                {/* ─── SUCCESSO ────────────────────────── */}
                {step === 'sent' && (
                  <div className="text-center py-4 motion-safe:animate-[fadeIn_.2s_ease-out]">
                    <div
                      className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4"
                      style={{ backgroundColor: '#1F4852', color: '#F4BE12' }}
                      aria-hidden
                    >
                      <svg viewBox="0 0 24 24" width="26" height="26" {...stroke}>
                        <path d="M5 12l5 5L20 6" />
                      </svg>
                    </div>
                    <p className="font-extrabold text-graphite text-lg mb-1">Richiesta inviata!</p>
                    <p className="text-sm text-graphite/75 mb-1">
                      Ti contatteremo al numero inserito per concordare il sopralluogo gratuito.
                    </p>
                    <p className="text-xs text-graphite/75 mb-1">
                      Il sopralluogo è gratuito, senza impegno e senza burocrazia.
                    </p>
                    <p className="text-xs text-graphite/75 mb-5">
                      Rif. <strong>{leadId}</strong>
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      <a
                        href={whatsappUrl(buildWhatsAppMessage())}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl border font-semibold text-sm text-graphite hover:border-teal transition-colors"
                        style={{ borderColor: '#ECEDE9' }}
                      >
                        Conferma su WhatsApp
                      </a>
                      <a
                        href={`tel:${business.phone.primaryRaw}`}
                        className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-semibold text-sm"
                        style={{ backgroundColor: '#1F4852', color: 'white' }}
                      >
                        Chiama {business.phone.primary}
                      </a>
                    </div>
                  </div>
                )}

                {/* ─── ERRORE ─────────────────────────── */}
                {step === 'error' && (
                  <div className="motion-safe:animate-[fadeIn_.15s_ease-out]">
                    <p className="font-extrabold text-graphite text-base mb-1">
                      Non siamo riusciti a completare la richiesta.
                    </p>
                    <p className="text-sm text-graphite/75 mb-4">
                      Riprova oppure contattaci direttamente — le tue risposte sono state conservate.
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-3">
                      <a
                        href={whatsappUrl(buildWhatsAppMessage())}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-semibold text-sm"
                        style={{ backgroundColor: '#25D366', color: 'white' }}
                      >
                        Scrivi su WhatsApp
                      </a>
                      <a
                        href={`tel:${business.phone.primaryRaw}`}
                        className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl border font-semibold text-sm text-graphite hover:border-teal transition-colors"
                        style={{ borderColor: '#ECEDE9' }}
                      >
                        Chiama {business.phone.primary}
                      </a>
                    </div>

                    <button
                      type="button"
                      onClick={() => goToStep('contact')}
                      className={primaryBtn + ' w-full'}
                      style={{ backgroundColor: '#F4BE12', color: '#1E2A2E' }}
                    >
                      Riprova l’invio
                    </button>
                  </div>
                )}
              </div>
            </div>
      {/* /modulo */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateX(8px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </>
  )
}

/* ─────────────────────────────────────────────────────────────
   Sotto-componente: riga del riepilogo
   ───────────────────────────────────────────────────────────── */

function SummaryRow({
  label,
  value,
  onEdit,
}: {
  label: string
  value: string
  onEdit: () => void
}) {
  return (
    <li className="flex items-start justify-between gap-3 py-2 border-b" style={{ borderColor: '#ECEDE9' }}>
      <div className="min-w-0">
        <p className="text-[10px] font-bold uppercase tracking-wide text-graphite/75">{label}</p>
        <p className="text-sm text-graphite mt-0.5 break-words">{value || '—'}</p>
      </div>
      <button
        type="button"
        onClick={onEdit}
        className="text-xs font-semibold text-teal hover:text-teal-dark underline underline-offset-4 whitespace-nowrap focus:outline-none focus-visible:ring-2 focus-visible:ring-teal/40 rounded"
      >
        Modifica
      </button>
    </li>
  )
}
