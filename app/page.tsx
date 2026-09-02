import type { Metadata } from 'next'
import { business } from '@/config/business'
import Hero from '@/components/sections/Hero'
import TrustStrip from '@/components/sections/TrustStrip'
import Process from '@/components/sections/Process'
import ProjectsPreview from '@/components/sections/ProjectsPreview'
import Reviews from '@/components/sections/Reviews'
import Areas from '@/components/sections/Areas'
import FinalCTA from '@/components/sections/FinalCTA'

export const metadata: Metadata = {
  alternates: { canonical: business.siteUrl },
  openGraph: {
    url: business.siteUrl,
    images: [{ url: `${business.siteUrl}/progetti/ristrutturazione-appartamento-lodi/camera-letto-finita.jpg`, alt: 'Diamo Soluzioni — Ristrutturazioni a Lodi e Milano Sud' }],
  },
}

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustStrip />
      <Process />
      <ProjectsPreview />
      <Reviews />
      <Areas />
      <FinalCTA />
    </>
  )
}
