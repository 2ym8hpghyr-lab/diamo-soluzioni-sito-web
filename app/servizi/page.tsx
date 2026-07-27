import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Servizi',
  description: 'Ristrutturazioni, pavimentazioni, impianti idraulici ed elettrici, demolizioni a Merlino (LO) e provincia di Lodi. Preventivo gratuito.',
}

const services = [
  {
    icon: '🔨',
    title: 'Ristrutturazioni Complete',
    desc: 'Ristrutturazione totale di appartamenti, ville e locali commerciali. Gestiamo ogni fase: progettazione, lavori edili, finiture. Coordiniamo tutti i lavori per consegnarti la chiave in mano.',
    keywords: 'ristrutturazioni Lodi, rifacimento appartamento Merlino',
  },
  {
    icon: '🚿',
    title: 'Rifacimento Bagni',
    desc: 'Demolizione, idraulica, rivestimenti, piastrelle e sanitari. Realizziamo bagni completi da zero con materiali di qualità e finiture curate.',
    keywords: 'rifacimento bagno Lodi, ristrutturazione bagno Merlino',
  },
  {
    icon: '🏠',
    title: 'Pavimentazioni e Rivestimenti',
    desc: 'Posa di piastrelle, parquet, gres porcellanato e materiali speciali. Lavoriamo con precisione per garantire fughe perfette e finitura impeccabile.',
    keywords: 'pavimentazioni Lodi, posa piastrelle Merlino',
  },
  {
    icon: '🔧',
    title: 'Impianti Idraulici',
    desc: 'Sostituzione tubazioni, nuovi impianti, rifacimento colonne scarico, installazione sanitari. Interveniamo su guasti urgenti e ristrutturazioni complete.',
    keywords: 'impianti idraulici Lodi, idraulico Merlino',
  },
  {
    icon: '⚡',
    title: 'Impianti Elettrici',
    desc: 'Rifacimento impianti elettrici a norma CEI, nuovi quadri, punti luce, prese. Lavoriamo su civile e commerciale con materiali certificati.',
    keywords: 'impianti elettrici Lodi, elettricista Merlino',
  },
  {
    icon: '🏗️',
    title: 'Demolizioni',
    desc: 'Demolizione di muri, tramezze, massetti e strutture. Smaltimento materiali a norma di legge. Interventi veloci e sicuri.',
    keywords: 'demolizioni Merlino, demolizione muri Lodi',
  },
]

export default function ServiziPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-16">
      <p className="text-brand-accent text-sm font-bold uppercase tracking-widest mb-3">Servizi</p>
      <h1 className="text-4xl font-black text-brand-dark mb-4">Cosa Facciamo</h1>
      <p className="text-gray-500 mb-12 max-w-2xl">
        Offriamo un servizio completo per ogni esigenza edile, dalla demolizione alla consegna chiavi in mano.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map(s => (
          <div key={s.title} className="border border-gray-100 rounded-2xl p-6 hover:shadow-lg transition">
            <div className="text-4xl mb-4">{s.icon}</div>
            <div className="w-8 h-0.5 bg-brand-accent mb-3" />
            <h2 className="font-bold text-lg text-brand-dark mb-2">{s.title}</h2>
            <p className="text-gray-500 text-sm leading-relaxed">{s.desc}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
