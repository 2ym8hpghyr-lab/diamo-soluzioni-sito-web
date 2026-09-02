export interface TerritoryService {
  slug: string
  label: string
  localNote: string
}

export interface Territory {
  slug: string
  city: string
  province: string
  seoTitle: string
  seoDesc: string
  h1Line1: string
  h1Line2Gold: string
  subtitle: string
  intro: string
  localContext: string
  mainServices: TerritoryService[]
  localKnowledge: { heading: string; body: string }[]
  faq: { q: string; a: string }[]
  relatedProjectSlugs: string[]
  cta: string
}

export const territories: Territory[] = [
  {
    slug: 'ristrutturazioni-lodi',
    city: 'Lodi',
    province: 'LO',
    seoTitle: 'Ristrutturazioni a Lodi — Impresa Edile',
    seoDesc: 'Ristrutturazioni a Lodi: bagni, pavimenti, impianti e infissi. Referente unico, sopralluogo gratuito, preventivo scritto entro 48h. Diamo Soluzioni.',
    h1Line1: 'Ristrutturazioni a Lodi',
    h1Line2Gold: 'e provincia.',
    subtitle: 'Un unico referente dal sopralluogo alla consegna — senza sorprese.',
    intro: 'Operiamo a Lodi e provincia con cantieri attivi nel centro storico, nelle periferie residenziali e nei condomini. Conosciamo le specificità del patrimonio edilizio lodigiano: palazzi d\'epoca, appartamenti degli anni \'60-\'80 e ville degli anni \'90. Ogni progetto è gestito in proprio, senza subappalti.',
    localContext: 'Lodi ha un centro storico di pregio con edifici d\'epoca e palazzi ottocenteschi che richiedono attenzione ai materiali e alle normative di tutela. Le periferie residenziali sono composte prevalentemente da appartamenti costruiti tra il 1960 e il 1990, con impianti spesso da rifare e finiture datate. La richiesta più frequente a Lodi è la ristrutturazione completa — bagno, pavimenti, impianti — spesso abbinata alla sostituzione degli infissi.',
    mainServices: [
      { slug: 'ristrutturazioni-chiavi-in-mano', label: 'Ristrutturazioni Chiavi in Mano', localNote: 'Il servizio più richiesto a Lodi: un unico referente coordina demolizioni, impianti, finiture e consegna.' },
      { slug: 'ristrutturazione-bagno', label: 'Rifacimento Bagno', localNote: 'Bagni completi o parziali negli appartamenti del centro e delle periferie lodigiane.' },
      { slug: 'pavimentazioni-rivestimenti', label: 'Pavimentazioni e Rivestimenti', localNote: 'Gres grande formato e parquet per interni, rivestimenti per cucine e bagni a Lodi.' },
      { slug: 'infissi-serramenti', label: 'Infissi e Serramenti', localNote: 'Sostituzione infissi anni \'80 con serramenti PVC o alluminio ad alto isolamento termico.' },
    ],
    localKnowledge: [
      {
        heading: 'Lavoriamo anche nel centro storico di Lodi',
        body: 'Alcune zone del centro storico di Lodi ricadono in aree tutelate dove vanno rispettate indicazioni specifiche su materiali di facciata e infissi. Conosciamo le normative locali e aiutiamo i clienti a gestire le pratiche comunali prima di iniziare qualsiasi lavoro.',
      },
      {
        heading: 'Condomini anni \'70-\'80: cosa troviamo solitamente',
        body: 'Gli appartamenti costruiti a Lodi tra il 1970 e il 1990 presentano spesso impianti idraulici in piombo o acciaio, impianti elettrici senza messa a terra, pavimenti in graniglia o ceramica consumata e infissi in alluminio non isolante. In questi casi la ristrutturazione integrale è quasi sempre più conveniente rispetto agli interventi puntuali.',
      },
      {
        heading: 'Tempistiche reali per un cantiere a Lodi',
        body: 'Un rifacimento bagno standard richiede 8–12 giorni lavorativi. Una ristrutturazione completa di un appartamento tra i 70 e 90 mq richiede 6–10 settimane. Rilasciamo sempre un cronoprogramma scritto prima di iniziare: le scadenze che promettiamo sono quelle che rispettiamo.',
      },
    ],
    faq: [
      { q: 'Operate in tutto il comune di Lodi?', a: 'Sì, operiamo sia nel centro storico che nelle zone periferiche e nei quartieri residenziali. Rientrano nella nostra area anche le frazioni del comune.' },
      { q: 'Fate sopralluoghi gratuiti a Lodi?', a: 'Sì, il sopralluogo è sempre gratuito e senza impegno. Di solito riusciamo a fissarlo entro 2–4 giorni dalla richiesta.' },
      { q: 'Come funziona il preventivo per una ristrutturazione a Lodi?', a: 'Dopo il sopralluogo prepariamo un preventivo scritto dettagliato entro 48 ore. Elenca tutti i lavori, i materiali e i tempi — nessun costo nascosto aggiunto in un secondo momento.' },
    ],
    relatedProjectSlugs: ['ristrutturazione-appartamento-lodi', 'ristrutturazione-bagno', 'pavimentazioni-gres'],
    cta: 'Hai un appartamento o una casa da ristrutturare a Lodi?',
  },
  {
    slug: 'impresa-edile-lodi',
    city: 'Lodi',
    province: 'LO',
    seoTitle: 'Impresa Edile a Lodi — Facciate e Impianti',
    seoDesc: 'Impresa edile a Lodi e provincia: ristrutturazioni, facciate, cappotto termico e impianti. Preventivo scritto, referente unico, sopralluogo gratuito.',
    h1Line1: 'Impresa Edile a Lodi',
    h1Line2Gold: 'e provincia.',
    subtitle: 'Edilizia completa per privati e condomini a Lodi: ristrutturazioni, facciate, impianti.',
    intro: 'Diamo Soluzioni è un\'impresa edile con sede operativa a Merlino, a pochi chilometri da Lodi. Interveniamo su cantieri di ogni dimensione: dalle ristrutturazioni private alle facciate condominiali, dalla sostituzione di serramenti al rifacimento di impianti. Lavoriamo per privati, amministratori di condominio e proprietari immobiliari.',
    localContext: 'Il mercato edilizio lodigiano conta numerosi immobili degli anni \'60–\'90 che richiedono interventi strutturati su impianti, facciate e interni. Come impresa edile che opera a Lodi, gestiamo sia interventi su immobili privati che su parti comuni condominiali.',
    mainServices: [
      { slug: 'ristrutturazioni-chiavi-in-mano', label: 'Ristrutturazioni Complete', localNote: 'Ristrutturiamo appartamenti e ville a Lodi con un unico contratto, dalla demolizione alla consegna.' },
      { slug: 'facciate-cappotto-termico', label: 'Facciate e Cappotto Termico', localNote: 'Risanamento facciate condominiali e applicazione cappotto termico a Lodi e provincia.' },
      { slug: 'impianti-idraulici', label: 'Impianti Idraulici', localNote: 'Rifacimento impianti negli edifici residenziali lodigiani degli anni \'70–\'90.' },
      { slug: 'impianti-elettrici', label: 'Impianti Elettrici', localNote: 'Messa a norma degli impianti elettrici con dichiarazione di conformità CEI.' },
    ],
    localKnowledge: [
      {
        heading: 'Edilizia per privati a Lodi',
        body: 'Lavoriamo principalmente con privati che vogliono ristrutturare casa propria o un immobile in affitto. Il nostro approccio è quello del contratto unico: un solo interlocutore, un preventivo scritto, un cronoprogramma rispettato. Nessun subappalto, nessuna sorpresa finale.',
      },
      {
        heading: 'Condomini e parti comuni',
        body: 'Collaboriamo con amministratori di condominio per interventi sulle parti comuni: facciate, scale interne, tetti, impianti condominiali. Forniamo documentazione completa e preventivi strutturati adatti alle delibere assembleari.',
      },
      {
        heading: 'Certificazioni e documentazione',
        body: 'Al termine di ogni intervento rilasciamo la documentazione obbligatoria per legge: dichiarazione di conformità per gli impianti elettrici (CEI 64-8), certificazione degli impianti idraulici e dossier fotografico del cantiere.',
      },
    ],
    faq: [
      { q: 'Siete iscritti alla Camera di Commercio?', a: 'Sì, Diamo Soluzioni è regolarmente iscritta come impresa edile. P.IVA IT12870260960, sede a Merlino (LO).' },
      { q: 'Lavorate anche per condomini e non solo per privati?', a: 'Sì, lavoriamo con amministratori di condominio per facciate, scale, tetti e impianti. Forniamo preventivi adatti alle delibere assembleari.' },
      { q: 'Fate anche piccoli interventi o solo ristrutturazioni grandi?', a: 'Entrambi. Gestiamo sia il singolo bagno da rifare che la ristrutturazione completa di 120 mq. Il sopralluogo gratuito ci permette di capire insieme quale intervento conviene.' },
    ],
    relatedProjectSlugs: ['ristrutturazione-appartamento-lodi', 'facciate', 'impianti'],
    cta: 'Hai una proprietà a Lodi che richiede interventi edilizi?',
  },
  {
    slug: 'ristrutturazioni-melegnano',
    city: 'Melegnano',
    province: 'MI',
    seoTitle: 'Ristrutturazioni Melegnano — Impresa Edile',
    seoDesc: 'Ristrutturazioni a Melegnano: bagni, pavimenti, infissi e impianti. Referente unico, sopralluogo gratuito, preventivo scritto. Diamo Soluzioni.',
    h1Line1: 'Ristrutturazioni a Melegnano',
    h1Line2Gold: 'e hinterland sud.',
    subtitle: 'Impresa edile a 20 minuti da Melegnano: ristrutturazioni complete chiavi in mano.',
    intro: 'Melegnano è una delle zone più attive per le ristrutturazioni residenziali nell\'hinterland milanese sud. Diamo Soluzioni opera regolarmente a Melegnano e nelle frazioni limitrofe, con cantieri su appartamenti, ville e piccoli condomini. La nostra sede a Merlino dista circa 20 minuti: presidio costante, interventi rapidi.',
    localContext: 'Melegnano ha un mix edilizio interessante: il centro storico con palazzi d\'epoca, le espansioni residenziali degli anni \'70–\'80 lungo la SS9 e le villette più recenti nelle frazioni. La vicinanza con Milano ha spinto molti acquirenti a scegliere Melegnano per prezzi ancora accessibili, con l\'intenzione di ristrutturare prima del trasloco.',
    mainServices: [
      { slug: 'ristrutturazioni-chiavi-in-mano', label: 'Ristrutturazioni Complete', localNote: 'Ristrutturazioni chiavi in mano a Melegnano: dal sopralluogo alla consegna, senza coordinare più imprese.' },
      { slug: 'ristrutturazione-bagno', label: 'Rifacimento Bagno', localNote: 'Rifacimento bagni completi negli appartamenti di Melegnano e frazioni, in 8–12 giorni lavorativi.' },
      { slug: 'infissi-serramenti', label: 'Infissi e Serramenti', localNote: 'Sostituzione infissi anni \'80–\'90 con serramenti moderni ad alto isolamento termico e acustico.' },
      { slug: 'pavimentazioni-rivestimenti', label: 'Pavimentazioni', localNote: 'Posa gres, parquet e rivestimenti bagno e cucina a Melegnano.' },
    ],
    localKnowledge: [
      {
        heading: 'Perché Melegnano è una zona in forte domanda',
        body: 'La vicinanza con Milano e i prezzi degli immobili ancora ragionevoli rispetto al capoluogo hanno spinto molti acquirenti a comprare casa a Melegnano per poi ristrutturarla. Questo ha generato una crescita significativa delle richieste di ristrutturazione, soprattutto per appartamenti anni \'70 e \'80 che richiedono un intervento completo su impianti, pavimenti e finiture.',
      },
      {
        heading: 'Ristrutturazioni pre-trasloco a Melegnano',
        body: 'Molti nostri clienti di Melegnano ci contattano dopo aver firmato il compromesso: vogliono ristrutturare prima di trasferirsi. Gestiamo questi cantieri con autonomia, aggiornando il cliente con foto e video durante i lavori e consegnando l\'appartamento pronto per il trasloco.',
      },
      {
        heading: 'L\'intervento più richiesto a Melegnano',
        body: 'Gli appartamenti anni \'70–\'80 presentano quasi sempre la stessa situazione: impianti da rifare, pavimenti da sostituire e infissi non più performanti. La ristrutturazione combinata di queste tre componenti rappresenta la maggioranza dei nostri cantieri in questa zona ed è spesso l\'intervento con il miglior rapporto costo-beneficio.',
      },
    ],
    faq: [
      { q: 'Operate anche nelle frazioni di Melegnano?', a: 'Sì, operiamo in tutto il comune di Melegnano e nelle frazioni circostanti, incluse Mombretto e Vizzolo Predabissi.' },
      { q: 'Quanto ci vuole per fissare un sopralluogo a Melegnano?', a: 'Di solito fissiamo il sopralluogo gratuito entro 2–4 giorni dalla richiesta. Melegnano è nel nostro raggio principale di operatività.' },
      { q: 'Posso ristrutturare l\'appartamento mentre non ci vivo ancora?', a: 'Sì, è la situazione più comune per chi acquista a Melegnano. Lavoriamo in autonomia e documentiamo l\'avanzamento del cantiere con aggiornamenti fotografici regolari.' },
    ],
    relatedProjectSlugs: ['ristrutturazione-bagno', 'ristrutturazione-appartamento-lodi', 'pavimentazioni-gres'],
    cta: 'Hai una casa da ristrutturare a Melegnano?',
  },
  {
    slug: 'ristrutturazioni-san-donato-milanese',
    city: 'San Donato Milanese',
    province: 'MI',
    seoTitle: 'Ristrutturazioni a San Donato Milanese',
    seoDesc: 'Ristrutturazioni a San Donato Milanese: appartamenti ENI, ville e condomini. Bagni, pavimenti, impianti e cappotto. Sopralluogo gratuito. Diamo Soluzioni.',
    h1Line1: 'Ristrutturazioni a San Donato',
    h1Line2Gold: 'Milanese.',
    subtitle: 'Appartamenti, ville e condomini a San Donato: un unico referente per ogni intervento.',
    intro: 'San Donato Milanese è uno dei comuni più attivi per le ristrutturazioni nell\'area sud di Milano. Diamo Soluzioni opera regolarmente a San Donato con cantieri su appartamenti degli anni \'50–\'70, ville nelle zone residenziali esterne e immobili di nuova acquisizione che richiedono un intervento completo prima del trasloco.',
    localContext: 'San Donato Milanese ha un patrimonio edilizio peculiare: i quartieri ENI costruiti tra gli anni \'50 e \'70 rappresentano una parte importante del territorio e contengono molti appartamenti che oggi i proprietari scelgono di ristrutturare completamente. Ci sono poi ville e case unifamiliari nelle zone più esterne, con richieste spesso legate a cucine, bagni, facciate e impianti.',
    mainServices: [
      { slug: 'ristrutturazioni-chiavi-in-mano', label: 'Ristrutturazioni Complete', localNote: 'Ristrutturazioni totali nei quartieri residenziali di San Donato: un unico referente, zero sorprese sul preventivo.' },
      { slug: 'ristrutturazione-bagno', label: 'Rifacimento Bagno', localNote: 'Bagni moderni negli appartamenti ENI e nelle ville di San Donato Milanese.' },
      { slug: 'pavimentazioni-rivestimenti', label: 'Pavimentazioni', localNote: 'Gres grande formato e parquet per gli interni degli appartamenti e delle ville di San Donato.' },
      { slug: 'facciate-cappotto-termico', label: 'Facciate e Cappotto', localNote: 'Efficienza energetica per i condomini anni \'60–\'70 di San Donato Milanese.' },
    ],
    localKnowledge: [
      {
        heading: 'I quartieri ENI: una sfida tecnica specifica',
        body: 'Gli appartamenti costruiti per i lavoratori ENI a San Donato Milanese hanno buona qualità strutturale ma impianti ormai obsoleti e finiture degli anni \'50–\'70. La ristrutturazione tipo prevede rifacimento dell\'impianto idraulico ed elettrico, sostituzione pavimenti, nuovo bagno e spesso sostituzione degli infissi originali — tutto coordinato da un unico referente.',
      },
      {
        heading: 'Come lavoriamo a San Donato',
        body: 'La nostra sede a Merlino dista circa 25 minuti da San Donato Milanese. Questo ci permette di essere presenti sul cantiere quotidianamente e di rispondere rapidamente in caso di necessità. Tutti i nostri cantieri prevedono un responsabile unico che aggiorna il cliente sull\'avanzamento lavori.',
      },
      {
        heading: 'Ville e abitazioni unifamiliari',
        body: 'Riceviamo molte richieste dai proprietari di ville nelle zone esterne di San Donato per lavori su facciate, interni e impianti. Gestiamo questi cantieri con la stessa metodologia: preventivo dettagliato, cronoprogramma scritto, nessun costo non concordato.',
      },
    ],
    faq: [
      { q: 'Operate in tutto San Donato Milanese?', a: 'Sì, operiamo in tutto il comune, incluse le zone di Poasco e Sorigherio, sia per privati che per condomini.' },
      { q: 'Avete esperienza con gli appartamenti ENI degli anni \'50-\'60?', a: 'Sì. Questi immobili hanno caratteristiche costruttive specifiche — al sopralluogo valutiamo subito lo stato degli impianti e delle strutture e vi diciamo cosa conviene fare.' },
      { q: 'Quanto tempo per ristrutturare un appartamento a San Donato?', a: 'Un bagno richiede 8–12 giorni. Una ristrutturazione completa di 70–90 mq richiede 6–10 settimane. Il cronoprogramma è sempre scritto prima di iniziare.' },
    ],
    relatedProjectSlugs: ['ristrutturazione-appartamento-lodi', 'ristrutturazione-bagno', 'facciate'],
    cta: 'Stai ristrutturando a San Donato Milanese?',
  },
  {
    slug: 'ristrutturazioni-paullo',
    city: 'Paullo',
    province: 'MI',
    seoTitle: 'Ristrutturazioni a Paullo — Impresa Edile',
    seoDesc: 'Ristrutturazioni a Paullo: case, appartamenti e ville. Bagni, pavimenti, infissi. Sopralluogo gratuito, preventivo scritto entro 48h. Diamo Soluzioni.',
    h1Line1: 'Ristrutturazioni a Paullo',
    h1Line2Gold: 'e dintorni.',
    subtitle: 'Impresa edile a pochi chilometri da Paullo: ristrutturazioni complete con consegna chiavi in mano.',
    intro: 'Paullo è a pochi chilometri dalla nostra sede di Merlino. Operiamo regolarmente a Paullo e nelle frazioni con cantieri su case di campagna, villette degli anni \'80–\'90 e appartamenti. La vicinanza ci garantisce reattività sul cantiere e tempi di sopralluogo rapidi.',
    localContext: 'Il comune di Paullo comprende un mix di case di campagna storiche, villette degli anni \'80–\'90 e qualche piccolo condominio. La domanda di ristrutturazione riguarda spesso abitazioni che cambiano proprietario: chi acquista a Paullo e vuole ristrutturare prima di trasferirsi è uno dei nostri clienti tipo.',
    mainServices: [
      { slug: 'ristrutturazioni-chiavi-in-mano', label: 'Ristrutturazioni Complete', localNote: 'Ristrutturazioni totali a Paullo prima del trasloco: un unico cantiere coordinato, consegna chiavi in mano.' },
      { slug: 'ristrutturazione-bagno', label: 'Rifacimento Bagno', localNote: 'Bagni completi per le abitazioni di Paullo e frazioni.' },
      { slug: 'infissi-serramenti', label: 'Infissi e Serramenti', localNote: 'Sostituzione serramenti nelle ville e negli appartamenti di Paullo.' },
      { slug: 'tinteggiatura', label: 'Tinteggiatura', localNote: 'Pittura interni ed esterni per le abitazioni di Paullo e Pedriano.' },
    ],
    localKnowledge: [
      {
        heading: 'Ristrutturazioni pre-trasloco a Paullo',
        body: 'La maggior parte dei cantieri che gestiamo a Paullo nasce dall\'acquisto di un immobile. Il cliente compra, poi ci chiede di ristrutturarlo prima di trasferirsi. Lavoriamo in autonomia mentre il cliente è ancora altrove, aggiornandolo con foto regolari e consegnando le chiavi quando tutto è pronto.',
      },
      {
        heading: 'Case di campagna e ville: cosa gestiamo solitamente',
        body: 'Le case di campagna nell\'area di Paullo presentano spesso impianti misti — parte originali degli anni \'60, parte aggiunti successivamente — e materiali non omogenei. La nostra esperienza ci permette di valutare rapidamente cosa è recuperabile e cosa conviene sostituire per evitare problemi futuri.',
      },
      {
        heading: 'Siamo vicini: questo fa la differenza',
        body: 'La distanza dalla nostra sede a Merlino è minima. Questo significa che possiamo fare sopralluoghi rapidi, essere presenti sul cantiere ogni giorno e rispondere prontamente in caso di variazioni o necessità urgenti. La prossimità territoriale non è solo comodità: è presidio di qualità.',
      },
    ],
    faq: [
      { q: 'Fate sopralluoghi anche nelle frazioni di Paullo?', a: 'Sì, operiamo su tutto il comune di Paullo, incluse le frazioni come Pedriano e Muzzano. Il sopralluogo è gratuito.' },
      { q: 'Potete ristrutturare mentre non sono ancora in casa?', a: 'Sì, è la situazione più frequente. Lavoriamo in autonomia e documentiamo l\'avanzamento del cantiere con aggiornamenti fotografici regolari.' },
      { q: 'Quanto tempo ci vuole per una ristrutturazione a Paullo?', a: 'Dipende dall\'intervento. Un bagno richiede 8–12 giorni. Una ristrutturazione completa di 70–90 mq richiede 6–10 settimane. Cronoprogramma sempre scritto prima di iniziare.' },
    ],
    relatedProjectSlugs: ['ristrutturazione-bagno', 'ristrutturazione-appartamento-lodi', 'infissi-serramenti'],
    cta: 'Hai una casa da ristrutturare a Paullo?',
  },
  {
    slug: 'ristrutturazioni-crema',
    city: 'Crema',
    province: 'CR',
    seoTitle: 'Ristrutturazioni a Crema — Impresa Edile',
    seoDesc: 'Ristrutturazioni a Crema: appartamenti, ville e centro storico. Bagni, pavimenti, infissi e impianti. Sopralluogo gratuito. Diamo Soluzioni.',
    h1Line1: 'Ristrutturazioni a Crema',
    h1Line2Gold: 'e dintorni.',
    subtitle: 'Ristrutturazioni complete a Crema: un unico referente per ogni cantiere, preventivo scritto.',
    intro: 'Crema è un polo importante del nostro raggio operativo. La città è nota per il suo centro storico di pregio e per un tessuto residenziale variegato che comprende palazzi d\'epoca, appartamenti del dopoguerra e villette nelle zone periferiche. Interveniamo a Crema con la stessa metodologia di tutti i nostri cantieri: un referente, un preventivo, un risultato garantito.',
    localContext: 'Il centro storico di Crema richiede attenzione particolare per le caratteristiche degli edifici storici: facciate, infissi e materiali seguono spesso indicazioni specifiche del piano del colore comunale. Nelle periferie troviamo appartamenti degli anni \'70–\'90 con le classiche esigenze di ristrutturazione completa. La nostra sede a Merlino dista circa 30–35 minuti da Crema.',
    mainServices: [
      { slug: 'ristrutturazioni-chiavi-in-mano', label: 'Ristrutturazioni Complete', localNote: 'Ristrutturazioni integrali a Crema, con coordinamento completo di tutte le lavorazioni e un unico referente.' },
      { slug: 'ristrutturazione-bagno', label: 'Rifacimento Bagno', localNote: 'Bagni nuovi negli appartamenti di Crema: demolizione, impianti, posa e sanitari in 8–12 giorni.' },
      { slug: 'infissi-serramenti', label: 'Infissi e Serramenti', localNote: 'Sostituzione infissi a Crema, anche in edifici storici con vincoli di facciata particolari.' },
      { slug: 'pavimentazioni-rivestimenti', label: 'Pavimentazioni', localNote: 'Gres, parquet e rivestimenti per gli interni degli immobili di Crema e dintorni.' },
    ],
    localKnowledge: [
      {
        heading: 'Centro storico di Crema: vincoli e come li gestiamo',
        body: 'Molte proprietà nel centro storico di Crema ricadono in aree soggette a tutela paesaggistica. Gli interventi su facciate, infissi e tetti devono rispettare il piano del colore e le normative comunali. Conosciamo queste specificità e aiutiamo i clienti a pianificare l\'intervento correttamente, anticipando le pratiche necessarie.',
      },
      {
        heading: 'Appartamenti periferici: il cantiere tipo',
        body: 'Nelle zone periferiche di Crema, gli appartamenti degli anni \'70–\'80 presentano le stesse sfide che troviamo in tutta la pianura padana: impianti da rifare, pavimenti consunti, infissi non isolanti. La ristrutturazione combinata di queste tre componenti in un unico cantiere è quasi sempre l\'approccio più efficiente e conveniente.',
      },
      {
        heading: 'Tempi di risposta e presidio cantiere',
        body: 'La distanza dalla nostra sede a Merlino è di circa 30–35 minuti. Questo non cambia il nostro metodo di lavoro: cantiere presidiato quotidianamente, aggiornamenti regolari al cliente, preventivo rispettato. Il sopralluogo gratuito può essere fissato entro 3–5 giorni dalla richiesta.',
      },
    ],
    faq: [
      { q: 'Operate anche nel centro storico di Crema?', a: 'Sì. Abbiamo esperienza con gli edifici storici e conosciamo le normative locali per gli interventi su immobili vincolati.' },
      { q: 'Quanto distante siete da Crema?', a: 'La nostra sede è a Merlino (LO), a circa 30–35 minuti da Crema. Operiamo regolarmente in questa zona.' },
      { q: 'Fate sopralluoghi gratuiti a Crema?', a: 'Sì, il sopralluogo è sempre gratuito. Di solito riusciamo a pianificarlo entro 3–5 giorni dalla richiesta.' },
    ],
    relatedProjectSlugs: ['ristrutturazione-appartamento-lodi', 'ristrutturazione-bagno', 'infissi-serramenti'],
    cta: 'Hai un immobile da ristrutturare a Crema?',
  },
  {
    slug: 'impresa-edile-merlino',
    city: 'Merlino',
    province: 'LO',
    seoTitle: 'Impresa Edile a Merlino',
    seoDesc: 'Impresa edile con sede a Merlino (LO): ristrutturazioni, bagni, facciate e impianti. Siamo del posto. Sopralluogo gratuito, spesso in giornata.',
    h1Line1: 'Impresa Edile a Merlino',
    h1Line2Gold: '— siamo qui.',
    subtitle: 'La nostra sede è a Via Roma 1, Merlino. Conosciamo ogni edificio, ogni esigenza del territorio.',
    intro: 'Merlino è il cuore operativo di Diamo Soluzioni. La nostra sede è a Via Roma 1, nel centro del paese. Lavoriamo a Merlino e nei comuni limitrofi da anni e conosciamo la storia edilizia del territorio: le cascine recuperate, le case rurali, i piccoli condomini. Se sei di Merlino, chiamaci direttamente o vieni in sede.',
    localContext: 'Merlino è un piccolo comune della provincia di Lodi con un tessuto edilizio fatto di case unifamiliari, cascine storiche e pochi condomini. La domanda di ristrutturazione riguarda prevalentemente case private: rifacimento completo, bagni, sostituzione infissi e lavori di facciata. Per i cantieri a Merlino possiamo essere sul posto in pochi minuti.',
    mainServices: [
      { slug: 'ristrutturazioni-chiavi-in-mano', label: 'Ristrutturazioni Complete', localNote: 'Siamo a Merlino: coordinamento rapido, presidio costante, nessun tempo perso in spostamenti.' },
      { slug: 'ristrutturazione-bagno', label: 'Rifacimento Bagno', localNote: 'Bagni nuovi per le abitazioni di Merlino e dintorni.' },
      { slug: 'facciate-cappotto-termico', label: 'Facciate e Cappotto Termico', localNote: 'Risanamento facciate per le case di Merlino: cascine, ville e abitazioni civili.' },
      { slug: 'infissi-serramenti', label: 'Infissi e Serramenti', localNote: 'Sostituzione serramenti nelle abitazioni di Merlino e dei comuni limitrofi della Bassa Lodigiana.' },
    ],
    localKnowledge: [
      {
        heading: 'Siamo di Merlino — questo cambia le cose',
        body: 'Via Roma 1 è la nostra sede. Questo significa che per i cantieri a Merlino abbiamo un vantaggio concreto: possiamo rispondere rapidamente, essere presenti più volte al giorno se necessario e garantire la massima attenzione alla qualità. Conoscere il territorio significa anche conoscere i materiali giusti, i fornitori locali e le specificità costruttive delle case della zona.',
      },
      {
        heading: 'Cascine e case storiche della Bassa Lodigiana',
        body: 'Il territorio di Merlino e dei comuni limitrofi è ricco di cascine e case rurali di pregio storico. Abbiamo esperienza nella ristrutturazione di questo tipo di immobili, che richiede spesso materiali specifici, attenzione alle strutture esistenti e un approccio personalizzato. Ogni cascina è diversa: il sopralluogo è il punto di partenza indispensabile.',
      },
      {
        heading: 'Contattateci direttamente',
        body: 'Per i cantieri a Merlino preferiamo il contatto diretto. Potete chiamarci, scrivere su WhatsApp o passare in sede per un primo confronto informale. Il sopralluogo è sempre gratuito — per Merlino e dintorni spesso riusciamo a fissarlo in giornata.',
      },
    ],
    faq: [
      { q: 'Dove si trova la vostra sede a Merlino?', a: 'Via Roma 1, 26833 Merlino (LO). Potete contattarci per telefono o WhatsApp per fissare un appuntamento, oppure passare direttamente.' },
      { q: 'Fate lavori anche nei comuni vicini a Merlino?', a: 'Sì. Da Merlino copriamo Lodi, Melegnano, San Giuliano Milanese, Paullo, Crema e tutta l\'area di Milano Sud.' },
      { q: 'Gestite anche situazioni urgenti?', a: 'Principalmente lavori programmati con sopralluogo, ma valutiamo anche urgenze come guasti all\'impianto idraulico o problemi strutturali. Chiamateci direttamente.' },
    ],
    relatedProjectSlugs: ['ristrutturazione-appartamento-lodi', 'facciate', 'impianti'],
    cta: 'Sei di Merlino o dei dintorni? Chiamaci o passa in sede.',
  },
]

export function getTerritoryBySlug(slug: string): Territory | undefined {
  return territories.find(t => t.slug === slug)
}
