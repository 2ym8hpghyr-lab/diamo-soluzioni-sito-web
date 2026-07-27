import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contatti',
  description: 'Contatta Diamo Soluzioni — impresa edile a Merlino (LO). Telefono, email e richiesta preventivo gratuito.',
}

export default function ContattiPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <p className="text-brand-accent text-sm font-bold uppercase tracking-widest mb-3">Contatti</p>
      <h1 className="text-4xl font-black text-brand-dark mb-8">Parliamo del Tuo Progetto</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        <a href="tel:+393444619461" className="flex flex-col gap-2 p-6 border border-gray-100 rounded-2xl hover:border-brand-accent transition">
          <span className="text-3xl">📞</span>
          <span className="font-bold text-brand-dark">Chiamaci</span>
          <span className="text-brand-accent font-medium">+39 344 461 9461</span>
        </a>
        <a href="mailto:pellumbmurgu@gmail.com" className="flex flex-col gap-2 p-6 border border-gray-100 rounded-2xl hover:border-brand-accent transition">
          <span className="text-3xl">✉</span>
          <span className="font-bold text-brand-dark">Scrivici</span>
          <span className="text-brand-accent font-medium text-sm">pellumbmurgu@gmail.com</span>
        </a>
        <div className="flex flex-col gap-2 p-6 border border-gray-100 rounded-2xl">
          <span className="text-3xl">📍</span>
          <span className="font-bold text-brand-dark">Dove Siamo</span>
          <span className="text-gray-500 text-sm">Merlino (LO)<br />Lombardia, Italia</span>
        </div>
      </div>

      <div className="bg-gray-50 rounded-2xl p-6">
        <h2 className="font-bold text-brand-dark mb-2">Sopralluogo Gratuito</h2>
        <p className="text-gray-500 text-sm">
          Offriamo sopralluogo e preventivo gratuito senza impegno. Contattaci per fissare un appuntamento
          comodo per te. Operiamo a Merlino, Lodi, Melegnano e in tutta la provincia.
        </p>
      </div>
    </div>
  )
}
