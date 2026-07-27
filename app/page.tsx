import Hero from '@/components/sections/Hero'
import Services from '@/components/sections/Services'
import AboutPreview from '@/components/sections/AboutPreview'
import Reviews from '@/components/sections/Reviews'
import CTABanner from '@/components/sections/CTABanner'

export default function HomePage() {
  return (
    <>
      <Hero />
      <Services />
      <AboutPreview />
      <Reviews />
      <CTABanner />
    </>
  )
}
