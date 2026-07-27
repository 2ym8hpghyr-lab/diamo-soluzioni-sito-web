import type { Metadata } from 'next'
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
