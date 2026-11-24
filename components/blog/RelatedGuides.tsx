import Link from 'next/link'
import type { BlogPost } from '@/data/blog'

interface Props {
  posts: BlogPost[]
  title?: string
  /** Contenitore: nel corpo articolo o come sezione autonoma di pagina */
  className?: string
}

/** Elenco compatto di guide del blog, con lo stesso stile delle card "Leggi anche". */
export default function RelatedGuides({ posts, title = 'Guide correlate', className = '' }: Props) {
  if (posts.length === 0) return null
  return (
    <div className={className}>
      <h2 className="font-bold text-lg mb-6" style={{ color: '#1E2A2E' }}>{title}</h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {posts.map(p => (
          <Link
            key={p.slug}
            href={`/blog/${p.slug}`}
            className="rounded-xl p-4 border transition-all hover:border-teal hover:shadow-sm"
            style={{ borderColor: '#ECEDE9', backgroundColor: '#ffffff' }}
          >
            <span className="block font-semibold text-sm leading-snug" style={{ color: '#1F4852' }}>
              {p.linkText ?? p.title}
            </span>
          </Link>
        ))}
      </div>
    </div>
  )
}
