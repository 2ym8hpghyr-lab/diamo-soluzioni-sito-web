import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { business } from '@/config/business'

export const metadata: Metadata = {
  title: 'Chi Siamo',
  description: 'Diamo Soluzioni è un\'impresa edile con sede a Merlino (LO). Ristrutturazioni complete, pavimentazioni, infissi e impianti in provincia di Lodi e Milano Sud.',
  alternates: { canonical: `${business.siteUrl}/chi-siamo` },
  openGraph: { url: `${business.siteUrl}/chi-siamo` },
}

const trustItems = [
  { label: 'Un solo referente', desc: 'Pellumb segue ogni cantiere dall\'inizio alla consegna.' },
  { label: 'Preventivi chiari', desc: 'Scritti, dettagliati, senza voci nascoste.' },
  { label: 'Lavori coordinati', desc: 'Ogni fase pianificata e comunicata in anticipo.' },
  { label: 'Cura dei dettagli', desc: 'Consegniamo solo quando il lavoro è fatto bene.' },
]

const principi = [
  'Preventivo scritto prima di iniziare — nessuna sorpresa sul prezzo finale.',
  'Un cantiere ordinato: puliamo ogni giorno, rispettiamo i tuoi spazi.',
  'Aggiornamenti costanti: sai cosa sta succedendo senza dover chiamare.',
  'Materiali di qualità selezionati insieme, con fornitori locali fidati.',
  'Dichiarazioni di conformità per ogni impianto realizzato.',
]

export default function ChiSiamoPage() {
  return (
    <>
      {/* Hero full-bleed */}
      <section
        className="relative overflow-hidden"
        style={{ height: 'clamp(620px,78vh,820px)' }}
        aria-label="Chi siamo hero"
      >
        <Image
          src="/assets/diamo/chi-siamo-hero-premium.webp"
          alt=""
          fill
          priority
          className="object-cover chi-siamo-hero"
          sizes="100vw"
        />
        <div
          className="absolute inset-0"
          aria-hidden
          style={{ background: 'linear-gradient(90deg,rgba(21,54,62,0.95) 0%,rgba(21,54,62,0.82) 40%,rgba(21,54,62,0.45) 65%,rgba(21,54,62,0.10) 100%)' }}
        />
        <div className="absolute inset-0 flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full">
            <nav className="flex items-center gap-2 text-xs text-white/50 mb-8" aria-label="Breadcrumb">
              <Link href="/" className="hover:text-white/80 transition-colors">Home</Link>
              <span>/</span>
              <span className="text-white/80">Chi siamo</span>
            </nav>
            <p className="text-xs font-bold uppercase tracking-[0.18em] mb-5" style={{ color: '#F4BE12' }}>LA NOSTRA STORIA</p>
            <div className="w-10 h-0.5 mb-7" style={{ backgroundColor: '#B88A32' }} aria-hidden />
            <h1
              className="font-extrabold leading-[1.1] text-white mb-6 max-w-2xl"
              style={{ fontSize: 'clamp(2rem,4vw,3.2rem)' }}
            >
              Costruiamo soluzioni<br />
              <span style={{ color: '#F4BE12' }}>destinate a durare.</span>
            </h1>
            <p className="text-lg text-white/70 max-w-xl leading-relaxed mb-10">
              Siamo un&apos;impresa edile con sede a Merlino (LO). Seguiamo ristrutturazioni, pavimentazioni,
              impianti e riparazioni in provincia di Lodi e Milano Sud, con un unico referente dall&apos;idea alla consegna.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="/contatti"
                className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl font-bold text-sm transition-all hover:-translate-y-0.5"
                style={{ backgroundColor: '#F4BE12', color: '#1E2A2E' }}
              >
                Raccontaci il tuo progetto
              </Link>
              <Link
                href="/#preventivatore"
                className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl font-semibold text-sm border border-white/30 text-white hover:border-gold hover:text-gold transition-all"
              >
                Scopri come lavoriamo
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Fascia fiducia 4 colonne */}
      <section style={{ backgroundColor: '#1E2A2E' }} aria-label="Punti di forza">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {trustItems.map(item => (
              <div key={item.label} className="flex flex-col gap-2">
                <div className="w-6 h-0.5" style={{ backgroundColor: '#B88A32' }} aria-hidden />
                <p className="font-bold text-white text-sm leading-snug">{item.label}</p>
                <p className="text-xs leading-relaxed" style={{ color: 'rgba(248,248,245,0.60)' }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Storia editoriale */}
      <section className="py-20 bg-white relative overflow-hidden" aria-labelledby="storia-heading">
        <div
          className="absolute inset-0 pointer-events-none select-none"
          aria-hidden
          style={{
            backgroundImage: "url('/assets/diamo/chi-siamo-attrezzi-bg.webp')",
            backgroundSize: 'cover',
            backgroundPosition: 'center center',
            backgroundRepeat: 'no-repeat',
            mixBlendMode: 'multiply',
            opacity: 0.85,
            zIndex: 0,
          }}
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6" style={{ zIndex: 10 }}>
          <div className="max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-[0.18em] mb-3" style={{ color: '#B88A32' }}>Come siamo nati</p>
            <h2 id="storia-heading" className="font-extrabold mb-6" style={{ color: '#1E2A2E', fontSize: 'clamp(1.5rem,3vw,2.2rem)' }}>
              Un&apos;impresa costruita sul lavoro concreto.
            </h2>
            <div className="space-y-5 text-gray-600 leading-relaxed">
              <p>
                Diamo Soluzioni nasce a Merlino, nel Lodigiano, con un obiettivo semplice: fare lavori edili come si deve.
                Senza intermediari, senza subappalti nascosti, senza sorprese in fattura.
              </p>
              <p>
                Il nostro referente principale è Pellumb Murgu, che segue ogni cantiere dall&apos;inizio alla consegna.
                Chi ci chiama sa con chi parla, chi viene in cantiere e chi consegna le chiavi.
              </p>
              <p>
                Operiamo in provincia di Lodi e nell&apos;area di Milano Sud: Melegnano, San Donato, Paullo, Crema e zone limitrofe.
                La nostra crescita è avvenuta attraverso il passaparola — la testimonianza più concreta del lavoro fatto bene.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Metodo in 3 fasi */}
      <section style={{ backgroundColor: '#F8F8F5' }} aria-labelledby="metodo-heading" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <p className="text-xs font-bold uppercase tracking-[0.18em] mb-3" style={{ color: '#B88A32' }}>Il nostro metodo</p>
          <h2 id="metodo-heading" className="font-extrabold mb-12" style={{ color: '#1E2A2E', fontSize: 'clamp(1.4rem,2.5vw,2rem)' }}>
            Tre fasi, zero ambiguità.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { num: '01', title: 'Ascolto e sopralluogo', desc: 'Veniamo a vedere lo spazio di persona, ascoltiamo le tue esigenze e valutiamo le condizioni reali. Nessun impegno.' },
              { num: '02', title: 'Preventivo scritto', desc: 'Ricevi un preventivo dettagliato con materiali, tempi e costi chiari. Ogni variazione viene concordata prima di essere eseguita.' },
              { num: '03', title: 'Realizzazione e consegna', desc: 'Lavoriamo con ordine, ti aggiorniamo ad ogni fase. Consegniamo solo quando sei soddisfatto e tutto è verificato.' },
            ].map(fase => (
              <div key={fase.num} className="flex gap-5">
                <span
                  className="text-5xl font-black flex-shrink-0 leading-none select-none"
                  style={{ color: 'rgba(184,138,50,0.25)', fontVariantNumeric: 'tabular-nums' }}
                >
                  {fase.num}
                </span>
                <div className="pt-1">
                  <h3 className="font-bold text-graphite mb-2 leading-snug">{fase.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{fase.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Principi — lista scura con divisori */}
      <section style={{ backgroundColor: '#1E2A2E' }} aria-labelledby="principi-heading" className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <p className="text-xs font-bold uppercase tracking-[0.18em] mb-3" style={{ color: '#B88A32' }}>I nostri principi</p>
          <h2 id="principi-heading" className="font-extrabold text-white mb-10" style={{ fontSize: 'clamp(1.4rem,2.5vw,2rem)' }}>
            Cosa ci impegniamo a fare su ogni cantiere.
          </h2>
          <ul>
            {principi.map((p, i) => (
              <li key={i}>
                <div className="flex items-start gap-4 py-5">
                  <span className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5" style={{ backgroundColor: 'rgba(184,138,50,0.20)', border: '1px solid rgba(184,138,50,0.40)' }}>
                    <svg className="w-2.5 h-2.5" fill="none" stroke="#B88A32" viewBox="0 0 24 24" aria-hidden>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                  <p className="text-sm leading-relaxed" style={{ color: 'rgba(248,248,245,0.80)' }}>{p}</p>
                </div>
                {i < principi.length - 1 && <div style={{ height: '1px', backgroundColor: 'rgba(248,248,245,0.08)' }} aria-hidden />}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Divisore ottone */}
      <div
        aria-hidden
        style={{
          backgroundColor: '#1E2A2E',
          padding: '0 1.5rem',
        }}
      >
        <div
          style={{
            maxWidth: '48rem',
            margin: '0 auto',
            height: '1px',
            background: 'linear-gradient(90deg, transparent 0%, #B88A32 20%, #F4BE12 50%, #B88A32 80%, transparent 100%)',
          }}
        />
      </div>

      {/* CTA territoriale finale */}
      <section className="py-16" style={{ backgroundColor: '#1E2A2E' }} aria-labelledby="cta-chi-heading">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="p-8 rounded-2xl" style={{ backgroundColor: 'rgba(248,248,245,0.06)', border: '1px solid rgba(248,248,245,0.10)' }}>
            <p className="text-xs font-bold uppercase tracking-[0.18em] mb-3" style={{ color: '#F4BE12' }}>Operiamo a Lodi e Milano Sud</p>
            <h2 id="cta-chi-heading" className="font-extrabold mb-4 text-white" style={{ fontSize: 'clamp(1.3rem,2.5vw,1.8rem)' }}>
              Sei nella nostra zona? Parliamo.
            </h2>
            <p className="text-sm leading-relaxed mb-7" style={{ color: 'rgba(248,248,245,0.65)' }}>
              Copriamo Merlino, Lodi, Melegnano, San Donato Milanese, Paullo, Crema e comuni limitrofi.
              Sopralluogo gratuito senza impegno, preventivo scritto entro 48 ore.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="/contatti"
                className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl font-bold text-sm transition-all hover:-translate-y-0.5"
                style={{ backgroundColor: '#F4BE12', color: '#1E2A2E' }}
              >
                Richiedi il sopralluogo gratuito
              </Link>
              <a
                href={`tel:${business.phone.primaryRaw}`}
                className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl font-semibold text-sm transition-all"
                style={{ border: '1px solid rgba(248,248,245,0.25)', color: '#F8F8F5' }}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                {business.phone.primary}
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
