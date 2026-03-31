-- Inserisci articoli di esempio nel blog
-- Esegui questo SQL nel Supabase SQL Editor

INSERT INTO blog_posts (slug, title, excerpt, content, category, tags, meta_title, meta_description, is_published, is_featured, published_at, author_image, author_name) VALUES
(
  'imparare-matematica-divertendosi',
  'Imparare la matematica divertendosi: 5 attività per bambini',
  'Scopri come rendere lapprendimento della matematica un gioco divertente con attività semplici e coinvolgenti per bambini dai 6 ai 10 anni.',
  '<p>La matematica non deve essere noiosa! Con alcune attività creative, puoi trasformare i numeri in un giocoappassionante per i tuoi bambini.</p>

<h2>1. Conta con oggetti quotidiani</h2>
<p>Raccogli oggetti di casa come cucchiai, forbici o matite e chiedi al bambino di contarli. Rendi il gioco più interessante trasformandolo in una <strong>sfida a tempo</strong>.</p>

<h2>2. Usa la pizza per le frazioni</h2>
<p>Taglia una pizza (o un panetto) in fette e mostra come le frazioni funzionano in pratica. "Metà pizza" diventa intuitive!</p>

<h2>3. Gioca con le tabelline</h2>
<p>Crea delle <strong>carte flash</strong> con domande e risposte. Gira le carte e rispondi prima possibile. Usa un timer per aumentarelemozione.</p>

<h2>4. Disegna i numeri</h2>
<p>Chiedi al bambino di disegnare i numeri nella sabbia, nella farina o con il dito nellaria. Muoversi aiuta a memorizzare!</p>

<h2>5. App e giochi interattivi</h2>
<p>Esistono molte <strong>app educative</strong> che rendono lapprendimento unavventura. Cerca quelle con attività ludiche e rewards.</p>

<p>Ricorda: il segreto è rendere la matematica <strong>concreta e visiva</strong>. Ogni bambino può diventare un piccolo matemago con il giusto approccio!</p>',
  'Matematica',
  ARRAY['matematica', 'bambini', 'attività', 'gioco', 'educazione'],
  'Imparare la matematica divertendosi: 5 attività per bambini',
  'Scopri come rendere lapprendimento della matematica un gioco divertente con attività semplici per bambini dai 6 ai 10 anni.',
  true,
  true,
  NOW(),
  '/author_family.png',
  'Debora di Bellucci'
),
(
  'creare-attivita-creative-bambini',
  'Attività creative per bambini: idee fai da te per stimolare la fantasia',
  'Ti servono solo materiali semplici per creare attività artistiche che stimoleranno la creatività e limmaginazione dei tuoi bambini.',
  '<p>La creatività è una competenza fondamentale che possiamo aiutare a sviluppare fin dalla più tenera età. Ecco alcune attività che puoi fare con materiali semplici.</p>

<h2>Collage di carta colorata</h2>
<p>Raccogli vecchie riviste e quotidiani. Tagliare e incollare forme diverse sviluppa la <strong>motricità fine</strong> e la creatività.</p>

<h2>Pittura con le mani</h2>
<p>Lascia che i bambini sperimentino con i colori usando le mani. Non importa se si sporcano: lo sporco è parte del divertimento e dellapprendimento!</p>

<h2>Costruzioni con materiali riciclati</h2>
<p>Scatole di cartone, rotoli di carta igienica e tappi possono diventare castelli, macchine o robot. Limmaginazione non ha limiti!</p>

<h2>Storie illustrate</h2>
<p>Inventa una storia insieme e chiedi al bambino di illustrarla. Questo sviluppa il <strong>linguaggio</strong> e la creatività narrativa.</p>

<p>Il messaggio più importante? Non esiste un modo giusto o sbagliato di creare. Lascia che i tuoi bambini sperimentino e si esprimano liberamente!</p>',
  'Creatività',
  ARRAY['creatività', 'bambini', 'fai da te', 'attività', 'arte'],
  'Attività creative per bambini: idee fai da te per stimolare la fantasia',
  'Ti servono solo materiali semplici per creare attività artistiche che stimoleranno la creatività e limmaginazione dei tuoi bambini.',
  true,
  false,
  NOW(),
  '/author_family.png',
  'Debora di Bellucci'
),
(
  'aiutare-bambini-ansia-scuola',
  'Come aiutare i bambini a gestire lansia scolastica',
  'Lingresso a scuola può generare ansia nei bambini. Scopri strategie concrete per aiutare i tuoi figli a vivere lesperienza scolastica con serenità.',
  '<p>Molti bambini provano ansia prima di andare a scuola. È una reazione normale, ma possiamo aiutarli a gestirla meglio.</p>

<h2>Riconosci i segnali</h2>
<p>Nota se tuo figlio manifesta <strong>mal di pancia</strong>, difficoltà a dormire o cambios di umore prima della scuola. Sono segnali di stress.</p>

<h2>Ascolta senza giudicare</h2>
<p>Lascia che il bambino esprima le sue paure senza minimizzarle. "Capisco che ti senti nervoso" è più utile di "Non cè nulla di cui preoccuparsi".</p>

<h2>Crea routine rassicuranti</h2>
<p>Una <strong>routine mattutina</strong> prevedibile riduce lansia. Preparare lo zaino la sera prima e avere un momento tranquillo prima di uscire aiuta.</p>

<h2>Parla della scuola positivamente</h2>
<p>Condividi ricordi positivi della tua infanzia a scuola. Eviti frasi come "la scuola è noiosa" o "i compiti sono pesanti".</p>

<h2>Collabora con gli insegnanti</h2>
<p>Se lansia persiste, parla con gli insegnanti. Insieme potete trovare strategie per aiutare il bambino.</p>

<p>Ricorda: un po di ansia è normale, ma se interferisce con la vita quotidiana, è importante cercare supporto professionale.</p>',
  'Educazione',
  ARRAY['ansia', 'scuola', 'bambini', 'genitori', 'supporto'],
  'Come aiutare i bambini a gestire lansia scolastica',
  'Lingresso a scuola può generare ansia nei bambini. Scopri strategie concrete per aiutare i tuoi figli a vivere lesperienza scolastica con serenità.',
  true,
  false,
  NOW(),
  '/author_family.png',
  'Debora di Bellucci'
);