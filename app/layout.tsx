import type { Metadata } from 'next'
import Script from 'next/script'
import localFont from 'next/font/local'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});

export const metadata: Metadata = {
  title: {
    default: 'Diamo Soluzioni — Impresa Edile Merlino (LO)',
    template: '%s | Diamo Soluzioni',
  },
  description:
    'Impresa edile specializzata in ristrutturazioni, pavimentazioni, impianti e costruzioni a Merlino (LO), Lodi, Lombardia. Preventivo gratuito.',
  keywords: ['impresa edile Merlino', 'ristrutturazioni Lodi', 'pavimentazioni Lodi', 'impianti idraulici Lodi'],
  openGraph: {
    siteName: 'Diamo Soluzioni',
    locale: 'it_IT',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="it">
      <Script
        id="schema-local-business"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'LocalBusiness',
            name: 'Diamo Soluzioni',
            description: 'Impresa edile specializzata in ristrutturazioni complete, pavimentazioni e impianti a Merlino (LO)',
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
            areaServed: ['Merlino', 'Lodi', 'Melegnano', 'Lombardia'],
          }),
        }}
      />
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
