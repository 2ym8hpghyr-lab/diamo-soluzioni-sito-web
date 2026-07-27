import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-brand-dark text-white py-12">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="flex flex-col gap-2">
          <a href="tel:+393444619461" className="flex items-center gap-2 text-sm hover:text-brand-accent transition">
            📞 +39 344 461 9461
          </a>
        </div>
        <div className="flex flex-col gap-2">
          <a href="mailto:pellumbmurgu@gmail.com" className="flex items-center gap-2 text-sm hover:text-brand-accent transition">
            ✉ pellumbmurgu@gmail.com
          </a>
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-sm text-gray-400">📍 Merlino (LO), Lombardia, Italia</p>
        </div>
        <div className="flex gap-4">
          <Link href="https://instagram.com" target="_blank" className="hover:text-brand-accent transition text-lg">📸</Link>
          <Link href="https://facebook.com" target="_blank" className="hover:text-brand-accent transition text-lg">👍</Link>
        </div>
      </div>
      <div className="max-w-6xl mx-auto px-4 mt-8 pt-4 border-t border-white/10 text-xs text-gray-500 flex flex-col md:flex-row justify-between gap-2">
        <p>© 2026 DIAMO SOLUZIONI DI MURGU PELLUMB — P.IVA 12870260960</p>
        <p>Sede: Merlino (LO), Lombardia, Italia</p>
      </div>
    </footer>
  )
}
