import { MetadataRoute } from 'next'
import { business } from '@/config/business'
import { services } from '@/data/services'
import { territories } from '@/data/territories'
import { posts } from '@/data/blog'
import { projects } from '@/data/projects'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = business.siteUrl

  const staticPages: MetadataRoute.Sitemap = [
    { url: base, changeFrequency: 'weekly', priority: 1 },
    { url: `${base}/servizi`, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${base}/progetti`, changeFrequency: 'weekly', priority: 0.7 },
    { url: `${base}/blog`, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${base}/contatti`, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/chi-siamo`, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${base}/faq`, changeFrequency: 'monthly', priority: 0.6 },
  ]

  const servicePages: MetadataRoute.Sitemap = services.map(s => ({
    url: `${base}/servizi/${s.slug}`,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  const projectPages: MetadataRoute.Sitemap = projects.filter(p => p.isReal).map(p => ({
    url: `${base}/progetti/${p.slug}`,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  const territoryPages: MetadataRoute.Sitemap = territories.map(t => ({
    url: `${base}/${t.slug}`,
    changeFrequency: 'monthly' as const,
    priority: 0.75,
  }))

  const blogPages: MetadataRoute.Sitemap = posts.map(p => ({
    url: `${base}/blog/${p.slug}`,
    lastModified: new Date(p.dateModified),
    changeFrequency: 'monthly' as const,
    priority: 0.75,
  }))

  return [...staticPages, ...servicePages, ...projectPages, ...territoryPages, ...blogPages]
}
