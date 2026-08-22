import Link from 'next/link'
import { business } from '@/config/business'

export default function NotFound() {
  return (
    <section
      className="min-h-[70vh] flex items-center justify-center px-4"
      style={{ background: 'linear-gradient(135deg, #1F4852 0%, #15363E 100%)' }}
    >
      <div className="max-w-lg text-center">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-gold mb-4">Errore 404</p>
        <h1
          className="font-extrabold text-white mb-4"
          style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}
        >
          Qui non c&apos;è niente da ristrutturare
        </h1>
        <p className="text-white/60 text-lg mb-10 leading-relaxed">
          La pagina che cerchi non esiste o è stata spostata.<br />
          Torna alla home o contattaci direttamente.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="px-7 py-3.5 rounded-xl font-bold text-sm"
            style={{ backgroundColor: '#F4BE12', color: '#1E2A2E' }}
          >
            Torna alla home
          </Link>
          <a
            href={business.whatsapp.url}
            target="_blank"
            rel="noopener noreferrer"
            className="px-7 py-3.5 rounded-xl font-semibold text-sm border border-white/30 text-white hover:border-gold hover:text-gold transition-all"
          >
            Scrivi su WhatsApp
          </a>
        </div>
      </div>
    </section>
  )
}
