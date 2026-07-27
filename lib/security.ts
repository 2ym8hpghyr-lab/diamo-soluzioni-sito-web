// lib/security.ts
const SUSPICIOUS_PATTERNS = [
  /ignora\s+(le\s+)?istruz/i,
  /ignore\s+(previous\s+)?instruct/i,
  /sei\s+(chat)?gpt/i,
  /you\s+are\s+(now|actually)/i,
  /pretend\s+to\s+be/i,
  /fingiti/i,
  /system\s+prompt/i,
  /rivela\s+(le\s+)?istruz/i,
  /mostra\s+(il\s+)?prompt/i,
  /what\s+are\s+your\s+instructions/i,
  /jailbreak/i,
  /DAN\b/,
  /bypass/i,
  /override/i,
  /admin\s+mode/i,
]

export function detectSuspiciousMessage(text: string): boolean {
  if (text.length > 1000) return true
  return SUSPICIOUS_PATTERNS.some(pattern => pattern.test(text))
}

export const BLOCK_MESSAGE =
  'Per assistenza diretta chiamaci al +39 344 461 9461 o scrivi a pellumbmurgu@gmail.com.'

export const REDIRECT_MESSAGE =
  'Posso aiutarti solo riguardo ai lavori edili. Vuoi continuare con la tua richiesta?'
