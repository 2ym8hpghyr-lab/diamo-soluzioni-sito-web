'use client'

export default function CookieSettingsButton() {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new Event('open-cookie-settings'))}
      className="hover:text-graphite transition-colors"
    >
      Impostazioni cookie
    </button>
  )
}
