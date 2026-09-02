import type { Metadata } from 'next'
import Link from 'next/link'
import { business } from '@/config/business'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Informativa sul trattamento dei dati personali ai sensi del Regolamento UE 2016/679 (GDPR).',
  alternates: { canonical: `${business.siteUrl}/privacy-policy` },
  openGraph: {
    url: `${business.siteUrl}/privacy-policy`,
    images: [{ url: `${business.siteUrl}/progetti/ristrutturazione-appartamento-lodi/camera-letto-finita.jpg`, alt: 'Diamo Soluzioni — Informativa Privacy' }],
  },
  robots: { index: true },
}

export default function PrivacyPolicyPage() {
  return (
    <>
      {/* Header */}
      <section className="py-16" style={{ backgroundColor: '#1F4852' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <nav className="flex items-center gap-2 text-xs mb-8" style={{ color: 'rgba(248,248,245,0.50)' }} aria-label="Breadcrumb">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <span style={{ color: 'rgba(248,248,245,0.85)' }}>Informativa Privacy</span>
          </nav>
          <p className="text-xs font-bold uppercase tracking-[0.18em] mb-4" style={{ color: '#F4BE12' }}>GDPR — REG. UE 2016/679</p>
          <h1 className="font-extrabold text-white" style={{ fontSize: 'clamp(1.6rem,3.5vw,2.5rem)' }}>
            Informativa sulla Privacy
          </h1>
          <p className="mt-3 text-sm" style={{ color: 'rgba(248,248,245,0.60)' }}>
            Ultimo aggiornamento: agosto 2026
          </p>
        </div>
      </section>

      {/* Contenuto */}
      <section className="py-16" style={{ backgroundColor: '#FAFAF7' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="prose prose-slate max-w-none" style={{ color: '#2C3E40' }}>

            <Section title="1. Titolare del trattamento">
              <p>Il titolare del trattamento dei dati personali è:</p>
              <Info rows={[
                ['Ragione sociale', 'Diamo Soluzioni'],
                ['Titolare', 'Murgu Pellumb'],
                ['Sede operativa', 'Via Roma 1, 26833 Merlino (LO)'],
                ['Email', 'pellumbmurgu@gmail.com'],
                ['Telefono', '+39 344 461 9461'],
                ['P.IVA', 'IT12870260960'],
              ]} />
            </Section>

            <Section title="2. Dati raccolti">
              <p>
                Tramite i moduli presenti sul sito raccogliamo i seguenti dati personali, forniti
                volontariamente dall'utente al momento della richiesta di preventivo o di contatto:
              </p>
              <ul>
                <li>Nome e cognome</li>
                <li>Numero di telefono</li>
                <li>Indirizzo email (facoltativo)</li>
                <li>Comune o zona dell'immobile</li>
                <li>Tipologia di lavoro richiesto e metratura indicativa</li>
                <li>Descrizione libera del progetto</li>
              </ul>
              <p>
                I dati di navigazione (indirizzo IP, tipo di browser, pagine visitate) vengono
                trattati in forma anonima ai soli fini tecnici di funzionamento del sito e non
                vengono conservati per profilazione.
              </p>
            </Section>

            <Section title="3. Finalità e base giuridica">
              <p>I dati sono trattati esclusivamente per:</p>
              <ul>
                <li>
                  <strong>Rispondere alle richieste di preventivo</strong> e gestire il contatto
                  commerciale con l'interessato — base giuridica: esecuzione di misure
                  precontrattuali su richiesta dell'interessato (art. 6, par. 1, lett. b GDPR).
                </li>
                <li>
                  <strong>Adempiere a obblighi di legge</strong> (es. conservazione documenti
                  contabili) — base giuridica: obbligo legale (art. 6, par. 1, lett. c GDPR).
                </li>
              </ul>
              <p>
                Non viene svolta alcuna attività di marketing, profilazione o cessione dei dati
                a terzi per scopi promozionali.
              </p>
            </Section>

            <Section title="4. Modalità di trattamento e conservazione">
              <p>
                I dati sono trattati con strumenti informatici, con misure di sicurezza adeguate
                a prevenire accessi non autorizzati. I dati dei preventivi vengono conservati per
                il tempo strettamente necessario alla gestione del rapporto commerciale e comunque
                non oltre <strong>5 anni</strong> dalla data di raccolta, salvo obblighi di legge
                che impongano termini più lunghi.
              </p>
            </Section>

            <Section title="5. Comunicazione a terzi">
              <p>
                I dati non sono ceduti, venduti o comunicati a terzi, ad eccezione dei seguenti
                fornitori tecnici strettamente necessari all'erogazione del servizio:
              </p>
              <ul>
                <li>
                  <strong>Resend Inc.</strong> (servizio di invio email — server negli USA, con
                  garanzie adeguate ai sensi dell'art. 46 GDPR)
                </li>
                <li>
                  <strong>Anthropic PBC</strong> (motore di intelligenza artificiale per
                  l'assistente preventivo — i dati sono elaborati in tempo reale e non usati per
                  addestrare modelli)
                </li>
                <li>
                  <strong>Vercel Inc.</strong> (hosting del sito web)
                </li>
              </ul>
              <p>
                Tutti i fornitori agiscono in qualità di Responsabili del trattamento ai sensi
                dell'art. 28 GDPR.
              </p>
            </Section>

            <Section title="6. Diritti dell'interessato">
              <p>
                Ai sensi degli artt. 15–22 del GDPR, l'interessato ha diritto di:
              </p>
              <ul>
                <li>Accedere ai propri dati personali (art. 15)</li>
                <li>Richiederne la rettifica (art. 16)</li>
                <li>Richiederne la cancellazione ("diritto all'oblio", art. 17)</li>
                <li>Limitare il trattamento (art. 18)</li>
                <li>Opporsi al trattamento (art. 21)</li>
                <li>Richiedere la portabilità dei dati (art. 20)</li>
                <li>
                  Proporre reclamo all'autorità di controllo italiana:{' '}
                  <strong>Garante per la protezione dei dati personali</strong> —{' '}
                  <span style={{ color: '#1F4852' }}>www.garanteprivacy.it</span>
                </li>
              </ul>
              <p>
                Per esercitare i propri diritti, è sufficiente inviare una richiesta via email a{' '}
                <a href="mailto:pellumbmurgu@gmail.com" style={{ color: '#1F4852', fontWeight: 600 }}>
                  pellumbmurgu@gmail.com
                </a>.
                Risponderemo entro 30 giorni.
              </p>
            </Section>

            <Section title="7. Cookie e analytics">
              <p>
                Il sito utilizza due categorie di cookie e tecnologie di tracciamento:
              </p>
              <ul>
                <li>
                  <strong>Cookie tecnici necessari</strong> — strettamente indispensabili al
                  funzionamento del sito (es. preferenze UI, sessione). Non richiedono consenso
                  ai sensi dell&apos;art. 122 del D.Lgs. 196/2003.
                </li>
                <li>
                  <strong>Google Analytics 4 (opzionale, previo consenso)</strong> — servizio di
                  analisi statistica delle visite fornito da Google LLC. Raccoglie dati anonimi
                  su pagine visitate, durata, provenienza e dispositivo, senza identificare
                  l&apos;utente. GA4 viene caricato <em>soltanto</em> dopo che l&apos;utente
                  clicca &quot;Accetta analytics&quot; nel banner presente sul sito. Chi clicca
                  &quot;Rifiuta&quot; non trasmette alcun dato a Google. La scelta è memorizzata
                  nel browser e può essere modificata in qualsiasi momento cancellando i dati
                  locali del sito. Informativa Google:{' '}
                  <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" style={{ color: '#1F4852', fontWeight: 600 }}>
                    policies.google.com/privacy
                  </a>.
                </li>
              </ul>
              <p>
                Non vengono utilizzati cookie di profilazione o di marketing.
              </p>
            </Section>

            <Section title="8. Comunicazione e revoca del consenso analytics">
              <p>
                Il consenso all&apos;analytics è libero, facoltativo e revocabile in qualsiasi
                momento. Per revocare: apri le impostazioni del browser, cancella i dati locali
                per il dominio <strong>www.diamosoluzioni.com</strong> — al prossimo accesso il
                banner apparirà di nuovo e potrai scegliere nuovamente.
              </p>
            </Section>

          </div>

          <div className="mt-12 pt-8 border-t" style={{ borderColor: '#ECEDE9' }}>
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm font-semibold transition-colors hover:opacity-70"
              style={{ color: '#1F4852' }}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Torna alla home
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-10">
      <h2
        className="font-bold mb-4 pb-2 border-b"
        style={{ fontSize: '1.1rem', color: '#1F4852', borderColor: '#ECEDE9' }}
      >
        {title}
      </h2>
      <div className="space-y-3 text-sm leading-relaxed" style={{ color: '#3D4F50' }}>
        {children}
      </div>
    </div>
  )
}

function Info({ rows }: { rows: [string, string][] }) {
  return (
    <table className="mt-3 text-sm w-full border-collapse">
      <tbody>
        {rows.map(([label, value]) => (
          <tr key={label} style={{ borderBottom: '1px solid #ECEDE9' }}>
            <td className="py-2 pr-4 font-semibold whitespace-nowrap" style={{ color: '#1F4852', width: '40%' }}>{label}</td>
            <td className="py-2" style={{ color: '#3D4F50' }}>{value}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
