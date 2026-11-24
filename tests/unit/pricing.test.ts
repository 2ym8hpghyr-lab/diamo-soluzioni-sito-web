import { PRICING, calculateEstimate, estimateForSize } from '@/config/pricing'
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
  tinteggiatura:             { min: 10,   max: 25    },
  infissi:                   { min: 550,  max: 1300  },
}

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

// ── calculateEstimate — sempre la fascia pubblica completa ────────────────────

describe('calculateEstimate — fascia pubblica completa × quantità', () => {
  for (const [key, pricing] of Object.entries(PRICING)) {
    const quantities = pricing.unit === 'mq' ? [10, 35, 75, 150] : [1]
    for (const qty of quantities) {
      test(`${key} | qty=${qty}`, () => {
        const r = calculateEstimate(key, qty)!
        expect(r.minTotal).toBe(pricing.minPerUnit * qty)
        expect(r.maxTotal).toBe(pricing.maxPerUnit * qty)
      })
    }
  }

  test('servizio inesistente restituisce null', () => {
    expect(calculateEstimate('non_esiste', 50)).toBeNull()
  })
})

describe('estimateForSize — regole del wizard', () => {
  const range = (id: string, size: number) => {
    const r = estimateForSize(id, size)
    return r && [r.minTotal, r.maxTotal]
  }

  test.each([
    ['bagno_piccolo', 5, [5000, 6000]],
    ['bagno_piccolo', 6, [5000, 6000]],
    ['bagno_piccolo', 8, [9500, 11000]],
    ['bagno_piccolo', 12, [9500, 11000]],
    ['bagno_piccolo', 15, [5000, 11000]],
    ['bagno_piccolo', 0, [5000, 11000]],
    ['impianto_elettrico', 150, [3500, 8000]],
    ['impianto_idraulico', 0, [4000, 9000]],
    ['infissi', 0, [550, 1300]],
    ['infissi', 1, [550, 1300]],
    ['infissi', 4, [2200, 5200]],
    ['tinteggiatura', 100, [1000, 2500]],
    ['pavimento', 35, [1225, 2450]],
  ])('%s, %i mq', (id, size, expected) => {
    expect(range(id as string, size as number)).toEqual(expected)
  })

  test('prezzo al mq senza metratura: nessuna stima inventata', () => {
    expect(estimateForSize('tinteggiatura', 0)).toBeNull()
    expect(estimateForSize('cappotto', 0)).toBeNull()
  })

  test('troppe finestre: serve un preventivo su misura', () => {
    expect(estimateForSize('infissi', 80)).toBeNull()
  })

  test('servizio non a listino', () => {
    expect(estimateForSize('altro', 80)).toBeNull()
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
