export const business = {
  name: 'Diamo Soluzioni',
  legalName: 'Diamo Soluzioni di Murgu Pellumb',
  vatId: '12870260960',
  address: {
    street: 'Via Roma 1',
    city: 'Merlino',
    province: 'LO',
    postalCode: '26833',
    country: 'IT',
    full: 'Via Roma 1, 26833 Merlino (LO)',
  },
  phone: {
    primary: '+39 344 461 9461',
    primaryRaw: '+393444619461',
    secondary: '+39 353 437 5609',
    secondaryRaw: '+393534375609',
  },
  whatsapp: {
    number: '+393444619461',
    url: 'https://wa.me/393444619461',
  },
  email: 'pellumbmurgu@gmail.com',
  geo: {
    latitude: 45.4039,
    longitude: 9.5072,
  },
  hours: {
    weekdays: '08:00–18:00',
    schema: [
      { dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], opens: '08:00', closes: '18:00' },
    ],
  },
  claim: 'COSTRUIAMO SOLUZIONI DESTINATE A DURARE',
  tagline: 'Ristrutturazioni · Edilizia · Interni · Soluzioni complete',
  description:
    'Impresa edile specializzata in ristrutturazioni complete, infissi, facciate e impianti. Sede a Merlino (LO).',
  // Zone realmente servite — da verificare con il titolare
  areas: [
    'Merlino',
    'Lodi',
    'Zelo Buon Persico',
    'Paullo',
    'Melegnano',
    'San Donato Milanese',
    'Milano Sud',
    'Crema',
    'Pandino',
  ] as const,
  social: {
    googleBusiness: 'https://share.google/qwv8GhtjgXb64lFTK',
  },
  siteUrl: 'https://www.diamosoluzioni.com',
} as const

export type BusinessArea = (typeof business.areas)[number]

export function whatsappUrl(message: string): string {
  return `https://wa.me/${business.whatsapp.number.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`
}
