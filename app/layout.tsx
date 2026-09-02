import type { Metadata } from 'next'
import { Manrope } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import MobileActionBar from '@/components/MobileActionBar'
import GoogleAnalytics from '@/components/GoogleAnalytics'
import CookieBanner from '@/components/CookieBanner'
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
    default: 'Ristrutturazioni Lodi | Impresa Edile | Diamo Soluzioni',
    template: '%s | Diamo Soluzioni',
  },
  description:
    'Impresa edile a Lodi e Milano Sud. Ristrutturazioni complete, pavimentazioni, infissi e impianti. Referente unico, preventivo scritto, sopralluogo gratuito.',
  openGraph: {
    siteName: 'Diamo Soluzioni',
    locale: 'it_IT',
    type: 'website',
    url: siteUrl,
    title: 'Ristrutturazioni Lodi | Impresa Edile | Diamo Soluzioni',
    description:
      'Impresa edile a Lodi e Milano Sud. Ristrutturazioni complete, pavimentazioni, infissi e impianti con un unico referente. Preventivo scritto, sopralluogo gratuito.',
    images: [
      {
        url: `${siteUrl}/progetti/ristrutturazione-appartamento-lodi/camera-letto-finita.jpg`,
        width: 1200,
        height: 630,
        alt: 'Diamo Soluzioni — Ristrutturazioni a Lodi e Milano Sud',
      },
    ],
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
      sameAs: [business.social.googleBusiness],
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
      <head />
      <body className="antialiased">
        <GoogleAnalytics />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrg) }}
        />
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-gold focus:text-graphite focus:font-bold focus:rounded-lg"
        >
          Vai al contenuto principale
        </a>
        <Navbar />
        <main id="main-content">{children}</main>
        <Footer />
        <MobileActionBar />
        <CookieBanner />
      </body>
    </html>
  )
}
