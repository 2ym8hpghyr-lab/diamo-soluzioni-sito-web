// Sorgente unica per le costanti di consenso.
// Usata da CookieBanner, GoogleAnalytics e CookieSettingsButton
// in modo che un refactor dei nomi si propaghi ovunque.

/** Chiave localStorage per il consenso analytics */
export const CONSENT_KEY = 'analytics_consent'

/** Evento emesso quando l'utente accetta analytics */
export const CONSENT_ACCEPTED_EVENT = 'cookie-consent'

/** Evento emesso quando l'utente rifiuta o revoca analytics */
export const CONSENT_REVOKED_EVENT = 'cookie-consent-revoked'

/** Evento emesso per riaprire il banner cookie */
export const CONSENT_SETTINGS_EVENT = 'open-cookie-settings'

export type ConsentState = 'accepted' | 'rejected' | null

/** Legge lo stato di consenso da localStorage. null = non ancora scelto. */
export function readConsentState(): ConsentState {
  if (typeof window === 'undefined') return null
  const val = window.localStorage.getItem(CONSENT_KEY)
  if (val === null) return null
  return val === 'true' ? 'accepted' : 'rejected'
}

/** Salva il consenso e notifica tutti i listener tramite evento custom. */
export function writeConsentState(accepted: boolean): void {
  if (typeof window === 'undefined') return
  window.localStorage.setItem(CONSENT_KEY, String(accepted))
  const event = accepted ? CONSENT_ACCEPTED_EVENT : CONSENT_REVOKED_EVENT
  window.dispatchEvent(new Event(event))
}
