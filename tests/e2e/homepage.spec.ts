import { test, expect } from '@playwright/test'

test.describe('Homepage', () => {
  test('carica con status 200 e H1 visibile', async ({ page }) => {
    const res = await page.goto('/')
    expect(res?.status()).toBe(200)
    const h1 = page.locator('h1')
    await expect(h1).toBeVisible()
  })

  test('ha canonical www', async ({ page }) => {
    await page.goto('/')
    const canonical = await page.locator('link[rel="canonical"]').getAttribute('href')
    expect(canonical).toMatch(/^https:\/\/www\.diamosoluzioni\.com/)
  })

  test('ha og:image', async ({ page }) => {
    await page.goto('/')
    const ogImage = await page.locator('meta[property="og:image"]').getAttribute('content')
    expect(ogImage).toBeTruthy()
    expect(ogImage).toMatch(/^https:\/\/www\.diamosoluzioni\.com/)
  })

  test('navbar presente e link logo funzionante', async ({ page }) => {
    await page.goto('/')
    await expect(page.locator('nav').first()).toBeVisible()
  })

  test('link WhatsApp CTA ha href corretto', async ({ page }) => {
    await page.goto('/')
    const wa = page.locator('a[href*="wa.me"]').first()
    await expect(wa).toBeVisible()
    const href = await wa.getAttribute('href')
    expect(href).toMatch(/wa\.me\/39/)
  })

  test('footer ha link privacy-policy', async ({ page }) => {
    await page.goto('/')
    const privacyLink = page.locator('footer a[href="/privacy-policy"]')
    await expect(privacyLink).toBeVisible()
  })
})
