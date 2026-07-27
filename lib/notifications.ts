// lib/notifications.ts
import { Resend } from 'resend'
import twilio from 'twilio'

const resend = new Resend(process.env.RESEND_API_KEY)

export interface LeadData {
  email: string
  phone: string
  summary: string
  priceRange: string
  timestamp: string
}

export async function sendEmailNotification(lead: LeadData): Promise<void> {
  await resend.emails.send({
    from: process.env.RESEND_FROM_EMAIL!,
    to: process.env.NOTIFICATION_EMAIL!,
    subject: `📋 Nuovo contatto — Diamo Soluzioni`,
    html: `
      <h2>📋 Nuovo contatto — Diamo Soluzioni</h2>
      <p><strong>👤 Email:</strong> ${lead.email}</p>
      <p><strong>📞 Telefono:</strong> ${lead.phone}</p>
      <hr/>
      <h3>💬 Riassunto conversazione</h3>
      <pre style="background:#f5f5f5;padding:12px;border-radius:6px">${lead.summary}</pre>
      <p><strong>💰 Fascia di prezzo indicata:</strong> ${lead.priceRange}</p>
      <p><strong>⏰ Ricevuto il:</strong> ${lead.timestamp}</p>
    `,
  })
}

export async function sendWhatsAppNotification(lead: LeadData): Promise<void> {
  const client = twilio(
    process.env.TWILIO_ACCOUNT_SID,
    process.env.TWILIO_AUTH_TOKEN
  )

  const body = `📋 NUOVO CONTATTO — Diamo Soluzioni

👤 Email: ${lead.email}
📞 Telefono: ${lead.phone}

💬 RIASSUNTO:
${lead.summary}

💰 Fascia di prezzo: ${lead.priceRange}

⏰ ${lead.timestamp}`

  await client.messages.create({
    from: process.env.TWILIO_WHATSAPP_FROM!,
    to: process.env.TWILIO_WHATSAPP_TO!,
    body,
  })
}
