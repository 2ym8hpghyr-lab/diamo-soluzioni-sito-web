'use client'
import { useEffect } from 'react'
import { blogLinkEvent } from '@/lib/blog-tracking'
import { trackEvent } from '@/lib/analytics'

/** Traccia i click sui link nel corpo dell'articolo con gli stessi eventi GA4 del resto del sito. */
export default function BlogBodyTracker({ targetId, articleSlug }: { targetId: string; articleSlug: string }) {
  useEffect(() => {
    const el = document.getElementById(targetId)
    if (!el) return
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement).closest('a')
      const name = a && blogLinkEvent(a.getAttribute('href') ?? '')
      if (name) trackEvent(name, { location: 'blog_body', article_slug: articleSlug })
    }
    el.addEventListener('click', onClick)
    return () => el.removeEventListener('click', onClick)
  }, [targetId, articleSlug])
  return null
}
