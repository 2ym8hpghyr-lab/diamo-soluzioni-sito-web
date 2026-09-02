'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function CookieBanner() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (localStorage.getItem('analytics_consent') === null) setVisible(true)
    const handler = () => setVisible(true)
    window.addEventListener('open-cookie-settings', handler)
    return () => window.removeEventListener('open-cookie-settings', handler)
  }, [])

  const accept = () => {
    localStorage.setItem('analytics_consent', 'true')
    window.dispatchEvent(new Event('cookie-consent'))
    setVisible(false)
  }

  const reject = () => {
    localStorage.setItem('analytics_consent', 'false')
    setVisible(false)
  }

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-50 p-4 sm:p-5"
      role="region"
      aria-label="Gestione consenso cookie"
      aria-hidden={!visible}
      style={{
        transform: visible ? 'translateY(0)' : 'translateY(110%)',
        transition: 'transform 300ms ease-out',
        pointerEvents: visible ? 'auto' : 'none',
      }}
    >
      <div
        className="max-w-3xl mx-auto rounded-2xl shadow-2xl px-5 py-5 space-y-4"
        style={{ backgroundColor: '#1E2A2E', color: 'white' }}
      >
        <div>
          <p className="text-sm font-bold mb-1.5" style={{ color: 'white' }}>
            Informativa sui cookie
          </p>
          <p className="text-sm leading-relaxed" style={{ color: 'rgba(248,248,245,0.75)' }}>
            Questo sito usa cookie tecnici necessari al funzionamento. Vorremmo usare anche{' '}
            <strong style={{ color: 'rgba(248,248,245,0.9)' }}>Google Analytics</strong> per analizzare le
            visite in forma anonima e migliorare il sito. Nessun dato è usato per profilazione
            o advertising.{' '}
            <Link
              href="/privacy-policy"
              className="underline underline-offset-2 hover:opacity-80 transition-opacity"
              style={{ color: '#F4BE12' }}
            >
              Privacy policy
            </Link>
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2">
          <button
            onClick={accept}
            className="flex-1 px-5 py-2.5 rounded-xl font-bold text-sm hover:opacity-90 transition-opacity"
            style={{ backgroundColor: '#F4BE12', color: '#1E2A2E' }}
          >
            Accetta analytics
          </button>
          <button
            onClick={reject}
            className="flex-1 px-5 py-2.5 rounded-xl font-semibold text-sm hover:opacity-90 transition-opacity border"
            style={{ backgroundColor: 'transparent', color: 'rgba(248,248,245,0.75)', borderColor: 'rgba(248,248,245,0.25)' }}
          >
            Rifiuta
          </button>
        </div>
      </div>
    </div>
  )
}
