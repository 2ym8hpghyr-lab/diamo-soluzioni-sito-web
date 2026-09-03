'use client'
import { CONSENT_SETTINGS_EVENT } from '@/config/consent'

export default function CookieSettingsButton() {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new Event(CONSENT_SETTINGS_EVENT))}
      className="hover:text-graphite transition-colors"
    >
      Impostazioni cookie
    </button>
  )
}
