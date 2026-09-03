const store = new Map<string, { count: number; reset: number }>()

export function rateLimit(ip: string, limit: number, windowMs: number): boolean {
  const now = Date.now()
  const entry = store.get(ip)

  if (!entry || now > entry.reset) {
    store.set(ip, { count: 1, reset: now + windowMs })
    return true
  }

  if (entry.count >= limit) {
    return false
  }

  entry.count++
  return true
}

export function getClientIp(req: { headers: { get(name: string): string | null } }): string {
  return (
    req.headers.get('cf-connecting-ip') ||
    req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    '127.0.0.1'
  )
}
