type GtagFn = (...args: unknown[]) => void

export function trackEvent(name: string, params?: Record<string, unknown>) {
  if (typeof window === 'undefined') return
  const w = window as unknown as { gtag?: GtagFn }
  if (w.gtag) w.gtag('event', name, params)
}
