export interface Service {
  slug: string
  name: string
  shortDesc: string
  description: string
  benefit: string
  pricingRef?: string
  heroImage?: string
  icon: string
  features: string[]
  exclusions?: string[]
  process: string[]
  priceNote: string
  faq: { q: string; a: string }[]
  seoTitle: string
  seoDesc: string
}

export const services: Service[] = [
  {
    slug: 'ristrutturazioni-chiavi-in-mano',
    name: 'Ristrutturazioni Chiavi in Mano',
    shortDesc: 'Un solo interlocutore dalla progettazione alla consegna.',
    description:
      'Gestiamo ogni fase della ristrutturazione: sopralluogo, progetto, demolizioni, impianti, finiture e consegna finale. Non coordini nessuno — ci pensiamo noi.',
    benefit: 'Zero stress, un solo referente, nessuna sorpresa.',
    pricingRef: 'ristrutturazione_completa',
    icon: 'house',
    features: [
      'Sopralluogo gratuito e progetto dettagliato',
      'Coordinamento di tutte le maestranze',
      'Demolizioni e bonifica',
      'Impianti idraulici ed elettrici',
      'Pavimenti, rivestimenti, pittura',
      'Consegna chiavi in mano con collaudo',
    ],
    exclusions: [
      'Arredi, cucina e complementi d\'arredo (salvo accordo specifico)',
      'Pratiche edilizie e CILA (coordiniamo con il tecnico del cliente)',
      'Smaltimento amianto o materiali speciali (richiede ditta specializzata)',
    ],
    process: [
      'Sopralluogo gratuito e analisi dello stato di fatto',
      'Progetto esecutivo e preventivo scritto dettagliato',
      'Pianificazione del cantiere con cronoprogramma',
      'Esecuzione: demolizioni, impianti, finiture',
      'Controllo qualità e collaudo finale',
      'Consegna chiavi in mano con garanzia',
    ],
    priceNote: 'Ristrutturazione completa: indicativamente da 500 a 900 €/mq a seconda dello stato di partenza e dei materiali. Preventivo scritto dopo sopralluogo gratuito.',
    faq: [
      {
        q: 'Quanto dura una ristrutturazione completa?',
        a: 'Dipende dalla metratura e dalle condizioni iniziali. Un appartamento di 70–90 mq richiede in media 6–10 settimane lavorative. Ti forniamo un cronoprogramma dettagliato prima di iniziare.',
      },
      {
        q: 'Devo lasciare casa durante i lavori?',
        a: 'Per ristrutturazioni complete è consigliabile. Per interventi parziali (solo bagno, solo pavimenti) spesso non è necessario. Lo valutiamo insieme al sopralluogo.',
      },
      {
        q: 'Il preventivo è vincolante?',
        a: 'Il preventivo che ti consegniamo dopo sopralluogo è dettagliato e scritto. Ogni variazione viene discussa e approvata prima di essere eseguita.',
      },
    ],
    seoTitle: 'Ristrutturazioni Chiavi in Mano — Lodi',
    seoDesc:
      'Ristrutturazioni complete a Lodi, Merlino, Melegnano e Milano Sud. Un solo interlocutore dalla progettazione alla consegna. Sopralluogo gratuito.',
  },
  {
    slug: 'ristrutturazione-bagno',
    name: 'Ristrutturazione Bagno',
    shortDesc: 'Dal vecchio bagno al bagno che hai sempre voluto.',
    description:
      'Rifacimento completo o parziale del bagno: demolizione, impianti, posa rivestimenti e sanitari. Gestiamo tutto, dal primo giorno all\'ultimo ritocco.',
    benefit: 'Bagno nuovo in tempi certi, senza pensieri.',
    pricingRef: 'bagno_piccolo',
    icon: 'droplets',
    features: [
      'Demolizione e smaltimento',
      'Impianto idraulico nuovo o adeguato',
      'Posa rivestimenti e pavimento',
      'Installazione sanitari e rubinetteria',
      'Box doccia o vasca su misura',
      'Accessori e finiture',
    ],
    exclusions: [
      'Piastrelle e sanitari non inclusi nel preventivo (possibilità di fornitura su richiesta)',
      'Impianto elettrico del bagno (preventivato separatamente se necessario)',
      'Lavori su strutture portanti o modifiche distributive significative',
    ],
    faq: [
      {
        q: 'Quanto costa rifare un bagno?',
        a: 'Per un rinnovo parziale la fascia indicativa è 2.500–4.500 €; per un rifacimento completo standard (impianti, pavimento, rivestimenti, sanitari) si parte da 5.000–7.000 € fino a 11.000 € e oltre, in base a materiali e lavorazioni. Stima precisa solo dopo sopralluogo.',
      },
      {
        q: 'Quanti giorni ci vogliono?',
        a: 'Per un rifacimento completo ben organizzato: 10–15 giorni lavorativi. Lavorazioni su misura, asciugature o imprevisti possono portare il cantiere a 3–4 settimane.',
      },
      {
        q: 'Posso scegliere io i materiali?',
        a: 'Sì, puoi portare i materiali acquistati da te oppure lasciare che li selezioniamo noi in base al tuo budget e gusto.',
      },
    ],
    process: [
      'Sopralluogo gratuito: misuriamo e valutiamo lo stato dell\'impianto',
      'Progetto e scelta dei materiali con il cliente',
      'Demolizione e rimozione del vecchio bagno',
      'Rifacimento impianto idraulico ed elettrico',
      'Posa rivestimenti, pavimento e sanitari',
      'Rifinitura, collaudo e consegna',
    ],
    priceNote: 'Rinnovo parziale: 2.500–4.500 €. Rifacimento completo standard: 5.000–11.000 €. Il prezzo dipende da impianti, materiali e lavorazioni — preventivo scritto dopo sopralluogo gratuito.',
    seoTitle: 'Ristrutturazione Bagno a Lodi e Milano Sud',
    seoDesc:
      'Ristrutturazione bagno completa a Lodi, Merlino, Crema e Milano Sud. Demolizione, impianti, posa, sanitari. Preventivo gratuito.',
  },
  {
    slug: 'pavimentazioni-rivestimenti',
    name: 'Pavimentazioni e Rivestimenti',
    shortDesc: 'Gres, parquet, resine: posa millimetrica.',
    description:
      'Posa professionale di gres porcellanato, grandi formati, parquet, resine e mosaici. Preparazione del sottofondo, stuccatura, sigillatura finale.',
    benefit: 'Pavimento perfetto che dura nel tempo.',
    pricingRef: 'pavimento',
    icon: 'grid',
    features: [
      'Rimozione pavimento esistente se necessario',
      'Massetto o preparazione del sottofondo',
      'Posa gres, grandi formati, parquet, resine',
      'Rivestimenti bagno e cucina',
      'Stuccatura e sigillatura',
      'Battiscopa e profili di raccordo',
    ],
    exclusions: [
      'Piastrelle e pavimenti (il cliente può fornirli o richiederli separatamente)',
      'Spostamento o rifacimento impianti sotto traccia',
      'Massetti di risanamento su sottofondi gravemente ammalorati (preventivati a parte)',
    ],
    faq: [
      {
        q: 'Quanto tempo ci vuole per posare il pavimento?',
        a: 'Per un appartamento di 80–100 mq, indicativamente 5–8 giorni lavorativi, inclusi i tempi di asciugatura degli adesivi. Grandi formati o resine richiedono qualche giorno in più.',
      },
      {
        q: 'Posso tenere i mobili in casa durante la posa?',
        a: 'Valutiamo stanza per stanza. Spesso si lavora per zone, liberando un ambiente alla volta.',
      },
      {
        q: 'Qual è la differenza tra gres e grandi formati?',
        a: 'I grandi formati (60×60 cm o 120×60 cm) danno un effetto più moderno e continuo, ma richiedono un sottofondo più curato e più tempo di posa.',
      },
    ],
    process: [
      'Sopralluogo e verifica del sottofondo esistente',
      'Eventuale rimozione del pavimento vecchio',
      'Preparazione del piano di posa (massetto o livellamento)',
      'Posa del pavimento o rivestimento con adesivi di qualità',
      'Stuccatura e sigillatura delle fughe',
      'Pulizia finale e controllo qualità',
    ],
    priceNote: 'Posa gres standard: indicativamente da 35 a 70 €/mq (manodopera inclusa, materiale escluso). Grandi formati o resine: preventivo su misura.',
    seoTitle: 'Pavimentazioni e Rivestimenti — Lodi',
    seoDesc:
      'Posa professionale gres, parquet e resine a Lodi, Merlino, Melegnano. Rivestimenti bagno e cucina. Preventivo gratuito.',
  },
  {
    slug: 'infissi-serramenti',
    name: 'Infissi e Serramenti',
    shortDesc: 'Finestre e porte che isolano, durano e si vedono.',
    description:
      'Fornitura e posa di infissi in PVC, alluminio o legno/alluminio ad alto isolamento termico e acustico. Porte interne, finestre, portoni e zanzariere su misura.',
    benefit: 'Meno freddo, meno rumore, meno bollette.',
    pricingRef: 'infissi',
    icon: 'square-dashed',
    features: [
      'Sopralluogo e presa misure',
      'Infissi PVC, alluminio o legno/alluminio',
      'Rimozione infissi esistenti',
      'Posa con serramento a taglio termico',
      'Porte interne e portoni',
      'Zanzariere e persiane su misura',
    ],
    exclusions: [
      'Opere murarie estese (eventuali tamponamenti minimi inclusi, murature maggiori a parte)',
      'Tinteggiatura dei vani attorno agli infissi (preventivabile separatamente)',
      'Permessi condominiali (a carico del cliente)',
    ],
    faq: [
      {
        q: 'Conviene PVC o alluminio?',
        a: 'Il PVC ha migliori performance termiche a costo inferiore. L\'alluminio è più sottile, leggero e con migliore resa estetica nel tempo. L\'alluminio con taglio termico è la soluzione premium per edifici moderni.',
      },
      {
        q: 'Quanto tempo ci vuole a sostituire le finestre?',
        a: 'In media 1–2 giorni per un appartamento. Il tempo di produzione su misura è di 3–5 settimane.',
      },
    ],
    process: [
      'Sopralluogo e presa misure precisa di ogni vano',
      'Scelta del materiale e del profilo con il cliente',
      'Ordinazione e produzione su misura (3–5 settimane)',
      'Rimozione degli infissi esistenti',
      'Posa con kit di sigillatura e taglio termico',
      'Collaudo apertura/chiusura e consegna',
    ],
    priceNote: 'Infisso in PVC standard (finestra singola): indicativamente da 400 a 800 € fornitura e posa. Alluminio con taglio termico: preventivo su misura.',
    seoTitle: 'Infissi e Serramenti a Lodi e Milano Sud',
    seoDesc:
      'Fornitura e posa infissi PVC e alluminio a Lodi, Crema, Merlino e Milano Sud. Finestre, porte, zanzariere. Preventivo gratuito.',
  },
  {
    slug: 'facciate-cappotto-termico',
    name: 'Facciate e Cappotto Termico',
    shortDesc: 'Risanamento, isolamento e facciata nuova.',
    description:
      'Risanamento facciate, cappotto termico con isolante certificato, impermeabilizzazioni e rifacimento coperture. Certificazione energetica inclusa su richiesta.',
    benefit: 'Risparmio energetico certificato e facciata valorizzata.',
    pricingRef: 'cappotto',
    icon: 'layers',
    features: [
      'Sopralluogo e analisi termica',
      'Cappotto termico con isolante a norma',
      'Rasatura e finitura facciata',
      'Impermeabilizzazione tetto e terrazzi',
      'Risanamento umidità di risalita',
      'Documentazione energetica su richiesta',
    ],
    exclusions: [
      'Certificazione energetica APE (su richiesta, coordiniamo con tecnico abilitato)',
      'Lavori su strutture portanti o copertura integrale del tetto',
      'Ponteggi per altezze superiori a quelle standard (preventivati a parte)',
    ],
    faq: [
      {
        q: 'Quanto tempo ci vuole per il cappotto termico?',
        a: 'Per una facciata di condominio medio, indicativamente 3–5 settimane, variabile in base all\'altezza, all\'accesso e alle condizioni meteo. Su abitazioni singole i tempi si riducono.',
      },
      {
        q: 'Il cappotto termico dà diritto a detrazioni fiscali?',
        a: 'Sì, nella maggior parte dei casi. Le normative cambiano: ti aiutiamo a identificare gli incentivi applicabili al tuo caso e coordiniamo con il tuo commercialista se necessario.',
      },
      {
        q: 'Quanto dura il cappotto termico?',
        a: 'Con materiali certificati e posa corretta, un cappotto termico può durare molti anni. La qualità della posa è fondamentale: è per questo che seguiamo le specifiche tecniche del produttore senza scorciatoie.',
      },
    ],
    process: [
      'Sopralluogo e analisi termica della struttura',
      'Progetto e scelta dell\'isolante certificato',
      'Pulizia e preparazione della facciata',
      'Posa pannelli isolanti con tassellatura a norma',
      'Rasatura armata e strato di finitura',
      'Tinteggiatura e collaudo finale',
    ],
    priceNote: 'Cappotto termico: indicativamente da 80 a 150 €/mq posa inclusa (materiale dipende dalla tipologia). Preventivo scritto dopo sopralluogo.',
    seoTitle: 'Cappotto Termico e Facciate — Lodi',
    seoDesc:
      'Cappotto termico, risanamento facciate e impermeabilizzazioni a Lodi, Melegnano, Milano Sud. Risparmio energetico certificato. Sopralluogo gratuito.',
  },
  {
    slug: 'tinteggiatura',
    name: 'Tinteggiatura e Pittura',
    shortDesc: 'Interni e esterni dipinti come si deve.',
    description:
      'Tinteggiatura professionale di interni ed esterni, finiture decorative, rasature e trattamenti risananti contro umidità e muffa.',
    benefit: 'Pareti perfette, colori che durano.',
    pricingRef: 'tinteggiatura',
    icon: 'paintbrush',
    features: [
      'Protezione pavimenti e mobili',
      'Stuccatura e rasatura pareti',
      'Trattamento anti-muffa se necessario',
      'Tinteggiatura interni con pittura di qualità',
      'Tinteggiatura facciate esterne',
      'Finiture decorative (stucco veneziano, grassello)',
    ],
    exclusions: [
      'Smontaggio e rimontaggio di mobili fissi (possibile su richiesta)',
      'Ponteggi per facciate alte (inclusi nel preventivo esterno)',
      'Riparazione strutturale di crepe o distacchi profondi (rilevati al sopralluogo)',
    ],
    faq: [
      {
        q: 'Quanto tempo ci vuole a pitturare un appartamento?',
        a: 'Un appartamento di 80 mq richiede in media 3–5 giorni lavorativi, più i tempi di asciugatura tra le mani.',
      },
      {
        q: 'Posso restare in casa durante la pittura?',
        a: 'Sì, se usi pitture ad acqua a basse emissioni. Consigliamo comunque di arieggiare bene gli ambienti.',
      },
    ],
    process: [
      'Sopralluogo e valutazione dello stato delle pareti',
      'Protezione di pavimenti, mobili e infissi',
      'Stuccatura e rasatura delle imperfezioni',
      'Trattamento anti-muffa dove necessario',
      'Applicazione della pittura (1–2 mani)',
      'Rimozione protezioni e pulizia finale',
    ],
    priceNote: 'Tinteggiatura interni: indicativamente da 8 a 18 €/mq (manodopera e materiale inclusi). Rasatura a gesso o stucco veneziano: preventivo su misura.',
    seoTitle: 'Tinteggiatura e Pittura — Lodi',
    seoDesc:
      'Tinteggiatura interni ed esterni, rasature e finiture decorative a Lodi, Merlino, San Donato Milanese. Preventivo gratuito.',
  },
  {
    slug: 'impianti-idraulici',
    name: 'Impianti Idraulici',
    shortDesc: 'Rifacimento, adeguamento e riparazione impianti.',
    description:
      'Rifacimento e adeguamento impianti idraulici civili e commerciali: tubazioni, sanitari, caldaia, riscaldamento, scarichi. Certificazione rilasciata alla consegna.',
    benefit: 'Impianto a norma, senza perdite, con garanzia.',
    pricingRef: 'impianto_idraulico',
    icon: 'zap',
    features: [
      'Rifacimento tubazioni acqua calda/fredda',
      'Scarichi e colonne di caduta',
      'Sostituzione o installazione caldaia',
      'Impianto radiatori o a pavimento',
      'Certificazione impianto',
      'Pronto intervento su guasti',
    ],
    exclusions: [
      'Opere murarie di chiusura tracce (incluse nel preventivo standard, specificate caso per caso)',
      'Fornitura di sanitari e rubinetteria (il cliente può fornirli o richiederli)',
      'Collaudo gas e pratiche ASL (coordiniamo con i tecnici abilitati)',
    ],
    faq: [
      {
        q: 'Quanto tempo ci vuole per il rifacimento idraulico?',
        a: 'Per un appartamento di 70–90 mq, indicativamente 5–10 giorni lavorativi. I tempi variano in base alla complessità delle tracce e alla presenza di impianto a pavimento.',
      },
      {
        q: 'Quando è necessario rifare l\'impianto idraulico?',
        a: 'Generalmente ogni 30–40 anni, o prima se compaiono perdite frequenti, pressione irregolare, rumore nelle tubazioni o in caso di ristrutturazione totale.',
      },
    ],
    process: [
      'Sopralluogo e valutazione dell\'impianto esistente',
      'Progetto del nuovo impianto con tracciamento',
      'Apertura tracce e posa delle tubazioni',
      'Installazione sanitari, caldaia e raccordi',
      'Collaudo pressione e tenuta dell\'impianto',
      'Rilascio della certificazione di conformità',
    ],
    priceNote: 'Rifacimento impianto idraulico completo (appartamento 70–90 mq): indicativamente da 4.000 a 9.000 €. Preventivo scritto dopo sopralluogo gratuito.',
    seoTitle: 'Impianti Idraulici a Lodi e Milano Sud',
    seoDesc:
      'Rifacimento e adeguamento impianti idraulici a Lodi, Merlino, Milano Sud. Certificazione inclusa. Sopralluogo gratuito.',
  },
  {
    slug: 'impianti-elettrici',
    name: 'Impianti Elettrici',
    shortDesc: 'Rifacimento, messa a norma, certificazione.',
    description:
      'Adeguamento e rifacimento impianti elettrici civili e commerciali: quadro, cavi, prese, punti luce, domotica. Dichiarazione di conformità alla consegna.',
    benefit: 'Impianto sicuro, certificato e a norma CEI.',
    pricingRef: 'impianto_elettrico',
    icon: 'bolt',
    features: [
      'Rifacimento quadro elettrico',
      'Cablaggio e tracce a norma',
      'Punti luce, prese, interruttori',
      'Impianto domotica su richiesta',
      'Messa a terra e protezioni differenziali',
      'Dichiarazione di conformità CEI',
    ],
    exclusions: [
      'Opere murarie di chiusura tracce (incluse nel preventivo standard, specificate caso per caso)',
      'Fornitura di corpi illuminanti e plafoniere (il cliente sceglie e fornisce i punti luce)',
      'Impianti speciali (antintrusione, controllo accessi): preventivati separatamente',
    ],
    faq: [
      {
        q: 'Quanto tempo ci vuole per il rifacimento elettrico?',
        a: 'Per un appartamento di 70–90 mq, indicativamente 4–8 giorni lavorativi. Dipende dal numero di punti luce, prese e dalla lunghezza delle tracce da aprire.',
      },
      {
        q: 'È obbligatorio avere la dichiarazione di conformità?',
        a: 'Sì, per ogni intervento sull\'impianto elettrico è obbligatoria per legge. La rilasciamo noi a fine lavori.',
      },
    ],
    process: [
      'Sopralluogo e analisi dell\'impianto esistente',
      'Progetto elettrico con calcolo dei carichi',
      'Apertura tracce e posa dei cavi a norma CEI',
      'Installazione quadro, prese, interruttori e punti luce',
      'Collaudo e verifica di messa a terra',
      'Rilascio dichiarazione di conformità',
    ],
    priceNote: 'Rifacimento impianto elettrico completo (appartamento 70–90 mq): indicativamente da 3.500 a 8.000 €. Preventivo scritto dopo sopralluogo gratuito.',
    seoTitle: 'Impianti Elettrici a Lodi e Milano Sud',
    seoDesc:
      'Rifacimento impianti elettrici a norma CEI a Lodi, Merlino, Milano Sud. Dichiarazione di conformità inclusa. Preventivo gratuito.',
  },
]

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find(s => s.slug === slug)
}
