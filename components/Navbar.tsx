'use client'
import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'

const links = [
  { href: '/', label: 'Home' },
  { href: '/chi-siamo', label: 'Chi Siamo' },
  { href: '/servizi', label: 'Servizi' },
  { href: '/progetti', label: 'Progetti' },
  { href: '/contatti', label: 'Contatti' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  return (
    <header
      className="sticky top-0 z-50 border-b"
      style={{
        backgroundColor: 'rgba(15, 17, 21, 0.92)',
        backdropFilter: 'blur(12px)',
        borderColor: 'rgba(255,255,255,0.08)',
      }}
    >
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <Image src="/images/logo.jpg" alt="Diamo Soluzioni" width={44} height={44} className="rounded-lg" />
          <div>
            <p className="font-black text-sm uppercase leading-none text-brand-text tracking-wide" style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}>
              Diamo Soluzioni
            </p>
            <p className="text-xs uppercase tracking-widest" style={{ color: '#C5A059' }}>
              Costruiamo Valore
            </p>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          {links.map(l => (
            <Link
              key={l.href}
              href={l.href}
              className="text-brand-muted hover:text-brand-text transition-colors duration-200"
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/contatti"
            className="font-semibold px-5 py-2 rounded-lg transition-colors duration-200 text-sm"
            style={{ backgroundColor: '#C5A059', color: '#0F1115' }}
            onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#D4AF37')}
            onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#C5A059')}
          >
            Preventivo Gratuito →
          </Link>
        </nav>

        <button className="md:hidden text-brand-text text-xl" onClick={() => setOpen(!open)} aria-label="Menu">
          {open ? '✕' : '☰'}
        </button>
      </div>

      {open && (
        <div
          className="md:hidden border-t px-4 pb-4 flex flex-col gap-3 text-sm"
          style={{ borderColor: 'rgba(255,255,255,0.08)', backgroundColor: '#0F1115' }}
        >
          {links.map(l => (
            <Link
              key={l.href}
              href={l.href}
              className="py-2 text-brand-muted hover:text-brand-text border-b transition-colors"
              style={{ borderColor: 'rgba(255,255,255,0.06)' }}
              onClick={() => setOpen(false)}
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/contatti"
            className="font-semibold px-4 py-3 rounded-lg text-center mt-1"
            style={{ backgroundColor: '#C5A059', color: '#0F1115' }}
            onClick={() => setOpen(false)}
          >
            Preventivo Gratuito →
          </Link>
        </div>
      )}
    </header>
  )
}
