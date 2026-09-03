import { NextRequest, NextResponse } from 'next/server'
import { sendEmailNotification, sendWhatsAppNotification, LeadData } from '@/lib/notifications'
import { rateLimit, getClientIp } from '@/lib/ratelimit'

const PHONE_RE = /^[\d\s+\-()]{7,20}$/
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export async function POST(req: NextRequest) {
  if (!rateLimit(getClientIp(req), 5, 60_000)) {
    return NextResponse.json({ success: false, error: 'Troppe richieste. Riprova tra qualche minuto.' }, { status: 429 })
  }
  try {
    const body = await req.json()
    const { name, phone, email, leadId, serviceLabel, city, size, description, minTotal, maxTotal, source } = body

    if (!name || !phone) {
      return NextResponse.json({ success: false, error: 'Nome e telefono obbligatori' }, { status: 400 })
    }

    const nameClean = String(name).slice(0, 100).trim()
    const phoneClean = String(phone).slice(0, 30).trim()

    if (!PHONE_RE.test(phoneClean)) {
      return NextResponse.json({ success: false, error: 'Numero di telefono non valido' }, { status: 400 })
    }

    if (email && !EMAIL_RE.test(String(email))) {
      return NextResponse.json({ success: false, error: 'Email non valida' }, { status: 400 })
    }

    const lead: LeadData = {
      name: nameClean,
      phone: phoneClean,
      email: email ? String(email).slice(0, 200).trim() : undefined,
      leadId: leadId ? String(leadId).slice(0, 50) : undefined,
      serviceLabel: serviceLabel ? String(serviceLabel).slice(0, 100) : undefined,
      city: city ? String(city).slice(0, 100) : undefined,
      size: size ? String(size).slice(0, 20) : undefined,
      description: description ? String(description).slice(0, 2000) : undefined,
      minTotal: minTotal ? Number(minTotal) : undefined,
      maxTotal: maxTotal ? Number(maxTotal) : undefined,
      source: source ? String(source).slice(0, 50) : 'sito-web',
      timestamp: new Date().toLocaleString('it-IT', { timeZone: 'Europe/Rome' }),
    }

    await Promise.allSettled([
      sendEmailNotification(lead),
      sendWhatsAppNotification(lead),
    ])

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Lead API error:', error)
    return NextResponse.json({ success: false }, { status: 500 })
  }
}
