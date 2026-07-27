const services = [
  { icon: '🏗️', title: 'Costruzioni', desc: 'Edifici residenziali e commerciali di qualità.' },
  { icon: '🔨', title: 'Ristrutturazioni', desc: 'Rinnovo e valorizzazione di ogni ambiente.' },
  { icon: '📐', title: 'Pavimentazioni', desc: 'Posa piastrelle e rivestimenti su misura.' },
  { icon: '🔧', title: 'Impianti', desc: 'Idraulici ed elettrici, sostituzione e nuova posa.' },
]

export default function Services() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map(s => (
            <div key={s.title} className="text-center flex flex-col items-center gap-3">
              <div className="text-5xl">{s.icon}</div>
              <div className="w-8 h-0.5 bg-brand-accent" />
              <h3 className="font-bold text-lg uppercase tracking-wide text-brand-dark">{s.title}</h3>
              <p className="text-gray-500 text-sm">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
