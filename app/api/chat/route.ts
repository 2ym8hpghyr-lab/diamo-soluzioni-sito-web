// app/api/chat/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { detectSuspiciousMessage, REDIRECT_MESSAGE } from '@/lib/security'
import { buildChatResponse, Message } from '@/lib/claude'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { messages, suspiciousCount = 0 }: { messages: Message[]; suspiciousCount: number } = body

    if (!Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json({ error: 'Messaggi non validi' }, { status: 400 })
    }

    if (messages.length > 50) {
      return NextResponse.json({ reply: 'Conversazione troppo lunga. Chiamaci direttamente al +39 344 461 9461.' })
    }

    const lastUserMessage = messages.filter(m => m.role === 'user').at(-1)
    if (!lastUserMessage) {
      return NextResponse.json({ error: 'Nessun messaggio utente' }, { status: 400 })
    }

    const isSuspicious = detectSuspiciousMessage(lastUserMessage.content)
    const newSuspiciousCount = isSuspicious ? suspiciousCount + 1 : suspiciousCount

    if (isSuspicious && newSuspiciousCount === 1) {
      return NextResponse.json({ reply: REDIRECT_MESSAGE, suspiciousCount: newSuspiciousCount })
    }

    const reply = await buildChatResponse(messages, newSuspiciousCount)
    return NextResponse.json({ reply, suspiciousCount: newSuspiciousCount })
  } catch (error) {
    console.error('Chat API error:', error)
    return NextResponse.json({ reply: 'Si è verificato un errore. Chiamaci al +39 344 461 9461.' })
  }
}
