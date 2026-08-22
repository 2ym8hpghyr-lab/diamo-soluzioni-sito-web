import Image from 'next/image'

const signals = [
  { img: '/illustrazioni/sopralluogo.png', label: 'Sopralluogo gratuito',   desc: 'Veniamo da te senza impegno' },
  { img: '/illustrazioni/preventivo.png',  label: 'Preventivo dettagliato', desc: 'Scritto, prima di iniziare' },
  { img: '/illustrazioni/referente.png',   label: 'Un solo referente',      desc: 'Dal sopralluogo alla consegna' },
  { img: '/illustrazioni/zona.png',        label: 'Lodi e Milano Sud',      desc: 'Zona servita confermata' },
  { img: '/illustrazioni/assistenza.png',  label: 'Assistenza diretta',     desc: 'Risponde il titolare' },
]

export default function TrustStrip() {
  return (
    <section className="bg-concrete border-b border-concrete" aria-label="Segnali di fiducia">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
        <div className="flex flex-wrap justify-center lg:justify-between gap-x-6 gap-y-4">
          {signals.map(s => (
            <div key={s.label} className="flex items-center gap-3 min-w-0">
              <div className="relative w-16 h-10 flex-shrink-0 rounded-lg overflow-hidden">
                <Image
                  src={s.img}
                  alt={s.label}
                  fill
                  className="object-cover opacity-60"
                  sizes="64px"
                />
              </div>
              <div className="min-w-0">
                <p className="text-sm font-bold text-graphite leading-tight">{s.label}</p>
                <p className="text-xs text-gray-500 leading-tight">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
