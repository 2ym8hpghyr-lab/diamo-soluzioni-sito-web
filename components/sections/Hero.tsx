import Link from 'next/link'
import ChatBot from '@/components/ChatBot'

export default function Hero() {
  return (
    <section
      className="relative min-h-screen flex items-center"
      style={{
        background: 'linear-gradient(135deg, #0F1115 0%, #1A1D24 50%, #0F1115 100%)',
      }}
    >
      {/* Pattern decorativo */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23C5A059' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      {/* Linea decorativa verticale oro */}
      <div
        className="absolute left-0 top-0 bottom-0 w-1"
        style={{ background: 'linear-gradient(to bottom, transparent, #C5A059, transparent)' }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 py-20 w-full">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">

          {/* Colonna sinistra */}
          <div className="flex-1 text-center lg:text-left">
            <p
              className="text-xs font-semibold uppercase tracking-[0.15em] mb-6"
              style={{ color: '#C5A059' }}
            >
              Impresa Edile Leader in Lombardia
            </p>

            <h1
              className="font-extrabold leading-[1.15] mb-6"
              style={{
                fontFamily: '"Plus Jakarta Sans", sans-serif',
                fontSize: 'clamp(2.2rem, 5vw, 3.5rem)',
                color: '#F3F4F6',
              }}
            >
              Diamo Soluzioni,{' '}
              <span style={{ color: '#C5A059' }}>Costruiamo Valore.</span>
            </h1>

            <p className="mb-8 leading-[1.65] max-w-lg mx-auto lg:mx-0" style={{ color: '#9CA3AF', fontSize: '1.05rem' }}>
              Ristrutturazioni chiavi in mano, infissi, facciate, pavimentazioni e impianti.
              Da Merlino (LO), serviamo Lodi, Milano, Monza, Pavia e tutta la Lombardia.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link
                href="/contatti"
                className="font-semibold px-7 py-3.5 rounded-lg transition-colors duration-200 text-center text-sm"
                style={{ backgroundColor: '#C5A059', color: '#0F1115', borderRadius: '8px' }}
              >
                Richiedi Preventivo Gratuito
              </Link>
              <Link
                href="/servizi"
                className="font-semibold px-7 py-3.5 rounded-lg transition-colors duration-200 text-center text-sm"
                style={{
                  backgroundColor: 'transparent',
                  color: '#F3F4F6',
                  border: '1px solid rgba(255,255,255,0.2)',
                  borderRadius: '8px',
                }}
              >
                I Nostri Servizi
              </Link>
            </div>

            {/* Badge fiducia */}
            <div className="flex flex-wrap gap-6 mt-10 justify-center lg:justify-start">
              {[
                { value: '250+', label: 'Progetti' },
                { value: '100+', label: 'Clienti Soddisfatti' },
                { value: '15+', label: 'Anni di Esperienza' },
              ].map(s => (
                <div key={s.label} className="flex items-baseline gap-1.5">
                  <span
                    className="text-2xl font-bold"
                    style={{ fontFamily: '"Plus Jakarta Sans", sans-serif', color: '#C5A059' }}
                  >
                    {s.value}
                  </span>
                  <span className="text-xs uppercase tracking-wide" style={{ color: '#9CA3AF' }}>
                    {s.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Colonna destra — ChatBot */}
          <div className="flex-shrink-0 w-full lg:w-auto">
            <ChatBot />
          </div>
        </div>
      </div>
    </section>
  )
}
