import Link from 'next/link'
import ChatBot from '@/components/ChatBot'

export default function Hero() {
  return (
    <section
      className="relative min-h-[85vh] flex items-center"
      style={{
        background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
      }}
    >
      {/* Overlay scuro */}
      <div className="absolute inset-0 bg-black/50" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 py-16 w-full flex flex-col lg:flex-row items-center gap-12">
        {/* Testo */}
        <div className="flex-1">
          <h1 className="text-5xl lg:text-7xl font-black text-white leading-none mb-4">
            DIAMO SOLUZIONI,<br />
            COSTRUIAMO{' '}
            <span className="text-brand-accent">VALORE.</span>
          </h1>
          <div className="w-16 h-1 bg-brand-accent mb-6" />
          <p className="text-gray-300 text-lg mb-8 max-w-md">
            Impresa edile specializzata in ristrutturazioni complete, pavimentazioni e impianti.
            Sede a Merlino (LO), operiamo in tutta la Lombardia.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/servizi"
              className="bg-brand-accent text-brand-dark font-bold px-6 py-3 rounded-lg hover:opacity-90 transition uppercase tracking-wide"
            >
              Scopri i Nostri Servizi →
            </Link>
            <Link
              href="/progetti"
              className="border border-white/30 text-white font-bold px-6 py-3 rounded-lg hover:border-brand-accent hover:text-brand-accent transition uppercase tracking-wide"
            >
              I Nostri Progetti
            </Link>
          </div>
        </div>

        {/* Chatbot */}
        <div className="flex-shrink-0 w-full lg:w-auto lg:max-w-md">
          <ChatBot />
        </div>
      </div>
    </section>
  )
}
