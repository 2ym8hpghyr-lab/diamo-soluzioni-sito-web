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
      content:
        'Ciao! Sono l\'assistente virtuale di Diamo Soluzioni.\nPer poterti fornire una stima precisa, iniziamo con i tuoi contatti.',
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

    // Invia subito il lead con i contatti (il riassunto verrà aggiornato dopo la chat)
    await fetch('/api/lead', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email,
        phone,
        summary: 'Contatto appena acquisito — conversazione in corso.',
        priceRange: 'Da definire',
      }),
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

      // Invia riassunto SOLO quando l'AI fornisce una fascia di prezzo (una volta sola)
      const priceMatch = data.reply.match(/€[\d\.,\s]+\s*[–\-]\s*€?[\d\.,\s]+/)
      if (priceMatch) {
        const conversationText = [...updatedMessages, { role: 'assistant' as const, content: data.reply }]
          .map(m => `${m.role === 'user' ? 'Cliente' : 'Assistente'}: ${m.content}`)
          .join('\n')
        fetch('/api/lead', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email,
            phone,
            summary: conversationText.slice(0, 2000),
            priceRange: priceMatch[0],
          }),
        })
      }
    } catch {
      setMessages(prev => [
        ...prev,
        { role: 'assistant', content: 'Errore di connessione. Riprova o chiamaci al +39 344 461 9461.' },
      ])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden border border-gray-100">
      {/* Header */}
      <div className="bg-brand-accent px-5 py-4 flex items-center gap-3">
        <div className="text-2xl">🤖</div>
        <div>
          <p className="font-bold text-brand-dark text-sm uppercase tracking-wide">
            Chiedi alla nostra Intelligenza Artificiale
          </p>
          <p className="text-xs text-brand-dark/70">
            Raccontaci il tuo progetto e ricevi una stima personalizzata
          </p>
        </div>
      </div>

      {/* Body */}
      <div className="h-80 overflow-y-auto p-4 flex flex-col gap-3 bg-gray-50">
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div
              className={`max-w-[80%] rounded-2xl px-4 py-2 text-sm whitespace-pre-wrap ${
                m.role === 'user'
                  ? 'bg-brand-primary text-white rounded-br-none'
                  : 'bg-white text-brand-dark shadow rounded-bl-none'
              }`}
            >
              {m.content}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-white shadow rounded-2xl rounded-bl-none px-4 py-2 text-sm text-gray-400">
              Sto scrivendo...
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Footer: form o input chat */}
      {step === 'form' ? (
        <form onSubmit={handleFormSubmit} className="p-4 bg-white border-t border-gray-100 flex flex-col gap-2">
          <input
            type="email"
            placeholder="✉ La tua email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-brand-accent"
            required
          />
          <input
            type="tel"
            placeholder="📞 Il tuo numero di telefono"
            value={phone}
            onChange={e => setPhone(e.target.value)}
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-brand-accent"
            required
          />
          {formError && <p className="text-red-500 text-xs">{formError}</p>}
          <button
            type="submit"
            className="bg-brand-accent text-brand-dark font-bold py-2 rounded-lg text-sm hover:opacity-90 transition"
          >
            INVIA E CONTINUA →
          </button>
          <p className="text-xs text-gray-400 text-center">
            🔒 I tuoi dati sono al sicuro e verranno usati solo per ricontattarti.
          </p>
        </form>
      ) : (
        <div className="p-4 bg-white border-t border-gray-100 flex gap-2">
          <input
            type="text"
            placeholder="Scrivi un messaggio..."
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && sendMessage()}
            className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-brand-accent"
          />
          <button
            onClick={sendMessage}
            disabled={loading}
            className="bg-brand-accent text-brand-dark font-bold px-4 py-2 rounded-lg text-sm hover:opacity-90 transition disabled:opacity-50"
          >
            →
          </button>
        </div>
      )}

      <div className="px-4 pb-2 bg-white flex justify-between text-xs text-gray-400">
        <span>Powered by AI</span>
        <span className="text-green-500">● Online</span>
      </div>
    </div>
  )
}
