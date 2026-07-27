// app/api/lead/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { sendEmailNotification, sendWhatsAppNotification, LeadData } from '@/lib/notifications'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { email, phone, summary, priceRange } = body

    if (!email || !phone) {
      return NextResponse.json({ success: false, error: 'Dati mancanti' }, { status: 400 })
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const phoneRegex = /^[\d\s+\-()]{7,20}$/
    if (!emailRegex.test(email) || !phoneRegex.test(phone)) {
      return NextResponse.json({ success: false, error: 'Formato non valido' }, { status: 400 })
    }

    const lead: LeadData = {
      email: email.slice(0, 200),
      phone: phone.slice(0, 30),
      summary: (summary || 'Nessun dettaglio ancora').slice(0, 2000),
      priceRange: (priceRange || 'Da definire').slice(0, 100),
      timestamp: new Date().toLocaleString('it-IT', { timeZone: 'Europe/Rome' }),
    }

    await Promise.allSettled([
      sendEmailNotification(lead),
      sendWhatsAppNotification(lead),
    ])

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Lead notification error:', error)
    return NextResponse.json({ success: false }, { status: 500 })
  }
}
