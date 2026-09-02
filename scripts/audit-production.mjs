#!/usr/bin/env node
/**
 * Audit automatico del sito pubblico di Diamo Soluzioni.
 * Uso: node scripts/audit-production.mjs [--url https://www.diamosoluzioni.com]
 * Esce con codice 1 se ci sono FAIL.
 */

import { JSDOM } from 'jsdom'

const BASE = process.argv.includes('--url')
  ? process.argv[process.argv.indexOf('--url') + 1]
  : 'https://www.diamosoluzioni.com'

const PUBLIC_PAGES = [
  '/',
  '/servizi',
  '/servizi/ristrutturazioni-chiavi-in-mano',
  '/servizi/ristrutturazione-bagno',
  '/servizi/pavimentazioni-rivestimenti',
  '/servizi/infissi-serramenti',
  '/servizi/facciate-cappotto-termico',
  '/servizi/tinteggiatura',
  '/servizi/impianti-idraulici',
  '/servizi/impianti-elettrici',
  '/progetti',
  '/progetti/ristrutturazione-appartamento-lodi',
  '/progetti/infissi-serramenti',
  '/progetti/pavimentazioni-gres',
  '/progetti/ristrutturazione-bagno',
  '/progetti/impianti',
  '/progetti/facciate',
  '/blog',
  '/blog/ristrutturazione-bagno-lodi-costi-2026',
  '/contatti',
  '/chi-siamo',
  '/faq',
  '/ristrutturazioni-lodi',
  '/impresa-edile-lodi',
  '/ristrutturazioni-melegnano',
]

const NOT_IN_SITEMAP = ['/privacy-policy', '/404', '/privacy']

let failures = 0
let passes = 0

function pass(msg) { console.log(`  ✅ PASS  ${msg}`); passes++ }
function fail(msg) { console.error(`  ❌ FAIL  ${msg}`); failures++ }
function info(msg) { console.log(`  ℹ️  INFO  ${msg}`) }

async function fetchPage(path) {
  const url = BASE + path
  const res = await fetch(url, {
    headers: { 'User-Agent': 'DiamoBotAudit/1.0' },
    redirect: 'manual',
  })
  return { url, res }
}

async function checkRedirects() {
  console.log('\n── REDIRECT CHAIN ──')
  const variants = [
    'http://diamosoluzioni.com',
    'https://diamosoluzioni.com',
    'http://www.diamosoluzioni.com',
  ]
  for (const variant of variants) {
    try {
      const res = await fetch(variant, { redirect: 'manual', headers: { 'User-Agent': 'DiamoBotAudit/1.0' } })
      const loc = res.headers.get('location') ?? ''
      const status = res.status
      if (status === 301 || status === 308) {
        if (loc.startsWith('https://www.diamosoluzioni.com')) {
          pass(`${variant} → ${status} → ${loc} (un solo hop)`)
        } else {
          fail(`${variant} → ${status} → ${loc} (destinazione non-www o http)`)
        }
      } else if (status === 200) {
        if (variant.startsWith('https://www.')) {
          pass(`${variant} → 200 (corretto, è già il dominio definitivo)`)
        } else {
          fail(`${variant} → 200 senza redirect (dovrebbe reindirizzare a www)`)
        }
      } else {
        info(`${variant} → ${status}`)
      }
    } catch (e) {
      info(`${variant} → errore di rete: ${e.message}`)
    }
  }
}

async function checkSitemap() {
  console.log('\n── SITEMAP ──')
  const { res } = await fetchPage('/sitemap.xml')
  if (res.status !== 200) { fail(`/sitemap.xml → HTTP ${res.status}`); return }
  const xml = await res.text()
  const urls = [...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map(m => m[1])
  info(`Trovate ${urls.length} URL nella sitemap`)
  if (urls.length < 20) fail(`Sitemap ha solo ${urls.length} URL — probabilmente mancano pagine`)
  else pass(`Sitemap contiene ${urls.length} URL`)

  const nonWww = urls.filter(u => !u.startsWith('https://www.diamosoluzioni.com'))
  if (nonWww.length > 0) fail(`Sitemap contiene URL senza www: ${nonWww.join(', ')}`)
  else pass('Tutte le URL nella sitemap usano www')

  const requiredPaths = [
    '/progetti/ristrutturazione-appartamento-lodi',
    '/progetti/infissi-serramenti',
    '/progetti/pavimentazioni-gres',
    '/progetti/ristrutturazione-bagno',
    '/progetti/impianti',
    '/progetti/facciate',
  ]
  for (const p of requiredPaths) {
    const full = BASE + p
    if (urls.includes(full)) pass(`Progetto in sitemap: ${p}`)
    else fail(`Progetto MANCANTE dalla sitemap: ${p}`)
  }

  const blacklist = ['/privacy-policy', '/api/', '/_next/']
  for (const b of blacklist) {
    const found = urls.find(u => u.includes(b))
    if (found) fail(`URL non pubblica trovata nella sitemap: ${found}`)
  }
  return urls
}

async function checkRobots() {
  console.log('\n── ROBOTS.TXT ──')
  const { res } = await fetchPage('/robots.txt')
  if (res.status !== 200) { fail(`/robots.txt → HTTP ${res.status}`); return }
  const txt = await res.text()
  if (txt.includes('Sitemap: https://www.diamosoluzioni.com/sitemap.xml')) pass('robots.txt punta a sitemap www')
  else fail('robots.txt non punta alla sitemap www corretta')
  if (txt.includes('diamosoluzioni.com') && !txt.includes('www.diamosoluzioni.com')) {
    fail('robots.txt contiene riferimento a dominio senza www')
  }
  // Parse by user-agent block — ignora Disallow: / nei blocchi di bot specifici (es. GPTBot, ClaudeBot)
  let currentAgent = null
  let generalAgentBlocksAll = false
  for (const line of txt.split('\n')) {
    const trimmed = line.trim()
    if (trimmed.startsWith('User-agent:')) {
      currentAgent = trimmed.slice('User-agent:'.length).trim()
    } else if (trimmed === 'Disallow: /' && currentAgent === '*') {
      generalAgentBlocksAll = true
    }
  }
  if (generalAgentBlocksAll) fail('robots.txt blocca tutto il sito per User-agent: *!')
  else pass('robots.txt non blocca il sito per crawler generici')
}

async function checkPage(path) {
  const { url, res } = await fetchPage(path)

  if (res.status !== 200) {
    fail(`${path} → HTTP ${res.status} (atteso 200)`)
    return null
  }

  const html = await res.text()
  const dom = new JSDOM(html)
  const doc = dom.window.document

  const results = { path, url, html, doc }

  // Canonical
  const canonical = doc.querySelector('link[rel="canonical"]')?.getAttribute('href')
  if (!canonical) fail(`${path} — canonical MANCANTE`)
  else if (!canonical.startsWith('https://www.diamosoluzioni.com')) fail(`${path} — canonical non-www: ${canonical}`)
  else pass(`${path} — canonical: ${canonical}`)

  // OG URL
  const ogUrl = doc.querySelector('meta[property="og:url"]')?.getAttribute('content')
  if (!ogUrl) fail(`${path} — og:url MANCANTE`)
  else if (!ogUrl.startsWith('https://www.diamosoluzioni.com')) fail(`${path} — og:url non-www: ${ogUrl}`)
  else pass(`${path} — og:url: ${ogUrl}`)

  // OG image
  const ogImage = doc.querySelector('meta[property="og:image"]')?.getAttribute('content')
  if (!ogImage) fail(`${path} — og:image MANCANTE`)
  else pass(`${path} — og:image: ${ogImage}`)

  // Title
  const title = doc.querySelector('title')?.textContent?.trim()
  if (!title) fail(`${path} — <title> MANCANTE`)
  else if (title.length > 70) fail(`${path} — title troppo lungo (${title.length} car): ${title}`)
  else pass(`${path} — title (${title.length} car): ${title}`)

  // Meta description
  const desc = doc.querySelector('meta[name="description"]')?.getAttribute('content')
  if (!desc) fail(`${path} — meta description MANCANTE`)
  else if (desc.length < 100 || desc.length > 165) fail(`${path} — description fuori range (${desc.length} car)`)
  else pass(`${path} — description (${desc.length} car)`)

  // H1
  const h1s = doc.querySelectorAll('h1')
  if (h1s.length === 0) fail(`${path} — nessun H1`)
  else if (h1s.length > 1) fail(`${path} — ${h1s.length} H1 trovati (atteso esattamente 1)`)
  else pass(`${path} — 1 H1: "${h1s[0].textContent?.trim().slice(0, 50)}"`)

  // JSON-LD
  const ldScripts = [...doc.querySelectorAll('script[type="application/ld+json"]')]
  if (ldScripts.length === 0) {
    fail(`${path} — nessun JSON-LD`)
  } else {
    let jsonLdOk = true
    for (const s of ldScripts) {
      try {
        const obj = JSON.parse(s.textContent ?? '')
        const str = JSON.stringify(obj)
        if (str.includes('diamosoluzioni.com') && !str.includes('www.diamosoluzioni.com')) {
          fail(`${path} — JSON-LD contiene URL senza www`)
          jsonLdOk = false
        }
      } catch {
        fail(`${path} — JSON-LD non valido (parse error)`)
        jsonLdOk = false
      }
    }
    if (jsonLdOk) pass(`${path} — JSON-LD valido (${ldScripts.length} blocchi)`)
  }

  // Alt generici
  const imgs = [...doc.querySelectorAll('img')]
  const genericAlts = imgs.filter(img => {
    const alt = img.getAttribute('alt') ?? ''
    return /^(foto|immagine|image|photo)\s*\d+$/i.test(alt)
  })
  if (genericAlts.length > 0) fail(`${path} — ${genericAlts.length} img con alt generico`)
  else pass(`${path} — nessun alt generico`)

  return results
}

async function check404() {
  console.log('\n── PAGINA 404 ──')
  const { res } = await fetchPage('/questa-pagina-non-esiste-per-davvero-xzq')
  if (res.status === 404) pass('Pagina inesistente restituisce HTTP 404')
  else fail(`Pagina inesistente restituisce HTTP ${res.status} invece di 404`)
}

async function run() {
  console.log(`\n🔍 Audit produzione: ${BASE}\n`)

  await checkRedirects()
  const sitemapUrls = await checkSitemap()
  await checkRobots()
  await check404()

  console.log('\n── PAGINE PUBBLICHE ──')
  const seenTitles = new Set()
  const seenDescs = new Set()

  for (const path of PUBLIC_PAGES) {
    const result = await checkPage(path)
    if (!result) continue

    const { doc } = result
    const title = doc.querySelector('title')?.textContent?.trim() ?? ''
    const desc = doc.querySelector('meta[name="description"]')?.getAttribute('content') ?? ''

    if (title && seenTitles.has(title)) fail(`${path} — title duplicato: "${title}"`)
    if (title) seenTitles.add(title)

    if (desc && seenDescs.has(desc)) fail(`${path} — description duplicata`)
    if (desc) seenDescs.add(desc)
  }

  // Verifica pagine in sitemap che non devono esserci
  if (sitemapUrls) {
    for (const bad of NOT_IN_SITEMAP) {
      const full = BASE + bad
      if (sitemapUrls.includes(full)) fail(`${bad} trovata nella sitemap (non dovrebbe esserci)`)
    }
  }

  console.log(`\n──────────────────────────────────────────`)
  console.log(`RISULTATO: ${passes} PASS — ${failures} FAIL`)
  if (failures > 0) {
    console.error(`\n⛔ Audit FALLITO con ${failures} problemi.\n`)
    process.exit(1)
  } else {
    console.log(`\n✅ Audit SUPERATO.\n`)
    process.exit(0)
  }
}

run().catch(e => { console.error(e); process.exit(1) })
