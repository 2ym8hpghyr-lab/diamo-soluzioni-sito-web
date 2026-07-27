const services = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-7 h-7">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955a1.5 1.5 0 012.122 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
      </svg>
    ),
    title: 'Ristrutturazioni Chiavi in Mano',
    desc: 'Ristrutturazione completa di appartamenti e locali commerciali a Lodi e Milano. Gestiamo ogni fase: progettazione, lavori edili, finiture.',
    keyword: 'Lodi · Milano · Monza',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-7 h-7">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" />
      </svg>
    ),
    title: 'Infissi e Serramenti',
    desc: 'Fornitura e posa serramenti ad alto isolamento termico e acustico: porte, finestre e zanzariere su misura a Crema e provincia di Lodi.',
    keyword: 'Crema · Lodi · Milano Sud',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-7 h-7">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42" />
      </svg>
    ),
    title: 'Imbiancatura e Tinteggiatura',
    desc: 'Tinteggiatura interni ed esterni, finiture decorative e trattamenti risananti a Milano e Lodi. Materiali premium e finiture a regola d\'arte.',
    keyword: 'Milano · Lodi · San Donato M.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-7 h-7">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15a4.5 4.5 0 004.5 4.5H18a3.75 3.75 0 001.332-7.257 3 3 0 00-3.758-3.848 5.25 5.25 0 00-10.233 2.33A4.502 4.502 0 002.25 15z" />
      </svg>
    ),
    title: 'Facciate, Tetti e Cappotto Termico',
    desc: 'Risanamento facciate, cappotto termico, impermeabilizzazioni e rifacimento coperture a Monza e Pavia. Risparmio energetico garantito.',
    keyword: 'Monza · Pavia · Melegnano',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-7 h-7">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
      </svg>
    ),
    title: 'Pavimentazioni e Rivestimenti',
    desc: 'Posa gres porcellanato, parquet, resine e grandi formati. Precisione millimetrica e finiture impeccabili a Lodi e tutta la Lombardia.',
    keyword: 'Lodi · Lombardia',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-7 h-7">
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z" />
      </svg>
    ),
    title: 'Impianti Idraulici ed Elettrici',
    desc: 'Adeguamento impianti idraulici ed elettrici, certificazioni di sicurezza ed energetiche. Lavoriamo su civile e commerciale in tutta la Lombardia.',
    keyword: 'Lodi · Merlino · Lombardia',
  },
]

export default function Services() {
  return (
    <section className="py-24" style={{ backgroundColor: '#0F1115' }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-14">
          <p
            className="text-xs font-semibold uppercase tracking-[0.15em] mb-4"
            style={{ color: '#C5A059' }}
          >
            Cosa Facciamo
          </p>
          <h2
            className="font-bold mb-4"
            style={{
              fontFamily: '"Plus Jakarta Sans", sans-serif',
              fontSize: 'clamp(1.8rem, 3vw, 2.5rem)',
              color: '#F3F4F6',
              letterSpacing: '-0.02em',
            }}
          >
            Servizi Edili Completi
          </h2>
          <p className="max-w-xl mx-auto leading-relaxed" style={{ color: '#9CA3AF' }}>
            Dalla ristrutturazione chiavi in mano agli impianti, forniamo un servizio completo
            per ogni esigenza a Lodi, Milano e tutta la Lombardia.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map(s => (
            <div
              key={s.title}
              className="p-6 rounded-xl transition-all duration-300 cursor-default border border-white/[0.08] hover:-translate-y-1 hover:border-brand-accent/30"
              style={{ backgroundColor: '#1A1D24' }}
            >
              <div
                className="w-12 h-12 rounded-lg flex items-center justify-center mb-5"
                style={{ backgroundColor: 'rgba(197,160,89,0.12)', color: '#C5A059' }}
              >
                {s.icon}
              </div>
              <h3
                className="font-bold mb-2 text-base"
                style={{ fontFamily: '"Plus Jakarta Sans", sans-serif', color: '#F3F4F6' }}
              >
                {s.title}
              </h3>
              <p className="text-sm leading-relaxed mb-4" style={{ color: '#9CA3AF' }}>
                {s.desc}
              </p>
              <p className="text-xs font-medium" style={{ color: 'rgba(197,160,89,0.7)' }}>
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-3 h-3 inline mr-1 relative -top-px"><path fillRule="evenodd" d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-2.079 3.218-4.402 3.218-6.853C19.5 5.507 16.036 2 12 2S4.5 5.507 4.5 10.474c0 2.451 1.274 4.774 3.218 6.853a19.58 19.58 0 002.683 2.282 16.975 16.975 0 001.144.742z" clipRule="evenodd" /><path fillRule="evenodd" d="M12 13.5a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" /></svg>
                {s.keyword}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
