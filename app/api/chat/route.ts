import { NextRequest, NextResponse } from 'next/server'
import { detectSuspiciousMessage, REDIRECT_MESSAGE } from '@/lib/security'
import { buildChatResponse, buildEstimate, Message } from '@/lib/claude'
import { rateLimit, getClientIp } from '@/lib/ratelimit'

export async function POST(req: NextRequest) {
  if (!rateLimit(getClientIp(req), 20, 60_000)) {
    return NextResponse.json({ reply: 'Troppe richieste. Riprova tra qualche minuto.' }, { status: 429 })
  }
  try {
    const body = await req.json()

    // Modalità stima strutturata dal wizard AIQuoteEstimator
    if (body.mode === 'estimate') {
      const { serviceId, serviceLabel, propertyType, size, condition, city, timing, description, leadId } = body

      if (!serviceId || !serviceLabel) {
        return NextResponse.json({ error: 'Parametri mancanti' }, { status: 400 })
      }

      const descClean = typeof description === 'string'
        ? description.slice(0, 1000)
        : ''

      if (detectSuspiciousMessage(descClean)) {
        return NextResponse.json({ minTotal: 0, maxTotal: 0 })
      }

      const result = await buildEstimate({
        serviceId,
        serviceLabel,
        propertyType: propertyType ?? '',
        size: size ?? '',
        condition: condition ?? '',
        city: city ?? '',
        timing: timing ?? '',
        description: descClean,
        leadId: leadId ?? '',
      })

      return NextResponse.json(result)
    }

    // Modalità conversazione (legacy ChatBot, ancora attivo per compatibilità)
    const { messages }: { messages: Message[] } = body

    if (!Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json({ error: 'Messaggi non validi' }, { status: 400 })
    }

    if (messages.length > 50) {
      return NextResponse.json({ reply: 'Conversazione troppo lunga. Chiamaci al +39 344 461 9461.' })
    }

    const lastUserMessage = messages.filter(m => m.role === 'user').at(-1)
    if (!lastUserMessage) {
      return NextResponse.json({ error: 'Nessun messaggio utente' }, { status: 400 })
    }

    const suspiciousCount = messages
      .filter(m => m.role === 'user')
      .filter(m => detectSuspiciousMessage(m.content))
      .length

    if (detectSuspiciousMessage(lastUserMessage.content) && suspiciousCount === 1) {
      return NextResponse.json({ reply: REDIRECT_MESSAGE })
    }

    const reply = await buildChatResponse(messages, suspiciousCount)
    return NextResponse.json({ reply })
  } catch (error) {
    console.error('Chat API error:', error)
    return NextResponse.json({ reply: 'Si è verificato un errore. Chiamaci al +39 344 461 9461.' })
  }
}
