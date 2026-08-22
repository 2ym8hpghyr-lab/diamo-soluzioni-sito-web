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
    cover: '/progetti/ristrutturazione-appartamento-lodi/pavimento-marmo-grigio.jpg',
    gallery: [
      '/progetti/ristrutturazione-appartamento-lodi/pavimento-marmo-grigio.jpg',
      '/progetti/ristrutturazione-appartamento-lodi/camera-letto-finita.jpg',
      '/progetti/ristrutturazione-appartamento-lodi/stanza-parquet.jpg',
      '/progetti/ristrutturazione-appartamento-lodi/stanza-ristrutturazione.jpg',
      '/progetti/ristrutturazione-appartamento-lodi/cantiere-generale.jpg',
      '/progetti/ristrutturazione-appartamento-lodi/stanza-impianti.jpg',
      '/progetti/ristrutturazione-appartamento-lodi/cucina-arredamento.jpg',
    ],
    description: 'Ristrutturazione completa di appartamento: impianti elettrici e idraulici, pavimenti in gres grande formato effetto marmo, intonaci, controsoffitti e infissi.',
    tags: ['ristrutturazione', 'appartamento', 'lodi', 'gres', 'impianti'],
  },
  {
    slug: 'infissi-serramenti',
    title: 'Infissi e serramenti',
    category: 'Infissi e serramenti',
    location: 'Lodi e provincia',
    isReal: true,
    featured: true,
    cover: '/progetti/infissi-serramenti/porta-ingresso-moderna.jpg',
    gallery: [
      '/progetti/infissi-serramenti/porta-ingresso-moderna.jpg',
      '/progetti/infissi-serramenti/persiane-veneziane.jpg',
      '/progetti/infissi-serramenti/porta-finestra-balcone.jpg',
      '/progetti/infissi-serramenti/finestra-camera.jpg',
      '/progetti/infissi-serramenti/finestra-scorrevole.jpg',
      '/progetti/infissi-serramenti/porta-alluminio.jpg',
    ],
    description: 'Fornitura e posa di infissi e serramenti: porte d\'ingresso blindate, finestre e porte-finestre in PVC e alluminio, persiane veneziane, porte scorrevoli.',
    tags: ['infissi', 'serramenti', 'finestre', 'porte', 'pvc', 'alluminio'],
  },
  {
    slug: 'pavimentazioni-gres',
    title: 'Pavimentazioni e rivestimenti',
    category: 'Pavimentazioni e rivestimenti',
    location: 'Lodi e provincia',
    isReal: true,
    featured: true,
    cover: '/progetti/pavimentazioni-gres/scale-marmo-bianco.jpg',
    gallery: [
      '/progetti/pavimentazioni-gres/scale-marmo-bianco.jpg',
      '/progetti/pavimentazioni-gres/corridoio-marmo.jpg',
      '/progetti/pavimentazioni-gres/terrazzo-legno.jpg',
      '/progetti/pavimentazioni-gres/parquet-salone.jpg',
    ],
    description: 'Posa di pavimenti in gres porcellanato grandi formati, scale in marmo, pavimento effetto legno per terrazzi e parquet per interni.',
    tags: ['pavimentazioni', 'gres', 'marmo', 'scale', 'parquet', 'terrazzo'],
  },
  {
    slug: 'ristrutturazione-bagno',
    title: 'Rifacimento bagno completo',
    category: 'Ristrutturazione bagno',
    location: 'Lodi e provincia',
    isReal: true,
    featured: true,
    cover: '/progetti/ristrutturazione-bagno/bagno-finito.jpg',
    gallery: [
      '/progetti/ristrutturazione-bagno/bagno-finito.jpg',
      '/progetti/ristrutturazione-bagno/doccia-marmo.jpg',
      '/progetti/ristrutturazione-bagno/posa-piastrelle.jpg',
      '/progetti/ristrutturazione-bagno/bagno-rivestimento.jpg',
      '/progetti/ristrutturazione-bagno/box-doccia-vetro.jpg',
      '/progetti/ristrutturazione-bagno/bagno-con-vasca.jpg',
      '/progetti/ristrutturazione-bagno/bagno-lavanderia.jpg',
    ],
    description: 'Rifacimento completo di bagni: demolizione, nuovi impianti idraulici, posa piastrelle e rivestimenti, fornitura e posa sanitari, box doccia e rubinetteria.',
    tags: ['bagno', 'piastrelle', 'doccia', 'rivestimenti', 'sanitari'],
  },
  {
    slug: 'impianti',
    title: 'Impianti idraulici e climatizzazione',
    category: 'Impianti',
    location: 'Lodi e provincia',
    isReal: true,
    featured: false,
    cover: '/progetti/impianti/climatizzatore-daikin.jpg',
    gallery: [
      '/progetti/impianti/climatizzatore-daikin.jpg',
      '/progetti/impianti/collettori-idraulici.jpg',
    ],
    description: 'Installazione di impianti idraulici con collettori e distribuzione a zone, posa di climatizzatori e sistemi di riscaldamento.',
    tags: ['impianti', 'idraulica', 'climatizzazione', 'riscaldamento'],
  },
  {
    slug: 'facciate',
    title: 'Facciate e tinteggiatura esterna',
    category: 'Facciate e tinteggiatura',
    location: 'Lodi e provincia',
    isReal: true,
    featured: false,
    cover: '/progetti/facciate/facciata-tinteggiata.jpg',
    gallery: [
      '/progetti/facciate/facciata-tinteggiata.jpg',
      '/progetti/facciate/ponteggio-demolizione.jpg',
    ],
    description: 'Risanamento e tinteggiatura di facciate esterne con montaggio ponteggi, demolizione e rifacimento intonaci, tinteggiatura con colori coordinati.',
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
