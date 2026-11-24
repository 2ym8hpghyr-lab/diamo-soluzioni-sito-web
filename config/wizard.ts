// Mappatura stabile: slug pagina servizio → id wizard (chiave di PRICING).
// Usata da QuoteWizard per preselezionare il servizio dal parametro URL ?service=
// e dai test automatici per verificare copertura completa.
export const SERVICE_SLUG_MAP: Record<string, string> = {
  'ristrutturazioni-chiavi-in-mano': 'ristrutturazione_completa',
  'ristrutturazione-bagno':          'bagno_piccolo',
  'pavimentazioni-rivestimenti':     'pavimento',
  'infissi-serramenti':              'infissi',
  'facciate-cappotto-termico':       'cappotto',
  'tinteggiatura':                   'tinteggiatura',
  'impianti-idraulici':              'impianto_idraulico',
  'impianti-elettrici':              'impianto_elettrico',
}

/**
 * Cosa comprende la fascia: mostrato accanto alla stima e nel messaggio WhatsApp.
 * Sta qui e non in pricing.ts perché il wizard è client-side e le note interne
 * dei prezzi non devono finire nel bundle pubblico.
 */
export const ESTIMATE_SCOPE: Record<string, string> = {
  bagno_piccolo: 'rifacimento completo, piastrelle e sanitari da definire, IVA esclusa',
  pavimento: 'sola posa, materiale e demolizioni esclusi, IVA esclusa',
  impianto_idraulico: 'rifacimento completo in appartamento di 70–90 mq, IVA esclusa',
  impianto_elettrico: 'rifacimento completo in appartamento di 70–90 mq, IVA esclusa',
  ristrutturazione_completa: 'arredi e pratiche esclusi, IVA esclusa',
  cappotto: 'ponteggi e ripristini da valutare, IVA esclusa',
  tinteggiatura: 'dalla sola pittura alla rasatura completa, materiale incluso, IVA esclusa',
  infissi: 'finestre in PVC a una o due ante, fornite e posate, IVA esclusa',
}

/** Testo che accompagna la stima; per gli infissi dichiara quante finestre comprende. */
export function estimateScope(serviceId: string, size: string): string {
  const scope = ESTIMATE_SCOPE[serviceId] ?? ''
  if (serviceId !== 'infissi') return scope
  const windows = parseFloat(size) || 0
  if (windows > 1) return `${Math.round(windows)} ${scope}`
  return scope.replace('finestre', 'per singola finestra').replace('fornite e posate', 'fornita e posata')
}

/** Quantità leggibile: gli infissi si contano, il resto si misura in mq. Vuota se sconosciuta. */
export function formatQuantity(serviceId: string, size: string): string {
  if (!size || size === 'unknown') return ''
  if (serviceId !== 'infissi') return `${size} mq`
  return parseFloat(size) === 1 ? '1 finestra' : `${size} finestre`
}
