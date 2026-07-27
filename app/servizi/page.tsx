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
    icon: '🏠',
  },
  {
    title: 'Infissi e Serramenti',
    desc: 'Fornitura e posa serramenti ad alto isolamento termico e acustico: porte interne ed esterne, finestre, persiane e zanzariere su misura a Crema e provincia di Lodi.',
    keywords: ['infissi Lodi', 'serramenti Crema', 'sostituzione finestre Lodi', 'porte interne ed esterne Milano Sud', 'zanzariere su misura Lodi'],
    icon: '🪟',
  },
  {
    title: 'Imbiancatura e Tinteggiatura',
    desc: 'Tinteggiatura professionale di interni ed esterni, finiture decorative, rasature e trattamenti risananti contro umidità e muffa a Milano e Lodi.',
    keywords: ['imbiancatura Lodi', 'tinteggiatura casa Lodi', 'pittura interni Milano', 'imbiancatura appartamento San Donato Milanese'],
    icon: '🖌️',
  },
  {
    title: 'Facciate, Tetti e Cappotto Termico',
    desc: 'Risanamento facciate, cappotto termico, impermeabilizzazioni e rifacimento coperture. Risparmio energetico certificato a Monza, Pavia e Melegnano.',
    keywords: ['cappotto termico Monza', 'rifacimento facciata Pavia', 'impermeabilizzazione tetto Melegnano', 'risanamento facciate Lombardia'],
    icon: '🏗️',
  },
  {
    title: 'Pavimentazioni e Rivestimenti',
    desc: 'Posa gres porcellanato, parquet, resine e grandi formati. Precisione millimetrica e finiture impeccabili per ogni ambiente in tutta la Lombardia.',
    keywords: ['pavimentazioni Lodi', 'posa piastrelle Merlino', 'pavimento gres Milano', 'rivestimenti bagno Lodi'],
    icon: '⬛',
  },
  {
    title: 'Impianti Idraulici ed Elettrici',
    desc: 'Adeguamento e rifacimento impianti idraulici ed elettrici, certificazioni energetiche e di sicurezza. Lavoriamo su civile e commerciale in tutta la Lombardia.',
    keywords: ['impianti idraulici Lodi', 'impianti elettrici Merlino', 'elettricista Lodi', 'idraulico Milano Sud'],
    icon: '🔧',
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
              <div className="text-3xl mb-4">{s.icon}</div>
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
