/**
 * Recensioni Google reali di Diamo Soluzioni.
 *
 * Per aggiungere o modificare una recensione:
 *   1. Aggiungi un oggetto all'array `reviews` qui sotto.
 *   2. Imposta `published: true` quando vuoi renderla visibile sul sito.
 *   3. Imposta `published: false` per nasconderla senza cancellarla.
 *   4. La sezione Recensioni nella home si nasconde automaticamente
 *      se nessuna recensione ha `published: true`.
 *
 * Campi obbligatori: name, text, rating, date.
 * Campi facoltativi: googleUrl, projectTag, order.
 */

export interface Review {
  /** Nome del recensore come appare su Google */
  name: string
  /** Testo completo della recensione */
  text: string
  /** Valutazione da 1 a 5 */
  rating: 1 | 2 | 3 | 4 | 5
  /** Data nel formato leggibile, es. "Agosto 2026" */
  date: string
  /** URL diretto alla recensione Google (opzionale) */
  googleUrl?: string
  /** Tag progetto collegato, es. "Ristrutturazione bagno" (opzionale) */
  projectTag?: string
  /** Se false, la recensione non appare sul sito */
  published: boolean
  /** Ordine di visualizzazione (più basso = prima). Default: 99 */
  order?: number
}

export const reviews: Review[] = [
  {
    name: 'Aldo Di Cristo',
    text: 'Ho affidato a Diamo Soluzioni la ristrutturazione completa di casa mia e non potrei essere più soddisfatto. Hanno rifatto interamente i bagni con una cura per i dettagli davvero notevole. Lavoro eseguito a regola d\'arte, tempi rispettati e massima professionalità in ogni fase.',
    rating: 5,
    date: 'Agosto 2026',
    projectTag: 'Ristrutturazione completa',
    published: true,
    order: 1,
  },
  {
    name: 'Adriana Fontana',
    text: 'Ho conosciuto Plumy dopo aver avuto una brutta esperienza con un altro muratore. Con una santa pazienza mi sta rimettendo a posto casa. Una brava persona e molto competente!',
    rating: 5,
    date: 'Agosto 2026',
    published: true,
    order: 2,
  },
  {
    name: 'Lucia Sardina',
    text: 'Personale competente e preparato, oltre che molto gentile. Mi sono affidata a loro per una ristrutturazione e il signor Plumi ha svolto il lavoro in maniera eccellente. Sono molto soddisfatta!',
    rating: 5,
    date: 'Agosto 2026',
    projectTag: 'Ristrutturazione',
    published: true,
    order: 3,
  },
  {
    name: 'Andrei Gugea',
    text: 'Mi sono affidato a Diamo Soluzioni per alcuni lavori in casa e sono rimasto davvero soddisfatto. Sono stati disponibili fin dall\'inizio, hanno ascoltato le mie esigenze e hanno lavorato con grande cura e professionalità. Li consiglio senza esitazione.',
    rating: 5,
    date: 'Agosto 2026',
    published: true,
    order: 4,
  },
  {
    name: 'Ferdinando Sorrentino',
    text: 'Azienda seria e professionale. Lavoro eseguito con grande cura e attenzione ai dettagli. Plumi è un ottimo professionista.',
    rating: 5,
    date: 'Agosto 2026',
    published: true,
    order: 5,
  },
  {
    name: 'Muhammad Achar Bozdar',
    text: 'Ristrutturazione completa eccellente. Assolutamente consigliati! Ottima qualità del lavoro, rispetto dei tempi e grande professionalità in ogni fase del cantiere.',
    rating: 5,
    date: 'Agosto 2026',
    projectTag: 'Ristrutturazione completa',
    published: true,
    order: 6,
  },
  {
    name: 'Carmen Lodi',
    text: 'Dò con piacere 5 stelle in quanto mi sono trovata molto bene. Professionali e attenti. Carmen.',
    rating: 5,
    date: 'Agosto 2026',
    published: true,
    order: 7,
  },
  {
    name: 'Viviana Milan',
    text: 'Azienda molto professionale e alla mano. Mi appoggio a loro ogni volta che ho una necessità. Li consiglio vivamente.',
    rating: 5,
    date: 'Agosto 2026',
    published: true,
    order: 8,
  },
  {
    name: 'Paolo Lanotte',
    text: 'Ottima esperienza! Molto professionale e preciso! Consiglio vivamente.',
    rating: 5,
    date: 'Agosto 2026',
    published: true,
    order: 9,
  },
]

/** Restituisce solo le recensioni pubblicate, ordinate per `order` */
export function getPublishedReviews(): Review[] {
  return reviews
    .filter(r => r.published)
    .sort((a, b) => (a.order ?? 99) - (b.order ?? 99))
}

/** Punteggio medio arrotondato al decimo */
export function getAverageRating(): number {
  const pub = getPublishedReviews()
  if (!pub.length) return 0
  const sum = pub.reduce((acc, r) => acc + r.rating, 0)
  return Math.round((sum / pub.length) * 10) / 10
}
