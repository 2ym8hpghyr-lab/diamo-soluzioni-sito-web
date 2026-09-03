// Mappatura stabile: slug pagina servizio → id wizard (chiave di PRICING).
// Usata da QuoteWizard per preselezionare il servizio dal parametro URL ?service=
// e dai test automatici per verificare copertura completa.
export const SERVICE_SLUG_MAP: Record<string, string> = {
  'ristrutturazioni-chiavi-in-mano': 'ristrutturazione_completa',
  'ristrutturazione-bagno':          'bagno_piccolo',
  'pavimentazioni-rivestimenti':     'pavimento',
  'infissi-serramenti':              'infissi',
  'facciate-cappotto-termico':       'cappotto',
  'tinteggiatura':                   'tinteggiatura',
  'impianti-idraulici':              'impianto_idraulico',
  'impianti-elettrici':              'impianto_elettrico',
}
