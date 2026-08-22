'use client'
import { useState, useRef, useEffect } from 'react'
import { business } from '@/config/business'

type Message = { role: 'user' | 'assistant'; content: string }
type Step = 'form' | 'chat'

export default function ChatBot() {
  const [step, setStep] = useState<Step>('form')
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [formError, setFormError] = useState('')
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: 'Ciao! Sono l\'assistente di Diamo Soluzioni.\nDescrivimi il tuo progetto e ti do una stima orientativa dei costi.',
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
    const phoneOk = /^[\d\s+\-()]{7,20}$/.test(phone.trim())
    if (!phoneOk) {
      setFormError('Inserisci un numero di telefono valido.')
      return
    }
    try {
      await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim() || 'Non specificato',
          phone: phone.trim(),
          source: 'chatbot-avvio',
        }),
      })
    } catch {
      // Salvataggio lead fallito, ma l'utente può comunque chattare
    }
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
      const reply = data.reply as string
      setMessages(prev => [...prev, { role: 'assistant', content: reply }])

      // Aggiorna il lead con la conversazione quando appare una stima
      const priceMatch = reply.match(/€[\d\.,\s]+\s*[–\-]\s*€?[\d\.,\s]+/)
      if (priceMatch) {
        const conversationText = [...updatedMessages, { role: 'assistant' as const, content: reply }]
          .map(m => `${m.role === 'user' ? name || 'Cliente' : 'Assistente'}: ${m.content}`)
          .join('\n')
        fetch('/api/lead', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: name.trim() || 'Non specificato',
            phone: phone.trim(),
            description: conversationText.slice(0, 2000),
            source: 'chatbot-stima',
          }),
        })
      }
    } catch {
      setMessages(prev => [...prev, { role: 'assistant', content: `Errore di connessione. Chiamaci al ${business.phone.primary}.` }])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-full max-w-md rounded-2xl overflow-hidden bg-white shadow-[0_24px_64px_rgba(0,0,0,0.18)] border border-concrete">

      {/* Header */}
      <div
        className="px-5 py-4 flex items-center gap-3"
        style={{ background: 'linear-gradient(135deg, #1F4852 0%, #15363E 100%)' }}
      >
        <div className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 bg-gold/20 border border-gold/40">
          <svg className="w-4 h-4 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-bold text-sm text-white leading-tight">Assistente AI — Preventivo</p>
          <p className="text-xs text-white/60">Descrivi il progetto, stimo i costi</p>
        </div>
        <div className="flex items-center gap-1.5 flex-shrink-0">
          <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block" />
          <span className="text-xs text-white/60">Online</span>
        </div>
      </div>

      {/* Messaggi */}
      <div className="h-64 overflow-y-auto p-4 flex flex-col gap-3 bg-warm-white">
        {messages.map((m, i) => (
          <div key={i} className={`flex flex-col ${m.role === 'user' ? 'items-end' : 'items-start'}`}>
            <div
              className={`max-w-[82%] rounded-2xl px-4 py-2.5 text-sm whitespace-pre-wrap leading-relaxed ${
                m.role === 'user'
                  ? 'rounded-br-sm font-medium text-graphite'
                  : 'rounded-bl-sm text-graphite border border-concrete bg-white'
              }`}
              style={m.role === 'user' ? { backgroundColor: '#F4BE12' } : {}}
            >
              {m.content}
            </div>
            {m.role === 'assistant' && i > 0 && (
              <p className="text-[10px] text-gray-400 leading-relaxed mt-1.5 max-w-[82%]">
                La stima online è orientativa e basata su parametri medi di mercato. Non sostituisce un preventivo reale. Serve per avere un ordine di grandezza prima del sopralluogo. Il prezzo definitivo viene sempre stabilito dopo la verifica tecnica in loco.
              </p>
            )}
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="rounded-2xl rounded-bl-sm px-4 py-2.5 text-sm bg-white border border-concrete text-gray-400">
              <span className="inline-flex gap-1">
                <span className="animate-bounce" style={{ animationDelay: '0ms' }}>•</span>
                <span className="animate-bounce" style={{ animationDelay: '150ms' }}>•</span>
                <span className="animate-bounce" style={{ animationDelay: '300ms' }}>•</span>
              </span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Footer */}
      <div className="border-t border-concrete bg-white">
        {step === 'form' ? (
          <form onSubmit={handleFormSubmit} className="p-4 flex flex-col gap-3">
            <input
              type="text"
              placeholder="Il tuo nome (opzionale)"
              value={name}
              onChange={e => setName(e.target.value)}
              className="w-full rounded-xl px-3 py-2.5 text-sm outline-none border border-concrete focus:border-teal transition-colors bg-warm-white text-graphite placeholder:text-gray-400"
            />
            <input
              type="tel"
              placeholder="Numero di telefono *"
              value={phone}
              onChange={e => setPhone(e.target.value)}
              className="w-full rounded-xl px-3 py-2.5 text-sm outline-none border border-concrete focus:border-teal transition-colors bg-warm-white text-graphite placeholder:text-gray-400"
              required
            />
            {formError && <p className="text-red-500 text-xs">{formError}</p>}
            <button
              type="submit"
              className="w-full font-bold py-3 rounded-xl text-sm transition-colors"
              style={{ backgroundColor: '#F4BE12', color: '#1E2A2E' }}
            >
              Inizia la chat →
            </button>
            <p className="text-xs text-center text-gray-400">
              Nessun impegno · Ti ricontattiamo solo se vuoi
            </p>
          </form>
        ) : (
          <div className="p-3 flex gap-2">
            <input
              type="text"
              placeholder="Scrivi un messaggio..."
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && sendMessage()}
              className="flex-1 rounded-xl px-3 py-2.5 text-sm outline-none border border-concrete focus:border-teal transition-colors bg-warm-white text-graphite placeholder:text-gray-400"
            />
            <button
              onClick={sendMessage}
              disabled={loading}
              className="font-bold px-4 py-2.5 rounded-xl text-sm transition-colors disabled:opacity-40"
              style={{ backgroundColor: '#F4BE12', color: '#1E2A2E' }}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
