import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Servizi',
  description: 'Ristrutturazioni chiavi in mano, infissi, imbiancatura, facciate, cappotto termico e pavimentazioni a Lodi, Milano, Monza, Pavia, Crema e Lombardia. Preventivo gratuito.',
}

const services = [
  {
    title: 'Ristrutturazioni Chiavi in Mano',
    desc: 'Ristrutturazione completa di appartamenti, immobili commerciali e ville a Lodi e Milano. Gestiamo ogni fase: progettazione, demolizioni, finiture, consegna chiavi in mano.',
    keywords: ['ristrutturazioni chiavi in mano Lodi', 'ristrutturazione casa Milano', 'ristrutturazione appartamento Merlino', 'ristrutturazioni interne Melegnano'],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-7 h-7">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955a1.5 1.5 0 012.122 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
      </svg>
    ),
  },
  {
    title: 'Infissi e Serramenti',
    desc: 'Fornitura e posa serramenti ad alto isolamento termico e acustico: porte interne ed esterne, finestre, persiane e zanzariere su misura a Crema e provincia di Lodi.',
    keywords: ['infissi Lodi', 'serramenti Crema', 'sostituzione finestre Lodi', 'porte interne ed esterne Milano Sud', 'zanzariere su misura Lodi'],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-7 h-7">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" />
      </svg>
    ),
  },
  {
    title: 'Imbiancatura e Tinteggiatura',
    desc: 'Tinteggiatura professionale di interni ed esterni, finiture decorative, rasature e trattamenti risananti contro umidità e muffa a Milano e Lodi.',
    keywords: ['imbiancatura Lodi', 'tinteggiatura casa Lodi', 'pittura interni Milano', 'imbiancatura appartamento San Donato Milanese'],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-7 h-7">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42" />
      </svg>
    ),
  },
  {
    title: 'Facciate, Tetti e Cappotto Termico',
    desc: 'Risanamento facciate, cappotto termico, impermeabilizzazioni e rifacimento coperture. Risparmio energetico certificato a Monza, Pavia e Melegnano.',
    keywords: ['cappotto termico Monza', 'rifacimento facciata Pavia', 'impermeabilizzazione tetto Melegnano', 'risanamento facciate Lombardia'],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-7 h-7">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15a4.5 4.5 0 004.5 4.5H18a3.75 3.75 0 001.332-7.257 3 3 0 00-3.758-3.848 5.25 5.25 0 00-10.233 2.33A4.502 4.502 0 002.25 15z" />
      </svg>
    ),
  },
  {
    title: 'Pavimentazioni e Rivestimenti',
    desc: 'Posa gres porcellanato, parquet, resine e grandi formati. Precisione millimetrica e finiture impeccabili per ogni ambiente in tutta la Lombardia.',
    keywords: ['pavimentazioni Lodi', 'posa piastrelle Merlino', 'pavimento gres Milano', 'rivestimenti bagno Lodi'],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-7 h-7">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
      </svg>
    ),
  },
  {
    title: 'Impianti Idraulici ed Elettrici',
    desc: 'Adeguamento e rifacimento impianti idraulici ed elettrici, certificazioni energetiche e di sicurezza. Lavoriamo su civile e commerciale in tutta la Lombardia.',
    keywords: ['impianti idraulici Lodi', 'impianti elettrici Merlino', 'elettricista Lodi', 'idraulico Milano Sud'],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-7 h-7">
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z" />
      </svg>
    ),
  },
]

export default function ServiziPage() {
  return (
    <div style={{ backgroundColor: '#0F1115', minHeight: '100vh' }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-20">
        <p
          className="text-xs font-semibold uppercase tracking-[0.15em] mb-4"
          style={{ color: '#C5A059' }}
        >
          Cosa Facciamo
        </p>
        <h1
          className="font-bold mb-4"
          style={{
            fontFamily: '"Plus Jakarta Sans", sans-serif',
            fontSize: 'clamp(1.8rem, 3vw, 2.5rem)',
            color: '#F3F4F6',
          }}
        >
          Servizi Edili Completi a Lodi, Milano e Lombardia
        </h1>
        <p className="mb-14 max-w-2xl leading-relaxed" style={{ color: '#9CA3AF' }}>
          Offriamo un ecosistema completo di servizi per la casa e l&apos;immobile: dalla ristrutturazione
          chiavi in mano alle finiture, dagli impianti alle facciate. Un solo interlocutore per tutto.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {services.map(s => (
            <div
              key={s.title}
              className="p-6 rounded-xl"
              style={{ backgroundColor: '#1A1D24', border: '1px solid rgba(255,255,255,0.08)' }}
            >
              <div
                className="w-12 h-12 rounded-lg flex items-center justify-center mb-4"
                style={{ backgroundColor: 'rgba(197,160,89,0.12)', color: '#C5A059' }}
              >
                {s.icon}
              </div>
              <div className="w-8 h-0.5 mb-4" style={{ backgroundColor: '#C5A059' }} />
              <h2
                className="font-bold text-base mb-3"
                style={{ fontFamily: '"Plus Jakarta Sans", sans-serif', color: '#F3F4F6' }}
              >
                {s.title}
              </h2>
              <p className="text-sm leading-relaxed mb-4" style={{ color: '#9CA3AF' }}>
                {s.desc}
              </p>
              <div className="flex flex-wrap gap-1.5">
                {s.keywords.slice(0, 2).map(k => (
                  <span
                    key={k}
                    className="text-xs px-2 py-0.5 rounded"
                    style={{ backgroundColor: 'rgba(197,160,89,0.1)', color: 'rgba(197,160,89,0.8)' }}
                  >
                    {k}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div
          className="rounded-xl p-8 text-center"
          style={{ backgroundColor: '#1A1D24', border: '1px solid rgba(197,160,89,0.2)' }}
        >
          <h3
            className="font-bold text-xl mb-3"
            style={{ fontFamily: '"Plus Jakarta Sans", sans-serif', color: '#F3F4F6' }}
          >
            Richiedi un Preventivo Gratuito
          </h3>
          <p className="mb-6 max-w-md mx-auto" style={{ color: '#9CA3AF' }}>
            Descrivi il tuo progetto e ti contatteremo entro 24 ore con una stima personalizzata.
          </p>
          <Link
            href="/contatti"
            className="inline-block font-semibold px-8 py-3.5 rounded-lg text-sm"
            style={{ backgroundColor: '#C5A059', color: '#0F1115', borderRadius: '8px' }}
          >
            Richiedi Preventivo →
          </Link>
        </div>
      </div>
    </div>
  )
}
