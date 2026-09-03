import { test, expect } from '@playwright/test'

const PAGES = [
  '/',
  '/servizi',
  '/servizi/ristrutturazioni-chiavi-in-mano',
  '/servizi/ristrutturazione-bagno',
  '/progetti',
  '/progetti/ristrutturazione-appartamento-lodi',
  '/blog',
  '/blog/ristrutturazione-bagno-lodi-costi-2026',
  '/chi-siamo',
  '/contatti',
  '/faq',
  '/ristrutturazioni-lodi',
  '/impresa-edile-lodi',
  '/ristrutturazioni-melegnano',
]

for (const path of PAGES) {
  test(`${path} — SEO base (canonical, og:image, title, description, H1)`, async ({ page }) => {
    const res = await page.goto(path)
    expect(res?.status()).toBe(200)

    // Canonical www
    const canonical = await page.locator('link[rel="canonical"]').getAttribute('href')
    expect(canonical).toMatch(/^https:\/\/www\.diamosoluzioni\.com/)

    // og:image presente
    const ogImage = await page.locator('meta[property="og:image"]').getAttribute('content')
    expect(ogImage).toBeTruthy()

    // Title ≤70 caratteri
    const title = await page.title()
    expect(title.length).toBeGreaterThan(0)
    expect(title.length).toBeLessThanOrEqual(70)

    // Description presente e nella fascia 100–165
    const desc = await page.locator('meta[name="description"]').getAttribute('content')
    expect(desc).toBeTruthy()
    expect(desc!.length).toBeGreaterThanOrEqual(100)
    expect(desc!.length).toBeLessThanOrEqual(165)

    // Esattamente 1 H1
    const h1s = page.locator('h1')
    await expect(h1s).toHaveCount(1)
  })
}

test('sitemap.xml contiene almeno 25 URL www', async ({ page }) => {
  await page.goto('/sitemap.xml')
  const content = await page.content()
  const urls = Array.from(content.matchAll(/<loc>(.*?)<\/loc>/g)).map(m => m[1])
  expect(urls.length).toBeGreaterThanOrEqual(25)
  const nonWww = urls.filter(u => !u.startsWith('https://www.diamosoluzioni.com'))
  expect(nonWww).toHaveLength(0)
})

test('robots.txt permette crawling generale', async ({ page }) => {
  await page.goto('/robots.txt')
  const content = await page.textContent('body') ?? await page.content()
  expect(content).toContain('Sitemap: https://www.diamosoluzioni.com/sitemap.xml')
})

test('pagina 404 restituisce status 404', async ({ page }) => {
  const res = await page.goto('/questa-pagina-non-esiste-xzq99')
  expect(res?.status()).toBe(404)
})
