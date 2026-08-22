# DIAMO SOLUZIONI - SPECIFICA UNICA COMPATTA PER CLAUDE CODE

## Comando iniziale
Apri il progetto Diamo Soluzioni su Grappify. Lavora direttamente nel repository gia presente. Applica integralmente questa specifica in modalita token-lean: non produrre un piano esteso, non ripetere il brief, implementa, verifica e correggi. Rispondi soltanto nel formato finale indicato.

## Gerarchia delle fonti
1. Dati, route, funzioni, configurazioni e modifiche utente presenti nel repository sono la fonte di verita.
2. Questa specifica consolidata decide layout e direzione visiva e sostituisce i 10 PDF precedenti.
3. Gli asset allegati a questo PDF sono definitivi: riusali se gia presenti; altrimenti estraili. Non rigenerarli.
4. Le specifiche piu vecchie sono state risolte cosi: una sola FAQ (versione Zone + FAQ chiara), una sola CTA/footer (versione crema/carbone/giallo), una sola sezione Contatti + Preventivatore AI (versione piu recente).

## Modalita token-lean e sicurezza
- Esegui un solo audit iniziale: git status, package.json/lockfile, route, token, componenti e dati. Non raccontarlo; crea una mappa interna e apri solo file e import diretti necessari.
- Trova i target con rg usando le stringhe visibili indicate sotto; non scandire ripetutamente l'intero repository.
- Riusa stack, CSS, componenti, icone, analytics, test e dipendenze. Non installare librerie, non cambiare framework, non fare commit/push/deploy.
- Preserva ogni modifica utente non correlata. Niente reset o cancellazioni massive.
- Non inventare progetti, recensioni, rating, tempi, certificazioni, aree, P.IVA, email, indirizzi o URL. Nessun href '#', placeholder pubblico o successo simulato.
- Centralizza dati condivisi; non duplicare FAQ, recapiti, progetti o recensioni.
- Implementa in questo ordine: fondazioni condivise minime; Home; Chi siamo; Progetti; Recensioni; Zone+FAQ; Contatti+AI; CTA/footer globale; QA.
- Se un dato manca, ometti l'elemento o dichiara il blocco. Fai una domanda solo se manca un asset o un dato indispensabile e non recuperabile.

## Asset incorporati
- hero-home-materiali-lavorazione-v2.webp
- chi-siamo-hero-premium.webp
- diamo-soluzioni-portfolio-hero-originale.webp
- recensioni-diamo-soluzioni-premium.webp
- zone-servite-premium-bg.webp
- DS_CONTATTI_MATERIALI_LAVORAZIONE_01.webp
- cta-footer-cantiere-tramonto.webp

Se il PDF e disponibile come file e gli asset non sono nel progetto, estrai gli allegati una sola volta con `pdfdetach -saveall -o <cartella-temporanea> <pdf>` o strumento equivalente. Copiali nelle cartelle asset coerenti con il repository e non pubblicare il file Markdown.

## 1. Home - solo sfondo hero
Trova: `Costruiamo soluzioni|destinate a durare|Assistente AI Preventivo|Ottieni una stima`.
Sostituisci esclusivamente blueprint/sfondo della hero con `hero-home-materiali-lavorazione-v2.webp`. Foto full-bleed dietro i contenuti; non toccare copy, header, font, dimensioni, CTA gialle, badge, spacing, card Assistente AI, animazioni o logica del preventivo. Object-position: desktop 58% 50%, tablet 62% 50%, mobile 70% 50%. Overlay caldo: forte a sinistra, trasparente a destra; punto di partenza `linear-gradient(90deg,rgba(20,18,13,.94) 0%,rgba(20,18,13,.82) 36%,rgba(20,18,13,.50) 58%,rgba(20,18,13,.12) 100%)` piu lieve vignettatura inferiore. Immagine decorativa, alt vuoto, LCP prioritaria, nessun parallax/filtro/blur/seconda copia.

## 2. Chi siamo - redesign pagina
Trova route e stringhe `Chi siamo|La nostra storia|Costruiamo soluzioni`.
Hero full-bleed con `chi-siamo-hero-premium.webp`, altezza `clamp(620px,78vh,820px)`, mobile 680-720px, position 72% desktop/68% mobile, overlay petrolio/antracite forte a sinistra. Copy: eyebrow `LA NOSTRA STORIA`; H1 `Costruiamo soluzioni destinate a durare.`; testo `Siamo un'impresa edile con sede a Merlino (LO). Seguiamo ristrutturazioni, pavimentazioni, impianti e riparazioni in provincia di Lodi e Milano Sud, con un unico referente dall'idea alla consegna.`; CTA `Raccontaci il tuo progetto` + `Scopri come lavoriamo`.
Percorso: fascia fiducia unica a 4 colonne (Un solo referente, Preventivi chiari, Lavori coordinati, Cura dei dettagli); storia editoriale; metodo numerato in 3 fasi; principi come lista scura con divisori; CTA territoriale finale. Niente card pallide ripetute, persone stock o metriche inventate. Mantieni header/footer e funzioni.

## 3. Progetti
Trova `/progetti` e `I nostri lavori`.
Sostituisci la griglia anonima con portfolio editoriale. Hero 500-560px con `diamo-soluzioni-portfolio-hero-originale.webp`, soggetti a destra e overlay carbone a sinistra. Copy: `PROGETTI REALI`; H1 `I nostri lavori. Costruiti per durare.`; `Case vere, problemi reali, soluzioni costruite bene.`; CTA reale `Parlaci del tuo progetto`. Numero progetti calcolato dai dati, mai hardcoded.
Sotto: intro a sinistra + pannello bianco con accordion/casi studio a destra. Una struttura dati tipizzata e unica; mostra solo dati, miniature e route reali. Filtri soltanto con piu di 6 progetti e almeno 2 categorie vere. Accordion accessibile; niente pagina dettaglio vuota o modale decorativa.

## 4. Recensioni
Trova `Recensioni reali da Google|Recensioni da inserire`.
Elimina ogni placeholder. Sezione full-bleed con `recensioni-diamo-soluzioni-premium.webp`, overlay scuro da sinistra. Copy: eyebrow `FIDUCIA COSTRUITA SUL CAMPO`; H2 `Lavori ben fatti. Clienti che lo confermano.`; sottotitolo `Recensioni vere, raccolte dal profilo Google di Diamo Soluzioni.`. Desktop massimo 3 card vere, centrale leggermente sollevata. Mobile card 86vw in scroll-snap, una per volta, nessun autoplay. Se reviews e vuoto, renderizza null o solo link Google verificabile. Review/AggregateRating JSON-LD solo da dati reali e visibili.

## 5. Zone servite + FAQ - una sola composizione
Trova `Zone servite|Domande frequenti|Come funziona il sopralluogo gratuito?`.
Questa versione sostituisce la vecchia FAQ scura: non creare una seconda FAQ e non usare `faq-architecture-gold.webp` in produzione.
Zone: hero 620-760px con `zone-servite-premium-bg.webp`, soggetto a destra, overlay `linear-gradient(90deg,rgba(23,23,20,.93) 0%,rgba(23,23,20,.68) 48%,rgba(23,23,20,.18) 100%)`. Eyebrow `ZONE SERVITE`; H2 `Operiamo a Merlino, Lodi e Milano Sud.`; copy `Un'impresa locale, presente davvero sul territorio. Sopralluoghi chiari, tempi concreti, lavori fatti bene.`. Nove chip non cliccabili da unico array: Merlino, Lodi, Zelo Buon Persico, Paullo, Melegnano, San Donato Milanese, Milano Sud, Crema, Pandino. CTA `Verifica la tua zona` verso flusso reale.
FAQ: fondo crema, desktop 40/60. Sinistra: eyebrow `FAQ`, H2 `Le risposte prima di iniziare.`, testo breve e telefono reale. Destra: unico pannello carta con tutte le FAQ vere gia presenti. Prima aperta, una sola alla volta, button reali, aria-expanded/controls, focus visibile e reduced-motion. Mantieni una sola fonte per accordion e FAQPage JSON-LD.

## 6. Contatti + Preventivatore AI
Trova route Contatti e `Preventivatore AI|Il tuo progetto merita|Calcola la stima`.
Applica solo alla sezione Contatti + AI + informazioni operative. Intro con eyebrow `CONTATTI`, H1 `Il tuo progetto merita un confronto concreto.` e testo breve con filetto ottone. Tre card: Telefono, WhatsApp, Email; interamente cliccabili usando dati/config reali.
Corpo desktop 7/5: a sinistra Preventivatore con `DS_CONTATTI_MATERIALI_LAVORAZIONE_01.webp`, overlay profondo, testo HTML e CTA reale `Calcola la stima`; a destra unico pannello pietra `Qui quando serve.` con sede/orari/garanzie reali e divisori. Niente tre box pallidi. Preserva API, stato, validazione, errori, loading, successo e analytics del preventivatore/form. Deep teal ammesso solo qui se gia coerente con i token attuali; non creare una seconda palette globale.

## 7. CTA finale + footer globale
Trova `Hai un progetto in mente|Ottieni una stima|WhatsApp|footer`.
La versione finale e quella calda: ignora il vecchio footer scuro/teal. Crea un solo componente condiviso. CTA full-bleed 560-620px con `cta-footer-cantiere-tramonto.webp`, testo a sinistra e casa a destra, overlay caldo. Copy: `INIZIA DA QUI`; H2 `Hai un progetto in mente?`; `Raccontaci cosa vuoi realizzare. Il sopralluogo e gratuito e senza impegno.`; CTA AI reale + WhatsApp + telefono reale; un solo pannello `CONTATTO DIRETTO / Sopralluogo gratuito / Senza impegno.`.
Footer subito sotto, crema e non nero: griglia 4 colonne desktop (brand, servizi reali max 6, azienda, unica card contatti carbone), 2x2 tablet, una colonna mobile. Anno dinamico. P.IVA, indirizzo, privacy, cookie, social e orari solo se verificati e con route reali. Nessun teal/blu in CTA/footer.

## Regole trasversali
Usa token esistenti; base calda carbone/crema/giallo, fotografie reali, bordi sottili, ombre morbide, micro-interazioni 160-280ms. Vietati neon, glow, glassmorphism, gradienti elettrici, blueprint, parallax pesante, video, testo dentro immagini e nuove librerie. Componenti semantici, un H1 per pagina, focus visibile, contrasto WCAG AA, target 44px, reduced-motion. Immagini ottimizzate con sizes/aspect ratio, priorita solo LCP e lazy sotto la piega.

## QA obbligatorio
Leggi gli script reali e usa il package manager del lockfile. Esegui quelli disponibili: lint, typecheck, test, build; poi `git diff --check`. Correggi solo errori introdotti e separa quelli preesistenti. Verifica 360, 390, 768, 1024 e 1440px; niente overflow/tagli/CLS/404/errori console. Testa link tel/mail/WhatsApp, route AI, form, accordion FAQ/progetti, tastiera e focus. Screenshot desktop e mobile per ogni route toccata se l'ambiente lo consente. Non dichiarare Lighthouse o test non misurati.

## Risposta finale - massimo 12 righe
ESITO: completato oppure bloccato.
FILE: elenco raggruppato dei file modificati.
FUNZIONI: conferma link, AI/form, accordion e dati reali.
TEST: comando -> esito reale; segnala errori preesistenti.
VISUAL: percorsi screenshot e viewport.
MANCANTI: solo dati/asset realmente mancanti, altrimenti `nessuno`.
Non aggiungere spiegazioni, codice, diff o proposte future.
