import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Chi Siamo',
  description: 'Diamo Soluzioni — impresa edile con 15+ anni di esperienza a Merlino (LO). Ristrutturazioni complete, affidabilità e qualità in Lombardia.',
}

export default function ChiSiamoPage() {
  return (
    <div style={{ backgroundColor: '#0F1115', minHeight: '100vh' }}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-20">
        <p
          className="text-xs font-semibold uppercase tracking-[0.15em] mb-4"
          style={{ color: '#C5A059' }}
        >
          Chi Siamo
        </p>
        <h1
          className="font-bold mb-6"
          style={{
            fontFamily: '"Plus Jakarta Sans", sans-serif',
            fontSize: 'clamp(1.8rem, 3vw, 2.5rem)',
            color: '#F3F4F6',
          }}
        >
          La nostra storia
        </h1>
        <div className="max-w-none leading-relaxed space-y-4 mb-12">
          <p style={{ color: '#9CA3AF' }}>
            Diamo Soluzioni &egrave; un&apos;impresa edile con sede a Merlino (LO), Lombardia. Da oltre 15 anni
            realizziamo ristrutturazioni complete, pavimentazioni, impianti idraulici ed elettrici
            con competenza artigianale e attenzione ai dettagli.
          </p>
          <p style={{ color: '#9CA3AF' }}>
            Il nostro approccio è semplice: ascoltiamo il cliente, valutiamo ogni progetto con cura,
            e consegniamo il lavoro nei tempi e nei costi concordati. La nostra crescita è avvenuta
            attraverso il passaparola — la migliore testimonianza della qualità del nostro lavoro.
          </p>
          <p style={{ color: '#9CA3AF' }}>
            Operiamo in tutta la provincia di Lodi e nelle aree limitrofe della Lombardia.
            Per ogni lavoro offriamo un sopralluogo gratuito e un preventivo dettagliato senza impegno.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          {[['250+', 'Progetti realizzati'], ['100+', 'Clienti soddisfatti'], ['15+', 'Anni di esperienza']].map(([v, l]) => (
            <div key={l}>
              <div className="font-bold text-4xl" style={{ color: '#C5A059' }}>{v}</div>
              <div className="text-xs uppercase tracking-wide mt-2" style={{ color: '#6B7280' }}>{l}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
