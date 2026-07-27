import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Chi Siamo',
  description: 'Diamo Soluzioni — impresa edile con 15+ anni di esperienza a Merlino (LO). Ristrutturazioni complete, affidabilità e qualità in Lombardia.',
}

export default function ChiSiamoPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <p className="text-brand-accent text-sm font-bold uppercase tracking-widest mb-3">Chi Siamo</p>
      <h1 className="text-4xl font-black text-brand-dark mb-6">
        La nostra storia
      </h1>
      <div className="prose prose-lg max-w-none text-gray-600 leading-relaxed space-y-4">
        <p>
          Diamo Soluzioni è un'impresa edile con sede a Merlino (LO), Lombardia. Da oltre 15 anni
          realizziamo ristrutturazioni complete, pavimentazioni, impianti idraulici ed elettrici
          con competenza artigianale e attenzione ai dettagli.
        </p>
        <p>
          Il nostro approccio è semplice: ascoltiamo il cliente, valutiamo ogni progetto con cura,
          e consegniamo il lavoro nei tempi e nei costi concordati. La nostra crescita è avvenuta
          attraverso il passaparola — la migliore testimonianza della qualità del nostro lavoro.
        </p>
        <p>
          Operiamo in tutta la provincia di Lodi e nelle aree limitrofe della Lombardia.
          Per ogni lavoro offriamo un sopralluogo gratuito e un preventivo dettagliato senza impegno.
        </p>
      </div>
      <div className="mt-10 grid grid-cols-3 gap-6 text-center">
        {[['250+', 'Progetti realizzati'], ['100+', 'Clienti soddisfatti'], ['15+', 'Anni di esperienza']].map(([v, l]) => (
          <div key={l}>
            <div className="text-4xl font-black text-brand-accent">{v}</div>
            <div className="text-xs text-gray-500 uppercase tracking-wide mt-1">{l}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
