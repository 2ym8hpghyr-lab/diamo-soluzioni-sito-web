// Prezzi ricavati da 38 preventivi reali emessi da Diamo Soluzioni.
// Regola range: min = prezzo reale × 0.85 | max = prezzo reale.

export type PricingUnit = 'mq' | 'forfait' | 'punto_luce' | 'stanza'

export interface ServicePricing {
  id: string
  label: string
  unit: PricingUnit
  minPerUnit: number
  maxPerUnit: number
  notes: string
  complexityMultipliers: {
    base: number      // lavoro standard
    medium: number    // modifiche impianti / finiture premium
    high: number      // ristrutturazione totale / materiali pregio
  }
}

export const PRICING: Record<string, ServicePricing> = {
  bagno_piccolo: {
    id: 'bagno_piccolo',
    label: 'Rifacimento bagno (fino 6 mq)',
    unit: 'forfait',
    minPerUnit: 5000,
    maxPerUnit: 6000,
    notes: 'Include demolizioni, impianto idraulico, posa rivestimenti, sanitari, finiture. Fonte: preventivo bagno completo €6.000.',
    complexityMultipliers: { base: 1, medium: 1.3, high: 1.7 },
  },
  bagno_grande: {
    id: 'bagno_grande',
    label: 'Rifacimento bagno (6–12 mq)',
    unit: 'forfait',
    minPerUnit: 9500,
    maxPerUnit: 11000,
    notes: 'Include demolizioni, impianto idraulico, posa rivestimenti, sanitari, finiture. Fonte: preventivo 2 bagni+impianti+piastrellatura €22.000 (×3 conferme) → €11.000/bagno.',
    complexityMultipliers: { base: 1, medium: 1.3, high: 1.7 },
  },
  pavimento: {
    id: 'pavimento',
    label: 'Pavimentazione (posa + materiale base)',
    unit: 'mq',
    minPerUnit: 35,
    maxPerUnit: 75,
    notes: 'Base: posa semplice (PVC o ceramica). Alto: demolizione+massetto+impermeabilizzazione. Fonte: €3.400 per rimozione+posa+guaina (×2 conferme).',
    complexityMultipliers: { base: 1, medium: 1.5, high: 2.5 },
  },
  impianto_idraulico: {
    id: 'impianto_idraulico',
    label: 'Sostituzione impianto idraulico',
    unit: 'forfait',
    minPerUnit: 1800,
    maxPerUnit: 5000,
    notes: 'Fonte: riparazione idraulica €1.800. Sostituzione completa stimata fino a €5.000.',
    complexityMultipliers: { base: 1, medium: 1.3, high: 1.6 },
  },
  impianto_elettrico: {
    id: 'impianto_elettrico',
    label: 'Rifacimento impianto elettrico',
    unit: 'forfait',
    minPerUnit: 2500,
    maxPerUnit: 6000,
    notes: 'Include quadro, cavi, punti luce, prese. Variabile per metratura.',
    complexityMultipliers: { base: 1, medium: 1.3, high: 1.6 },
  },
  rivestimenti: {
    id: 'rivestimenti',
    label: 'Posa piastrelle e rivestimenti',
    unit: 'mq',
    minPerUnit: 35,
    maxPerUnit: 75,
    notes: 'Posa con materiali base. Formati grandi o rivestimenti speciali: range superiore. Allineato a pavimento.',
    complexityMultipliers: { base: 1, medium: 1.3, high: 1.8 },
  },
  ristrutturazione_completa: {
    id: 'ristrutturazione_completa',
    label: 'Ristrutturazione completa appartamento',
    unit: 'mq',
    minPerUnit: 300,
    maxPerUnit: 550,
    notes: 'Include impianti, pavimenti, finiture, pittura. Escluso arredamento. Fonte: €20.000 (Comazzo), €40.000 (Gessate), €54.000 (full scope).',
    complexityMultipliers: { base: 1, medium: 1.3, high: 1.6 },
  },
  cappotto: {
    id: 'cappotto',
    label: 'Cappotto termico (facciata)',
    unit: 'mq',
    minPerUnit: 80,
    maxPerUnit: 180,
    notes: 'Include isolante, rasatura, finitura. Varia per spessore e altezza.',
    complexityMultipliers: { base: 1, medium: 1.2, high: 1.5 },
  },
  tinteggiatura: {
    id: 'tinteggiatura',
    label: 'Tinteggiatura interni',
    unit: 'mq',
    minPerUnit: 9,
    maxPerUnit: 10,
    notes: 'Base: solo pittura €10/mq. Medio: rasatura+pittura €22/mq. Alto: rimozione carta da parati+rasatura+pittura €25/mq. Fonte: preventivi reali (×3 conferme).',
    complexityMultipliers: { base: 1, medium: 2.2, high: 2.5 },
  },
  infissi: {
    id: 'infissi',
    label: 'Sostituzione infissi (per finestra)',
    unit: 'forfait',
    minPerUnit: 640,
    maxPerUnit: 750,
    notes: 'Fonte: preventivo 2 finestre = €1.500 → €750/finestra.',
    complexityMultipliers: { base: 1, medium: 1.3, high: 1.8 },
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

export function calculateEstimate(
  serviceId: string,
  quantity: number,
  complexity: 'base' | 'medium' | 'high' = 'base'
): EstimateResult | null {
  const pricing = PRICING[serviceId]
  if (!pricing) return null

  const multiplier = pricing.complexityMultipliers[complexity]
  const minTotal = Math.round(pricing.minPerUnit * quantity * multiplier)
  const maxTotal = Math.round(pricing.maxPerUnit * quantity * multiplier)

  return {
    serviceId,
    serviceLabel: pricing.label,
    quantity,
    unit: pricing.unit,
    complexity,
    minTotal,
    maxTotal,
    disclaimer:
      'La stima è orientativa e non costituisce un preventivo contrattuale. Il prezzo definitivo viene stabilito dopo sopralluogo gratuito e verifica tecnica in loco.',
  }
}

export function formatEur(amount: number): string {
  return new Intl.NumberFormat('it-IT', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(
    amount
  )
}
