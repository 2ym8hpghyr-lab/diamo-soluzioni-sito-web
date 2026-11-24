// Sorgente unica e tipizzata per tutti i prezzi Diamo Soluzioni.
// services.ts usa pricingRef per collegare ogni servizio a questa tabella.
// Ogni modifica qui si riflette automaticamente su stima, ESTIMATE_SYSTEM e test.

export type PricingUnit = 'mq' | 'forfait' | 'punto_luce' | 'stanza'

export interface ServicePricing {
  id: string
  label: string
  unit: PricingUnit
  /** Prezzo minimo per unità, IVA esclusa (lavoro semplice) */
  minPerUnit: number
  /** Prezzo massimo per unità, IVA esclusa (lavoro complesso) */
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
    notes: 'Include demolizioni, tracce impianti, impermeabilizzazione, posa rivestimenti, finiture. Piastrelle e sanitari da definire nel preventivo. Fonte: preventivo bagno completo €6.000 + IVA.',
  },
  bagno_grande: {
    id: 'bagno_grande',
    label: 'Rifacimento bagno (6–12 mq)',
    unit: 'forfait',
    minPerUnit: 9500,
    maxPerUnit: 11000,
    notes: 'Include demolizioni, tracce impianti, posa rivestimenti, finiture. Piastrelle e sanitari da definire nel preventivo. Fonte: preventivo 2 bagni+impianti+piastrellatura €22.000 (×3 conferme) → €11.000/bagno.',
  },
  pavimento: {
    id: 'pavimento',
    label: 'Pavimentazione (sola posa, materiale escluso)',
    unit: 'mq',
    minPerUnit: 35,
    maxPerUnit: 70,
    notes: 'Sola posa, come nel priceNote pubblico. Rifacimento con demolizione, massetto, impermeabilizzazione e gres: preventivo reale €3.400 per 20–30 mq (×2 conferme), cioè 113–170 €/mq; Prezzario Lombardia 2026 117,85 €/mq.',
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
    notes: 'Sola posa, materiale escluso. Formati grandi o rivestimenti speciali: range superiore. Allineato a pavimento.',
  },
  ristrutturazione_completa: {
    id: 'ristrutturazione_completa',
    label: 'Ristrutturazione completa appartamento',
    unit: 'mq',
    minPerUnit: 500,
    maxPerUnit: 900,
    notes: 'Include impianti, pavimenti, finiture, pittura. Escluso arredamento. Fonte: €20.000 (Comazzo ~40 mq), €40.000 (Gessate ~55 mq), €54.000 (full scope ~70 mq), €38.000 + IVA (~70 mq): 500–771 €/mq.',
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
    minPerUnit: 10,
    maxPerUnit: 25,
    notes: 'Per mq di superficie tinteggiata. Preventivi reali (×3 conferme): pittura 10 €/mq, colori speciali 11–13, rasatura+pittura 22, rimozione carta da parati+rasatura+pittura 25. Prezzario Lombardia 2026: 10,25 e 24,92 €/mq. Allineato al priceNote pubblico.',
  },
  infissi: {
    id: 'infissi',
    label: 'Sostituzione infissi (per finestra in PVC a una o due ante)',
    unit: 'forfait',
    minPerUnit: 550,
    maxPerUnit: 1300,
    notes: 'PVC standard fornitura e posa, IVA esclusa: 550–850 € a un\'anta, 850–1.300 € a due ante. Fonti (24/11/2026): preventivo reale 2 finestre = €1.500 → €750/finestra; Prezzario Lombardia 2026 LOM261 Pa02.C3330.D0017.0000 = 614,72 €/mq; confronto di mercato. Portefinestre e alluminio a taglio termico: fuori fascia. Allineato al priceNote pubblico.',
  },
}

export type PricingKey = keyof typeof PRICING

/** Bagno: la taglia decide la fascia. Metratura ignota o riferita alla casa intera → fascia completa. */
const BATHROOM_SMALL_MAX_MQ = 6
const BATHROOM_LARGE_MAX_MQ = 12
/** Oltre questo numero serve un preventivo su misura */
const MAX_WINDOWS = 50

export interface EstimateResult {
  serviceId: string
  serviceLabel: string
  quantity: number
  unit: PricingUnit
  minTotal: number
  maxTotal: number
  disclaimer: string
}

/**
 * Fascia pubblica completa × quantità.
 * Il wizard non chiede lo stato dell'immobile: restringere la fascia
 * significherebbe mostrare un prezzo più basso di quello dichiarato.
 */
export function calculateEstimate(serviceId: string, quantity: number): EstimateResult | null {
  const pricing = PRICING[serviceId]
  if (!pricing) return null

  return {
    serviceId,
    serviceLabel: pricing.label,
    quantity,
    unit: pricing.unit,
    minTotal: Math.round(pricing.minPerUnit * quantity),
    maxTotal: Math.round(pricing.maxPerUnit * quantity),
    disclaimer:
      'La stima è orientativa, IVA esclusa, e non costituisce un preventivo contrattuale. Il prezzo definitivo viene stabilito dopo sopralluogo gratuito e verifica tecnica in loco.',
  }
}

/**
 * Stima per il wizard. `size` in mq (numero di finestre per gli infissi), 0 se sconosciuta.
 * Restituisce null se il servizio non è a listino o se serve una metratura che manca.
 */
export function estimateForSize(serviceId: string, size: number): EstimateResult | null {
  const pricing = PRICING[serviceId]
  if (!pricing) return null

  if (serviceId === 'bagno_piccolo') {
    const small = calculateEstimate('bagno_piccolo', 1)!
    const large = calculateEstimate('bagno_grande', 1)!
    if (size > 0 && size <= BATHROOM_SMALL_MAX_MQ) return small
    if (size > 0 && size <= BATHROOM_LARGE_MAX_MQ) return large
    return { ...small, serviceLabel: 'Rifacimento bagno', maxTotal: large.maxTotal }
  }

  // Infissi: `size` è il numero di finestre, non i mq
  if (serviceId === 'infissi') {
    const windows = Math.max(1, Math.round(size))
    return windows <= MAX_WINDOWS ? calculateEstimate(serviceId, windows) : null
  }

  // I forfait non si moltiplicano per la metratura
  if (pricing.unit !== 'mq') return calculateEstimate(serviceId, 1)
  return size > 0 ? calculateEstimate(serviceId, size) : null
}

export function formatEur(amount: number): string {
  return new Intl.NumberFormat('it-IT', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0, useGrouping: 'always' } as Intl.NumberFormatOptions).format(
    amount
  )
}
