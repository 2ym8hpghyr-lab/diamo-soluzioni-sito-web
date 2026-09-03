'use client'
import { useEffect, useState } from 'react'
import Script from 'next/script'
import {
  CONSENT_KEY,
  CONSENT_ACCEPTED_EVENT,
  CONSENT_REVOKED_EVENT,
} from '@/config/consent'

const GA_ID = process.env.NEXT_PUBLIC_GA_ID

type GtagFn = (...args: unknown[]) => void

export default function GoogleAnalytics() {
  const [consented, setConsented] = useState(false)

  useEffect(() => {
    // Legge la scelta già espressa
    if (localStorage.getItem(CONSENT_KEY) === 'true') setConsented(true)

    const onAccept = () => setConsented(true)
    const onRevoke = () => {
      setConsented(false)
      // Notifica GA4 via Consent Mode: smette di raccogliere dati nella sessione corrente
      const w = window as unknown as { gtag?: GtagFn }
      if (w.gtag) w.gtag('consent', 'update', { analytics_storage: 'denied' })
    }

    window.addEventListener(CONSENT_ACCEPTED_EVENT, onAccept)
    window.addEventListener(CONSENT_REVOKED_EVENT, onRevoke)
    return () => {
      window.removeEventListener(CONSENT_ACCEPTED_EVENT, onAccept)
      window.removeEventListener(CONSENT_REVOKED_EVENT, onRevoke)
    }
  }, [])

  if (!GA_ID || !consented) return null

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
      <Script id="ga4-init" strategy="afterInteractive">{`
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${GA_ID}');
      `}</Script>
    </>
  )
}
