import { CONSENT_KEY } from '@/config/consent'

type GtagFn = (...args: unknown[]) => void

export function trackEvent(name: string, params?: Record<string, unknown>) {
  if (typeof window === 'undefined') return
  if (localStorage.getItem(CONSENT_KEY) !== 'true') return
  const w = window as unknown as { gtag?: GtagFn }
  if (w.gtag) w.gtag('event', name, params)
}
