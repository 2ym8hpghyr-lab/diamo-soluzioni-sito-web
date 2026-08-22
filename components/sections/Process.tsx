const steps = [
  { num: '01', title: 'Raccontaci il progetto',  desc: 'Usa il preventivatore AI oppure scrivici su WhatsApp. Bastano pochi dettagli.' },
  { num: '02', title: 'Sopralluogo gratuito',     desc: 'Veniamo a vedere lo spazio di persona. Nessun impegno.' },
  { num: '03', title: 'Preventivo dettagliato',   desc: 'Ricevi un preventivo scritto e chiaro, senza voci nascoste.' },
  { num: '04', title: 'Pianificazione',           desc: 'Definiamo insieme tempi, materiali e cronoprogramma.' },
  { num: '05', title: 'Realizzazione',            desc: 'Lavoriamo con ordine e ti aggiorniamo durante ogni fase.' },
  { num: '06', title: 'Consegna e collaudo',      desc: 'Verifichiamo ogni dettaglio prima di chiudere il cantiere.' },
]

export default function Process() {
  return (
    <section style={{ backgroundColor: '#15363E' }} aria-labelledby="process-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14 lg:py-18">

        {/* Header — eyebrow + titolo a sinistra, sottotitolo a destra */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-5 mb-12 lg:mb-14">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] mb-4" style={{ color: '#F4BE12' }}>Come lavoriamo</p>
            <div className="w-8 h-0.5 mb-6" style={{ backgroundColor: '#B88A32' }} aria-hidden />
            <h2
              id="process-heading"
              className="font-extrabold leading-tight"
              style={{ color: '#F0E8D5', fontSize: 'clamp(1.6rem,3vw,2.4rem)' }}
            >
              Un processo ordinato,<br />nessuna sorpresa
            </h2>
          </div>
          <p className="text-sm max-w-xs leading-relaxed lg:text-right" style={{ color: 'rgba(202,175,122,0.70)' }}>
            Un unico referente dall&apos;inizio alla consegna. Sai sempre cosa succederà e quando.
          </p>
        </div>

        {/* Steps orizzontali */}
        <div className="relative">

          {/* Linea orizzontale ottone — solo desktop */}
          <div
            className="absolute hidden lg:block"
            aria-hidden
            style={{
              top: '7px',
              left: '7px',
              right: '7px',
              height: '1px',
              background: 'linear-gradient(90deg, rgba(184,138,50,0.15) 0%, rgba(184,138,50,0.55) 15%, rgba(184,138,50,0.55) 85%, rgba(184,138,50,0.15) 100%)',
            }}
          />

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-x-6 gap-y-10 lg:gap-x-4">
            {steps.map(step => (
              <div key={step.num} className="relative">

                {/* Dot sulla linea */}
                <div
                  className="relative z-10 w-3.5 h-3.5 rounded-full mb-5 flex-shrink-0"
                  style={{
                    backgroundColor: '#F4BE12',
                    boxShadow: '0 0 0 3px rgba(184,138,50,0.30)',
                  }}
                />

                {/* Numero ghost */}
                <span
                  className="block font-black leading-none mb-2.5 select-none"
                  style={{
                    fontSize: 'clamp(2rem,3.5vw,2.8rem)',
                    color: 'rgba(244,190,18,0.13)',
                    fontVariantNumeric: 'tabular-nums',
                  }}
                >
                  {step.num}
                </span>

                {/* Titolo */}
                <h3
                  className="font-bold text-sm leading-snug mb-2"
                  style={{ color: '#CAAF7A' }}
                >
                  {step.title}
                </h3>

                {/* Descrizione */}
                <p
                  className="text-xs leading-relaxed"
                  style={{ color: 'rgba(202,175,122,0.60)' }}
                >
                  {step.desc}
                </p>

              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}
