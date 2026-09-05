export interface CaseStudy {
  problem: string
  solution: string
  materials?: string[]
  result: string
  duration?: string
  costRange?: string
  serviceSlug?: string
}

export interface Project {
  slug: string
  title: string
  category: string
  location: string
  year?: number
  isReal: boolean
  featured: boolean
  cover: string
  coverAlt: string
  gallery?: string[]
  galleryAlts?: string[]
  description: string
  caseStudy?: CaseStudy
  relatedBlog?: { slug: string; title: string }
  tags: string[]
}

export const projects: Project[] = [
  {
    slug: 'ristrutturazione-appartamento-lodi',
    title: 'Ristrutturazione appartamento',
    category: 'Ristrutturazione completa',
    location: 'Lodi',
    isReal: true,
    featured: true,
    cover: '/progetti/ristrutturazione-appartamento-lodi/stanza-ristrutturata-nuova.jpg',
    coverAlt: 'Soggiorno ristrutturato con pavimento in gres grande formato effetto marmo — Lodi',
    gallery: [
      '/progetti/ristrutturazione-appartamento-lodi/stanza-ristrutturata-nuova.jpg',
      '/progetti/ristrutturazione-appartamento-lodi/armadio-su-misura.jpg',
      '/progetti/ristrutturazione-appartamento-lodi/camera-letto-finita.jpg',
      '/progetti/ristrutturazione-appartamento-lodi/pavimento-marmo-grigio.jpg',
      '/progetti/ristrutturazione-appartamento-lodi/cucina-arredamento.jpg',
      '/progetti/ristrutturazione-appartamento-lodi/apertura-strutturale-corso.jpg',
      '/progetti/ristrutturazione-appartamento-lodi/cantiere-generale.jpg',
    ],
    galleryAlts: [
      'Soggiorno ristrutturato con pavimento in gres grande formato effetto marmo — Lodi',
      'Armadio su misura realizzato durante la ristrutturazione dell\'appartamento',
      'Camera da letto completata con nuovi pavimenti e finiture',
      'Dettaglio pavimento in gres effetto marmo grigio a posa ultimata',
      'Cucina e arredamento dopo la ristrutturazione completa',
      'Apertura strutturale in corso per modifica del layout interno',
      'Veduta generale del cantiere durante la fase demolizione',
    ],
    description: 'Ristrutturazione completa di appartamento: impianti elettrici e idraulici, pavimenti in gres grande formato effetto marmo, intonaci, controsoffitti e infissi.',
    caseStudy: {
      problem: 'Appartamento degli anni \'80 con impianti obsoleti, pavimenti in ceramica consunti e layout che non sfruttava gli spazi. Il cliente cercava un intervento totale con un unico referente, senza doversi preoccupare di coordinare più artigiani.',
      solution: 'Ristrutturazione completa in 8 settimane: demolizione totale dei pavimenti e pareti, rifacimento impianto elettrico a norma CEI 64-8 e impianto idraulico con tubazioni in multistrato, posa gres grande formato effetto marmo, controsoffitti, nuovi infissi PVC con taglio termico e armadiatura su misura.',
      materials: ['Gres porcellanato 60×120 cm effetto marmo', 'Intonaco rasato', 'Infissi PVC con doppio vetro', 'Impianti a norma CEI 64-8'],
      duration: 'Circa 8 settimane lavorative',
      costRange: 'Fascia indicativa per interventi analoghi: 500–900 €/mq — il costo reale varia in base a stato di partenza, metratura e finiture scelte.',
      result: 'Appartamento completamente rinnovato, consegnato nei tempi e costi concordati. Il cliente dispone ora di un appartamento moderno, efficiente e di facile manutenzione.',
      serviceSlug: 'ristrutturazioni-chiavi-in-mano',
    },
    relatedBlog: {
      slug: 'ristrutturazione-appartamento-lodi-prezzi-2026',
      title: 'Ristrutturazione appartamento Lodi: prezzi al mq e costi reali nel 2026',
    },
    tags: ['ristrutturazione', 'appartamento', 'lodi', 'gres', 'impianti'],
  },
  {
    slug: 'infissi-serramenti',
    title: 'Infissi e serramenti',
    category: 'Infissi e serramenti',
    location: 'Lodi e provincia',
    isReal: true,
    featured: true,
    cover: '/progetti/infissi-serramenti/porta-esterna.jpg',
    coverAlt: 'Porta d\'ingresso blindata in PVC installata in appartamento a Lodi',
    gallery: [
      '/progetti/infissi-serramenti/porta-esterna.jpg',
      '/progetti/infissi-serramenti/portafinestra-interna.jpg',
      '/progetti/infissi-serramenti/portafinestra-balcone.jpg',
      '/progetti/infissi-serramenti/persiane-bianche.jpg',
      '/progetti/infissi-serramenti/installazione-corso.jpg',
      '/progetti/infissi-serramenti/finestra-camera.jpg',
    ],
    galleryAlts: [
      'Porta d\'ingresso blindata in PVC a taglio termico installata da Diamo Soluzioni',
      'Porta-finestra interna scorrevole in PVC dopo la posa',
      'Porta-finestra con affaccio sul balcone, profilo PVC bianco',
      'Persiane in alluminio verniciato bianco montate su facciata',
      'Tecnico di Diamo Soluzioni durante l\'installazione di un infisso',
      'Finestra di camera da letto in PVC con doppio vetro basso emissivo',
    ],
    description: 'Fornitura e posa di infissi e serramenti: porte d\'ingresso blindate, finestre e porte-finestre in PVC e alluminio, persiane veneziane, porte scorrevoli.',
    caseStudy: {
      problem: 'Infissi datati degli anni \'90 con scarso isolamento termico e acustico: correnti d\'aria, rumore della strada e costi energetici elevati. Il cliente voleva sostituire tutto in una volta, con produzione su misura.',
      solution: 'Rimozione degli infissi esistenti e posa di nuovi serramenti in PVC con taglio termico e doppio vetro basso emissivo. Installazione porta blindata con cilindro europeo, porte-finestre scorrevoli per il balcone e persiane su misura.',
      materials: ['PVC con taglio termico', 'Vetro camera 4-12-4 basso emissivo', 'Porta blindata classe 3', 'Persiane in alluminio verniciato'],
      duration: 'Posa completata in 2 giorni, produzione su misura in 3–5 settimane',
      costRange: 'Fascia indicativa per interventi analoghi: 400–800 € per infisso in PVC fornitura e posa — il totale dipende dal numero e dal tipo di serramenti.',
      result: 'Riduzione delle dispersioni termiche e del rumore esterno. Comfort migliorato in ogni stagione con stima di risparmio in bolletta variabile in base all\'isolamento precedente.',
      serviceSlug: 'infissi-serramenti',
    },
    tags: ['infissi', 'serramenti', 'finestre', 'porte', 'pvc', 'alluminio'],
  },
  {
    slug: 'pavimentazioni-gres',
    title: 'Pavimentazioni e rivestimenti',
    category: 'Pavimentazioni e rivestimenti',
    location: 'Lodi',
    isReal: true,
    featured: true,
    cover: '/progetti/pavimentazioni-gres/scala-marmo.jpg',
    coverAlt: 'Scale rivestite in marmo bianco dopo l\'intervento di Diamo Soluzioni',
    gallery: [
      '/progetti/pavimentazioni-gres/scala-marmo.jpg',
      '/progetti/pavimentazioni-gres/soggiorno-marmo.jpg',
      '/progetti/pavimentazioni-gres/stanza-marmo.jpg',
      '/progetti/pavimentazioni-gres/corridoio-ristrutturato.jpg',
      '/progetti/pavimentazioni-gres/pavimento-legno.jpg',
      '/progetti/pavimentazioni-gres/terrazzo-legno.jpg',
      '/progetti/pavimentazioni-gres/posa-corso.jpg',
    ],
    galleryAlts: [
      'Scale rivestite in marmo bianco con fughe millimetriche — Lodi e provincia',
      'Soggiorno con pavimento in gres grande formato effetto marmo completato',
      'Camera con posa di gres porcellanato effetto marmo, fughe uniformi',
      'Corridoio dopo il rifacimento completo del pavimento',
      'Pavimento effetto legno per interno residenziale',
      'Terrazzo con pavimentazione composita resistente alle escursioni termiche',
      'Posa in corso di piastrelle grande formato con adesivo ad alta adesione',
    ],
    description: 'Posa di pavimenti in gres porcellanato grandi formati, scale in marmo, pavimento effetto legno per terrazzi e parquet per interni.',
    caseStudy: {
      problem: 'Pavimenti in ceramica anni \'90 consumati e stonati, scale esterne ammalorate con rischio scivolamento e terrazzo con pavimentazione degradata dal gelo.',
      solution: 'Rimozione completa dei pavimenti esistenti, preparazione del massetto di livellamento e posa di gres porcellanato grande formato in tutti gli ambienti interni. Rivestimento scale con marmo. Posa di pavimento composito per il terrazzo, resistente alle escursioni termiche.',
      materials: ['Gres porcellanato 60×60 cm effetto marmo', 'Marmo bianco per scale', 'Pavimento composito esterno', 'Adesivo ad alta adesione per grandi formati'],
      duration: 'Circa 5–8 giorni lavorativi (varia in base alla metratura)',
      costRange: 'Fascia indicativa per interventi analoghi: 35–70 €/mq manodopera inclusa, materiale escluso — grandi formati o resine richiedono preventivo su misura.',
      result: 'Ambienti interni trasformati con pavimento uniforme e fughe millimetriche. Scale valorizzate e terrazzo sicuro e duraturo.',
      serviceSlug: 'pavimentazioni-rivestimenti',
    },
    tags: ['pavimentazioni', 'gres', 'marmo', 'scale', 'parquet', 'terrazzo'],
  },
  {
    slug: 'ristrutturazione-bagno',
    title: 'Rifacimento bagno completo',
    category: 'Ristrutturazione bagno',
    location: 'Lodi',
    isReal: true,
    featured: true,
    cover: '/progetti/ristrutturazione-bagno/bagno-moderno-doccia.jpg',
    coverAlt: 'Bagno moderno ristrutturato da Diamo Soluzioni: doccia in vetro temperato e rivestimento effetto marmo',
    gallery: [
      '/progetti/ristrutturazione-bagno/bagno-moderno-doccia.jpg',
      '/progetti/ristrutturazione-bagno/bagno-sanitari.jpg',
      '/progetti/ristrutturazione-bagno/bagno-lungo.jpg',
      '/progetti/ristrutturazione-bagno/bagno-led.jpg',
      '/progetti/ristrutturazione-bagno/bagno-legno-doccia.jpg',
      '/progetti/ristrutturazione-bagno/mobile-integrato.jpg',
      '/progetti/ristrutturazione-bagno/bagno-box.jpg',
      '/progetti/ristrutturazione-bagno/piatto-doccia-corso.jpg',
    ],
    galleryAlts: [
      'Bagno moderno ristrutturato: box doccia in vetro 8 mm e rivestimento effetto marmo',
      'Sanitari sospesi con cassetta a incasso installati durante il rifacimento bagno',
      'Bagno lungo con doppio lavabo e rivestimento uniforme dal pavimento al soffitto',
      'Bagno con illuminazione LED a incasso su controsoffitto dopo il rifacimento',
      'Dettaglio zona doccia con rivestimento effetto legno e doccia a filo pavimento',
      'Mobile bagno integrato con top in marmo e rubinetteria cromata',
      'Box doccia in vetro temperato a profilo minimo montato nella nicchia',
      'Posa del piatto doccia a filo pavimento durante la fase di cantiere',
    ],
    description: 'Rifacimento completo di bagni: demolizione, nuovi impianti idraulici, posa piastrelle e rivestimenti, fornitura e posa sanitari, box doccia e rubinetteria.',
    caseStudy: {
      problem: 'Bagno anni \'70 con impianto idraulico vetusto, piastrelle danneggiate e spazio mal organizzato. Perdite nell\'impianto esistente e sanitari da sostituire completamente.',
      solution: 'Demolizione completa e rifacimento dell\'impianto idraulico con distribuzione a tubi corrugati. Posa di piastrelle grande formato effetto marmo. Installazione sanitari sospesi con cassetta a incasso, box doccia su misura in vetro temperato e mobile bagno integrato.',
      materials: ['Piastrelle gres 30×60 effetto marmo', 'Sanitari sospesi', 'Box doccia vetro 8 mm', 'Tubi corrugati multistrato'],
      duration: 'Completato in 10 giorni lavorativi',
      costRange: 'Fascia indicativa per interventi analoghi: rifacimento completo standard 5.000–11.000 € a seconda di impianti, materiali e lavorazioni.',
      result: 'Bagno completamente rinnovato con estetica superiore e impianto a norma. Lavori completati nei tempi concordati.',
      serviceSlug: 'ristrutturazione-bagno',
    },
    tags: ['bagno', 'piastrelle', 'doccia', 'rivestimenti', 'sanitari'],
  },
  {
    slug: 'impianti',
    title: 'Impianti idraulici e clima',
    category: 'Impianti',
    location: 'Lodi',
    isReal: true,
    featured: false,
    cover: '/progetti/impianti/collettore-nuovo.jpg',
    coverAlt: 'Collettore Caleffi con distribuzione a zone installato da Diamo Soluzioni',
    gallery: [
      '/progetti/impianti/collettore-nuovo.jpg',
      '/progetti/impianti/climatizzatore-daikin.jpg',
    ],
    galleryAlts: [
      'Collettore Caleffi con distribuzione idraulica a zone indipendenti — installazione Diamo Soluzioni',
      'Unità interna di climatizzatore Daikin serie Perfera montata a parete',
    ],
    description: 'Installazione di impianti idraulici con collettori e distribuzione a zone, posa di climatizzatori e sistemi di riscaldamento.',
    caseStudy: {
      problem: 'Impianto idraulico con tubazioni in ferro arrugginite e sistema di riscaldamento non zonato. Impossibilità di regolare la temperatura ambiente per ambiente.',
      solution: 'Rifacimento completo dell\'impianto con tubazioni in multistrato, installazione di collettori Caleffi con distribuzione zonale indipendente e posa di unità di climatizzazione Daikin in ciascuna stanza.',
      materials: ['Tubazioni multistrato Pexal', 'Collettori Caleffi', 'Climatizzatori Daikin serie Perfera'],
      duration: 'Circa 3–4 settimane lavorative',
      costRange: 'Fascia indicativa per interventi analoghi: rifacimento impianto idraulico completo (70–90 mq) 4.000–9.000 €.',
      result: 'Impianto moderno a norma di legge con certificazione rilasciata a fine lavori. Gestione climatizzazione zona per zona con miglioramento del comfort abitativo.',
      serviceSlug: 'impianti-idraulici',
    },
    tags: ['impianti', 'idraulica', 'climatizzazione', 'riscaldamento'],
  },
  {
    slug: 'facciate',
    title: 'Facciate e tinteggiatura esterna',
    category: 'Facciate e tinteggiatura',
    location: 'Lodi',
    isReal: true,
    featured: false,
    cover: '/progetti/facciate/facciata-ristrutturata.jpg',
    coverAlt: 'Facciata esterna risanata e tinteggiata da Diamo Soluzioni — Lodi e provincia',
    gallery: [
      '/progetti/facciate/facciata-ristrutturata.jpg',
      '/progetti/facciate/intonacatura-corso.jpg',
      '/progetti/facciate/isolamento-corso.jpg',
      '/progetti/facciate/ponteggio-demolizione.jpg',
    ],
    galleryAlts: [
      'Facciata esterna completamente risanata con pittura siliconica traspirante',
      'Applicazione del nuovo intonaco rasato durante la fase di cantiere',
      'Posa del pannello isolante durante la lavorazione facciata',
      'Ponteggio certificato montato per la demolizione dell\'intonaco ammalorato',
    ],
    description: 'Risanamento e tinteggiatura di facciate esterne con montaggio ponteggi, demolizione e rifacimento intonaci, tinteggiatura con colori coordinati.',
    caseStudy: {
      problem: 'Facciata con intonaco ammalorato da oltre 15 anni, macchie di umidità di risalita e tinteggiatura scrostata. Problemi estetici e rischio di infiltrazioni d\'acqua nelle murature.',
      solution: 'Montaggio ponteggi certificati, rimozione totale dell\'intonaco esistente e trattamento anti-umidità alla base. Posa di nuovo intonaco rasato, applicazione di pittura al silicone traspirante per esterni resistente agli agenti atmosferici.',
      materials: ['Intonaco rasato', 'Pittura siliconica traspirante', 'Trattamento consolidante per fondali', 'Colori coordinati su campionario'],
      duration: 'Variabile in base alla metratura della facciata; ponteggi inclusi nella pianificazione',
      costRange: 'Fascia indicativa per interventi analoghi: risanamento facciata con intonaco e tinteggiatura, preventivo su misura in base alla metratura e allo stato di partenza.',
      result: 'Facciata completamente rinnovata con aspetto professionale e trattamento resistente agli agenti atmosferici con pittura siliconica certificata.',
      serviceSlug: 'facciate-cappotto-termico',
    },
    tags: ['facciata', 'tinteggiatura', 'ponteggi', 'intonaco'],
  },
  {
    slug: 'tinteggiatura-appartamento',
    title: 'Tinteggiatura interni',
    category: 'Tinteggiatura',
    location: 'Lodi',
    isReal: true,
    featured: false,
    cover: '/progetti/tinteggiatura-appartamento/stanza-tinteggiatura-finita.jpg',
    coverAlt: 'Tinteggiatura professionale di interni: pareti rasate e pitturate a Lodi',
    gallery: ['/progetti/tinteggiatura-appartamento/stanza-tinteggiatura-finita.jpg'],
    galleryAlts: ['Tinteggiatura professionale di interni a Lodi — rasatura e pittura a due mani'],
    description: 'Tinteggiatura completa di appartamento: stuccatura crepe, rasatura pareti e pittura lavabile in due mani. Colori su campionario.',
    caseStudy: {
      problem: 'Pareti con crepe superficiali, macchie di umidità e tinteggiatura ormai datata che rendevano l\'appartamento buio e poco accogliente.',
      solution: 'Stuccatura di tutte le crepe, trattamento antimuffa nelle zone umide, rasatura a gesso e applicazione di pittura lavabile traspirante in due mani con colori scelti dal cliente.',
      materials: ['Pittura lavabile traspirante', 'Stucco acrilico per crepe', 'Trattamento antimuffa', 'Primer consolidante'],
      duration: 'Circa 3–5 giorni lavorativi per appartamento di 80 mq',
      costRange: 'Fascia indicativa per interventi analoghi: 8–18 €/mq manodopera e materiale inclusi.',
      result: 'Ambienti rinnovati con finiture uniformi e colori selezionati. Lavori completati senza necessità di sgomberare i mobili.',
      serviceSlug: 'tinteggiatura',
    },
    tags: ['tinteggiatura', 'pittura', 'interni', 'stuccatura'],
  },
  {
    slug: 'impianti-elettrici-appartamento',
    title: 'Impianti elettrici a norma CEI',
    category: 'Impianti elettrici',
    location: 'Lodi',
    isReal: true,
    featured: false,
    cover: '/progetti/impianti-elettrici-appartamento/illuminazione-led-impianto-elettrico.jpg',
    coverAlt: 'Impianto elettrico con illuminazione LED a soffitto installato da Diamo Soluzioni a Lodi',
    gallery: ['/progetti/impianti-elettrici-appartamento/illuminazione-led-impianto-elettrico.jpg'],
    galleryAlts: ['Impianto elettrico a norma CEI 64-8 con quadro e differenziali — Diamo Soluzioni Lodi'],
    description: 'Rifacimento completo impianto elettrico: nuovo quadro con differenziali, cavi a norma CEI 64-8, prese, interruttori, punti luce. Conformità CEI 64-8 rilasciata.',
    caseStudy: {
      problem: 'Impianto elettrico anni \'70 privo di impianto di terra e differenziali, con fusibili a cartuccia e cavi deteriorati. Non a norma CEI 64-8.',
      solution: 'Sostituzione del quadro con modello dotato di magnetotermici e differenziali. Rifacimento totale dei cavi in corrugato, nuove prese e interruttori su tutti i circuiti, messa a terra dell\'impianto.',
      materials: ['Quadro DIN con differenziali', 'Cavi FS17 450/750V', 'Corrugato rigido e flessibile', 'Prese e frutti da incasso'],
      duration: 'Circa 4–6 giorni lavorativi per appartamento di 80 mq',
      costRange: 'Fascia indicativa per interventi analoghi: 3.500–8.000 € per appartamento 70–90 mq.',
      result: 'Impianto a norma CEI 64-8 con dichiarazione di conformità rilasciata. Protezione differenziale su tutti i circuiti.',
      serviceSlug: 'impianti-elettrici',
    },
    tags: ['impianti', 'elettrico', 'quadro', 'norma CEI', 'certificazione'],
  },
]

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find(p => p.slug === slug)
}

export function getFeaturedProjects(): Project[] {
  return projects.filter(p => p.featured && p.isReal)
}

export function getRealProjects(): Project[] {
  return projects.filter(p => p.isReal)
}
