import type { Metadata } from 'next'
import Script from 'next/script'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: {
    default: 'Diamo Soluzioni — Impresa Edile Merlino (LO) | Ristrutturazioni Lodi e Milano',
    template: '%s | Diamo Soluzioni',
  },
  description:
    'Impresa edile specializzata in ristrutturazioni chiavi in mano, infissi, imbiancatura, facciate e pavimentazioni a Merlino (LO), Lodi, Milano, Monza, Pavia, Crema, San Donato Milanese, Melegnano e tutta la Lombardia. Preventivo gratuito.',
  keywords: [
    'impresa edile Merlino', 'ristrutturazioni Lodi', 'ristrutturazioni Milano',
    'ristrutturazioni chiavi in mano Lodi', 'rifacimento facciate Monza',
    'cappotto termico Pavia', 'infissi serramenti Crema', 'pavimentazioni Lodi',
    'imbiancatura tinteggiatura Milano', 'impianti idraulici Lodi',
    'impresa edile San Donato Milanese', 'ristrutturazioni Melegnano',
    'impresa edile Lombardia', 'ristrutturazione appartamento Lodi',
  ],
  openGraph: {
    siteName: 'Diamo Soluzioni',
    locale: 'it_IT',
    type: 'website',
    title: 'Diamo Soluzioni — Impresa Edile Leader in Lombardia',
    description: 'Ristrutturazioni complete, infissi, facciate, pavimentazioni a Lodi, Milano e tutta la Lombardia.',
  },
}

const schemaData = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'Diamo Soluzioni',
  description: 'Impresa edile specializzata in ristrutturazioni complete, infissi, imbiancatura, facciate e pavimentazioni. Sede a Merlino (LO), operiamo in tutta la Lombardia.',
  url: 'https://www.diamosoluzioni.it',
  telephone: '+393444619461',
  email: 'pellumbmurgu@gmail.com',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Via Roma 1',
    addressLocality: 'Merlino',
    addressRegion: 'LO',
    postalCode: '26833',
    addressCountry: 'IT',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 45.4039,
    longitude: 9.5072,
  },
  openingHoursSpecification: {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    opens: '08:00',
    closes: '18:00',
  },
  priceRange: '€€',
  areaServed: [
    'Merlino', 'Lodi', 'Milano', 'Monza', 'Pavia', 'Crema',
    'San Donato Milanese', 'Melegnano', 'Lombardia',
  ],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Servizi Edili',
    itemListElement: [
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Ristrutturazioni Chiavi in Mano' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Infissi e Serramenti' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Imbiancatura e Tinteggiatura' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Facciate e Cappotto Termico' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Pavimentazioni e Rivestimenti' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Impianti Idraulici ed Elettrici' } },
    ],
  },
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="it">
      <Script
        id="schema-local-business"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />
      <body className="antialiased">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
