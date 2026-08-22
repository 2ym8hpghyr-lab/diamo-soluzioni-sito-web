import { Resend } from 'resend'
import twilio from 'twilio'

function escapeHtml(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
}

export interface LeadData {
  name: string
  phone: string
  email?: string
  leadId?: string
  serviceLabel?: string
  city?: string
  size?: string
  description?: string
  minTotal?: number
  maxTotal?: number
  source?: string
  timestamp: string
}

function formatRange(min?: number, max?: number): string {
  if (!min && !max) return 'Non calcolata'
  const fmt = (n: number) => new Intl.NumberFormat('it-IT', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(n)
  if (min && max) return `${fmt(min)} – ${fmt(max)}`
  return fmt(min ?? max ?? 0)
}

export async function sendEmailNotification(lead: LeadData): Promise<void> {
  const resend = new Resend(process.env.RESEND_API_KEY || 'dummy')
  await resend.emails.send({
    from: process.env.RESEND_FROM_EMAIL!,
    to: (process.env.NOTIFICATION_EMAIL ?? '').split(',').map(e => e.trim()).filter(Boolean),
    subject: `Nuovo lead — ${lead.serviceLabel ?? 'Contatto'} — Diamo Soluzioni`,
    html: `
      <h2 style="color:#1F4852">Nuovo lead — Diamo Soluzioni</h2>
      ${lead.leadId ? `<p style="color:#888;font-size:12px">ID: ${escapeHtml(lead.leadId)}</p>` : ''}
      <table style="border-collapse:collapse;width:100%">
        <tr><td style="padding:6px 12px;background:#f5f5f5;font-weight:bold">Nome</td><td style="padding:6px 12px">${escapeHtml(lead.name)}</td></tr>
        <tr><td style="padding:6px 12px;background:#f5f5f5;font-weight:bold">Telefono</td><td style="padding:6px 12px">${escapeHtml(lead.phone)}</td></tr>
        ${lead.email ? `<tr><td style="padding:6px 12px;background:#f5f5f5;font-weight:bold">Email</td><td style="padding:6px 12px">${escapeHtml(lead.email)}</td></tr>` : ''}
        ${lead.serviceLabel ? `<tr><td style="padding:6px 12px;background:#f5f5f5;font-weight:bold">Servizio</td><td style="padding:6px 12px">${escapeHtml(lead.serviceLabel)}</td></tr>` : ''}
        ${lead.city ? `<tr><td style="padding:6px 12px;background:#f5f5f5;font-weight:bold">Zona</td><td style="padding:6px 12px">${escapeHtml(lead.city)}</td></tr>` : ''}
        ${lead.size ? `<tr><td style="padding:6px 12px;background:#f5f5f5;font-weight:bold">Metratura</td><td style="padding:6px 12px">${escapeHtml(lead.size)} mq</td></tr>` : ''}
        <tr><td style="padding:6px 12px;background:#f5f5f5;font-weight:bold">Stima</td><td style="padding:6px 12px;color:#1F4852;font-weight:bold">${formatRange(lead.minTotal, lead.maxTotal)}</td></tr>
      </table>
      ${lead.description ? `<h3>Descrizione</h3><pre style="background:#f5f5f5;padding:12px;border-radius:6px;white-space:pre-wrap">${escapeHtml(lead.description)}</pre>` : ''}
      <p style="color:#888;font-size:12px">Ricevuto il: ${lead.timestamp} · Fonte: ${lead.source ?? 'sito web'}</p>
    `,
  })
}

export async function sendWhatsAppNotification(lead: LeadData): Promise<void> {
  const client = twilio(
    process.env.TWILIO_ACCOUNT_SID,
    process.env.TWILIO_AUTH_TOKEN
  )

  const range = formatRange(lead.minTotal, lead.maxTotal)
  const lines = [
    `NUOVO LEAD — Diamo Soluzioni`,
    ``,
    `Nome: ${lead.name}`,
    `Tel: ${lead.phone}`,
    lead.email ? `Email: ${lead.email}` : null,
    lead.serviceLabel ? `Servizio: ${lead.serviceLabel}` : null,
    lead.city ? `Zona: ${lead.city}` : null,
    lead.size ? `Metratura: ${lead.size} mq` : null,
    `Stima: ${range}`,
    lead.description ? `\nDescrizione:\n${lead.description}` : null,
    ``,
    lead.timestamp,
    lead.leadId ? `ID: ${lead.leadId}` : null,
  ].filter(Boolean).join('\n')

  await client.messages.create({
    from: process.env.TWILIO_WHATSAPP_FROM!,
    to: process.env.TWILIO_WHATSAPP_TO!,
    body: lines,
  })
}
