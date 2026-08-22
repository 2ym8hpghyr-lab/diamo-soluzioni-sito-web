import type { Metadata } from 'next'
import { Manrope } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import MobileActionBar from '@/components/MobileActionBar'
import { business } from '@/config/business'

const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-manrope',
  display: 'swap',
  weight: ['400', '500', '600', '700', '800'],
})

const siteUrl = business.siteUrl

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Diamo Soluzioni — Impresa Edile a Merlino (Lodi)',
    template: '%s | Diamo Soluzioni',
  },
  description:
    'Impresa edile a Merlino (LO). Ristrutturazioni complete, pavimentazioni, infissi, facciate e impianti a Lodi, Melegnano e Milano Sud. Sopralluogo gratuito.',
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    siteName: 'Diamo Soluzioni',
    locale: 'it_IT',
    type: 'website',
    url: siteUrl,
    title: 'Diamo Soluzioni — Impresa Edile a Merlino (Lodi)',
    description:
      'Ristrutturazioni, pavimentazioni, infissi e impianti a Lodi e Milano Sud. Sopralluogo gratuito, preventivo chiaro.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

const schemaOrg = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebSite',
      '@id': `${siteUrl}/#website`,
      url: siteUrl,
      name: business.name,
      inLanguage: 'it-IT',
    },
    {
      '@type': ['LocalBusiness', 'HomeAndConstructionBusiness'],
      '@id': `${siteUrl}/#business`,
      name: business.name,
      legalName: business.legalName,
      url: siteUrl,
      telephone: business.phone.primaryRaw,
      email: business.email,
      vatID: business.vatId,
      address: {
        '@type': 'PostalAddress',
        streetAddress: business.address.street,
        addressLocality: business.address.city,
        addressRegion: business.address.province,
        postalCode: business.address.postalCode,
        addressCountry: business.address.country,
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: business.geo.latitude,
        longitude: business.geo.longitude,
      },
      openingHoursSpecification: business.hours.schema.map(h => ({
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: h.dayOfWeek,
        opens: h.opens,
        closes: h.closes,
      })),
      priceRange: '€€',
      areaServed: business.areas.map(area => ({
        '@type': 'City',
        name: area,
      })),
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Servizi Edili',
        itemListElement: [
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Ristrutturazioni Chiavi in Mano' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Rifacimento Bagno' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Pavimentazioni e Rivestimenti' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Infissi e Serramenti' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Facciate e Cappotto Termico' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Tinteggiatura' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Impianti Idraulici' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Impianti Elettrici' } },
        ],
      },
    },
  ],
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="it" className={manrope.variable}>
      <body className="antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrg) }}
        />
        <Navbar />
        <main>{children}</main>
        <Footer />
        <MobileActionBar />
      </body>
    </html>
  )
}
