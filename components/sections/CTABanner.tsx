import Link from 'next/link'

export default function CTABanner() {
  return (
    <section className="bg-brand-accent py-10">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-brand-dark uppercase">Hai un Progetto in Mente?</h2>
          <p className="text-brand-dark/70 text-sm">Parlaci, troviamo insieme la soluzione giusta per te.</p>
        </div>
        <Link
          href="/contatti"
          className="bg-brand-dark text-white font-bold px-8 py-3 rounded-lg hover:opacity-90 transition uppercase tracking-wide whitespace-nowrap"
        >
          Richiedi un Preventivo Gratuito →
        </Link>
      </div>
    </section>
  )
}
