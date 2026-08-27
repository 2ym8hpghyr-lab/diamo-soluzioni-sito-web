export interface Service {
  slug: string
  name: string
  shortDesc: string
  description: string
  benefit: string
  pricingRef?: string       // chiave in config/pricing.ts
  heroImage?: string        // da sostituire con foto reali — vedere IMAGE_REPLACEMENT_PLAN.md
  icon: string              // emoji o SVG path id
  features: string[]
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
    seoTitle: 'Ristrutturazioni Chiavi in Mano a Lodi e Milano Sud',
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
    faq: [
      {
        q: 'Quanto costa rifare un bagno?',
        a: 'Per un bagno fino a 6 mq, il costo indicativo può variare da 3.000 a 7.000 €, in base a materiali, impianti e lavorazioni. Ti diamo una stima precisa dopo sopralluogo.',
      },
      {
        q: 'Quanti giorni ci vogliono?',
        a: 'Per un bagno standard: 5–10 giorni lavorativi. Con interventi sull\'impianto o modifiche layout si può arrivare a 2 settimane.',
      },
      {
        q: 'Posso scegliere io i materiali?',
        a: 'Sì, puoi portare i materiali acquistati da te oppure lasciare che li selezioniamo noi in base al tuo budget e gusto.',
      },
    ],
    seoTitle: 'Rifacimento Bagno a Lodi e Merlino',
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
    faq: [
      {
        q: 'Posso tenere i mobili in casa durante la posa?',
        a: 'Valutiamo stanza per stanza. Spesso si lavora per zone, liberando un ambiente alla volta.',
      },
      {
        q: 'Qual è la differenza tra gres e grandi formati?',
        a: 'I grandi formati (60×60 cm o 120×60 cm) danno un effetto più moderno e continuo, ma richiedono un sottofondo più curato e più tempo di posa.',
      },
    ],
    seoTitle: 'Pavimentazioni e Rivestimenti a Lodi e Milano Sud',
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
    seoTitle: 'Infissi e Serramenti a Lodi e Crema',
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
    faq: [
      {
        q: 'Il cappotto termico dà diritto a detrazioni fiscali?',
        a: 'Sì, nella maggior parte dei casi. Le normative cambiano: ti aiutiamo a identificare gli incentivi applicabili al tuo caso e coordiniamo con il tuo commercialista se necessario.',
      },
      {
        q: 'Quanto dura il cappotto termico?',
        a: 'Con materiali certificati e posa corretta, 25–30 anni. La qualità della posa è fondamentale: è per questo che non usiamo scorciatoie.',
      },
    ],
    seoTitle: 'Cappotto Termico e Facciate a Lodi e Milano Sud',
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
    seoTitle: 'Tinteggiatura e Pittura a Lodi e Milano Sud',
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
    faq: [
      {
        q: 'Quando è necessario rifare l\'impianto idraulico?',
        a: 'Generalmente ogni 30–40 anni, o prima se compaiono perdite frequenti, pressione irregolare, rumore nelle tubazioni o in caso di ristrutturazione totale.',
      },
    ],
    seoTitle: 'Impianti Idraulici a Lodi e Merlino',
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
    faq: [
      {
        q: 'È obbligatorio avere la dichiarazione di conformità?',
        a: 'Sì, per ogni intervento sull\'impianto elettrico è obbligatoria per legge. La rilasciamo noi a fine lavori.',
      },
    ],
    seoTitle: 'Impianti Elettrici a Lodi e Merlino',
    seoDesc:
      'Rifacimento impianti elettrici a norma CEI a Lodi, Merlino, Milano Sud. Dichiarazione di conformità inclusa. Preventivo gratuito.',
  },
]

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find(s => s.slug === slug)
}
