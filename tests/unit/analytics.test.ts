/**
 * Test per lib/analytics.ts e la logica di invio eventi GA4.
 * Verifica: blocco senza consenso, blocco senza gtag, invio corretto con consenso.
 */

import { CONSENT_KEY } from '@/config/consent'

// ── Mock window con localStorage e gtag ──────────────────────────────────────

class MockStorage {
  private store: Record<string, string> = {}
  getItem(key: string) { return this.store[key] ?? null }
  setItem(key: string, value: string) { this.store[key] = value }
  removeItem(key: string) { delete this.store[key] }
  clear() { this.store = {} }
}

let mockGtag: jest.Mock
let mockStorage: MockStorage
let mockWindow: Record<string, unknown>

beforeEach(() => {
  mockGtag = jest.fn()
  mockStorage = new MockStorage()
  mockWindow = { gtag: mockGtag, localStorage: mockStorage }

  Object.defineProperty(global, 'window', {
    value: mockWindow,
    writable: true,
    configurable: true,
  })
  Object.defineProperty(global, 'localStorage', {
    value: mockStorage,
    writable: true,
    configurable: true,
  })

  // Svuota la cache del modulo per rileggere window ad ogni test
  jest.resetModules()
})

function getAnalytics() {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  return require('@/lib/analytics') as typeof import('@/lib/analytics')
}

// ── Blocco senza consenso ─────────────────────────────────────────────────

describe('trackEvent — senza consenso', () => {
  test('non chiama gtag se localStorage è vuoto', () => {
    const { trackEvent } = getAnalytics()
    trackEvent('click_phone', { location: 'test' })
    expect(mockGtag).not.toHaveBeenCalled()
  })

  test('non chiama gtag se consenso è "false"', () => {
    mockStorage.setItem(CONSENT_KEY, 'false')
    const { trackEvent } = getAnalytics()
    trackEvent('click_phone', { location: 'test' })
    expect(mockGtag).not.toHaveBeenCalled()
  })

  test('non chiama gtag se consenso è un valore imprevisto', () => {
    mockStorage.setItem(CONSENT_KEY, 'yes')
    const { trackEvent } = getAnalytics()
    trackEvent('click_phone', { location: 'test' })
    expect(mockGtag).not.toHaveBeenCalled()
  })
})

// ── Blocco senza gtag ─────────────────────────────────────────────────────

describe('trackEvent — con consenso ma senza gtag', () => {
  test('non lancia eccezioni se gtag è undefined', () => {
    mockStorage.setItem(CONSENT_KEY, 'true')
    delete mockWindow.gtag
    const { trackEvent } = getAnalytics()
    expect(() => trackEvent('click_phone', { location: 'test' })).not.toThrow()
  })
})

// ── Invio corretto ────────────────────────────────────────────────────────

describe('trackEvent — con consenso e gtag', () => {
  beforeEach(() => {
    mockStorage.setItem(CONSENT_KEY, 'true')
  })

  test('chiama gtag("event", name, params)', () => {
    const { trackEvent } = getAnalytics()
    trackEvent('click_phone', { location: 'navbar_desktop' })
    expect(mockGtag).toHaveBeenCalledTimes(1)
    expect(mockGtag).toHaveBeenCalledWith('event', 'click_phone', { location: 'navbar_desktop' })
  })

  test('chiama gtag senza params se omessi', () => {
    const { trackEvent } = getAnalytics()
    trackEvent('estimator_start')
    expect(mockGtag).toHaveBeenCalledWith('event', 'estimator_start', undefined)
  })

  test('non invia PII: form_submit con service e contact_method', () => {
    const { trackEvent } = getAnalytics()
    const params = { service: 'Ristrutturazione completa', contact_method: 'phone' }
    trackEvent('form_submit', params)
    const call = mockGtag.mock.calls[0]
    const sentParams = call[2] as Record<string, unknown>
    expect(Object.keys(sentParams)).not.toContain('name')
    expect(Object.keys(sentParams)).not.toContain('phone')
    expect(Object.keys(sentParams)).not.toContain('email')
    expect(sentParams.service).toBe('Ristrutturazione completa')
    expect(sentParams.contact_method).toBe('phone')
  })

  test('non invia PII: estimator_complete con service e city', () => {
    const { trackEvent } = getAnalytics()
    const params = { service: 'pavimento', city: 'Lodi' }
    trackEvent('estimator_complete', params)
    const call = mockGtag.mock.calls[0]
    const sentParams = call[2] as Record<string, unknown>
    expect(Object.keys(sentParams)).not.toContain('name')
    expect(Object.keys(sentParams)).not.toContain('phone')
    expect(Object.keys(sentParams)).not.toContain('email')
    expect(Object.keys(sentParams)).not.toContain('description')
    expect(sentParams.service).toBe('pavimento')
    expect(sentParams.city).toBe('Lodi')
  })

  test('eventi obbligatori: tutti i nomi sono stringhe non vuote', () => {
    const events = [
      'click_phone',
      'click_whatsapp',
      'estimator_start',
      'estimator_complete',
      'form_submit',
      'service_view_from_blog',
    ]
    const { trackEvent } = getAnalytics()
    for (const name of events) {
      trackEvent(name, { location: 'test' })
    }
    expect(mockGtag).toHaveBeenCalledTimes(events.length)
    mockGtag.mock.calls.forEach((call, i) => {
      expect(call[0]).toBe('event')
      expect(call[1]).toBe(events[i])
    })
  })
})

// ── Revoca consenso ───────────────────────────────────────────────────────

describe('trackEvent — dopo revoca consenso', () => {
  test('non chiama gtag se consenso viene revocato (localStorage → "false")', () => {
    mockStorage.setItem(CONSENT_KEY, 'true')
    const { trackEvent } = getAnalytics()
    trackEvent('click_phone', { location: 'test' })
    expect(mockGtag).toHaveBeenCalledTimes(1)

    // Revoca
    mockStorage.setItem(CONSENT_KEY, 'false')
    mockGtag.mockClear()
    trackEvent('click_phone', { location: 'test' })
    expect(mockGtag).not.toHaveBeenCalled()
  })
})

// ── Nessun invio su server (window undefined) ─────────────────────────────

describe('trackEvent — contesto server', () => {
  test('non lancia eccezioni e non chiama gtag se window è undefined', () => {
    Object.defineProperty(global, 'window', {
      value: undefined,
      writable: true,
      configurable: true,
    })
    const { trackEvent } = getAnalytics()
    expect(() => trackEvent('click_phone')).not.toThrow()
    expect(mockGtag).not.toHaveBeenCalled()
  })
})
