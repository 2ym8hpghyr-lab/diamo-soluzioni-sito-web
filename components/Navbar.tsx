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
    <header className="bg-brand-dark text-white sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/images/logo.jpg" alt="Diamo Soluzioni" width={48} height={48} className="rounded" />
          <div>
            <p className="font-black text-sm uppercase leading-none">Diamo Soluzioni</p>
            <p className="text-brand-accent text-xs uppercase tracking-widest">Costruiamo Valore</p>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          {links.map(l => (
            <Link key={l.href} href={l.href} className="hover:text-brand-accent transition">
              {l.label}
            </Link>
          ))}
          <Link
            href="/contatti"
            className="bg-brand-accent text-brand-dark font-bold px-4 py-2 rounded-lg hover:opacity-90 transition text-sm"
          >
            Richiedi un Preventivo →
          </Link>
        </nav>

        <button className="md:hidden text-white" onClick={() => setOpen(!open)}>
          {open ? '✕' : '☰'}
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-brand-dark border-t border-white/10 px-4 pb-4 flex flex-col gap-3 text-sm">
          {links.map(l => (
            <Link key={l.href} href={l.href} className="py-2 hover:text-brand-accent" onClick={() => setOpen(false)}>
              {l.label}
            </Link>
          ))}
          <Link
            href="/contatti"
            className="bg-brand-accent text-brand-dark font-bold px-4 py-2 rounded-lg text-center"
            onClick={() => setOpen(false)}
          >
            Richiedi un Preventivo →
          </Link>
        </div>
      )}
    </header>
  )
}
