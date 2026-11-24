import fs from 'fs'
import path from 'path'
import { posts, getPostBySlug, getPostsByService } from '@/data/blog'
import { importedPosts } from '@/data/blog-posts'
import { services } from '@/data/services'
import { projects } from '@/data/projects'
import { territories } from '@/data/territories'
import { SERVICE_SLUG_MAP } from '@/config/wizard'
import { business, whatsappUrl } from '@/config/business'
import { blogLinkEvent } from '@/lib/blog-tracking'

const PUBLIC = path.join(process.cwd(), 'public')
const STATIC = ['/', '/servizi', '/progetti', '/blog', '/contatti', '/chi-siamo', '/faq']
const hrefs = (html: string) => Array.from(html.matchAll(/href="([^"]+)"/g)).map(m => m[1].replace(/&amp;/g, '&'))

function internalExists(href: string): boolean {
  const [p] = href.split(/[?#]/)
  if (STATIC.includes(p || '/')) return true
  const [, section, slug] = p.split('/')
  if (section === 'blog') return !!getPostBySlug(slug)
  if (section === 'servizi') return services.some(s => s.slug === slug)
  if (section === 'progetti') return projects.some(x => x.slug === slug && x.isReal)
  return territories.some(t => `/${t.slug}` === p)
}

describe('blog — struttura', () => {
  test('13 articoli: 2 storici + 11 importati, slug unici', () => {
    expect(posts).toHaveLength(13)
    expect(importedPosts).toHaveLength(11)
    expect(new Set(posts.map(p => p.slug)).size).toBe(13)
    expect(new Set(posts.map(p => p.title)).size).toBe(13)
    expect(new Set(posts.map(p => p.primaryKeyword)).size).toBe(13)
  })

  test('i due articoli storici mantengono slug e data', () => {
    expect(getPostBySlug('ristrutturazione-appartamento-lodi-prezzi-2026')?.date).toBe('2026-09-05')
    expect(getPostBySlug('ristrutturazione-bagno-lodi-costi-2026')).toBeDefined()
  })
})

describe.each(importedPosts.map(p => [p.slug, p] as const))('articolo %s', (_, p) => {
  test('SEO: title ≤70, description 100–165, data ISO non futura rispetto a dateModified', () => {
    const title = p.seoTitle.length > 52 ? p.seoTitle : `${p.seoTitle} | Diamo Soluzioni`
    expect(title.length).toBeLessThanOrEqual(70)
    expect(p.description.length).toBeGreaterThanOrEqual(100)
    expect(p.description.length).toBeLessThanOrEqual(165)
    expect(p.date).toMatch(/^\d{4}-\d{2}-\d{2}$/)
    expect(p.dateModified >= p.date).toBe(true)
  })

  test('nessun placeholder né materiale editoriale interno', () => {
    expect(JSON.stringify(p)).not.toMatch(/PERCORSO|IMAGE-URL|\{\{|TODO|DA FORNIRE|SERP\b|stessa keyword|anchor|noindex|lastmod|<!--/)
  })

  test('corpo completo: ≥900 parole, nessun H1, FAQ, tabella', () => {
    expect(p.content.replace(/<[^>]+>/g, ' ').split(/\s+/).length).toBeGreaterThan(900)
    expect(p.content).not.toMatch(/<h1/)
    expect(p.content.match(/class="faq-item"/g)?.length).toBe(4)
    expect(p.content).toMatch(/<table>/)
  })

  test('HTML bilanciato', () => {
    for (const tag of ['p', 'h2', 'h3', 'ul', 'ol', 'li', 'table', 'tr', 'td', 'th', 'div', 'a', 'strong']) {
      const open = p.content.match(new RegExp(`<${tag}[ >]`, 'g'))?.length ?? 0
      const close = p.content.match(new RegExp(`</${tag}>`, 'g'))?.length ?? 0
      expect([tag, open]).toEqual([tag, close])
    }
  })

  test('link: interni esistenti, telefono e WhatsApp del sito, servizio + preventivatore + contatti', () => {
    const h = [...hrefs(p.content), p.cta!.estimatorHref]
    for (const href of h) {
      if (href.startsWith('/')) expect([href, internalExists(href)]).toEqual([href, true])
      else if (href.startsWith('tel:')) expect(href).toBe(`tel:${business.phone.primaryRaw}`)
      else if (href.startsWith('https://wa.me/')) expect(href.startsWith(whatsappUrl('').split('?')[0] + '?text=')).toBe(true)
      else expect(href).toMatch(/^https:\/\/(www\.)?(inps|agenziaentrate\.gov|efficienzaenergetica\.enea|regione\.lombardia|gazzettaufficiale)\.it\//)
      const service = href.match(/[?&]service=([^#&]+)/)?.[1]
      if (service) expect(SERVICE_SLUG_MAP[service]).toBeDefined()
    }
    expect(h.some(x => x.startsWith('/servizi'))).toBe(true)
    expect(h.some(x => x.startsWith('/progetti'))).toBe(true)
    expect(h.some(x => x.includes('#preventivatore'))).toBe(true)
    expect(h).toContain('/contatti')
    expect(h.some(x => x.startsWith('tel:'))).toBe(true)
  })

  test('immagini locali presenti e leggere', () => {
    for (const img of [p.coverImage, p.ogImage!]) {
      const file = path.join(PUBLIC, img)
      expect(fs.existsSync(file)).toBe(true)
      expect(fs.statSync(file).size).toBeLessThan(250 * 1024)
    }
    expect(p.coverAlt.length).toBeGreaterThan(20)
    expect(p.coverCaption).toBeTruthy()
  })

  test('alt senza località non verificata', () => {
    expect(p.coverAlt).not.toMatch(/Melegnano|Paullo|Crema|Pandino|San Donato|Milano/)
  })

  test('correlati esistenti e senza auto-riferimenti', () => {
    for (const s of p.relatedPosts ?? []) { expect(getPostBySlug(s)).toBeDefined(); expect(s).not.toBe(p.slug) }
    for (const s of p.relatedServices) expect(services.some(x => x.slug === s)).toBe(true)
    for (const s of p.relatedProjects ?? []) expect(projects.some(x => x.slug === s)).toBe(true)
    for (const s of p.relatedTerritories ?? []) expect(territories.some(x => x.slug === s)).toBe(true)
  })

  test('raggiungibile da almeno una pagina servizio', () => {
    expect(getPostsByService(p.relatedServices[0])).toContain(p)
  })
})

describe('blogLinkEvent — tracking link nel corpo', () => {
  test.each([
    ['https://wa.me/393444619461?text=x', 'click_whatsapp'],
    ['tel:+393444619461', 'click_phone'],
    ['/#preventivatore', 'click_estimator'],
    ['/?service=infissi-serramenti#preventivatore', 'click_estimator'],
    ['/contatti', 'click_contact'],
    ['/progetti/facciate', 'click_project'],
    ['/servizi/impianti-idraulici', 'service_view_from_blog'],
    ['https://www.inps.it/', null],
  ])('%s → %s', (href, expected) => expect(blogLinkEvent(href)).toBe(expected))
})
