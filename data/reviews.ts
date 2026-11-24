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
  {
    name: 'Valentina Giungato',
    text: 'Persona affidabile, veloce e competente. Consigliato!',
    rating: 5,
    date: '3 Settembre 2026',
    published: true,
    order: 10,
  },
  {
    name: 'Eleonora Palmieri',
    text: 'Mi affido sempre a loro, sono sempre puntuali e il personale è molto educato e professionale.',
    rating: 5,
    date: '3 Settembre 2026',
    published: true,
    order: 11,
  },
  {
    name: 'Fatjon Pershpalaj',
    text: 'Ho avuto un’esperienza davvero eccellente con questa impresa edile. I lavori sono stati eseguiti in maniera impeccabile, con grande attenzione ai dettagli e utilizzando materiali di ottima qualità.\n\nFin dal primo momento ho trovato persone molto serie, professionali e soprattutto corrette. Hanno rispettato i tempi concordati, mantenuto gli impegni presi e seguito ogni fase dei lavori con grande precisione.\n\nIl risultato finale è stato fantastico, ben oltre le mie aspettative. È raro trovare un’azienda così affidabile, competente e attenta alle esigenze del cliente.\n\nConsiglio vivamente questa impresa a chiunque cerchi professionalità, qualità e serietà. Complimenti a tutto il team per l’ottimo lavoro!',
    rating: 5,
    date: 'Autunno 2026',
    published: true,
    order: 12,
  },
  {
    name: 'Lu Lucy',
    text: 'I miei genitori si sono affidati a questa società per la ristrutturazione completa del bagno e sono rimasti pienamente soddisfatti del risultato. Fin dal primo contatto abbiamo riscontrato professionalità, disponibilità e grande attenzione alle esigenze espresse. I lavori sono stati eseguiti con cura, nel rispetto dei tempi concordati e mantenendo sempre il cantiere ordinato.\n\nIl personale è competente e ha saputo consigliare le soluzioni migliori sia dal punto di vista estetico che funzionale. Il risultato finale ha superato le aspettative: un bagno moderno, rifinito nei minimi dettagli e realizzato con materiali di qualità.\n\nInoltre, dopo questa esperienza estremamente positiva, ci siamo rivolti più volte al titolare, Plumi, per diverse esigenze relative all\'appartamento. In ogni occasione ha dimostrato grande disponibilità, preparazione e capacità di individuare rapidamente le soluzioni più efficaci, coinvolgendo, quando necessario, ulteriori professionisti specializzati.\n\nUn esempio concreto riguarda un problema idraulico legato al rifacimento del bagno eseguito da un\'altra ditta: dopo numerosi interventi senza esito da parte di diversi tecnici, Plumi è intervenuto, ha effettuato un\'analisi accurata e, in breve tempo, è riuscito a individuare la causa del problema e a risolverlo definitivamente.\n\nConsigliamo vivamente questa azienda e Plumi a chiunque sia alla ricerca di un\'impresa seria, affidabile e competente per la ristrutturazione del proprio bagno o per lavori di manutenzione domestica.\n\nComplimenti a Plumi ed al suo team per la professionalità e l\'attenzione al cliente!',
    rating: 5,
    date: 'Settembre 2026',
    published: true,
    order: 13,
  },
  {
    name: 'Raffaele Valenti',
    text: 'Conosco Plumy da un paio d\'anni, si è occupato della ristrutturazione di casa. È una persona estremamente competente, precisa e affidabile. Non posso che parlarne in modo assolutamente positivo: il lavoro è stato eseguito a regola d\'arte e con grande attenzione ai dettagli. La consiglio vivamente a chiunque cerchi serietà e qualità.',
    rating: 5,
    date: 'Settembre 2026',
    published: true,
    order: 14,
  },
  {
    name: 'RETLAV LUXURY',
    text: 'Ho avuto un’ottima esperienza con Diamo Soluzioni. Impresa edile seria, professionale e affidabile. Lavori eseguiti con precisione, attenzione ai dettagli e grande cura. Il team è stato sempre disponibile, puntuale e attento alle nostre esigenze, rispettando gli accordi presi. Il risultato finale ha superato le aspettative. Consiglio vivamente Diamo Soluzioni a chi cerca un’impresa competente e di fiducia per lavori edili e ristrutturazioni',
    rating: 5,
    date: 'Autunno 2026',
    published: true,
    order: 15,
  },
  {
    name: '_ SKG_D4rkL1ght _',
    text: 'Ho avuto bisogno recentemente di una ristrutturazione completa della casa, visto che era ormai vecchia e volevo renderla più moderna e luminosa, un amico mi ha consigliato di chiamare loro e mi hanno fatto una visione e un preventivo totalmente gratuito, mi sono sembrati molto simpatici, gentili e molto rispettosi, il preventivo mi conveniva, perciò ho deciso di fidarmi delle loro esperienze…e devo dire sono stato davvero molto ma molto soddisfatto dal lavoro ottenuto e finalmente la mia casa è così come la desideravo. Ottimo lavoro e molto bravi.',
    rating: 5,
    date: 'Autunno 2026',
    published: true,
    order: 16,
  },
  {
    name: 'Giusy',
    text: 'Ho avuto un\'ottima esperienza con questa impresa di ristrutturazioni. Il mio bagno oramai datato ha subito una trasformazione, sorprendente il risultato finale che ha superato le aspettative. Plumi ed il suo gruppo hanno svolto il lavoro in modo accurato e con cura. Siamo davvero soddisfatti e consigliamo di affidarsi ciecamente a questa solida azienda composta da veri professionisti!',
    rating: 5,
    date: 'Settembre 2026',
    published: true,
    order: 17,
  },
  {
    name: 'Agata Di Natale',
    text: 'Impresa edile davvero ottima! Ho trovato persone serie, professionali e soprattutto oneste. I lavori sono stati eseguiti molto bene e in tempi rapidi, rispettando quanto concordato. Grande disponibilità, precisione e attenzione ai dettagli. È difficile trovare al giorno d’oggi lavoratori così affidabili. Consigliatissimo',
    rating: 5,
    date: 'Settembre 2026',
    published: true,
    order: 18,
  },
  {
    name: 'Franco Canu',
    text: 'Esperienza davvero positiva! Mi sono affidato a questa azienda per ristrutturazione dei locali casa e per la manutenzione ordinaria. Plumi è una persona straordinaria, puntuale e tempestiva. Consiglio vivamente questa impresa. Andate avanti così!',
    rating: 5,
    date: 'Settembre 2026',
    published: true,
    order: 19,
  },
  {
    name: 'Maria Galasso',
    text: 'Un\' Impresa seria,ho avuto bisogno per qualche lavoretto in casa di idraulica ed elettricità mi sono trovata molto bene.Il titolare Plumi che è venuto a farmi i lavori è molto preciso, attento,onesto e pulito nei lavori.\nLo consiglio!',
    rating: 5,
    date: 'Settembre 2026',
    published: true,
    order: 20,
  },
  {
    name: 'Viviana',
    text: 'Impresa edile seria, affidabile e precisa. Li abbiamo chiamati diverse volte per differenti lavori e non hanno mai deluso le aspettative. Qualità del lavoro al top, tempi rispettati e prezzi onesti.',
    rating: 5,
    date: 'Settembre 2026',
    published: true,
    order: 21,
  },
  {
    name: 'Lorenzo D\'Erchia',
    text: 'Ho avuto modo di affidarmi per due lavori importanti, sono rimasto soddisfatto pienamente del lavoro svolto e’ soprattutto della serietà e competenza. Lo consiglio vivamente.',
    rating: 5,
    date: 'Autunno 2026',
    published: true,
    order: 22,
  },
  {
    name: 'Leonardo Bruno',
    text: 'Plumi e’ una persona molto disponibile e lavora con impegno. se ci sono problemi li risolve sempre e cerca di consigliarti al meglio vista la sua esperienza e competenza.',
    rating: 5,
    date: 'Autunno 2026',
    published: true,
    order: 23,
  },
  {
    name: 'Rodica Capbatut',
    text: 'Professionale, puntuale e super efficiente! Ha risolto il problema in pochissimo tempo e ha lasciato tutto pulito e in ordine. Consigliatissimo!',
    rating: 5,
    date: 'Autunno 2026',
    published: true,
    order: 24,
  },
  {
    name: 'Rosalba Catanzariti',
    text: 'Impresa seria e professionale, ho avuto modo di conoscerli per dei lavori in casa. Onesto anche nei prezzi!',
    rating: 5,
    date: 'Autunno 2026',
    published: true,
    order: 25,
  },
  {
    name: 'Franco Fonnesu',
    text: 'Hanno lavorato con maestria nel rifacimento dei nostri due bagni rispettando anche la tempistica. Ditta molto raccomandabile',
    rating: 5,
    date: 'Autunno 2026',
    published: true,
    order: 26,
  },
  {
    name: 'Marco Costa',
    text: 'Impresa seria con prezzi giusti,personale serio e disponibile, chiamati diverse volte per lavori differenti, assolutamente consigliati',
    rating: 5,
    date: 'Settembre 2026',
    published: true,
    order: 27,
  },
  {
    name: 'Daniel Dibra',
    text: 'Persona molto affidabile e competente.e molto attento alle finiture.Consigliassimo.',
    rating: 5,
    date: 'Autunno 2026',
    published: true,
    order: 28,
  },
  {
    name: 'Antonio Biagi',
    text: 'Sempre disponibili, gentili e lavori fatti sempre alla perfezione',
    rating: 5,
    date: 'Autunno 2026',
    published: true,
    order: 29,
  },
  {
    name: 'Silvano Kuuu',
    text: 'Impresa seria e puntuale molto professionale e competente consiglio a tutti 💪💪💪',
    rating: 5,
    date: 'Autunno 2026',
    published: true,
    order: 30,
  },
  {
    name: 'Andrea Manzoni',
    text: 'grazie per montaggio rubinetto cucina, ottimo lavoro!',
    rating: 5,
    date: 'Ottobre 2026',
    published: true,
    order: 31,
  },
  {
    name: 'Noemi Mastronardi',
    text: 'Lavori impeccabili e grande professionalità',
    rating: 5,
    date: 'Settembre 2026',
    published: true,
    order: 32,
  },
  {
    name: 'Marina Wen',
    text: 'Ottimo servizio, consigliato!',
    rating: 5,
    date: 'Autunno 2026',
    published: true,
    order: 33,
  },
  {
    name: 'Leon Xhemaj',
    text: 'azienda professionale',
    rating: 5,
    date: 'Settembre 2026',
    published: true,
    order: 34,
  },
  {
    // 5 stelle senza testo: conta nel totale Google ma non ha una scheda
    name: 'Francesca Casati',
    text: '',
    rating: 5,
    date: 'Settembre 2026',
    published: false,
    order: 35,
  },
]

/** Restituisce solo le recensioni pubblicate, ordinate per `order` */
export function getPublishedReviews(): Review[] {
  return reviews
    .filter(r => r.published)
    .sort((a, b) => (a.order ?? 99) - (b.order ?? 99))
}

/** Totale recensioni sul profilo Google, incluse quelle senza testo (non mostrate come scheda) */
export function getGoogleReviewCount(): number {
  return reviews.length
}

/** Punteggio medio arrotondato al decimo */
export function getAverageRating(): number {
  const pub = getPublishedReviews()
  if (!pub.length) return 0
  const sum = pub.reduce((acc, r) => acc + r.rating, 0)
  return Math.round((sum / pub.length) * 10) / 10
}
