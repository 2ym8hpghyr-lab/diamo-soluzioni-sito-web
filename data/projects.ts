export interface CaseStudy {
  problem: string
  solution: string
  materials?: string[]
  result: string
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
  gallery?: string[]
  description: string
  caseStudy?: CaseStudy
  tags: string[]
}

export const projects: Project[] = [
  {
    slug: 'ristrutturazione-appartamento-lodi',
    title: 'Ristrutturazione appartamento completa',
    category: 'Ristrutturazione completa',
    location: 'Lodi',
    isReal: true,
    featured: true,
    cover: '/progetti/ristrutturazione-appartamento-lodi/stanza-ristrutturata-nuova.jpg',
    gallery: [
      '/progetti/ristrutturazione-appartamento-lodi/stanza-ristrutturata-nuova.jpg',
      '/progetti/ristrutturazione-appartamento-lodi/armadio-su-misura.jpg',
      '/progetti/ristrutturazione-appartamento-lodi/camera-letto-finita.jpg',
      '/progetti/ristrutturazione-appartamento-lodi/pavimento-marmo-grigio.jpg',
      '/progetti/ristrutturazione-appartamento-lodi/cucina-arredamento.jpg',
      '/progetti/ristrutturazione-appartamento-lodi/apertura-strutturale-corso.jpg',
      '/progetti/ristrutturazione-appartamento-lodi/cantiere-generale.jpg',
    ],
    description: 'Ristrutturazione completa di appartamento: impianti elettrici e idraulici, pavimenti in gres grande formato effetto marmo, intonaci, controsoffitti e infissi.',
    caseStudy: {
      problem: 'Appartamento degli anni \'80 con impianti obsoleti, pavimenti in ceramica consunti e layout che non sfruttava gli spazi. Il cliente cercava un intervento totale con un unico referente, senza doversi preoccupare di coordinare più artigiani.',
      solution: 'Ristrutturazione completa in 8 settimane: demolizione totale dei pavimenti e pareti, rifacimento impianto elettrico a norma CEI 64-8 e impianto idraulico con tubazioni in multistrato, posa gres grande formato effetto marmo, controsoffitti, nuovi infissi PVC con taglio termico e armadiatura su misura.',
      materials: ['Gres porcellanato 60×120 cm effetto marmo', 'Intonaco rasato', 'Infissi PVC con doppio vetro', 'Impianti a norma CEI 64-8'],
      result: 'Appartamento completamente rinnovato, consegnato nei tempi concordati senza variazioni sul preventivo iniziale. Il cliente dispone ora di un appartamento moderno, efficiente e di facile manutenzione.',
      serviceSlug: 'ristrutturazioni-chiavi-in-mano',
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
    gallery: [
      '/progetti/infissi-serramenti/porta-esterna.jpg',
      '/progetti/infissi-serramenti/portafinestra-interna.jpg',
      '/progetti/infissi-serramenti/portafinestra-balcone.jpg',
      '/progetti/infissi-serramenti/persiane-bianche.jpg',
      '/progetti/infissi-serramenti/installazione-corso.jpg',
      '/progetti/infissi-serramenti/finestra-camera.jpg',
    ],
    description: 'Fornitura e posa di infissi e serramenti: porte d\'ingresso blindate, finestre e porte-finestre in PVC e alluminio, persiane veneziane, porte scorrevoli.',
    caseStudy: {
      problem: 'Infissi datati degli anni \'90 con scarso isolamento termico e acustico: correnti d\'aria, rumore della strada e costi energetici elevati. Il cliente voleva sostituire tutto in una volta, con produzione su misura.',
      solution: 'Rimozione degli infissi esistenti e posa di nuovi serramenti in PVC con taglio termico e doppio vetro basso emissivo. Installazione porta blindata con cilindro europeo, porte-finestre scorrevoli per il balcone e persiane su misura.',
      materials: ['PVC con taglio termico', 'Vetro camera 4-12-4 basso emissivo', 'Porta blindata classe 3', 'Persiane in alluminio verniciato'],
      result: 'Riduzione significativa delle dispersioni termiche e del rumore esterno. Casa più silenziosa, comfort migliorato in ogni stagione e risparmio stimato in bolletta.',
      serviceSlug: 'infissi-serramenti',
    },
    tags: ['infissi', 'serramenti', 'finestre', 'porte', 'pvc', 'alluminio'],
  },
  {
    slug: 'pavimentazioni-gres',
    title: 'Pavimentazioni e rivestimenti',
    category: 'Pavimentazioni e rivestimenti',
    location: 'Lodi e provincia',
    isReal: true,
    featured: true,
    cover: '/progetti/pavimentazioni-gres/scala-marmo.jpg',
    gallery: [
      '/progetti/pavimentazioni-gres/scala-marmo.jpg',
      '/progetti/pavimentazioni-gres/soggiorno-marmo.jpg',
      '/progetti/pavimentazioni-gres/stanza-marmo.jpg',
      '/progetti/pavimentazioni-gres/corridoio-ristrutturato.jpg',
      '/progetti/pavimentazioni-gres/pavimento-legno.jpg',
      '/progetti/pavimentazioni-gres/terrazzo-legno.jpg',
      '/progetti/pavimentazioni-gres/posa-corso.jpg',
    ],
    description: 'Posa di pavimenti in gres porcellanato grandi formati, scale in marmo, pavimento effetto legno per terrazzi e parquet per interni.',
    caseStudy: {
      problem: 'Pavimenti in ceramica anni \'90 consumati e stonati, scale esterne ammalorate con rischio scivolamento e terrazzo con pavimentazione degradata dal gelo.',
      solution: 'Rimozione completa dei pavimenti esistenti, preparazione del massetto di livellamento e posa di gres porcellanato grande formato in tutti gli ambienti interni. Rivestimento scale con marmo. Posa di pavimento composito per il terrazzo, resistente alle escursioni termiche.',
      materials: ['Gres porcellanato 60×60 cm effetto marmo', 'Marmo bianco per scale', 'Pavimento composito esterno', 'Adesivo ad alta adesione per grandi formati'],
      result: 'Ambienti interni completamente trasformati con pavimento uniforme e fughe millimetriche. Scale valorizzate e terrazzo sicuro e duraturo.',
      serviceSlug: 'pavimentazioni-rivestimenti',
    },
    tags: ['pavimentazioni', 'gres', 'marmo', 'scale', 'parquet', 'terrazzo'],
  },
  {
    slug: 'ristrutturazione-bagno',
    title: 'Rifacimento bagno completo',
    category: 'Ristrutturazione bagno',
    location: 'Lodi e provincia',
    isReal: true,
    featured: true,
    cover: '/progetti/ristrutturazione-bagno/bagno-moderno-doccia.jpg',
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
    description: 'Rifacimento completo di bagni: demolizione, nuovi impianti idraulici, posa piastrelle e rivestimenti, fornitura e posa sanitari, box doccia e rubinetteria.',
    caseStudy: {
      problem: 'Bagno anni \'70 con impianto idraulico vetusto, piastrelle danneggiate e spazio mal organizzato. Perdite nell\'impianto esistente e sanitari da sostituire completamente.',
      solution: 'Demolizione completa e rifacimento dell\'impianto idraulico con distribuzione a tubi corrugati. Posa di piastrelle grande formato effetto marmo. Installazione sanitari sospesi con cassetta a incasso, box doccia su misura in vetro temperato e mobile bagno integrato.',
      materials: ['Piastrelle gres 30×60 effetto marmo', 'Sanitari sospesi', 'Box doccia vetro 8 mm', 'Tubi corrugati multistrato'],
      result: 'Bagno completamente rinnovato con estetica superiore e impianto a norma. Consegnato in 10 giorni lavorativi, senza modifiche al preventivo concordato.',
      serviceSlug: 'ristrutturazione-bagno',
    },
    tags: ['bagno', 'piastrelle', 'doccia', 'rivestimenti', 'sanitari'],
  },
  {
    slug: 'impianti',
    title: 'Impianti idraulici e climatizzazione',
    category: 'Impianti',
    location: 'Lodi e provincia',
    isReal: true,
    featured: false,
    cover: '/progetti/impianti/collettore-nuovo.jpg',
    gallery: [
      '/progetti/impianti/collettore-nuovo.jpg',
      '/progetti/impianti/climatizzatore-daikin.jpg',
    ],
    description: 'Installazione di impianti idraulici con collettori e distribuzione a zone, posa di climatizzatori e sistemi di riscaldamento.',
    caseStudy: {
      problem: 'Impianto idraulico con tubazioni in ferro arrugginite e sistema di riscaldamento non zonato. Impossibilità di regolare la temperatura ambiente per ambiente.',
      solution: 'Rifacimento completo dell\'impianto con tubazioni in multistrato, installazione di collettori Caleffi con distribuzione zonale indipendente e posa di unità di climatizzazione Daikin in ciascuna stanza.',
      materials: ['Tubazioni multistrato Pexal', 'Collettori Caleffi', 'Climatizzatori Daikin serie Perfera'],
      result: 'Impianto moderno a norma di legge con certificazione rilasciata a fine lavori. Gestione climatizzazione zona per zona, risparmio energetico stimato del 25%.',
      serviceSlug: 'impianti-idraulici',
    },
    tags: ['impianti', 'idraulica', 'climatizzazione', 'riscaldamento'],
  },
  {
    slug: 'facciate',
    title: 'Facciate e tinteggiatura esterna',
    category: 'Facciate e tinteggiatura',
    location: 'Lodi e provincia',
    isReal: true,
    featured: false,
    cover: '/progetti/facciate/facciata-ristrutturata.jpg',
    gallery: [
      '/progetti/facciate/facciata-ristrutturata.jpg',
      '/progetti/facciate/intonacatura-corso.jpg',
      '/progetti/facciate/isolamento-corso.jpg',
      '/progetti/facciate/ponteggio-demolizione.jpg',
    ],
    description: 'Risanamento e tinteggiatura di facciate esterne con montaggio ponteggi, demolizione e rifacimento intonaci, tinteggiatura con colori coordinati.',
    caseStudy: {
      problem: 'Facciata con intonaco ammalorato da oltre 15 anni, macchie di umidità di risalita e tinteggiatura scrostata. Problemi estetici e rischio di infiltrazioni d\'acqua nelle murature.',
      solution: 'Montaggio ponteggi certificati, rimozione totale dell\'intonaco esistente e trattamento anti-umidità alla base. Posa di nuovo intonaco rasato, applicazione di pittura al silicone traspirante per esterni resistente agli agenti atmosferici.',
      materials: ['Intonaco rasato', 'Pittura siliconica traspirante', 'Trattamento consolidante per fondali', 'Colori coordinati su campionario'],
      result: 'Facciata completamente rinnovata con aspetto professionale. Trattamento garantisce protezione per i prossimi 15-20 anni dagli agenti atmosferici.',
      serviceSlug: 'facciate-cappotto-termico',
    },
    tags: ['facciata', 'tinteggiatura', 'ponteggi', 'intonaco'],
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
