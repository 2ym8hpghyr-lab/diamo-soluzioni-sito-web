import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://www.diamosoluzioni.it'
  return [
    { url: base, lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
    { url: `${base}/chi-siamo`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/servizi`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${base}/progetti`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7 },
    { url: `${base}/contatti`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
  ]
}
