import { SERVICE_SLUG_MAP } from '@/config/wizard'
import { PRICING } from '@/config/pricing'
import { services } from '@/data/services'

// ID validi nel wizard (sincronizzare con SERVICES in QuoteWizard.tsx)
const WIZARD_SERVICE_IDS = new Set([
  'ristrutturazione_completa',
  'bagno_piccolo',
  'pavimento',
  'tinteggiatura',
  'impianto_idraulico',
  'impianto_elettrico',
  'infissi',
  'cappotto',
  'altro',
])

// ── Struttura della mappa ─────────────────────────────────────────────────────

describe('SERVICE_SLUG_MAP — struttura', () => {
  test('esattamente 8 slug mappati (tutti i servizi reali, senza "altro")', () => {
    expect(Object.keys(SERVICE_SLUG_MAP).length).toBe(8)
  })

  test('nessuna chiave vuota o undefined', () => {
    for (const [slug, id] of Object.entries(SERVICE_SLUG_MAP)) {
      expect(slug.length).toBeGreaterThan(0)
      expect(id.length).toBeGreaterThan(0)
    }
  })
})

// ── Coerenza con data/services.ts ────────────────────────────────────────────

describe('SERVICE_SLUG_MAP — coerenza con services.ts', () => {
  const serviceSlugSet = new Set(services.map(s => s.slug))

  test.each(Object.entries(SERVICE_SLUG_MAP))(
    'slug "%s" esiste in data/services.ts',
    (slug) => {
      expect(serviceSlugSet.has(slug)).toBe(true)
    }
  )

  test('tutti i servizi con pricingRef hanno una voce nella mappa', () => {
    const mappedSlugs = new Set(Object.keys(SERVICE_SLUG_MAP))
    const servicesWithRef = services.filter(s => s.pricingRef)
    for (const s of servicesWithRef) {
      expect(mappedSlugs.has(s.slug)).toBe(true)
    }
  })
})

// ── Coerenza con config/pricing.ts ───────────────────────────────────────────

describe('SERVICE_SLUG_MAP — coerenza con pricing.ts', () => {
  test.each(Object.entries(SERVICE_SLUG_MAP))(
    'slug "%s" mappa a serviceId "%s" che esiste in PRICING',
    (_, serviceId) => {
      expect(PRICING[serviceId]).toBeDefined()
    }
  )
})

// ── Coerenza con wizard SERVICES array ───────────────────────────────────────

describe('SERVICE_SLUG_MAP — coerenza con wizard SERVICES', () => {
  test.each(Object.entries(SERVICE_SLUG_MAP))(
    'serviceId "%s" (da slug "%s") è presente nei pulsanti del wizard',
    (_, serviceId) => {
      expect(WIZARD_SERVICE_IDS.has(serviceId)).toBe(true)
    }
  )
})

// ── Robustezza — input invalidi ───────────────────────────────────────────────

describe('SERVICE_SLUG_MAP — slug invalidi restituiscono undefined', () => {
  const invalidSlugs = ['', 'non-esiste', 'altro', '123', 'RISTRUTTURAZIONE', '  ', '/servizi/bagno']

  test.each(invalidSlugs)(
    'slug invalido "%s" → undefined (no preselection, no crash)',
    (slug) => {
      expect(SERVICE_SLUG_MAP[slug]).toBeUndefined()
    }
  )
})

// ── Copertura bidirezionale ───────────────────────────────────────────────────

describe('SERVICE_SLUG_MAP — copertura bidirezionale', () => {
  test('ogni pricingRef nei servizi public è coperto dalla mappa', () => {
    const mappedServiceIds = new Set(Object.values(SERVICE_SLUG_MAP))
    const servicesWithRef = services.filter(s => s.pricingRef)
    for (const s of servicesWithRef) {
      expect(mappedServiceIds.has(s.pricingRef!)).toBe(true)
    }
  })

  test('tutti i serviceId mappati esistono sia in PRICING sia nel wizard', () => {
    for (const serviceId of Object.values(SERVICE_SLUG_MAP)) {
      expect(PRICING[serviceId]).toBeDefined()
      expect(WIZARD_SERVICE_IDS.has(serviceId)).toBe(true)
    }
  })
})
