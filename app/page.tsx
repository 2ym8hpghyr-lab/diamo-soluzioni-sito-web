import type { Metadata } from 'next'
import { business } from '@/config/business'
import Hero from '@/components/sections/Hero'
import TrustStrip from '@/components/sections/TrustStrip'
import Services from '@/components/sections/Services'
import Process from '@/components/sections/Process'
import ProjectsPreview from '@/components/sections/ProjectsPreview'
import Reviews from '@/components/sections/Reviews'
import FinalCTA from '@/components/sections/FinalCTA'

export const metadata: Metadata = {
  alternates: { canonical: business.siteUrl },
  openGraph: { url: business.siteUrl },
}

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustStrip />
      <Services />
      <Process />
      <ProjectsPreview />
      <Reviews />
      <FinalCTA />
    </>
  )
}
