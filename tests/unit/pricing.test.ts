import { PRICING, calculateEstimate } from '@/config/pricing'
import { services } from '@/data/services'

// ── Valori attesi (fonte di verità per le correzioni Stage 1) ─────────────────

const EXPECTED_RANGES: Record<string, { min: number; max: number }> = {
  bagno_piccolo:             { min: 5000, max: 6000  },
  bagno_grande:              { min: 9500, max: 11000 },
  pavimento:                 { min: 35,   max: 70    },
  impianto_idraulico:        { min: 4000, max: 9000  },
  impianto_elettrico:        { min: 3500, max: 8000  },
  rivestimenti:              { min: 35,   max: 70    },
  ristrutturazione_completa: { min: 500,  max: 900   },
  cappotto:                  { min: 80,   max: 150   },
  tinteggiatura:             { min: 8,    max: 18    },
  infissi:                   { min: 400,  max: 800   },
}

const COMPLEXITIES = ['base', 'medium', 'high'] as const

// ── Valori in PRICING ─────────────────────────────────────────────────────────

describe('config/pricing.ts — valori corretti', () => {
  test('tutte e 10 le chiavi attese sono presenti', () => {
    expect(Object.keys(PRICING).sort()).toEqual(Object.keys(EXPECTED_RANGES).sort())
  })

  test.each(Object.entries(EXPECTED_RANGES))(
    'servizio "%s" — minPerUnit e maxPerUnit corretti',
    (key, { min, max }) => {
      expect(PRICING[key]?.minPerUnit).toBe(min)
      expect(PRICING[key]?.maxPerUnit).toBe(max)
    }
  )

  test.each(Object.keys(EXPECTED_RANGES))(
    'servizio "%s" — minPerUnit < maxPerUnit',
    (key) => {
      expect(PRICING[key].minPerUnit).toBeLessThan(PRICING[key].maxPerUnit)
    }
  )

  test('tutti i servizi hanno id, label, unit e notes non vuoti', () => {
    for (const p of Object.values(PRICING)) {
      expect(p.id).toBeTruthy()
      expect(p.label.length).toBeGreaterThan(3)
      expect(['mq', 'forfait', 'punto_luce', 'stanza']).toContain(p.unit)
      expect(p.notes.length).toBeGreaterThan(10)
    }
  })
})

// ── calculateEstimate — output sempre entro fascia dichiarata ─────────────────

describe('calculateEstimate — output sempre entro fascia dichiarata', () => {
  const MQ_QUANTITIES = [10, 35, 75, 150]

  for (const [key, pricing] of Object.entries(PRICING)) {
    const quantities = pricing.unit === 'mq' ? MQ_QUANTITIES : [1]

    for (const qty of quantities) {
      for (const complexity of COMPLEXITIES) {
        test(`${key} | qty=${qty} | ${complexity} → in [min×q, max×q], min≤max, no NaN`, () => {
          const r = calculateEstimate(key, qty, complexity)
          expect(r).not.toBeNull()
          if (!r) return

          const declaredMin = pricing.minPerUnit * qty
          const declaredMax = pricing.maxPerUnit * qty

          expect(isNaN(r.minTotal)).toBe(false)
          expect(isNaN(r.maxTotal)).toBe(false)
          expect(r.minTotal).toBeGreaterThan(0)
          expect(r.maxTotal).toBeGreaterThan(0)
          expect(r.minTotal).toBeGreaterThanOrEqual(declaredMin)
          expect(r.maxTotal).toBeLessThanOrEqual(declaredMax)
          expect(r.minTotal).toBeLessThanOrEqual(r.maxTotal)
        })
      }
    }
  }

  test('servizio inesistente restituisce null', () => {
    expect(calculateEstimate('non_esiste', 50, 'base')).toBeNull()
  })

  test('complessità base ≤ medium ≤ high (finestre monotone)', () => {
    for (const key of Object.keys(PRICING)) {
      const qty = PRICING[key].unit === 'mq' ? 50 : 1
      const b = calculateEstimate(key, qty, 'base')!
      const m = calculateEstimate(key, qty, 'medium')!
      const h = calculateEstimate(key, qty, 'high')!

      expect(b.minTotal).toBeLessThanOrEqual(m.minTotal)
      expect(m.minTotal).toBeLessThanOrEqual(h.minTotal)
      expect(b.maxTotal).toBeLessThanOrEqual(m.maxTotal)
      expect(m.maxTotal).toBeLessThanOrEqual(h.maxTotal)
    }
  })

  test('high complexity produce il massimo dichiarato (maxTotal = maxPerUnit × qty)', () => {
    for (const key of Object.keys(PRICING)) {
      const qty = PRICING[key].unit === 'mq' ? 50 : 1
      const h = calculateEstimate(key, qty, 'high')!
      expect(h.maxTotal).toBe(PRICING[key].maxPerUnit * qty)
    }
  })

  test('base complexity parte dal minimo dichiarato (minTotal = minPerUnit × qty)', () => {
    for (const key of Object.keys(PRICING)) {
      const qty = PRICING[key].unit === 'mq' ? 50 : 1
      const b = calculateEstimate(key, qty, 'base')!
      expect(b.minTotal).toBe(PRICING[key].minPerUnit * qty)
    }
  })
})

// ── services.ts — coerenza con pricing.ts ────────────────────────────────────

describe('services.ts — pricingRef valido in PRICING', () => {
  const servicesWithRef = services.filter(s => s.pricingRef)

  test('almeno 6 servizi hanno pricingRef', () => {
    expect(servicesWithRef.length).toBeGreaterThanOrEqual(6)
  })

  test.each(servicesWithRef)(
    'servizio "$name" — pricingRef "$pricingRef" esiste in PRICING',
    (s) => {
      expect(PRICING[s.pricingRef!]).toBeDefined()
    }
  )
})
