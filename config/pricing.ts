// Sorgente unica e tipizzata per tutti i prezzi Diamo Soluzioni.
// services.ts usa pricingRef per collegare ogni servizio a questa tabella.
// Ogni modifica qui si riflette automaticamente su stima, ESTIMATE_SYSTEM e test.

export type PricingUnit = 'mq' | 'forfait' | 'punto_luce' | 'stanza'

export interface ServicePricing {
  id: string
  label: string
  unit: PricingUnit
  /** Prezzo minimo per unità (fascia base, lavoro semplice) */
  minPerUnit: number
  /** Prezzo massimo per unità (fascia alta, lavoro complesso) */
  maxPerUnit: number
  notes: string
}

export const PRICING: Record<string, ServicePricing> = {
  bagno_piccolo: {
    id: 'bagno_piccolo',
    label: 'Rifacimento bagno (fino 6 mq)',
    unit: 'forfait',
    minPerUnit: 5000,
    maxPerUnit: 6000,
    notes: 'Include demolizioni, impianto idraulico, posa rivestimenti, sanitari, finiture. Fonte: preventivo bagno completo €6.000.',
  },
  bagno_grande: {
    id: 'bagno_grande',
    label: 'Rifacimento bagno (6–12 mq)',
    unit: 'forfait',
    minPerUnit: 9500,
    maxPerUnit: 11000,
    notes: 'Include demolizioni, impianto idraulico, posa rivestimenti, sanitari, finiture. Fonte: preventivo 2 bagni+impianti+piastrellatura €22.000 (×3 conferme) → €11.000/bagno.',
  },
  pavimento: {
    id: 'pavimento',
    label: 'Pavimentazione (posa + materiale base)',
    unit: 'mq',
    minPerUnit: 35,
    maxPerUnit: 70,
    notes: 'Fascia intera copre da posa semplice (PVC/ceramica) a demolizione+massetto+impermeabilizzazione. Fonte: €3.400 per rimozione+posa+guaina (×2 conferme).',
  },
  impianto_idraulico: {
    id: 'impianto_idraulico',
    label: 'Sostituzione impianto idraulico',
    unit: 'forfait',
    minPerUnit: 4000,
    maxPerUnit: 9000,
    notes: 'Range per appartamento 70–90 mq. Allineato al priceNote pubblico della pagina servizi.',
  },
  impianto_elettrico: {
    id: 'impianto_elettrico',
    label: 'Rifacimento impianto elettrico',
    unit: 'forfait',
    minPerUnit: 3500,
    maxPerUnit: 8000,
    notes: 'Include quadro, cavi, punti luce, prese. Range per appartamento 70–90 mq. Allineato al priceNote pubblico.',
  },
  rivestimenti: {
    id: 'rivestimenti',
    label: 'Posa piastrelle e rivestimenti',
    unit: 'mq',
    minPerUnit: 35,
    maxPerUnit: 70,
    notes: 'Posa con materiali base. Formati grandi o rivestimenti speciali: range superiore. Allineato a pavimento.',
  },
  ristrutturazione_completa: {
    id: 'ristrutturazione_completa',
    label: 'Ristrutturazione completa appartamento',
    unit: 'mq',
    minPerUnit: 500,
    maxPerUnit: 900,
    notes: 'Include impianti, pavimenti, finiture, pittura. Escluso arredamento. Fonte: €20.000 (Comazzo ~40 mq), €40.000 (Gessate ~55 mq), €54.000 (full scope ~70 mq).',
  },
  cappotto: {
    id: 'cappotto',
    label: 'Cappotto termico (facciata)',
    unit: 'mq',
    minPerUnit: 80,
    maxPerUnit: 150,
    notes: 'Include isolante, rasatura, finitura. Varia per spessore e altezza. Allineato al priceNote pubblico.',
  },
  tinteggiatura: {
    id: 'tinteggiatura',
    label: 'Tinteggiatura interni',
    unit: 'mq',
    minPerUnit: 8,
    maxPerUnit: 18,
    notes: 'Fascia intera: da sola pittura (8–12 €/mq) a rasatura+pittura (11–15 €/mq) a rimozione carta da parati+rasatura+pittura (14–18 €/mq). Fonte: preventivi reali (×3 conferme), allineato a priceNote pubblico.',
  },
  infissi: {
    id: 'infissi',
    label: 'Sostituzione infissi (per finestra)',
    unit: 'forfait',
    minPerUnit: 400,
    maxPerUnit: 800,
    notes: 'PVC standard fornitura e posa. Alluminio con taglio termico o su misura: fuori fascia. Allineato al priceNote pubblico.',
  },
}

export type PricingKey = keyof typeof PRICING

export interface EstimateResult {
  serviceId: string
  serviceLabel: string
  quantity: number
  unit: PricingUnit
  complexity: 'base' | 'medium' | 'high'
  minTotal: number
  maxTotal: number
  disclaimer: string
}

/**
 * Calcola la stima posizionando la complessità come finestra scorrevole
 * all'interno di [minPerUnit, maxPerUnit] × quantity.
 * L'output è sempre compreso nella fascia dichiarata pubblica — mai fuori range.
 */
export function calculateEstimate(
  serviceId: string,
  quantity: number,
  complexity: 'base' | 'medium' | 'high' = 'base'
): EstimateResult | null {
  const pricing = PRICING[serviceId]
  if (!pricing) return null

  const lo = pricing.minPerUnit
  const hi = pricing.maxPerUnit
  const span = hi - lo

  // Finestre di complessità — sempre entro [lo, hi]
  let windowMin: number
  let windowMax: number
  switch (complexity) {
    case 'medium':
      windowMin = Math.round(lo + span * 0.3)
      windowMax = Math.round(lo + span * 0.7)
      break
    case 'high':
      windowMin = Math.round(lo + span * 0.6)
      windowMax = hi
      break
    default: // base
      windowMin = lo
      windowMax = Math.round(lo + span * 0.4)
  }

  return {
    serviceId,
    serviceLabel: pricing.label,
    quantity,
    unit: pricing.unit,
    complexity,
    minTotal: Math.round(windowMin * quantity),
    maxTotal: Math.round(windowMax * quantity),
    disclaimer:
      'La stima è orientativa e non costituisce un preventivo contrattuale. Il prezzo definitivo viene stabilito dopo sopralluogo gratuito e verifica tecnica in loco.',
  }
}

export function formatEur(amount: number): string {
  return new Intl.NumberFormat('it-IT', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(
    amount
  )
}
