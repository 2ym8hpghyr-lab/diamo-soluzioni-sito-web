import { services, getServiceBySlug } from '@/data/services'
import { projects, getRealProjects } from '@/data/projects'
import { territories, getTerritoryBySlug } from '@/data/territories'
import { getPublishedReviews, getAverageRating } from '@/data/reviews'
import { business } from '@/config/business'

// ── Services ────────────────────────────────────────────────────────────────

describe('services.ts — integrità dati', () => {
  test('almeno 8 servizi definiti', () => {
    expect(services.length).toBeGreaterThanOrEqual(8)
  })

  test.each(services)('servizio "$name" ha campi obbligatori validi', (s) => {
    expect(s.slug).toMatch(/^[a-z0-9-]+$/)
    expect(s.name.length).toBeGreaterThan(3)
    expect(s.seoTitle.length).toBeGreaterThan(10)
    expect(s.seoDesc.length).toBeGreaterThanOrEqual(100)
    expect(s.seoDesc.length).toBeLessThanOrEqual(165)
    expect(s.features.length).toBeGreaterThan(0)
  })

  test('getServiceBySlug trova un servizio esistente', () => {
    const s = getServiceBySlug('ristrutturazione-bagno')
    expect(s).toBeDefined()
    expect(s?.slug).toBe('ristrutturazione-bagno')
  })

  test('getServiceBySlug restituisce undefined per slug inesistente', () => {
    expect(getServiceBySlug('non-esiste')).toBeUndefined()
  })

  test('nessun servizio ha seoTitle > 52 char (risulta in title > 70 con template)', () => {
    for (const s of services) {
      // template: "${seoTitle} | Diamo Soluzioni" = seoTitle + 18 char
      expect(s.seoTitle.length + 18).toBeLessThanOrEqual(70)
    }
  })
})

// ── Projects ─────────────────────────────────────────────────────────────────

describe('projects.ts — integrità dati', () => {
  const real = getRealProjects()

  test('almeno 6 progetti reali', () => {
    expect(real.length).toBeGreaterThanOrEqual(6)
  })

  test.each(real)('progetto "$title" ha campi obbligatori', (p) => {
    expect(p.slug).toMatch(/^[a-z0-9-]+$/)
    expect(p.title.length).toBeGreaterThan(3)
    expect(p.cover).toMatch(/^\//)
    expect(p.coverAlt.length).toBeGreaterThan(10)
    expect(p.location.length).toBeGreaterThan(2)
  })

  test('ogni progetto reale ha almeno una foto in gallery', () => {
    for (const p of real) {
      expect((p.gallery ?? []).length).toBeGreaterThan(0)
    }
  })

  test('title generato per SEO ≤52 char per ogni progetto reale', () => {
    // metadata: `${project.title} a ${project.location}` + " | Diamo Soluzioni" (18)
    for (const p of real) {
      const generated = `${p.title} a ${p.location}`
      expect(generated.length + 18).toBeLessThanOrEqual(70)
    }
  })

  test('nessun coverAlt generico (foto/immagine + numero)', () => {
    for (const p of real) {
      expect(p.coverAlt).not.toMatch(/^(foto|immagine|image|photo)\s*\d+$/i)
    }
  })
})

// ── Territories ───────────────────────────────────────────────────────────────

describe('territories.ts — integrità dati', () => {
  test('almeno 7 territory page definite', () => {
    expect(territories.length).toBeGreaterThanOrEqual(7)
  })

  test.each(territories)('territorio "$city" — seoTitle e seoDesc validi', (t) => {
    // seoTitle + " | Diamo Soluzioni" ≤70
    expect(t.seoTitle.length + 18).toBeLessThanOrEqual(70)
    expect(t.seoDesc.length).toBeGreaterThanOrEqual(100)
    expect(t.seoDesc.length).toBeLessThanOrEqual(165)
    expect(t.slug).toMatch(/^[a-z0-9-]+$/)
  })

  test('getTerritoryBySlug trova lodi', () => {
    const t = getTerritoryBySlug('ristrutturazioni-lodi')
    expect(t).toBeDefined()
    expect(t?.city).toBe('Lodi')
  })

  test.each(territories)('territorio "$city" ha almeno 3 mainServices', (t) => {
    expect(t.mainServices.length).toBeGreaterThanOrEqual(3)
  })

  test.each(territories)('territorio "$city" ha almeno 2 FAQ', (t) => {
    expect(t.faq.length).toBeGreaterThanOrEqual(2)
  })
})

// ── Reviews ───────────────────────────────────────────────────────────────────

describe('reviews.ts — integrità dati', () => {
  test('almeno 4 recensioni pubblicate', () => {
    const r = getPublishedReviews()
    expect(r.length).toBeGreaterThanOrEqual(4)
  })

  test('rating medio tra 4.0 e 5.0', () => {
    const avg = getAverageRating()
    expect(avg).toBeGreaterThanOrEqual(4.0)
    expect(avg).toBeLessThanOrEqual(5.0)
  })

  test('ogni recensione ha rating 1–5 e testo non vuoto', () => {
    for (const r of getPublishedReviews()) {
      expect(r.rating).toBeGreaterThanOrEqual(1)
      expect(r.rating).toBeLessThanOrEqual(5)
      expect(r.text.trim().length).toBeGreaterThan(10)
      expect(r.name.trim().length).toBeGreaterThan(0)
    }
  })
})

// ── Business config ────────────────────────────────────────────────────────────

describe('config/business.ts — dati aziendali', () => {
  test('siteUrl è www', () => {
    expect(business.siteUrl).toBe('https://www.diamosoluzioni.com')
  })

  test('telefono principale ha formato +39', () => {
    expect(business.phone.primaryRaw).toMatch(/^\+39/)
  })

  test('email presente', () => {
    expect(business.email).toMatch(/@/)
  })

  test('coordinate geo valide (nord Italia)', () => {
    expect(business.geo.latitude).toBeGreaterThan(44)
    expect(business.geo.latitude).toBeLessThan(47)
    expect(business.geo.longitude).toBeGreaterThan(8)
    expect(business.geo.longitude).toBeLessThan(12)
  })

  test('almeno 5 aree servite', () => {
    expect(business.areas.length).toBeGreaterThanOrEqual(5)
  })
})
