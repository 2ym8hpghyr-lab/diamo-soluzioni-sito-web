import Link from 'next/link'
import Image from 'next/image'
import { services } from '@/data/services'

const servicePhotos: Record<string, string> = {
  'ristrutturazioni-chiavi-in-mano': '/illustrazioni/ristrutturazioni.png',
  'ristrutturazione-bagno':          '/illustrazioni/bagno.png',
  'pavimentazioni-rivestimenti':     '/illustrazioni/pavimentazioni.png',
  'infissi-serramenti':              '/illustrazioni/infissi.png',
  'facciate-cappotto-termico':       '/illustrazioni/facciate.png',
  'tinteggiatura':                   '/illustrazioni/tinteggiatura.png',
  'impianti-idraulici':              '/illustrazioni/impianti-idraulici.png',
  'impianti-elettrici':              '/illustrazioni/impianti-elettrici.png',
}

const icons: Record<string, React.ReactNode> = {
  house: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.25 12l8.954-8.955a1.5 1.5 0 012.122 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
    </svg>
  ),
  droplets: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 3c-4.418 0-8 3.582-8 8 0 4.419 3.582 8 8 8s8-3.581 8-8c0-4.418-3.582-8-8-8z" />
    </svg>
  ),
  grid: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
    </svg>
  ),
  'square-dashed': (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15" />
    </svg>
  ),
  layers: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6.429 9.75L2.25 12l4.179 2.25m0-4.5l5.571 3 5.571-3m-11.142 0L2.25 7.5 12 2.25l9.75 5.25-4.179 2.25m0 0L21.75 12l-4.179 2.25m0 0l4.179 2.25L12 21.75 2.25 16.5l4.179-2.25m11.142 0l-5.571 3-5.571-3" />
    </svg>
  ),
  paintbrush: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42" />
    </svg>
  ),
  zap: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
    </svg>
  ),
  bolt: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z" />
    </svg>
  ),
}

export default function Services() {
  return (
    <section
      className="services-section py-20 bg-white relative overflow-hidden"
      aria-labelledby="services-heading"
    >
      {/* Sfondo panoramico — si estende 120px sotto il fondo della sezione (overflow:hidden la clippa).
          Così il bianco/suolo cade fuori dalla clip e la costruzione riempie il fondo visibile. */}
      <div
        className="services-bg absolute pointer-events-none select-none"
        aria-hidden
        style={{ top: 0, left: 0, right: 0, bottom: '-120px', zIndex: 0 }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative" style={{ zIndex: 10 }}>

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-gold mb-3">Cosa facciamo</p>
            <h2
              id="services-heading"
              className="font-extrabold text-graphite"
              style={{ fontSize: 'clamp(1.6rem, 3vw, 2.2rem)' }}
            >
              Un interlocutore, tutte le competenze
            </h2>
          </div>
          <Link
            href="/servizi"
            className="text-sm font-semibold text-teal hover:text-teal-dark transition-colors flex-shrink-0 flex items-center gap-1"
          >
            Tutti i servizi
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        {/* Card grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {services.map(service => {
            const photo = servicePhotos[service.slug]
            return (
              <Link
                key={service.slug}
                href={`/servizi/${service.slug}`}
                className="ds-card group rounded-2xl hover:shadow-card-hover transition-all bg-warm-white hover:bg-white overflow-hidden flex flex-col"
              >
                {photo && (
                  <div className="relative h-40 overflow-hidden flex-shrink-0">
                    <Image
                      src={photo}
                      alt={service.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />
                  </div>
                )}
                <div className="p-5 flex flex-col flex-1">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center mb-4 text-teal transition-colors group-hover:bg-teal group-hover:text-white flex-shrink-0"
                    style={{ backgroundColor: 'rgba(31,72,82,0.08)' }}
                  >
                    {icons[service.icon] ?? <span className="text-sm font-bold">{service.name.charAt(0)}</span>}
                  </div>
                  <h3 className="font-bold text-graphite text-sm mb-2 group-hover:text-teal transition-colors leading-tight">
                    {service.name}
                  </h3>
                  <p className="text-xs text-gray-500 leading-relaxed flex-1">{service.shortDesc}</p>
                  <div className="mt-4 flex items-center gap-1 text-xs font-semibold text-teal opacity-0 group-hover:opacity-100 transition-opacity">
                    Scopri
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>

      </div>
    </section>
  )
}
