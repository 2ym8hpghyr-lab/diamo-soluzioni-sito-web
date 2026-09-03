# Site Hardening — Handoff Document

## Stage 1 — Pricing Fix (COMPLETATO)

**Data:** 2026-09-03  
**Branch:** main (commit 42eca61)  
**Obiettivo:** Allineare il preventivatore (QuoteWizard) alle fasce pubbliche delle pagine servizi, eliminare l'out-of-range da complexity multipliers, creare sorgente unica.

---

### Problema rilevato

`config/pricing.ts` aveva due bug distinti:

1. **Valori sbagliati** — minPerUnit/maxPerUnit non corrispondevano ai priceNote in `data/services.ts`
2. **Design flaw — complexityMultipliers** — moltiplicavano l'intero range, producendo output fuori dalla fascia dichiarata

Esempio: ristrutturazione_completa con 75 mq + complessità alta:
- Prima: 300 × 75 × 1.6 = 36.000 a 550 × 75 × 1.6 = 66.000 → **480–880 €/mq** (fuori dalla fascia 300–550 dichiarata)
- Dopo il fix: finestre bounded → sempre entro 500–900 €/mq

---

### Correzioni applicate

| Chiave | Prima (min–max) | Dopo (min–max) | Fonte |
|--------|----------------|----------------|-------|
| `ristrutturazione_completa` | 300–550 €/mq | **500–900 €/mq** | services.ts priceNote |
| `pavimento` | 35–75 €/mq | **35–70 €/mq** | services.ts priceNote |
| `rivestimenti` | 35–75 €/mq | **35–70 €/mq** | allineato a pavimento |
| `impianto_idraulico` | 1.800–5.000 € | **4.000–9.000 €** | services.ts priceNote |
| `impianto_elettrico` | 2.500–6.000 € | **3.500–8.000 €** | services.ts priceNote |
| `cappotto` | 80–180 €/mq | **80–150 €/mq** | services.ts priceNote |
| `tinteggiatura` | 9–10 €/mq (×2.2/×2.5) | **8–18 €/mq** | services.ts priceNote |
| `infissi` | 640–750 € | **400–800 €** | services.ts priceNote |
| `bagno_piccolo` | 5.000–6.000 € | invariato | OK |
| `bagno_grande` | 9.500–11.000 € | invariato | OK |

---

### Nuovo design di `calculateEstimate`

Sostituisce i `complexityMultipliers` con finestre scorrevoli bounded:

| Complessità | windowMin | windowMax | Garanzia |
|------------|-----------|-----------|----------|
| `base` | `lo` | `lo + span × 0.4` | inizia esattamente da minPerUnit |
| `medium` | `lo + span × 0.3` | `lo + span × 0.7` | centro del range |
| `high` | `lo + span × 0.6` | `hi` | arriva esattamente a maxPerUnit |

Output sempre in `[minPerUnit × qty, maxPerUnit × qty]` — matematicamente garantito.

---

### File modificati

| File | Modifica |
|------|----------|
| `config/pricing.ts` | Fix valori, rimozione complexityMultipliers, nuova logica bounded |
| `lib/claude.ts` | CHAT_SYSTEM: prezzi hardcoded aggiornati |
| `tests/unit/pricing.test.ts` | **Nuovo** — 165 test: valori, bounded output, monotonia, null-safety |

---

### Test results

```
Test Suites: 2 passed, 2 total
Tests:       165 passed, 165 total
```

**Copertura pricing.test.ts:**
- Tutti i 10 servizi verificati a tutte e 3 le complessità
- Quantità testate per servizi €/mq: 10, 35, 75, 150 mq
- Invarianti verificati: minTotal ≥ minPerUnit×qty, maxTotal ≤ maxPerUnit×qty, minTotal ≤ maxTotal, no NaN, no negativi
- Finestre monotone: base ≤ medium ≤ high
- base.minTotal = minPerUnit×qty (esatto), high.maxTotal = maxPerUnit×qty (esatto)
- pricingRef di tutti i servizi public → chiave valida in PRICING

---

### Architettura sorgente unica

`config/pricing.ts` è la sorgente di verità per tutti i prezzi:
- `QuoteWizard` → `lib/claude.ts buildEstimate()` → `calculateEstimate()`
- `ESTIMATE_SYSTEM` (prompt AI) → auto-generato da `Object.values(PRICING)`
- `CHAT_SYSTEM` (chat legacy) → aggiornato manualmente, allineato
- `data/services.ts` → priceNote editoriali, collegati via `pricingRef`, verificati dai test

Per aggiornare un prezzo: modifica **solo** `config/pricing.ts` → riesegui i test → aggiorna il priceNote corrispondente in `data/services.ts` (i test segnalano la discrepanza se dimentichi).

---

---

## Stage 3 — Privacy Policy, Consenso e Cookie (COMPLETATO)

**Data:** 2026-09-03
**Branch:** main (commit 543f65f)
**Obiettivo:** Coerenza tra privacy policy, modulo contatti, consenso analytics e revoca.

### Problemi confermati e risolti

| # | Problema | Fix |
|---|----------|-----|
| 1 | `marketingOk` raccolto nel wizard ma **silenziosamente ignorato** da API e `notifications.ts` — nessun sistema marketing esiste | Rimosso completamente il checkbox, il campo dallo stato, e l'invio nell'API |
| 2 | `CookieBanner.reject()` impostava localStorage ma **non emetteva alcun evento** → GA rimaneva attivo per la sessione corrente | `writeConsentState(false)` ora emette `CONSENT_REVOKED_EVENT`; `GoogleAnalytics` ascolta e chiama `gtag('consent', 'update', {analytics_storage: 'denied'})` |
| 3 | Privacy Policy §8: diceva "cancella dati browser" ma il pulsante "Impostazioni cookie" già esisteva nel footer | §8 riscritto: pulsante footer (metodo primario) + browser (alternativa) |
| 4 | Cloudflare usato (vercel.json con `Cloudflare-CDN-Cache-Control`) ma non citato in §5 | Aggiunto Cloudflare Inc. come fornitore CDN |
| 5 | Privacy Policy §3: affermava "nessun marketing" mentre il wizard aveva il checkbox | §3 rafforzato + checkbox rimosso → coerenza piena |

### Nuovi file

**`config/consent.ts`** — sorgente unica per le costanti di consenso:
- `CONSENT_KEY` — chiave localStorage
- `CONSENT_ACCEPTED_EVENT` — evento accettazione
- `CONSENT_REVOKED_EVENT` — evento revoca (nuovo)
- `CONSENT_SETTINGS_EVENT` — evento apertura banner
- `readConsentState()` → `'accepted' | 'rejected' | null`
- `writeConsentState(bool)` → scrive localStorage + emette evento corretto

### File modificati

| File | Modifica |
|------|----------|
| `config/consent.ts` | Nuovo — sorgente unica costanti e funzioni consenso |
| `components/CookieBanner.tsx` | Usa `writeConsentState()`; `reject()` ora emette `CONSENT_REVOKED_EVENT` |
| `components/GoogleAnalytics.tsx` | Ascolta `CONSENT_REVOKED_EVENT` → `setConsented(false)` + GA4 consent mode |
| `components/CookieSettingsButton.tsx` | Usa costante `CONSENT_SETTINGS_EVENT` |
| `components/sections/QuoteWizard.tsx` | Rimosso `marketingOk`: stato, checkbox, invio API |
| `app/privacy-policy/page.tsx` | §3 rafforzato, §5 Cloudflare aggiunto, §7-§8 revoca aggiornata, data settembre 2026 |
| `tests/unit/consent.test.ts` | Nuovo — 21 test: costanti, readConsentState, writeConsentState, eventi, flussi composti, assenza dark pattern |

### Test risultati

```
Test Suites: 4 passed, 4 total
Tests:       222 passed, 222 total
```

### Cosa NON è stato modificato (corretto e invariato)

- GA4 non viene caricato prima del consenso: `GoogleAnalytics` renderizza `null` finché `consented=false` ✓
- Nessun dark pattern: banner non preseleziona nulla, i due pulsanti hanno pari visibilità ✓
- Consenso tecnico (cookie necessari) non richiede banner per legge ✓
- Cookie di profilazione/advertising: non presenti ✓

### Nota professionale

Questa modifica risolve le incoerenze tecniche evidenti e allinea testo e codice.
**La conformità GDPR completa richiede revisione di un professionista privacy** — in particolare per: DPA con Vercel/Cloudflare/Resend/Anthropic, valutazione trasferimento dati extra-UE, e registro trattamenti ex art. 30 GDPR.

---

## Stage 2 — URL Preselection & Wizard Completeness (COMPLETATO)

**Data:** 2026-09-03
**Branch:** main (commit 0091833)
**Obiettivo:** Correggere il collegamento pagine servizi → preventivatore; preselezionare il servizio dal parametro URL `?service=<slug>`.

### Problema confermato

- Il wizard non leggeva `?service=` da nessuna parte (nessun `useSearchParams` né lettura di `window.location.search`)
- 3 servizi mancavano dai pulsanti Step 1: `infissi`, `impianto_idraulico`, `impianto_elettrico` → finivano su "Altro"
- `cappotto` era etichettato "Opere murarie" (non coerente con la pagina /servizi/facciate-cappotto-termico)
- Risultato: link `/?service=infissi-serramenti#preventivatore` apriva il wizard con Step 1 vuoto, "Continua" disabilitato

### Soluzione implementata

**`config/wizard.ts`** (nuovo file) — mappatura stabile e testabile:
```
ristrutturazioni-chiavi-in-mano → ristrutturazione_completa
ristrutturazione-bagno          → bagno_piccolo
pavimentazioni-rivestimenti     → pavimento
infissi-serramenti              → infissi
facciate-cappotto-termico       → cappotto
tinteggiatura                   → tinteggiatura
impianti-idraulici              → impianto_idraulico
impianti-elettrici              → impianto_elettrico
```

**`components/sections/QuoteWizard.tsx`** — modifiche:
- Import `SERVICE_SLUG_MAP` da `@/config/wizard`
- `useEffect` al mount: legge `window.location.search` → mappa slug → preseleziona `serviceId`/`serviceLabel`
  - Slug non validi o assenti: nessun effetto (nessun crash, form invariato)
- Aggiunta 3 voci al SERVICES array: `infissi`, `impianto_idraulico`, `impianto_elettrico`
- Rename: `cappotto` label "Opere murarie" → "Cappotto termico"
- Grid Step 1: `grid-cols-2 sm:grid-cols-3` per 9 pulsanti (3×3 su desktop)
- 3 nuove icone SVG inline: `IconDoor`, `IconDroplet`, `IconBolt`

**Browser back/forward**: la URL `?service=xxx` è già nel history stack; premendo avanti il componente si rimonta e ri-esegue l'effetto → servizio preselezionato automaticamente.

### Test risultati

```
Test Suites: 3 passed, 3 total
Tests:       201 passed, 201 total
```

**`tests/unit/wizard.test.ts`** (nuovo, 36 test):
- Struttura: 8 slug esatti, no chiavi vuote
- Coerenza con `data/services.ts`: ogni slug esiste nei servizi pubblici
- Coerenza con `config/pricing.ts`: ogni serviceId mappato esiste in PRICING
- Coerenza con wizard SERVICES array: ogni serviceId è un pulsante del wizard
- Slug invalidi (`''`, `'non-esiste'`, `'altro'`, `'123'`...) → `undefined` senza crash
- Copertura bidirezionale: tutti i pricingRef → coperti dalla mappa

### File modificati

| File | Tipo | Modifica |
|------|------|----------|
| `config/wizard.ts` | Nuovo | Mappatura SERVICE_SLUG_MAP (8 entry) |
| `components/sections/QuoteWizard.tsx` | Modifica | URL preselection, 3 servizi aggiunti, label fix, grid |
| `tests/unit/wizard.test.ts` | Nuovo | 36 test copertura completa slug mapping |

### Percorso utente verificato (live)

Ogni pagina `/servizi/<slug>` contiene due link `/?service=<slug>#preventivatore`.
Cliccando, il wizard si apre alla home con Step 1 e il servizio corretto già evidenziato.
"Continua" è abilitato immediatamente — l'utente può procedere senza toccare nulla.

---

## Stage 0 — Performance & UX (COMPLETATO in sessione precedente)

| Intervento | Risultato |
|------------|-----------|
| `Navbar.tsx` — logo `priority` | LCP ridotto, 3/3 Lighthouse PASS |
| `next.config.mjs` — deviceSizes + 1350 | Hero da 29.5 KB a 19.5 KB |
| `vercel.json` — `s-maxage=3600` + `Cloudflare-CDN-Cache-Control` | Cache header pronti; HTML caching richiede Cloudflare Cache Rule in dashboard |
| Reviews carousel | Scroll-snap, frecce, dots (finestra 5), counter, link Google |
| Valentina Giungato review | Aggiunta come 10a recensione pubblica |
| Mobile layout fix | Carousel a 2 righe: dot (riga 1) + frecce + link (riga 2) |
| A11y 100% ripristinata | Counter contrast 0.40→0.65, dot target 6px→24px wrapper |

---

## Cloudflare HTML caching (pending — richiede dashboard)

Le risposte HTML sono ancora `cf-cache-status: DYNAMIC` (non cached).  
La CDN non capisce `s-maxage` senza una Cache Rule esplicita.

**Per attivare:** Cloudflare Dashboard → Regole → Cache Rules → Nuova regola:
- Condizione: nome host = `www.diamosoluzioni.com` + path = `/*`
- Impostazione: **Eligible for cache** + Edge TTL: 1 ora

Senza questa regola il TTFB rimane variabile (200–400 ms origin); con la regola scende a ~15 ms edge.
