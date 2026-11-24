/** Evento GA4 associato a un link nel corpo di un articolo; null se il link non va tracciato. */
export function blogLinkEvent(href: string): string | null {
  if (href.startsWith('https://wa.me/')) return 'click_whatsapp'
  if (href.startsWith('tel:')) return 'click_phone'
  if (href.includes('#preventivatore')) return 'click_estimator'
  if (href === '/contatti') return 'click_contact'
  if (href.startsWith('/progetti')) return 'click_project'
  if (href.startsWith('/servizi')) return 'service_view_from_blog'
  return null
}
