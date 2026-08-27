import { MetadataRoute } from 'next'
import { business } from '@/config/business'
import { services } from '@/data/services'
import { territories } from '@/data/territories'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = business.siteUrl

  const staticPages: MetadataRoute.Sitemap = [
    { url: base, lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
    { url: `${base}/servizi`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${base}/progetti`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7 },
    { url: `${base}/contatti`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/chi-siamo`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
    { url: `${base}/faq`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
  ]

  const servicePages: MetadataRoute.Sitemap = services.map(s => ({
    url: `${base}/servizi/${s.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  const territoryPages: MetadataRoute.Sitemap = territories.map(t => ({
    url: `${base}/${t.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.75,
  }))

  return [...staticPages, ...servicePages, ...territoryPages]
}
