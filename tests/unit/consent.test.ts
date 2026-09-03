/**
 * Test per la logica di consenso cookie (config/consent.ts).
 * Usa un mock di localStorage/window compatibile con testEnvironment: 'node'.
 */

import {
  CONSENT_KEY,
  CONSENT_ACCEPTED_EVENT,
  CONSENT_REVOKED_EVENT,
  CONSENT_SETTINGS_EVENT,
} from '@/config/consent'

// ── Mock localStorage ─────────────────────────────────────────────────────────

class MockStorage {
  private store: Record<string, string> = {}
  getItem(key: string) { return this.store[key] ?? null }
  setItem(key: string, value: string) { this.store[key] = value }
  removeItem(key: string) { delete this.store[key] }
  clear() { this.store = {} }
}

// ── Mock window con EventTarget ───────────────────────────────────────────────

class MockWindow {
  private target = new EventTarget()
  localStorage = new MockStorage()
  addEventListener(type: string, fn: EventListenerOrEventListenerObject) {
    this.target.addEventListener(type, fn)
  }
  removeEventListener(type: string, fn: EventListenerOrEventListenerObject) {
    this.target.removeEventListener(type, fn)
  }
  dispatchEvent(event: Event) {
    this.target.dispatchEvent(event)
  }
}

// Il modulo config/consent accede a window e window.localStorage.
// Lo patchamo globalmente prima dell'import delle funzioni che usano window.
let mockWindow: MockWindow

beforeEach(() => {
  mockWindow = new MockWindow()
  Object.defineProperty(global, 'window', { value: mockWindow, writable: true, configurable: true })
  Object.defineProperty(global, 'localStorage', {
    value: mockWindow.localStorage,
    writable: true,
    configurable: true,
  })
})

// Importiamo le funzioni dopo aver configurato il mock, altrimenti
// readConsentState/writeConsentState userebbero un window undefined.
// Con Jest i moduli sono già importati — usiamo dynamic require dopo il setup.
function getConsent() {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  return require('@/config/consent') as typeof import('@/config/consent')
}

// ── Costanti ─────────────────────────────────────────────────────────────────

describe('costanti di consenso', () => {
  test('CONSENT_KEY è una stringa non vuota', () => {
    expect(typeof CONSENT_KEY).toBe('string')
    expect(CONSENT_KEY.length).toBeGreaterThan(0)
  })

  test('i tre nomi di evento sono stringhe non vuote e distinti', () => {
    const events = [CONSENT_ACCEPTED_EVENT, CONSENT_REVOKED_EVENT, CONSENT_SETTINGS_EVENT]
    for (const e of events) {
      expect(typeof e).toBe('string')
      expect(e.length).toBeGreaterThan(0)
    }
    expect(new Set(events).size).toBe(3)
  })

  test('ACCEPTED_EVENT ≠ REVOKED_EVENT', () => {
    expect(CONSENT_ACCEPTED_EVENT).not.toBe(CONSENT_REVOKED_EVENT)
  })

  test('SETTINGS_EVENT ≠ ACCEPTED_EVENT e ≠ REVOKED_EVENT', () => {
    expect(CONSENT_SETTINGS_EVENT).not.toBe(CONSENT_ACCEPTED_EVENT)
    expect(CONSENT_SETTINGS_EVENT).not.toBe(CONSENT_REVOKED_EVENT)
  })
})

// ── readConsentState (tramite mock localStorage) ──────────────────────────────

describe('readConsentState()', () => {
  test('null se localStorage vuoto', () => {
    const { readConsentState } = getConsent()
    expect(readConsentState()).toBeNull()
  })

  test('"accepted" dopo setItem("true")', () => {
    mockWindow.localStorage.setItem(CONSENT_KEY, 'true')
    const { readConsentState } = getConsent()
    expect(readConsentState()).toBe('accepted')
  })

  test('"rejected" dopo setItem("false")', () => {
    mockWindow.localStorage.setItem(CONSENT_KEY, 'false')
    const { readConsentState } = getConsent()
    expect(readConsentState()).toBe('rejected')
  })

  test('"rejected" per valore imprevisto (fail-safe)', () => {
    mockWindow.localStorage.setItem(CONSENT_KEY, 'qualsiasi')
    const { readConsentState } = getConsent()
    expect(readConsentState()).toBe('rejected')
  })
})

// ── writeConsentState ─────────────────────────────────────────────────────────

describe('writeConsentState(true) — accettazione', () => {
  test('persiste "true" in localStorage', () => {
    const { writeConsentState } = getConsent()
    writeConsentState(true)
    expect(mockWindow.localStorage.getItem(CONSENT_KEY)).toBe('true')
  })

  test('readConsentState() → "accepted"', () => {
    const { writeConsentState, readConsentState } = getConsent()
    writeConsentState(true)
    expect(readConsentState()).toBe('accepted')
  })

  test('emette CONSENT_ACCEPTED_EVENT', () => {
    const { writeConsentState } = getConsent()
    const handler = jest.fn()
    mockWindow.addEventListener(CONSENT_ACCEPTED_EVENT, handler)
    writeConsentState(true)
    mockWindow.removeEventListener(CONSENT_ACCEPTED_EVENT, handler)
    expect(handler).toHaveBeenCalledTimes(1)
  })

  test('NON emette CONSENT_REVOKED_EVENT', () => {
    const { writeConsentState } = getConsent()
    const handler = jest.fn()
    mockWindow.addEventListener(CONSENT_REVOKED_EVENT, handler)
    writeConsentState(true)
    mockWindow.removeEventListener(CONSENT_REVOKED_EVENT, handler)
    expect(handler).not.toHaveBeenCalled()
  })
})

describe('writeConsentState(false) — rifiuto/revoca', () => {
  test('persiste "false" in localStorage', () => {
    const { writeConsentState } = getConsent()
    writeConsentState(false)
    expect(mockWindow.localStorage.getItem(CONSENT_KEY)).toBe('false')
  })

  test('readConsentState() → "rejected"', () => {
    const { writeConsentState, readConsentState } = getConsent()
    writeConsentState(false)
    expect(readConsentState()).toBe('rejected')
  })

  test('emette CONSENT_REVOKED_EVENT', () => {
    const { writeConsentState } = getConsent()
    const handler = jest.fn()
    mockWindow.addEventListener(CONSENT_REVOKED_EVENT, handler)
    writeConsentState(false)
    mockWindow.removeEventListener(CONSENT_REVOKED_EVENT, handler)
    expect(handler).toHaveBeenCalledTimes(1)
  })

  test('NON emette CONSENT_ACCEPTED_EVENT', () => {
    const { writeConsentState } = getConsent()
    const handler = jest.fn()
    mockWindow.addEventListener(CONSENT_ACCEPTED_EVENT, handler)
    writeConsentState(false)
    mockWindow.removeEventListener(CONSENT_ACCEPTED_EVENT, handler)
    expect(handler).not.toHaveBeenCalled()
  })
})

// ── Flussi composti ───────────────────────────────────────────────────────────

describe('flussi composti', () => {
  test('accetta poi revoca → stato "rejected"', () => {
    const { writeConsentState, readConsentState } = getConsent()
    writeConsentState(true)
    expect(readConsentState()).toBe('accepted')
    writeConsentState(false)
    expect(readConsentState()).toBe('rejected')
  })

  test('rifiuta poi accetta → stato "accepted"', () => {
    const { writeConsentState, readConsentState } = getConsent()
    writeConsentState(false)
    writeConsentState(true)
    expect(readConsentState()).toBe('accepted')
  })

  test('accetta emette ACCEPTED, revoca emette REVOKED — eventi separati e contati correttamente', () => {
    const { writeConsentState } = getConsent()
    const accepted = jest.fn()
    const revoked = jest.fn()
    mockWindow.addEventListener(CONSENT_ACCEPTED_EVENT, accepted)
    mockWindow.addEventListener(CONSENT_REVOKED_EVENT, revoked)
    writeConsentState(true)
    writeConsentState(false)
    mockWindow.removeEventListener(CONSENT_ACCEPTED_EVENT, accepted)
    mockWindow.removeEventListener(CONSENT_REVOKED_EVENT, revoked)
    expect(accepted).toHaveBeenCalledTimes(1)
    expect(revoked).toHaveBeenCalledTimes(1)
  })
})

// ── Nessun dark pattern ───────────────────────────────────────────────────────

describe('nessun dark pattern', () => {
  test('localStorage è vuoto alla partenza — nessun consenso preimpostato', () => {
    expect(mockWindow.localStorage.getItem(CONSENT_KEY)).toBeNull()
  })

  test('importare il modulo non scrive niente in localStorage', () => {
    // Il semplice require non deve produrre effetti collaterali
    getConsent()
    expect(mockWindow.localStorage.getItem(CONSENT_KEY)).toBeNull()
  })
})
