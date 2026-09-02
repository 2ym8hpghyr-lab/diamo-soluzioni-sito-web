import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { business } from '@/config/business'
import { posts, getPostBySlug } from '@/data/blog'
import { services } from '@/data/services'
import BlogCTAs from '@/components/blog/BlogCTAs'
import RelatedServices from '@/components/blog/RelatedServices'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return posts.map(p => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) return {}
  const canonical = `${business.siteUrl}/blog/${post.slug}`
  return {
    title: post.seoTitle,
    description: post.description,
    alternates: { canonical },
    openGraph: {
      title: post.title,
      description: post.description,
      url: canonical,
      siteName: business.name,
      type: 'article',
      publishedTime: post.date,
      modifiedTime: post.dateModified,
      authors: [post.author],
      images: [{ url: `${business.siteUrl}${post.coverImage}`, alt: post.coverAlt }],
    },
  }
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('it-IT', { day: 'numeric', month: 'long', year: 'numeric' })
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) notFound()

  const relatedServiceObjects = post.relatedServices
    .map(s => services.find(sv => sv.slug === s))
    .filter(Boolean)
    .slice(0, 3) as typeof services

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BlogPosting',
        headline: post.title,
        description: post.description,
        image: `${business.siteUrl}${post.coverImage}`,
        datePublished: post.date,
        dateModified: post.dateModified,
        author: {
          '@type': 'Person',
          name: 'Pellumb Murgu',
          worksFor: { '@type': 'Organization', name: business.name },
        },
        publisher: {
          '@type': 'Organization',
          name: business.name,
          url: business.siteUrl,
        },
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': `${business.siteUrl}/blog/${post.slug}`,
        },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: business.siteUrl },
          { '@type': 'ListItem', position: 2, name: 'Blog', item: `${business.siteUrl}/blog` },
          { '@type': 'ListItem', position: 3, name: post.title, item: `${business.siteUrl}/blog/${post.slug}` },
        ],
      },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Hero con immagine di sfondo */}
      <section className="relative overflow-hidden" style={{ minHeight: '340px' }}>
        <Image
          src={post.coverImage}
          alt={post.coverAlt}
          fill
          className="object-cover"
          sizes="100vw"
          priority
        />
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(135deg, rgba(31,72,82,0.92) 0%, rgba(21,54,62,0.89) 100%)' }}
          aria-hidden
        />
        {/* Accento oro */}
        <div
          className="absolute left-0 top-12 bottom-12 w-1 rounded-r-full"
          style={{ background: 'linear-gradient(to bottom, transparent, #F4BE12 30%, #F4BE12 70%, transparent)' }}
          aria-hidden
        />

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 py-16 lg:py-20">
          <nav className="flex items-center gap-2 text-xs mb-8 flex-wrap" style={{ color: 'rgba(248,248,245,0.50)' }} aria-label="Breadcrumb">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <Link href="/blog" className="hover:text-white transition-colors">Blog</Link>
            <span>/</span>
            <span className="line-clamp-1" style={{ color: 'rgba(248,248,245,0.85)' }}>{post.title}</span>
          </nav>

          <p className="text-xs font-bold uppercase tracking-[0.18em] mb-4" style={{ color: '#F4BE12' }}>
            {formatDate(post.date)} · {post.author}
          </p>

          <h1 className="font-extrabold text-white" style={{ fontSize: 'clamp(1.6rem,3.5vw,2.4rem)', lineHeight: 1.2 }}>
            {post.title}
          </h1>
          <p className="mt-4 text-base leading-relaxed max-w-2xl" style={{ color: 'rgba(248,248,245,0.75)' }}>
            {post.excerpt}
          </p>
        </div>
      </section>

      {/* Corpo articolo */}
      <section className="py-14" style={{ backgroundColor: '#FAFAF7' }}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6">

          {/* Contenuto */}
          <div
            className="blog-content"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* CTA client component */}
          <BlogCTAs />

          {/* Leggi anche */}
          <RelatedServices services={relatedServiceObjects.map(s => ({ slug: s.slug, name: s.name, shortDesc: s.shortDesc }))} />

          {/* Torna al blog */}
          <div className="mt-10 pt-8" style={{ borderTop: '1px solid #ECEDE9' }}>
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-sm font-semibold transition-colors hover:opacity-70"
              style={{ color: '#1F4852' }}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Tutti gli articoli
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
