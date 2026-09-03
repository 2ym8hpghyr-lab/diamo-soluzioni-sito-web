import type { Metadata } from 'next'
import dynamic from 'next/dynamic'
import { business } from '@/config/business'
import Hero from '@/components/sections/Hero'
import TrustStrip from '@/components/sections/TrustStrip'
import Process from '@/components/sections/Process'
import Areas from '@/components/sections/Areas'

const ProjectsPreview = dynamic(() => import('@/components/sections/ProjectsPreview'))
const Reviews = dynamic(() => import('@/components/sections/Reviews'))
const FinalCTA = dynamic(() => import('@/components/sections/FinalCTA'), { ssr: false })

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
