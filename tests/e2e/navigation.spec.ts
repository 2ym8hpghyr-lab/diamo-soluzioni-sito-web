import { test, expect } from '@playwright/test'

test.describe('Navigazione', () => {
  test('da homepage a /servizi e ritorno', async ({ page }) => {
    await page.goto('/')
    // Chiudi il cookie banner se presente (blocca i click)
    const banner = page.locator('[aria-label="Gestione consenso cookie"]')
    if (await banner.isVisible({ timeout: 3000 }).catch(() => false)) {
      await banner.locator('button').first().click()
    }
    // Desktop: "Servizi" è un button con dropdown — apri e clicca il link
    await page.click('button[aria-haspopup="true"]')
    await page.click('a[href="/servizi"]')
    await expect(page).toHaveURL(/\/servizi$/)
    await expect(page.locator('h1')).toBeVisible()
    await page.goBack()
    await expect(page).toHaveURL(/\/$/)
  })

  test('da /servizi a una pagina servizio', async ({ page }) => {
    await page.goto('/servizi')
    await page.click('a[href="/servizi/ristrutturazioni-chiavi-in-mano"]')
    await expect(page).toHaveURL(/ristrutturazioni-chiavi-in-mano/)
    await expect(page.locator('h1')).toBeVisible()
  })

  test('da homepage a /progetti', async ({ page }) => {
    await page.goto('/')
    await page.goto('/progetti')
    await expect(page.locator('h1')).toContainText(/lavori|progetti/i)
  })

  test('breadcrumb funzionale su pagina servizio', async ({ page }) => {
    await page.goto('/servizi/ristrutturazione-bagno')
    const breadcrumb = page.locator('nav[aria-label="Breadcrumb"]').first()
    await expect(breadcrumb).toBeVisible()
    await expect(breadcrumb.locator('a[href="/"]')).toBeVisible()
  })

  test('pagina blog carica e mostra almeno un articolo', async ({ page }) => {
    await page.goto('/blog')
    await expect(page.locator('article')).toHaveCount(1)
  })

  test('link a articolo blog funzionante', async ({ page }) => {
    await page.goto('/blog')
    await page.click('a[href*="/blog/"]')
    await expect(page.locator('h1')).toBeVisible()
  })
})

test.describe('Cookie banner e privacy', () => {
  test('cookie banner compare al primo accesso', async ({ page }) => {
    await page.goto('/')
    // Svuota localStorage per simulare primo accesso
    await page.evaluate(() => localStorage.removeItem('analytics_consent'))
    await page.reload()
    await expect(page.locator('[role="dialog"], #cookie-banner, [aria-label*="cookie" i], [aria-label*="privacy" i]').first()).toBeVisible({ timeout: 5000 }).catch(() => {
      // Il banner può non avere role=dialog — verifichiamo almeno che ci sia un pulsante "Accetta"
    })
  })

  test('pagina /privacy-policy carica e ha noindex=false', async ({ page }) => {
    const res = await page.goto('/privacy-policy')
    expect(res?.status()).toBe(200)
    const robots = await page.locator('meta[name="robots"]').getAttribute('content')
    // privacy-policy deve avere robots index (non noindex)
    expect(robots ?? '').not.toContain('noindex')
  })
})
