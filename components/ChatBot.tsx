'use client'
import { useState, useRef, useEffect } from 'react'

type Message = { role: 'user' | 'assistant'; content: string }
type Step = 'form' | 'chat'

export default function ChatBot() {
  const [step, setStep] = useState<Step>('form')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [formError, setFormError] = useState('')
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: 'Ciao! Sono l\'assistente di Diamo Soluzioni.\nDescrivimi il tuo progetto e riceverai una stima personalizzata.',
    },
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  async function handleFormSubmit(e: React.FormEvent) {
    e.preventDefault()
    setFormError('')
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    const phoneOk = /^[\d\s\+\-\(\)]{7,20}$/.test(phone)
    if (!emailOk || !phoneOk) {
      setFormError('Inserisci un\'email e un numero di telefono validi.')
      return
    }
    await fetch('/api/lead', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, phone, summary: 'Contatto appena acquisito — conversazione in corso.', priceRange: 'Da definire' }),
    })
    setStep('chat')
  }

  async function sendMessage() {
    if (!input.trim() || loading) return
    const userMessage: Message = { role: 'user', content: input.trim() }
    const updatedMessages = [...messages, userMessage]
    setMessages(updatedMessages)
    setInput('')
    setLoading(true)
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: updatedMessages }),
      })
      const data = await res.json()
      setMessages(prev => [...prev, { role: 'assistant', content: data.reply }])
      const priceMatch = data.reply.match(/€[\d\.,\s]+\s*[–\-]\s*€?[\d\.,\s]+/)
      if (priceMatch) {
        const conversationText = [...updatedMessages, { role: 'assistant' as const, content: data.reply }]
          .map(m => `${m.role === 'user' ? 'Cliente' : 'Assistente'}: ${m.content}`)
          .join('\n')
        fetch('/api/lead', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, phone, summary: conversationText.slice(0, 2000), priceRange: priceMatch[0] }),
        })
      }
    } catch {
      setMessages(prev => [...prev, { role: 'assistant', content: 'Errore di connessione. Chiamaci al +39 344 461 9461.' }])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      className="w-full max-w-md overflow-hidden"
      style={{
        backgroundColor: 'rgba(26, 29, 36, 0.95)',
        borderRadius: '16px',
        border: '1px solid rgba(197, 160, 89, 0.25)',
        boxShadow: '0 24px 64px rgba(0,0,0,0.5)',
        backdropFilter: 'blur(8px)',
      }}
    >
      {/* Header */}
      <div
        className="px-5 py-4 flex items-center gap-3"
        style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}
      >
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center text-lg flex-shrink-0"
          style={{ backgroundColor: 'rgba(197,160,89,0.15)', border: '1px solid rgba(197,160,89,0.3)' }}
        >
          ✦
        </div>
        <div>
          <p
            className="font-bold text-sm"
            style={{ color: '#F3F4F6', fontFamily: '"Plus Jakarta Sans", sans-serif' }}
          >
            Assistente AI — Preventivo Istantaneo
          </p>
          <p className="text-xs" style={{ color: '#9CA3AF' }}>
            Descrivi il tuo progetto, ti stimiamo i costi
          </p>
        </div>
        <div className="ml-auto flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-green-400 inline-block" />
          <span className="text-xs" style={{ color: '#9CA3AF' }}>Online</span>
        </div>
      </div>

      {/* Messages */}
      <div className="h-72 overflow-y-auto p-4 flex flex-col gap-3" style={{ backgroundColor: '#0F1115' }}>
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div
              className="max-w-[82%] rounded-2xl px-4 py-2.5 text-sm whitespace-pre-wrap leading-relaxed"
              style={
                m.role === 'user'
                  ? { backgroundColor: '#C5A059', color: '#0F1115', borderBottomRightRadius: '4px', fontWeight: 500 }
                  : { backgroundColor: '#1A1D24', color: '#F3F4F6', border: '1px solid rgba(255,255,255,0.08)', borderBottomLeftRadius: '4px' }
              }
            >
              {m.content}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div
              className="rounded-2xl rounded-bl-sm px-4 py-2.5 text-sm"
              style={{ backgroundColor: '#1A1D24', color: '#9CA3AF', border: '1px solid rgba(255,255,255,0.08)' }}
            >
              Sto scrivendo...
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Footer: form o input */}
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', backgroundColor: '#1A1D24' }}>
        {step === 'form' ? (
          <form onSubmit={handleFormSubmit} className="p-4 flex flex-col gap-3">
            <input
              type="email"
              placeholder="La tua email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full rounded-lg px-3 py-2.5 text-sm outline-none transition-colors"
              style={{ backgroundColor: '#0F1115', border: '1px solid rgba(255,255,255,0.12)', color: '#F3F4F6' }}
              required
            />
            <input
              type="tel"
              placeholder="Il tuo numero di telefono"
              value={phone}
              onChange={e => setPhone(e.target.value)}
              className="w-full rounded-lg px-3 py-2.5 text-sm outline-none transition-colors"
              style={{ backgroundColor: '#0F1115', border: '1px solid rgba(255,255,255,0.12)', color: '#F3F4F6' }}
              required
            />
            {formError && <p className="text-red-400 text-xs">{formError}</p>}
            <button
              type="submit"
              className="w-full font-semibold py-3 rounded-lg text-sm transition-colors duration-200"
              style={{ backgroundColor: '#C5A059', color: '#0F1115' }}
            >
              Inizia la Chat →
            </button>
            <p className="text-xs text-center" style={{ color: '#9CA3AF' }}>
              🔒 I tuoi dati sono al sicuro e verranno usati solo per ricontattarti.
            </p>
          </form>
        ) : (
          <div className="p-4 flex gap-2">
            <input
              type="text"
              placeholder="Scrivi un messaggio..."
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && sendMessage()}
              className="flex-1 rounded-lg px-3 py-2.5 text-sm outline-none"
              style={{ backgroundColor: '#0F1115', border: '1px solid rgba(255,255,255,0.12)', color: '#F3F4F6' }}
            />
            <button
              onClick={sendMessage}
              disabled={loading}
              className="font-bold px-4 py-2.5 rounded-lg text-sm transition-colors duration-200 disabled:opacity-40"
              style={{ backgroundColor: '#C5A059', color: '#0F1115' }}
            >
              →
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
