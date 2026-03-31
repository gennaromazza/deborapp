export const chapter1Pages = [
  {
    id: 1,
    type: 'story',
    emoji: '🌲',
    title: 'Il Bosco dei Numeri',
    content: (
      <div className="space-y-4">
        <div className="w-full h-48 bg-gradient-to-b from-pastel-mint/50 to-pastel-lavender/50 rounded-2xl flex items-center justify-center mb-6">
          <span className="text-7xl">🌲🔢✨</span>
        </div>
        <p className="font-body text-gray-600 leading-relaxed">
          Benvenuto nel <strong>Bosco dei Numeri</strong>!
        </p>
        <p className="font-body text-gray-600 leading-relaxed">
          Questa mattina <strong>Nino Numero</strong> e <strong>Lila Linea</strong> hanno trovato una porticina nascosta tra due alberi altissimi. Sulla porticina c'era scritto:
        </p>
        <div className="bg-pastel-lavender/30 rounded-xl p-4 text-center">
          <p className="font-display font-bold text-pastel-lavender-dark text-lg">
            "Entrate solo se sapete osservare, contare e scoprire."
          </p>
        </div>
        <p className="font-body text-gray-600 leading-relaxed">
          Nino strizzò gli occhi. "Osservare? Contare? Mi piace già!"
        </p>
        <p className="font-body text-gray-600 leading-relaxed">
          Lila spinse piano la porticina e… wow! Davanti a loro si aprì un bosco davvero speciale. Sui rami crescevano mele numerate, i sassi lungo il sentiero avevano piccole stelle, e persino i funghi sembravano messi lì in fila per dire qualcosa.
        </p>
        <p className="font-body text-gray-600 leading-relaxed">
          "Qui i numeri non stanno fermi nei quaderni," disse una vocina allegra. Da dietro un cespuglio comparve <strong>Ada Idee</strong> con un cappello pieno di foglietti colorati.
        </p>
        <p className="font-body text-gray-600 leading-relaxed">
          "Nel Bosco dei Numeri," spiegò Ada, "i numeri si cercano, si toccano, si contano e si mettono in ordine. Ogni volta che risolvi una missione, il bosco ti regala una chiave d'oro."
        </p>
        <p className="font-body text-gray-600 leading-relaxed">
          Nino si guardò intorno emozionato. "Da dove cominciamo?"
        </p>
        <p className="font-body text-gray-600 leading-relaxed">
          Ada sorrise. "Dal primo superpotere dei matemaghi: <strong>contare con attenzione</strong>." 🌟🔍🍃
        </p>
      </div>
    ),
  },
  {
    id: 2,
    type: 'activity',
    emoji: '👀',
    title: 'Contare davvero',
    content: (
      <div className="space-y-4">
        <p className="font-body text-gray-600 leading-relaxed">
          Contare non significa dire i numeri in fretta. Contare bene significa <strong>toccare con gli occhi</strong> ogni cosa una sola volta.
        </p>
        <p className="font-body text-gray-600 leading-relaxed">
          Ada mostrò una cesta trovata vicino al sentiero. Dentro c'erano ghiande, foglie, bacche, funghetti e sassolini.
        </p>
        <div className="bg-pastel-cream rounded-xl p-4">
          <p className="font-display font-semibold text-gray-700 mb-3">Le tre mosse per contare bene:</p>
          <ol className="space-y-2">
            <li className="flex items-center gap-2"><span className="w-6 h-6 rounded-full bg-pastel-pink-dark text-white text-xs flex items-center justify-center font-bold">1</span><span className="font-body text-gray-600">Guarda tutti gli oggetti</span></li>
            <li className="flex items-center gap-2"><span className="w-6 h-6 rounded-full bg-pastel-lavender-dark text-white text-xs flex items-center justify-center font-bold">2</span><span className="font-body text-gray-600">Scegline uno alla volta</span></li>
            <li className="flex items-center gap-2"><span className="w-6 h-6 rounded-full bg-pastel-mint-dark text-white text-xs flex items-center justify-center font-bold">3</span><span className="font-body text-gray-600">Dì un numero per ogni oggetto</span></li>
          </ol>
        </div>
        <div className="bg-pastel-lavender/30 rounded-xl p-4">
          <p className="font-display font-semibold text-gray-700 mb-3">Esempio:</p>
          <div className="flex flex-wrap gap-3 justify-center text-2xl">
            <span>🌰</span><span>🍃🍃</span><span>🫐🫐🫐</span><span>🍄🍄🍄🍄</span><span>🪨🪨🪨🪨🪨</span>
          </div>
          <p className="font-body text-gray-600 text-center mt-2">
            1 ghianda, 2 foglie, 3 bacche, 4 funghetti, 5 sassolini
          </p>
        </div>
      </div>
    ),
    activity: {
      type: 'count',
      question: 'Occhi da gufo! Quanti oggetti vedi?',
      items: [
        { emoji: '🌰', count: 1, label: 'ghiande' },
        { emoji: '🍃', count: 2, label: 'foglie' },
        { emoji: '🫐', count: 3, label: 'bacche' },
        { emoji: '🍄', count: 4, label: 'funghetti' },
        { emoji: '🪨', count: 5, label: 'sassolini' },
      ],
    },
  },
  {
    id: 3,
    type: 'activity',
    emoji: '🔢',
    title: 'Numero e quantità',
    content: (
      <div className="space-y-4">
        <p className="font-body text-gray-600 leading-relaxed">
          Ogni numero è un simbolo. Quel simbolo ci aiuta a dire <strong>quanti oggetti</strong> ci sono.
        </p>
        <p className="font-body text-gray-600 leading-relaxed">
          Il numero <strong>3</strong> non è solo una cifra scritta. È anche:
        </p>
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-pastel-pink/50 rounded-xl p-3 text-center">
            <span className="text-2xl">🍃🍃🍃</span>
            <p className="font-body text-sm text-gray-600">3 foglie</p>
          </div>
          <div className="bg-pastel-lavender/50 rounded-xl p-3 text-center">
            <span className="text-2xl">🦘🦘🦘</span>
            <p className="font-body text-sm text-gray-600">3 salti</p>
          </div>
          <div className="bg-pastel-mint/50 rounded-xl p-3 text-center">
            <span className="text-2xl">🪨🪨🪨</span>
            <p className="font-body text-sm text-gray-600">3 sassolini</p>
          </div>
          <div className="bg-pastel-sky/50 rounded-xl p-3 text-center">
            <span className="text-2xl">👏👏👏</span>
            <p className="font-body text-sm text-gray-600">3 battiti di mani</p>
          </div>
        </div>
        <p className="font-body text-gray-600 leading-relaxed">
          Nino trovò dei cartelli appesi a uno spago. Su ogni cartello c'era un numero. Poco più sotto, c'erano gruppi di oggetti del bosco.
        </p>
        <p className="font-body text-gray-600 leading-relaxed">
          "Bisogna fare gli abbinamenti giusti!" esclamò.
        </p>
      </div>
    ),
    activity: {
      type: 'match',
      question: 'Collega ogni numero al gruppo giusto!',
      pairs: [
        { number: 1, emoji: '🍄', label: '1 fungo' },
        { number: 2, emoji: '🦋🦋', label: '2 farfalle' },
        { number: 4, emoji: '🍃🍃🍃🍃', label: '4 foglie' },
        { number: 6, emoji: '🪨🪨🪨🪨🪨🪨', label: '6 sassolini' },
        { number: 8, emoji: '🫐🫐🫐🫐🫐🫐🫐🫐', label: '8 bacche' },
        { number: 10, emoji: '⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐', label: '10 stelle' },
      ],
    },
  },
  {
    id: 4,
    type: 'activity',
    emoji: '🛤️',
    title: 'Il sentiero dei numeri mancanti',
    content: (
      <div className="space-y-4">
        <p className="font-body text-gray-600 leading-relaxed">
          Lila e Nino arrivarono davanti a un sentiero di pietre tonde. Su ogni pietra c'era un numero… ma alcune pietre erano vuote!
        </p>
        <div className="bg-pastel-lavender/30 rounded-xl p-4 text-center">
          <p className="font-display font-semibold text-gray-700">
            "Attenti," disse Ada, "solo chi sa trovare i numeri mancanti può passare."
          </p>
        </div>
        <div className="bg-pastel-cream rounded-xl p-4">
          <p className="font-display font-semibold text-gray-700 mb-2">Trucco da esploratore:</p>
          <p className="font-body text-gray-600">
            Quando i numeri vanno avanti di uno in uno, puoi dire nella mente: <strong>uno in più, uno in più, uno in più…</strong>
          </p>
        </div>
      </div>
    ),
    activity: {
      type: 'fill',
      question: 'Completa il sentiero!',
      exercises: [
        { sequence: '1, 2, __, 4, 5', answer: '3' },
        { sequence: '5, 6, 7, __, 9', answer: '8' },
        { sequence: '11, __, 13, 14, 15', answer: '12' },
        { sequence: '16, 17, __, 19, 20', answer: '18' },
        { sequence: '10, 9, 8, __, 6', answer: '7' },
      ],
    },
  },
  {
    id: 5,
    type: 'activity',
    emoji: '↔️',
    title: 'Prima e dopo',
    content: (
      <div className="space-y-4">
        <p className="font-body text-gray-600 leading-relaxed">
          Nel bosco, i numeri adorano stare in fila. Ogni numero ha un vicino <strong>prima</strong> e un vicino <strong>dopo</strong>.
        </p>
        <div className="bg-pastel-lavender/30 rounded-xl p-4 text-center">
          <p className="font-body text-gray-600">
            Esempio: Se il numero è <strong>8</strong>:
          </p>
          <div className="flex items-center justify-center gap-4 mt-2">
            <span className="px-3 py-1 bg-pastel-pink rounded-lg font-mono font-bold text-pastel-pink-dark">7</span>
            <span className="font-body text-gray-400">← prima</span>
            <span className="px-3 py-1 bg-pastel-lavender-dark text-white rounded-lg font-mono font-bold">8</span>
            <span className="font-body text-gray-400">dopo →</span>
            <span className="px-3 py-1 bg-pastel-mint rounded-lg font-mono font-bold text-pastel-mint-dark">9</span>
          </div>
        </div>
      </div>
    ),
    activity: {
      type: 'fill',
      question: 'Trova i vicini del numero!',
      exercises: [
        { sequence: "Prima di 6 c'è __", answer: '5' },
        { sequence: "Dopo 6 c'è __", answer: '7' },
        { sequence: "Prima di 12 c'è __", answer: '11' },
        { sequence: "Dopo 12 c'è __", answer: '13' },
        { sequence: "In mezzo tra 4 e 6 c'è __", answer: '5' },
        { sequence: "In mezzo tra 9 e 11 c'è __", answer: '10' },
        { sequence: "In mezzo tra 14 e 16 c'è __", answer: '15' },
      ],
    },
  },
  {
    id: 6,
    type: 'activity',
    emoji: '📏',
    title: 'La linea dei numeri',
    content: (
      <div className="space-y-4">
        <p className="font-body text-gray-600 leading-relaxed">
          Ada tirò una corda tra due alberi. Poi appese tante piccole carte numerate.
        </p>
        <div className="bg-pastel-lavender/30 rounded-xl p-4 text-center">
          <p className="font-display font-semibold text-gray-700">
            "Questa," disse, "è la <strong>linea dei numeri</strong>. Serve per vedere dove sta ogni numero."
          </p>
        </div>
        <div className="bg-pastel-cream rounded-xl p-4">
          <p className="font-display font-semibold text-gray-700 mb-3">Attività da fare:</p>
          <ol className="space-y-2">
            <li className="font-body text-gray-600">1. Metti in ordine i numeri da 0 a 20</li>
            <li className="font-body text-gray-600">2. Indica il numero più piccolo</li>
            <li className="font-body text-gray-600">3. Indica il numero più grande</li>
            <li className="font-body text-gray-600">4. Salta dal 3 al 6 contando: 3, 4, 5, 6</li>
            <li className="font-body text-gray-600">5. Vai indietro dal 10 al 7</li>
          </ol>
        </div>
        <div className="bg-pastel-mint/50 rounded-xl p-4 text-center">
          <p className="font-body text-gray-600">
            <strong>Missione movimento:</strong> Fai 5 passi avanti. Poi 2 passi indietro. Quale numero raggiungi se parti da 4?
          </p>
          <p className="font-display font-bold text-pastel-mint-dark text-xl mt-2">Risposta: 7!</p>
        </div>
      </div>
    ),
    activity: {
      type: 'fill',
      question: 'Completa la linea dei numeri!',
      exercises: [
        { sequence: '0, 1, 2, 3, __, 5', answer: '4' },
        { sequence: '5, 6, 7, __, 9, 10', answer: '8' },
        { sequence: '10, 11, __, 13, 14', answer: '12' },
        { sequence: '15, 16, 17, __, 19', answer: '18' },
        { sequence: '8, 7, 6, __, 4', answer: '5' },
      ],
    },
  },
  {
    id: 7,
    type: 'activity',
    emoji: '⚖️',
    title: 'Più, meno, uguale',
    content: (
      <div className="space-y-4">
        <p className="font-body text-gray-600 leading-relaxed">
          Nino osservò due alberi di mele. Uno era pienissimo, l'altro un po' meno.
        </p>
        <p className="font-body text-gray-600 leading-relaxed">
          "Quando confrontiamo due quantità," spiegò Ada, "possiamo dire:
        </p>
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-pastel-pink/50 rounded-xl p-3 text-center">
            <span className="text-3xl font-bold text-pastel-pink-dark">{'>'}</span>
            <p className="font-body text-sm text-gray-600 mt-1">maggiore di</p>
          </div>
          <div className="bg-pastel-lavender/50 rounded-xl p-3 text-center">
            <span className="text-3xl font-bold text-pastel-lavender-dark">{'<'}</span>
            <p className="font-body text-sm text-gray-600 mt-1">minore di</p>
          </div>
          <div className="bg-pastel-mint/50 rounded-xl p-3 text-center">
            <span className="text-3xl font-bold text-pastel-mint-dark">=</span>
            <p className="font-body text-sm text-gray-600 mt-1">uguale a</p>
          </div>
        </div>
      </div>
    ),
    activity: {
      type: 'fill',
      question: 'Confronta con il simbolo giusto! (> < =)',
      exercises: [
        { sequence: '4 __ 9', answer: '<' },
        { sequence: '10 __ 2', answer: '>' },
        { sequence: '7 __ 7', answer: '=' },
        { sequence: '12 __ 15', answer: '<' },
        { sequence: '18 __ 11', answer: '>' },
        { sequence: '6 __ 6', answer: '=' },
        { sequence: '3 __ 8', answer: '<' },
      ],
    },
  },
  {
    id: 8,
    type: 'activity',
    emoji: '🔍',
    title: 'La grande cerca nel bosco',
    content: (
      <div className="space-y-4">
        <p className="font-body text-gray-600 leading-relaxed">
          Questa è la pagina degli occhi super attenti. Osserva con calma e completa.
        </p>
        <div className="w-full h-48 bg-gradient-to-b from-pastel-mint/50 to-pastel-lavender/50 rounded-2xl flex items-center justify-center">
          <span className="text-5xl">🌲🍄🦋🌸🐰🪨🌟</span>
        </div>
        <p className="font-body text-gray-600 leading-relaxed">
          Nel bosco trovi tanti elementi nascosti. Conta con attenzione!
        </p>
      </div>
    ),
    activity: {
      type: 'count',
      question: 'Cerca e conta nel bosco!',
      items: [
        { emoji: '🍄', count: 12, label: 'funghi' },
        { emoji: '🦋', count: 9, label: 'farfalle' },
        { emoji: '🌸', count: 6, label: 'fiori' },
        { emoji: '🪨', count: 15, label: 'sassolini' },
        { emoji: '🐰', count: 4, label: 'coniglietti' },
        { emoji: '🪧', count: 3, label: 'cartelli' },
      ],
    },
  },
  {
    id: 9,
    type: 'checklist',
    emoji: '✅',
    title: 'Quello che ora so fare',
    content: (
      <div className="space-y-4">
        <p className="font-body text-gray-600 leading-relaxed">
          Bravo! Hai quasi conquistato la prima chiave d'oro del Bosco dei Numeri.
        </p>
        <p className="font-body text-gray-600 leading-relaxed">
          Metti una stellina accanto a quello che sai fare:
        </p>
      </div>
    ),
    checklist: [
      'So contare oggetti senza saltarne nessuno',
      'So collegare un numero alla quantità giusta',
      'So mettere i numeri in ordine',
      'So trovare il numero che manca',
      'So dire quale numero viene prima e quale dopo',
      'So confrontare due quantità',
    ],
  },
  {
    id: 10,
    type: 'challenge',
    emoji: '🏆',
    title: 'Super Missione Finale',
    content: (
      <div className="space-y-4">
        <p className="font-body text-gray-600 leading-relaxed">
          Ada tirò fuori una piccola chiave dorata.
        </p>
        <div className="bg-pastel-lavender/30 rounded-xl p-4 text-center">
          <p className="font-display font-bold text-pastel-lavender-dark">
            "Chi completa la Super Missione diventa Esploratore dei Numeri!"
          </p>
        </div>
        <p className="font-body text-gray-600 leading-relaxed">
          Completa tutte le sfide per guadagnare il tuo badge! 🏅
        </p>
      </div>
    ),
    challenge: {
      title: 'Super Missione',
      exercises: [
        { question: 'Scrivi i numeri da 5 a 12 in ordine', answer: '5,6,7,8,9,10,11,12', type: 'text' },
        { question: "Prima di 9 c'è __", answer: '8', type: 'fill' },
        { question: "Dopo 14 c'è __", answer: '15', type: 'fill' },
        { question: "In mezzo tra 18 e 20 c'è __", answer: '19', type: 'fill' },
        { question: '11 __ 13 (>, <, =)', answer: '<', type: 'fill' },
        { question: '16 __ 16 (>, <, =)', answer: '=', type: 'fill' },
        { question: '19 __ 12 (>, <, =)', answer: '>', type: 'fill' },
      ],
      badge: {
        title: 'Esploratore del Bosco dei Numeri',
        emoji: '🌲',
        description: "Hai conquistato la chiave d'oro del Bosco dei Numeri!",
      },
    },
  },
]

export const chapter2Pages = [
  {
    id: 1,
    type: 'story',
    emoji: '🍎',
    title: 'Il Mercato delle Addizioni',
    content: (
      <div className="space-y-4">
        <div className="w-full h-48 bg-gradient-to-b from-pastel-pink/50 to-pastel-peach/50 rounded-2xl flex items-center justify-center mb-6">
          <span className="text-7xl">🍎🛒✨</span>
        </div>
        <p className="font-body text-gray-600 leading-relaxed">
          Benvenuto al <strong>Mercato delle Addizioni</strong>!
        </p>
        <p className="font-body text-gray-600 leading-relaxed">
          Nino, Lila e Ada arrivarono davanti a un mercato colorato e rumoroso. C'erano banchetti pieni di frutta, verdura, dolci e giocattoli!
        </p>
        <div className="bg-pastel-peach/30 rounded-xl p-4 text-center">
          <p className="font-display font-bold text-pastel-peach-dark text-lg">
            "Qui ogni cosa si conta e si aggiunge!" disse una voce.
          </p>
        </div>
        <p className="font-body text-gray-600 leading-relaxed">
          Era <strong>Teo Tempo</strong>, un bambino con un grande orologio.
        </p>
        <p className="font-body text-gray-600 leading-relaxed">
          "Per comprare al mercato," spiegò Teo, "bisogna saper <strong>aggiungere</strong>. Ecco la parola magica: <strong>PIÙ</strong>!"
        </p>
      </div>
    ),
  },
  {
    id: 2,
    type: 'activity',
    emoji: '➕',
    title: 'Che significa aggiungere?',
    content: (
      <div className="space-y-4">
        <p className="font-body text-gray-600 leading-relaxed">
          Aggiungere significa <strong>mettere insieme</strong>. Prendi delle cose da una parte e le metti con le altre.
        </p>
        <div className="bg-pastel-lavender/30 rounded-xl p-4">
          <p className="font-display font-semibold text-gray-700 mb-3">Esempio:</p>
          <div className="flex items-center justify-center gap-4 text-2xl">
            <span className="bg-pastel-pink/50 px-3 py-2 rounded-lg">🍎🍎🍎</span>
            <span className="font-bold text-pastel-lavender-dark">+</span>
            <span className="bg-pastel-mint/50 px-3 py-2 rounded-lg">🍎🍎</span>
            <span className="font-bold text-pastel-lavender-dark">=</span>
            <span className="bg-pastel-peach/50 px-3 py-2 rounded-lg font-bold">🍎🍎🍎🍎🍎</span>
          </div>
          <p className="font-body text-gray-600 text-center mt-2">
            3 mele + 2 mele = 5 mele
          </p>
        </div>
      </div>
    ),
    activity: {
      type: 'fill',
      question: 'Completa le addizioni!',
      exercises: [
        { sequence: '2 + 3 = __', answer: '5' },
        { sequence: '4 + 1 = __', answer: '5' },
        { sequence: '6 + 2 = __', answer: '8' },
        { sequence: '3 + 4 = __', answer: '7' },
        { sequence: '5 + 5 = __', answer: '10' },
      ],
    },
  },
  {
    id: 3,
    type: 'activity',
    emoji: '🧮',
    title: 'La calcolatrice umana',
    content: (
      <div className="space-y-4">
        <p className="font-body text-gray-600 leading-relaxed">
          Teo aveva un trucco speciale: contare usando le dita!
        </p>
        <div className="bg-pastel-mint/50 rounded-xl p-4">
          <p className="font-display font-semibold text-gray-700 mb-3">Come funziona:</p>
          <ol className="space-y-2">
            <li className="flex items-center gap-2"><span className="w-6 h-6 rounded-full bg-pastel-pink-dark text-white text-xs flex items-center justify-center font-bold">1</span><span className="font-body text-gray-600">Alza le dita del primo numero</span></li>
            <li className="flex items-center gap-2"><span className="w-6 h-6 rounded-full bg-pastel-lavender-dark text-white text-xs flex items-center justify-center font-bold">2</span><span className="font-body text-gray-600">Conta in avanti aggiungendo le dita del secondo numero</span></li>
            <li className="flex items-center gap-2"><span className="w-6 h-6 rounded-full bg-pastel-mint-dark text-white text-xs flex items-center justify-center font-bold">3</span><span className="font-body text-gray-600">Il totale è il risultato!</span></li>
          </ol>
        </div>
      </div>
    ),
    activity: {
      type: 'fill',
      question: 'Calcola!',
      exercises: [
        { sequence: '1 + 4 = __', answer: '5' },
        { sequence: '2 + 2 = __', answer: '4' },
        { sequence: '3 + 6 = __', answer: '9' },
        { sequence: '5 + 3 = __', answer: '8' },
        { sequence: '7 + 2 = __', answer: '9' },
      ],
    },
  },
  {
    id: 4,
    type: 'activity',
    emoji: '🛒',
    title: 'Al mercato con Dado',
    content: (
      <div className="space-y-4">
        <p className="font-body text-gray-600 leading-relaxed">
          <strong>Dado</strong>, un cubetto fortunato, lanciò una moneta e disse: "Vinciamo giocando!"
        </p>
        <p className="font-body text-gray-600 leading-relaxed">
          Al banco della frutta c'era un gioco: completare gli scontrini.
        </p>
      </div>
    ),
    activity: {
      type: 'fill',
      question: 'Completa gli scontrini!',
      exercises: [
        { sequence: '🍊 3 + 🍊 4 = __ 🍊', answer: '7' },
        { sequence: '🍋 5 + 🍋 2 = __ 🍋', answer: '7' },
        { sequence: '🍇 6 + 🍇 3 = __ 🍇', answer: '9' },
        { sequence: '🍓 4 + 🍓 5 = __ 🍓', answer: '9' },
        { sequence: '🍑 8 + 🍑 1 = __ 🍑', answer: '9' },
      ],
    },
  },
  {
    id: 5,
    type: 'activity',
    emoji: '🔄',
    title: 'L\'ordine non importa',
    content: (
      <div className="space-y-4">
        <p className="font-body text-gray-600 leading-relaxed">
          Ada fece una scoperta importante!
        </p>
        <div className="bg-pastel-lavender/30 rounded-xl p-4 text-center">
          <p className="font-display font-bold text-pastel-lavender-dark">
            "Nell'addizione, l'ordine non cambia il risultato!"
          </p>
        </div>
        <div className="flex items-center justify-center gap-4 text-lg">
          <span>2 + 6 = 8</span>
          <span className="text-pastel-lavender-dark">=</span>
          <span>6 + 2 = 8</span>
        </div>
      </div>
    ),
    activity: {
      type: 'fill',
      question: 'Completa!',
      exercises: [
        { sequence: '3 + 7 = 7 + __', answer: '3' },
        { sequence: '5 + 4 = 4 + __', answer: '5' },
        { sequence: '9 + 1 = 1 + __', answer: '9' },
        { sequence: '6 + 2 = 2 + __', answer: '6' },
        { sequence: '8 + 3 = 3 + __', answer: '8' },
      ],
    },
  },
  {
    id: 6,
    type: 'activity',
    emoji: '💯',
    title: 'Doppio = due volte',
    content: (
      <div className="space-y-4">
        <p className="font-body text-gray-600 leading-relaxed">
          "Quando aggiungi un numero a se stesso," disse Teo, "ottieni il <strong>doppio</strong>!"
        </p>
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-pastel-pink/50 rounded-xl p-3 text-center">
            <span className="text-2xl">👶👶</span>
            <p className="font-body text-sm text-gray-600">2 bambini</p>
          </div>
          <div className="bg-pastel-peach/50 rounded-xl p-3 text-center">
            <span className="text-2xl">👶👶👶👶</span>
            <p className="font-body text-sm text-gray-600">4 = doppio di 2</p>
          </div>
        </div>
      </div>
    ),
    activity: {
      type: 'fill',
      question: 'Trova il doppio!',
      exercises: [
        { sequence: '3 + 3 = __', answer: '6' },
        { sequence: '5 + 5 = __', answer: '10' },
        { sequence: '4 + 4 = __', answer: '8' },
        { sequence: '7 + 7 = __', answer: '14' },
        { sequence: '6 + 6 = __', answer: '12' },
      ],
    },
  },
  {
    id: 7,
    type: 'activity',
    emoji: '🎯',
    title: 'Problemi del mercato',
    content: (
      <div className="space-y-4">
        <p className="font-body text-gray-600 leading-relaxed">
          È ora di risolvere qualche problema del mercato!
        </p>
      </div>
    ),
    activity: {
      type: 'fill',
      question: 'Risolvi i problemi!',
      exercises: [
        { sequence: 'Ho 4 mele. Ne prendo altre 3. Quante mele ho in tutto? __', answer: '7' },
        { sequence: 'Nel cestino ci sono 6 uova. Ne aggiungo 2. Quante uova ho? __', answer: '8' },
        { sequence: 'Compro 5 panini. Poi ne compro altri 4. In tutto: __', answer: '9' },
        { sequence: 'Sul banco ci sono 8 dolci. Ne aggiungo 2. Totale: __', answer: '10' },
        { sequence: 'Ho 3 fragole. Ne raccolgo 4. Quante fragole ho? __', answer: '7' },
      ],
    },
  },
  {
    id: 8,
    type: 'activity',
    emoji: '🎲',
    title: 'Gioco con i dadi',
    content: (
      <div className="space-y-4">
        <p className="font-body text-gray-600 leading-relaxed">
          Dado propose di giocare con i dadi!
        </p>
        <div className="bg-pastel-cream rounded-xl p-4 text-center">
          <p className="font-body text-gray-600">
            Quando lanci due dadi, somma i punti!
          </p>
          <div className="text-4xl my-4">🎲 + 🎲</div>
        </div>
      </div>
    ),
    activity: {
      type: 'fill',
      question: 'Somma i dadi!',
      exercises: [
        { sequence: '🎲🎲 + 🎲🎲🎲 = __ punti', answer: '5' },
        { sequence: '🎲🎲🎲 + 🎲🎲 = __ punti', answer: '5' },
        { sequence: '🎲 + 🎲🎲🎲🎲 = __ punti', answer: '5' },
        { sequence: '🎲🎲🎲🎲 + 🎲 = __ punti', answer: '5' },
        { sequence: '🎲🎲🎲🎲🎲 + 🎲 = __ punti', answer: '6' },
      ],
    },
  },
  {
    id: 9,
    type: 'checklist',
    emoji: '✅',
    title: 'Quello che ora so fare',
    content: (
      <div className="space-y-4">
        <p className="font-body text-gray-600 leading-relaxed">
          Bravo! Hai quasi conquistato il cestino dorato del Mercato!
        </p>
        <p className="font-body text-gray-600 leading-relaxed">
          Metti una stellina accanto a quello che sai fare:
        </p>
      </div>
    ),
    checklist: [
      'So aggiungere e ottenere un totale',
      'So usare le dita per contare',
      'So che 2+6 = 6+2',
      'So calcolare il doppio',
      'So risolvere problemi di addizione',
    ],
  },
  {
    id: 10,
    type: 'challenge',
    emoji: '🏆',
    title: 'Super Missione Finale',
    content: (
      <div className="space-y-4">
        <p className="font-body text-gray-600 leading-relaxed">
          Dado tirò fuori un cestino dorato pieno di frutta.
        </p>
        <div className="bg-pastel-peach/30 rounded-xl p-4 text-center">
          <p className="font-display font-bold text-pastel-peach-dark">
            "Chi completa la Super Missione vince il Cestino Dorato!"
          </p>
        </div>
      </div>
    ),
    challenge: {
      title: 'Super Missione',
      exercises: [
        { question: '4 + 5 = __', answer: '9', type: 'fill' },
        { question: '7 + 3 = __', answer: '10', type: 'fill' },
        { question: '6 + 6 = __', answer: '12', type: 'fill' },
        { question: '8 + 2 = 2 + __', answer: '8', type: 'fill' },
        { question: 'Ho 5 caramelle. Ne ricevo 4. Quante ho? __', answer: '9', type: 'fill' },
        { question: '3 + 4 + 2 = __', answer: '9', type: 'fill' },
        { question: 'Il doppio di 6 è __', answer: '12', type: 'fill' },
      ],
      badge: {
        title: 'Mercante delle Addizioni',
        emoji: '🧺',
        description: 'Hai conquistato il cestino dorato!',
      },
    },
  },
]

export const chapter3Pages = [
  {
    id: 1,
    type: 'story',
    emoji: '🏰',
    title: 'Il Castello delle Sottrazioni',
    content: (
      <div className="space-y-4">
        <div className="w-full h-48 bg-gradient-to-b from-pastel-lavender/50 to-pastel-sky/50 rounded-2xl flex items-center justify-center mb-6">
          <span className="text-7xl">🏰🗝️✨</span>
        </div>
        <p className="font-body text-gray-600 leading-relaxed">
          Benvenuto al <strong>Castello delle Sottrazioni</strong>!
        </p>
        <p className="font-body text-gray-600 leading-relaxed">
          I nostri amici arrivarono davanti a un grande castello con torri alte e bandiere colorate.
        </p>
        <div className="bg-pastel-sky/30 rounded-xl p-4 text-center">
          <p className="font-display font-bold text-pastel-sky-dark text-lg">
            "Per entrare nel castello bisogna saper togliere!" disse una voce.
          </p>
        </div>
        <p className="font-body text-gray-600 leading-relaxed">
          Era <strong>il Guardiano</strong>, un cavaliere gentile con un grande scudo.
        </p>
        <p className="font-body text-gray-600 leading-relaxed">
          "La parola magica qui è <strong>MENO</strong>: togliere, portar via, diminuire."
        </p>
      </div>
    ),
  },
  {
    id: 2,
    type: 'activity',
    emoji: '➖',
    title: 'Che significa togliere?',
    content: (
      <div className="space-y-4">
        <p className="font-body text-gray-600 leading-relaxed">
          Togliere significa <strong>fare diventare meno</strong>. Prendi delle cose e le porti via.
        </p>
        <div className="bg-pastel-lavender/30 rounded-xl p-4">
          <p className="font-display font-semibold text-gray-700 mb-3">Esempio:</p>
          <div className="flex items-center justify-center gap-4 text-2xl">
            <span className="bg-pastel-pink/50 px-3 py-2 rounded-lg">⭐⭐⭐⭐⭐</span>
            <span className="font-bold text-pastel-lavender-dark">−</span>
            <span className="bg-pastel-mint/50 px-3 py-2 rounded-lg">⭐⭐</span>
            <span className="font-bold text-pastel-lavender-dark">=</span>
            <span className="bg-pastel-peach/50 px-3 py-2 rounded-lg font-bold">⭐⭐⭐</span>
          </div>
          <p className="font-body text-gray-600 text-center mt-2">
            5 stelle − 2 stelle = 3 stelle
          </p>
        </div>
      </div>
    ),
    activity: {
      type: 'fill',
      question: 'Completa le sottrazioni!',
      exercises: [
        { sequence: '5 − 2 = __', answer: '3' },
        { sequence: '8 − 3 = __', answer: '5' },
        { sequence: '7 − 1 = __', answer: '6' },
        { sequence: '10 − 4 = __', answer: '6' },
        { sequence: '9 − 5 = __', answer: '4' },
      ],
    },
  },
  {
    id: 3,
    type: 'activity',
    emoji: '🍎',
    title: 'Le mele del cavaliere',
    content: (
      <div className="space-y-4">
        <p className="font-body text-gray-600 leading-relaxed">
          Il cavaliere aveva 10 mele. Diede alcune mele ai suoi amici.
        </p>
        <p className="font-body text-gray-600 leading-relaxed">
          Quante mele gli restano?
        </p>
      </div>
    ),
    activity: {
      type: 'fill',
      question: 'Calcola le mele rimanenti!',
      exercises: [
        { sequence: '10 mele − 3 mele = __ mele', answer: '7' },
        { sequence: '10 mele − 5 mele = __ mele', answer: '5' },
        { sequence: '10 mele − 7 mele = __ mele', answer: '3' },
        { sequence: '10 mele − 1 mela = __ mele', answer: '9' },
        { sequence: '10 mele − 8 mele = __ mele', answer: '2' },
      ],
    },
  },
  {
    id: 4,
    type: 'activity',
    emoji: '🔙',
    title: 'Andare indietro',
    content: (
      <div className="space-y-4">
        <p className="font-body text-gray-600 leading-relaxed">
          Il Guardiano insegnò un trucco: per sottrarre, conta <strong>all'indietro</strong>!
        </p>
        <div className="bg-pastel-lavender/30 rounded-xl p-4">
          <p className="font-display font-semibold text-gray-700 mb-3">Esempio: 8 − 3</p>
          <p className="font-body text-gray-600">
            Parti da 8 e conta all'indietro 3 passi: 7, 6, 5. Il risultato è <strong>5</strong>!
          </p>
        </div>
      </div>
    ),
    activity: {
      type: 'fill',
      question: 'Conta all\'indietro!',
      exercises: [
        { sequence: '9 − 2 = __', answer: '7' },
        { sequence: '7 − 3 = __', answer: '4' },
        { sequence: '8 − 5 = __', answer: '3' },
        { sequence: '6 − 4 = __', answer: '2' },
        { sequence: '10 − 6 = __', answer: '4' },
      ],
    },
  },
  {
    id: 5,
    type: 'activity',
    emoji: '0️⃣',
    title: 'Quando resta zero',
    content: (
      <div className="space-y-4">
        <p className="font-body text-gray-600 leading-relaxed">
          Il Guardiano fece una domanda speciale: "Cosa succede quando togli tutto?"
        </p>
        <div className="bg-pastel-sky/30 rounded-xl p-4 text-center">
          <p className="font-display font-bold text-pastel-sky-dark text-3xl mb-2">
            5 − 5 = 0
          </p>
          <p className="font-body text-gray-600">
            Quando togli tutto, resta <strong>zero</strong>!
          </p>
        </div>
      </div>
    ),
    activity: {
      type: 'fill',
      question: 'Quanto resta?',
      exercises: [
        { sequence: '3 − 3 = __', answer: '0' },
        { sequence: '7 − 7 = __', answer: '0' },
        { sequence: '4 − 4 = __', answer: '0' },
        { sequence: '10 − 10 = __', answer: '0' },
        { sequence: '6 − 6 = __', answer: '0' },
      ],
    },
  },
  {
    id: 6,
    type: 'activity',
    emoji: '🔄',
    title: 'Addizione e sottrazione insieme',
    content: (
      <div className="space-y-4">
        <p className="font-body text-gray-600 leading-relaxed">
          A volte nel castello si aggiunge e si toglie insieme!
        </p>
        <div className="bg-pastel-lavender/30 rounded-xl p-4">
          <p className="font-display font-semibold text-gray-700 mb-3">Prima e poi:</p>
          <p className="font-body text-gray-600 mb-2">Aggiungi 3, poi togli 1</p>
          <p className="font-body text-gray-600">5 + 3 = 8, poi 8 − 1 = <strong>7</strong></p>
        </div>
      </div>
    ),
    activity: {
      type: 'fill',
      question: 'Prima aggiungi, poi togli!',
      exercises: [
        { sequence: '4 + 2 − 1 = __', answer: '5' },
        { sequence: '6 + 3 − 2 = __', answer: '7' },
        { sequence: '8 + 1 − 3 = __', answer: '6' },
        { sequence: '5 + 4 − 2 = __', answer: '7' },
        { sequence: '7 + 2 − 4 = __', answer: '5' },
      ],
    },
  },
  {
    id: 7,
    type: 'activity',
    emoji: '📊',
    title: 'Più o meno?',
    content: (
      <div className="space-y-4">
        <p className="font-body text-gray-600 leading-relaxed">
          Il Guardiano chiese: "La quantità aumenta o diminuisce?"
        </p>
      </div>
    ),
    activity: {
      type: 'fill',
      question: 'Aumenta (+) o diminuisce (−)?',
      exercises: [
        { sequence: 'Ho 5 palloncini. Ne attacco 3. 5 __ 3 = 8. INSIEME!', answer: '+' },
        { sequence: 'Ho 8 caramelle. Ne mangio 4. 8 __ 4 = 4. RESTANO!', answer: '−' },
        { sequence: 'Ho 6 figurine. Ne ricevo 5. 6 __ 5 = 11. INSIEME!', answer: '+' },
        { sequence: 'Ho 10 monete. Ne gasto 6. 10 __ 6 = 4. RESTANO!', answer: '−' },
        { sequence: 'Ho 3 fiori. Ne colgo 2. 3 __ 2 = 1. RESTANO!', answer: '−' },
      ],
    },
  },
  {
    id: 8,
    type: 'activity',
    emoji: '🏆',
    title: 'Le prove del castello',
    content: (
      <div className="space-y-4">
        <p className="font-body text-gray-600 leading-relaxed">
          Il Guardiano propose delle prove per entrare nel castello!
        </p>
      </div>
    ),
    activity: {
      type: 'fill',
      question: 'Completa le prove!',
      exercises: [
        { sequence: 'Ho 9 gemme. Ne perdo 4. Quante gemme ho? __', answer: '5' },
        { sequence: 'Nel forziere ci sono 8 monete d\'oro. Ne prendo 3. Quante ne restano? __', answer: '5' },
        { sequence: 'La torre ha 10 mattoni. Se ne staccano 6. Quanti mattoni restano attaccati? __', answer: '4' },
        { sequence: 'Ho 7 frecce. Ne uso 5 per colpire il bersaglio. Quante frecce ho ancora? __', answer: '2' },
        { sequence: 'Il ponte ha 6 tavole di legno. Se ne rompono 3. Quante tavole intere restano? __', answer: '3' },
      ],
    },
  },
  {
    id: 9,
    type: 'checklist',
    emoji: '✅',
    title: 'Quello che ora so fare',
    content: (
      <div className="space-y-4">
        <p className="font-body text-gray-600 leading-relaxed">
          Bravo! Hai quasi conquistato il sigillo del Castello!
        </p>
        <p className="font-body text-gray-600 leading-relaxed">
          Metti una stellina accanto a quello che sai fare:
        </p>
      </div>
    ),
    checklist: [
      'So togliere e ottenere un resto',
      'So contare all\'indietro per sottrarre',
      'So che togliendo tutto resta zero',
      'So fare addizioni e sottrazioni insieme',
      'So riconoscere se una quantità aumenta o diminuisce',
    ],
  },
  {
    id: 10,
    type: 'challenge',
    emoji: '🏆',
    title: 'Super Missione Finale',
    content: (
      <div className="space-y-4">
        <p className="font-body text-gray-600 leading-relaxed">
          Il Guardiano tirò fuori un grande sigillo dorato.
        </p>
        <div className="bg-pastel-lavender/30 rounded-xl p-4 text-center">
          <p className="font-display font-bold text-pastel-lavender-dark">
            "Chi completa la Super Missione riceve il Sigillo del Castello!"
          </p>
        </div>
      </div>
    ),
    challenge: {
      title: 'Super Missione',
      exercises: [
        { question: '8 − 3 = __', answer: '5', type: 'fill' },
        { question: '10 − 7 = __', answer: '3', type: 'fill' },
        { question: '6 − 6 = __', answer: '0', type: 'fill' },
        { question: '5 + 3 − 2 = __', answer: '6', type: 'fill' },
        { question: 'Ho 10 quaderni. Ne presto 4. Quanti quaderni ho? __', answer: '6', type: 'fill' },
        { question: '7 − 4 + 2 = __', answer: '5', type: 'fill' },
        { question: '9 − 5 = 4 + __', answer: '0', type: 'fill' },
      ],
      badge: {
        title: 'Guardiano delle Differenze',
        emoji: '🛡️',
        description: 'Hai conquistato il sigillo del Castello!',
      },
    },
  },
]

export const chapter4Pages = [
  {
    id: 1,
    type: 'story',
    emoji: '🏝️',
    title: "L'Isola delle Tabelline",
    content: (
      <div className="space-y-4">
        <div className="w-full h-48 bg-gradient-to-b from-pastel-yellow/50 to-pastel-sky/50 rounded-2xl flex items-center justify-center mb-6">
          <span className="text-7xl">🏝️🗺️✨</span>
        </div>
        <p className="font-body text-gray-600 leading-relaxed">
          Benvenuto <strong>L'Isola delle Tabelline</strong>!
        </p>
        <p className="font-body text-gray-600 leading-relaxed">
          I nostri amici salparono su una nave verso un'isola misteriosa piena di tesori.
        </p>
        <div className="bg-pastel-yellow/30 rounded-xl p-4 text-center">
          <p className="font-display font-bold text-pastel-yellow-dark text-lg">
            "Qui i numeri si ripetono in modo speciale!" disse Ada.
          </p>
        </div>
        <p className="font-body text-gray-600 leading-relaxed">
          <strong>Dado</strong> trovò una mappa con dei numeri strani: 2, 4, 6, 8, 10...
        </p>
        <p className="font-body text-gray-600 leading-relaxed">
          "Questi sono i numeri della <strong>tabellina del 2</strong>!" esclamò Ada. "Sono tutti i numeri che ottieni aggiungendo 2 ogni volta!"
        </p>
      </div>
    ),
  },
  {
    id: 2,
    type: 'activity',
    emoji: '✖️',
    title: 'Cos\'è una tabellina?',
    content: (
      <div className="space-y-4">
        <p className="font-body text-gray-600 leading-relaxed">
          Una tabellina è come contare a salti!
        </p>
        <div className="bg-pastel-yellow/30 rounded-xl p-4">
          <p className="font-display font-semibold text-gray-700 mb-3">Tabellina del 2:</p>
          <div className="flex items-center justify-center gap-2 text-lg">
            <span>0</span><span className="text-pastel-yellow-dark">→</span>
            <span>2</span><span className="text-pastel-yellow-dark">→</span>
            <span>4</span><span className="text-pastel-yellow-dark">→</span>
            <span>6</span><span className="text-pastel-yellow-dark">→</span>
            <span>8</span><span className="text-pastel-yellow-dark">→</span>
            <span>10</span>
          </div>
          <p className="font-body text-gray-600 text-center mt-2">
            0 + 2 = 2, poi 2 + 2 = 4, poi 4 + 2 = 6...
          </p>
        </div>
      </div>
    ),
    activity: {
      type: 'fill',
      question: 'Completa la tabellina del 2!',
      exercises: [
        { sequence: '2 × 1 = __', answer: '2' },
        { sequence: '2 × 2 = __', answer: '4' },
        { sequence: '2 × 3 = __', answer: '6' },
        { sequence: '2 × 4 = __', answer: '8' },
        { sequence: '2 × 5 = __', answer: '10' },
      ],
    },
  },
  {
    id: 3,
    type: 'activity',
    emoji: '🎯',
    title: 'Tabellina del 5',
    content: (
      <div className="space-y-4">
        <p className="font-body text-gray-600 leading-relaxed">
          Ora scopriamo la tabellina del 5!
        </p>
        <div className="bg-pastel-pink/30 rounded-xl p-4">
          <p className="font-display font-semibold text-gray-700 mb-3">Tabellina del 5:</p>
          <div className="flex items-center justify-center gap-2 text-lg">
            <span>0</span><span className="text-pastel-pink-dark">→</span>
            <span>5</span><span className="text-pastel-pink-dark">→</span>
            <span>10</span><span className="text-pastel-pink-dark">→</span>
            <span>15</span><span className="text-pastel-pink-dark">→</span>
            <span>20</span><span className="text-pastel-pink-dark">→</span>
            <span>25</span>
          </div>
          <p className="font-body text-gray-600 text-center mt-2">
            Nota: finisce sempre per 0 o 5!
          </p>
        </div>
      </div>
    ),
    activity: {
      type: 'fill',
      question: 'Completa la tabellina del 5!',
      exercises: [
        { sequence: '5 × 1 = __', answer: '5' },
        { sequence: '5 × 2 = __', answer: '10' },
        { sequence: '5 × 3 = __', answer: '15' },
        { sequence: '5 × 4 = __', answer: '20' },
        { sequence: '5 × 5 = __', answer: '25' },
      ],
    },
  },
  {
    id: 4,
    type: 'activity',
    emoji: '🔢',
    title: 'Tabellina del 10',
    content: (
      <div className="space-y-4">
        <p className="font-body text-gray-600 leading-relaxed">
          La tabellina del 10 è facilissima!
        </p>
        <div className="bg-pastel-mint/30 rounded-xl p-4">
          <p className="font-display font-semibold text-gray-700 mb-3">Tabellina del 10:</p>
          <p className="font-body text-gray-600">
            Basta aggiungere uno <strong>0</strong> al numero!
          </p>
          <div className="flex items-center justify-center gap-2 text-lg mt-2">
            <span>1×10 = 10</span>
            <span>2×10 = 20</span>
            <span>3×10 = 30</span>
            <span>4×10 = 40</span>
            <span>5×10 = 50</span>
          </div>
        </div>
      </div>
    ),
    activity: {
      type: 'fill',
      question: 'Completa la tabellina del 10!',
      exercises: [
        { sequence: '1 × 10 = __', answer: '10' },
        { sequence: '2 × 10 = __', answer: '20' },
        { sequence: '3 × 10 = __', answer: '30' },
        { sequence: '4 × 10 = __', answer: '40' },
        { sequence: '5 × 10 = __', answer: '50' },
      ],
    },
  },
  {
    id: 5,
    type: 'activity',
    emoji: '🔄',
    title: 'Tabellina del 3',
    content: (
      <div className="space-y-4">
        <p className="font-body text-gray-600 leading-relaxed">
          Ora sfidiamo la tabellina del 3!
        </p>
        <div className="bg-pastel-lavender/30 rounded-xl p-4">
          <p className="font-display font-semibold text-gray-700 mb-3">Tabellina del 3:</p>
          <div className="flex items-center justify-center gap-2 text-lg">
            <span>0</span><span className="text-pastel-lavender-dark">→</span>
            <span>3</span><span className="text-pastel-lavender-dark">→</span>
            <span>6</span><span className="text-pastel-lavender-dark">→</span>
            <span>9</span><span className="text-pastel-lavender-dark">→</span>
            <span>12</span><span className="text-pastel-lavender-dark">→</span>
            <span>15</span>
          </div>
          <p className="font-body text-gray-600 text-center mt-2">
            3, 6, 9, 12... salti di 3!
          </p>
        </div>
      </div>
    ),
    activity: {
      type: 'fill',
      question: 'Completa la tabellina del 3!',
      exercises: [
        { sequence: '3 × 1 = __', answer: '3' },
        { sequence: '3 × 2 = __', answer: '6' },
        { sequence: '3 × 3 = __', answer: '9' },
        { sequence: '3 × 4 = __', answer: '12' },
        { sequence: '3 × 5 = __', answer: '15' },
      ],
    },
  },
  {
    id: 6,
    type: 'activity',
    emoji: '⭐',
    title: 'Tabellina del 4',
    content: (
      <div className="space-y-4">
        <p className="font-body text-gray-600 leading-relaxed">
          Ecco la tabellina del 4!
        </p>
        <div className="bg-pastel-yellow/30 rounded-xl p-4">
          <p className="font-display font-semibold text-gray-700 mb-3">Tabellina del 4:</p>
          <div className="flex items-center justify-center gap-2 text-lg">
            <span>0</span><span className="text-pastel-yellow-dark">→</span>
            <span>4</span><span className="text-pastel-yellow-dark">→</span>
            <span>8</span><span className="text-pastel-yellow-dark">→</span>
            <span>12</span><span className="text-pastel-yellow-dark">→</span>
            <span>16</span><span className="text-pastel-yellow-dark">→</span>
            <span>20</span>
          </div>
        </div>
      </div>
    ),
    activity: {
      type: 'fill',
      question: 'Completa la tabellina del 4!',
      exercises: [
        { sequence: '4 × 1 = __', answer: '4' },
        { sequence: '4 × 2 = __', answer: '8' },
        { sequence: '4 × 3 = __', answer: '12' },
        { sequence: '4 × 4 = __', answer: '16' },
        { sequence: '4 × 5 = __', answer: '20' },
      ],
    },
  },
  {
    id: 7,
    type: 'activity',
    emoji: '🎮',
    title: 'Sfida tabelline',
    content: (
      <div className="space-y-4">
        <p className="font-body text-gray-600 leading-relaxed">
          È ora della sfida! Mischia le tabelline!
        </p>
      </div>
    ),
    activity: {
      type: 'fill',
      question: 'Calcola velocemente!',
      exercises: [
        { sequence: '2 × 6 = __', answer: '12' },
        { sequence: '5 × 4 = __', answer: '20' },
        { sequence: '3 × 5 = __', answer: '15' },
        { sequence: '4 × 3 = __', answer: '12' },
        { sequence: '10 × 2 = __', answer: '20' },
      ],
    },
  },
  {
    id: 8,
    type: 'activity',
    emoji: '🧩',
    title: 'Trova la tabellina',
    content: (
      <div className="space-y-4">
        <p className="font-body text-gray-600 leading-relaxed">
          Sai riconoscere a quale tabellina appartiene ogni risultato?
        </p>
      </div>
    ),
    activity: {
      type: 'fill',
      question: 'A quale tabellina appartiene? (2, 3, 4, 5, 10)',
      exercises: [
        { sequence: '12 appartiene alla tabellina del __', answer: '3' },
        { sequence: '20 appartiene alla tabellina del __', answer: '4' },
        { sequence: '15 appartiene alla tabellina del __', answer: '5' },
        { sequence: '30 appartiene alla tabellina del __', answer: '10' },
        { sequence: '8 appartiene alla tabellina del __', answer: '2' },
      ],
    },
  },
  {
    id: 9,
    type: 'checklist',
    emoji: '✅',
    title: 'Quello che ora so fare',
    content: (
      <div className="space-y-4">
        <p className="font-body text-gray-600 leading-relaxed">
          Bravo! Hai quasi conquistato la stella marina dorata!
        </p>
        <p className="font-body text-gray-600 leading-relaxed">
          Metti una stellina accanto a quello che sai fare:
        </p>
      </div>
    ),
    checklist: [
      'So recitare la tabellina del 2',
      'So recitare la tabellina del 3',
      'So recitare la tabellina del 4',
      'So recitare la tabellina del 5',
      'So recitare la tabellina del 10',
      'So riconoscere i risultati delle tabelline',
    ],
  },
  {
    id: 10,
    type: 'challenge',
    emoji: '🏆',
    title: 'Super Missione Finale',
    content: (
      <div className="space-y-4">
        <p className="font-body text-gray-600 leading-relaxed">
          Sulla spiaggia trovarono una stella marina dorata!
        </p>
        <div className="bg-pastel-yellow/30 rounded-xl p-4 text-center">
          <p className="font-display font-bold text-pastel-yellow-dark">
            "Chi completa la Super Missione conquista la Stella Marina Dorata!"
          </p>
        </div>
      </div>
    ),
    challenge: {
      title: 'Super Missione',
      exercises: [
        { question: '2 × 7 = __', answer: '14', type: 'fill' },
        { question: '5 × 6 = __', answer: '30', type: 'fill' },
        { question: '3 × 4 = __', answer: '12', type: 'fill' },
        { question: '4 × 5 = __', answer: '20', type: 'fill' },
        { question: '10 × 5 = __', answer: '50', type: 'fill' },
        { question: '3 × 8 = __', answer: '24', type: 'fill' },
        { question: '4 × 7 = __', answer: '28', type: 'fill' },
      ],
      badge: {
        title: 'Custode delle Tabelline',
        emoji: '🏅',
        description: 'Hai conquistato la stella marina dorata!',
      },
    },
  },
]

export const chapter5Pages = [
  {
    id: 1,
    type: 'story',
    emoji: '🍕',
    title: 'La Città delle Divisioni',
    content: (
      <div className="space-y-4">
        <div className="w-full h-48 bg-gradient-to-b from-pastel-peach/50 to-pastel-pink/50 rounded-2xl flex items-center justify-center mb-6">
          <span className="text-7xl">🍕🏙️✨</span>
        </div>
        <p className="font-body text-gray-600 leading-relaxed">
          Benvenuto nella <strong>Città delle Divisioni</strong>!
        </p>
        <p className="font-body text-gray-600 leading-relaxed">
          I nostri amici entrarono in una città vivace dove tutto veniva diviso in parti uguali!
        </p>
        <div className="bg-pastel-peach/30 rounded-xl p-4 text-center">
          <p className="font-display font-bold text-pastel-peach-dark text-lg">
            "Qui si impara a dividere in parti uguali!" disse Teo.
          </p>
        </div>
        <p className="font-body text-gray-600 leading-relaxed">
          In una pizzeria, videro una pizza divisa in 8 fette uguali.
        </p>
        <p className="font-body text-gray-600 leading-relaxed">
          "Dividere significa <strong>separare in parti uguali</strong>!" spiegò Ada.
        </p>
      </div>
    ),
  },
  {
    id: 2,
    type: 'activity',
    emoji: '➗',
    title: 'Cos\'è dividere?',
    content: (
      <div className="space-y-4">
        <p className="font-body text-gray-600 leading-relaxed">
          Dividere significa <strong>mettere in gruppi uguali</strong>.
        </p>
        <div className="bg-pastel-lavender/30 rounded-xl p-4">
          <p className="font-display font-semibold text-gray-700 mb-3">Esempio: 8 ÷ 2</p>
          <p className="font-body text-gray-600 mb-2">
            Ho 8 pizzette. Le divido tra 2 amici.
          </p>
          <p className="font-body text-gray-600 mb-2">
            Ogni amico riceve: 🍕🍕🍕🍕
          </p>
          <p className="font-display font-bold text-pastel-lavender-dark">
            8 ÷ 2 = 4
          </p>
        </div>
      </div>
    ),
    activity: {
      type: 'fill',
      question: 'Completa le divisioni!',
      exercises: [
        { sequence: '6 ÷ 2 = __', answer: '3' },
        { sequence: '10 ÷ 2 = __', answer: '5' },
        { sequence: '8 ÷ 4 = __', answer: '2' },
        { sequence: '12 ÷ 3 = __', answer: '4' },
        { sequence: '15 ÷ 5 = __', answer: '3' },
      ],
    },
  },
  {
    id: 3,
    type: 'activity',
    emoji: '👥',
    title: 'Dividere tra amici',
    content: (
      <div className="space-y-4">
        <p className="font-body text-gray-600 leading-relaxed">
          4 bambini vogliono dividersi delle cose in parti uguali.
        </p>
      </div>
    ),
    activity: {
      type: 'fill',
      question: 'Quanti oggetti per ogni bambino?',
      exercises: [
        { sequence: '8 biscotti ÷ 4 bambini = __ biscotti cadauno', answer: '2' },
        { sequence: '12 figurine ÷ 4 bambini = __ figurine cadauno', answer: '3' },
        { sequence: '16 palloncini ÷ 4 bambini = __ palloncini cadauno', answer: '4' },
        { sequence: '20 caramelle ÷ 4 bambini = __ caramelle cadauno', answer: '5' },
        { sequence: '8 cioccolatini ÷ 4 bambini = __ cioccolatini cadauno', answer: '2' },
      ],
    },
  },
  {
    id: 4,
    type: 'activity',
    emoji: '🍕',
    title: 'Le fette di pizza',
    content: (
      <div className="space-y-4">
        <p className="font-body text-gray-600 leading-relaxed">
          In pizzeria, le pizze vengono divise in fette uguali.
        </p>
      </div>
    ),
    activity: {
      type: 'fill',
      question: 'Quante fette per persona?',
      exercises: [
        { sequence: '8 fette ÷ 2 persone = __ fette', answer: '4' },
        { sequence: '6 fette ÷ 3 persone = __ fette', answer: '2' },
        { sequence: '12 fette ÷ 4 persone = __ fette', answer: '3' },
        { sequence: '9 fette ÷ 3 persone = __ fette', answer: '3' },
        { sequence: '10 fette ÷ 5 persone = __ fette', answer: '2' },
      ],
    },
  },
  {
    id: 5,
    type: 'activity',
    emoji: '🔄',
    title: 'Divisione e moltiplicazione',
    content: (
      <div className="space-y-4">
        <p className="font-body text-gray-600 leading-relaxed">
          Ada fece una scoperta importante!
        </p>
        <div className="bg-pastel-peach/30 rounded-xl p-4">
          <p className="font-display font-semibold text-gray-700 mb-3">Divisione e moltiplicazione sono collegate:</p>
          <p className="font-body text-gray-600">
            12 ÷ 3 = 4 perché 3 × 4 = 12
          </p>
        </div>
      </div>
    ),
    activity: {
      type: 'fill',
      question: 'Usa la moltiplicazione per fare le divisioni!',
      exercises: [
        { sequence: '15 ÷ 3 = __ (3 × __ = 15)', answer: '5' },
        { sequence: '20 ÷ 4 = __ (4 × __ = 20)', answer: '5' },
        { sequence: '18 ÷ 2 = __ (2 × __ = 18)', answer: '9' },
        { sequence: '16 ÷ 4 = __ (4 × __ = 16)', answer: '4' },
        { sequence: '25 ÷ 5 = __ (5 × __ = 25)', answer: '5' },
      ],
    },
  },
  {
    id: 6,
    type: 'activity',
    emoji: '0️⃣',
    title: 'Dividere per 1 e per 0',
    content: (
      <div className="space-y-4">
        <p className="font-body text-gray-600 leading-relaxed">
          Attenzione ai casi speciali!
        </p>
        <div className="bg-pastel-lavender/30 rounded-xl p-4">
          <p className="font-body text-gray-600 mb-2">
            <strong>Dividere per 1:</strong>
          </p>
          <p className="font-body text-gray-600 mb-4">
            7 ÷ 1 = 7 (il numero resta uguale!)
          </p>
          <p className="font-body text-gray-600 mb-2">
            <strong>Dividere per il numero stesso:</strong>
          </p>
          <p className="font-body text-gray-600">
            7 ÷ 7 = 1 (ottieni sempre 1!)
          </p>
        </div>
      </div>
    ),
    activity: {
      type: 'fill',
      question: 'Casi speciali!',
      exercises: [
        { sequence: '9 ÷ 1 = __', answer: '9' },
        { sequence: '5 ÷ 5 = __', answer: '1' },
        { sequence: '10 ÷ 1 = __', answer: '10' },
        { sequence: '8 ÷ 8 = __', answer: '1' },
        { sequence: '6 ÷ 1 = __', answer: '6' },
      ],
    },
  },
  {
    id: 7,
    type: 'activity',
    emoji: '🎯',
    title: 'Problemi di divisione',
    content: (
      <div className="space-y-4">
        <p className="font-body text-gray-600 leading-relaxed">
          Risolvi questi problemi della città!
        </p>
      </div>
    ),
    activity: {
      type: 'fill',
      question: 'Risolvi i problemi!',
      exercises: [
        { sequence: 'Ho 20 sticker. Li divido tra 4 amici. __ sticker cadauno', answer: '5' },
        { sequence: 'Ho 15 matite. Le metto in 3 scatole uguali. __ matite per scatola', answer: '5' },
        { sequence: 'Ho 18 palline. Le divido in 6 gruppi. __ palline per gruppo', answer: '3' },
        { sequence: 'Ho 24 ciambelle. Le divido tra 8 bambini. __ ciambelle cadauno', answer: '3' },
        { sequence: 'Ho 16 cracker. Li divido in 4 pacchetti uguali. __ cracker per pacchetto', answer: '4' },
      ],
    },
  },
  {
    id: 8,
    type: 'activity',
    emoji: '🤖',
    title: 'Il robot dividi',
    content: (
      <div className="space-y-4">
        <p className="font-body text-gray-600 leading-relaxed">
          Un robot speciale può solo dividere! Aiutalo!
        </p>
      </div>
    ),
    activity: {
      type: 'fill',
      question: 'Aiuta il robot a dividere!',
      exercises: [
        { sequence: '🤖: 10 ÷ 2 = __', answer: '5' },
        { sequence: '🤖: 14 ÷ 7 = __', answer: '2' },
        { sequence: '🤖: 21 ÷ 3 = __', answer: '7' },
        { sequence: '🤖: 24 ÷ 6 = __', answer: '4' },
        { sequence: '🤖: 30 ÷ 5 = __', answer: '6' },
      ],
    },
  },
  {
    id: 9,
    type: 'checklist',
    emoji: '✅',
    title: 'Quello che ora so fare',
    content: (
      <div className="space-y-4">
        <p className="font-body text-gray-600 leading-relaxed">
          Bravo! Hai quasi conquistato la ruota dentata dorata!
        </p>
        <p className="font-body text-gray-600 leading-relaxed">
          Metti una stellina accanto a quello che sai fare:
        </p>
      </div>
    ),
    checklist: [
      'So dividere in parti uguali',
      'So che ÷1 lascia il numero uguale',
      'So che ÷se stesso dà sempre 1',
      'So usare la moltiplicazione per fare divisioni',
      'So risolvere problemi di divisione',
    ],
  },
  {
    id: 10,
    type: 'challenge',
    emoji: '🏆',
    title: 'Super Missione Finale',
    content: (
      <div className="space-y-4">
        <p className="font-body text-gray-600 leading-relaxed">
          Nel laboratorio robotico trovarono una ruota dentata dorata!
        </p>
        <div className="bg-pastel-peach/30 rounded-xl p-4 text-center">
          <p className="font-display font-bold text-pastel-peach-dark">
            "Chi completa la Super Missione conquista la Ruota Dentata Dorata!"
          </p>
        </div>
      </div>
    ),
    challenge: {
      title: 'Super Missione',
      exercises: [
        { question: '12 ÷ 4 = __', answer: '3', type: 'fill' },
        { question: '18 ÷ 6 = __', answer: '3', type: 'fill' },
        { question: '20 ÷ 5 = __', answer: '4', type: 'fill' },
        { question: '24 ÷ 3 = __', answer: '8', type: 'fill' },
        { question: '30 ÷ 6 = __', answer: '5', type: 'fill' },
        { question: '16 ÷ 8 = __', answer: '2', type: 'fill' },
        { question: '25 ÷ 5 = __', answer: '5', type: 'fill' },
      ],
      badge: {
        title: 'Custode delle Divisioni',
        emoji: '🤖',
        description: 'Hai conquistato la ruota dentata dorata!',
      },
    },
  },
]

export const chapter6Pages = [
  {
    id: 1,
    type: 'story',
    emoji: '🏘️',
    title: 'Il Villaggio delle Forme',
    content: (
      <div className="space-y-4">
        <div className="w-full h-48 bg-gradient-to-b from-pastel-mint/50 to-pastel-lavender/50 rounded-2xl flex items-center justify-center mb-6">
          <span className="text-7xl">🏘️🔷✨</span>
        </div>
        <p className="font-body text-gray-600 leading-relaxed">
          Benvenuto nel <strong>Villaggio delle Forme</strong>!
        </p>
        <p className="font-body text-gray-600 leading-relaxed">
          I nostri amici arrivarono in un villaggio dove ogni edificio aveva una forma diversa!
        </p>
        <div className="bg-pastel-mint/30 rounded-xl p-4 text-center">
          <p className="font-display font-bold text-pastel-mint-dark text-lg">
            "In questo villaggio impariamo a riconoscere le forme!" disse Ada.
          </p>
        </div>
        <p className="font-body text-gray-600 leading-relaxed">
          Videro case quadrate, tetti triangolari, finestre rotonde...
        </p>
        <p className="font-body text-gray-600 leading-relaxed">
          "Le forme sono ovunque!" esclamò Nino.
        </p>
      </div>
    ),
  },
  {
    id: 2,
    type: 'activity',
    emoji: '🔺',
    title: 'Il triangolo',
    content: (
      <div className="space-y-4">
        <p className="font-body text-gray-600 leading-relaxed">
          Il <strong>triangolo</strong> ha 3 lati e 3 angoli.
        </p>
        <div className="bg-pastel-lavender/30 rounded-xl p-4 text-center">
          <span className="text-6xl">🔺</span>
        </div>
        <p className="font-body text-gray-600 leading-relaxed">
          Esempi nella vita reale: tetti delle case, fette di pizza, segnali stradali.
        </p>
      </div>
    ),
    activity: {
      type: 'fill',
      question: 'Quanti lati ha il triangolo?',
      exercises: [
        { sequence: 'Il triangolo ha __ lati', answer: '3' },
        { sequence: 'Il triangolo ha __ angoli', answer: '3' },
        { sequence: 'Quanti triangoli vedi? 🔺🔺🔺 = __', answer: '3' },
        { sequence: 'Se disegni 2 triangoli, quanti lati in tutto? __', answer: '6' },
        { sequence: 'Un triangolo + un triangolo = __ lati totali', answer: '6' },
      ],
    },
  },
  {
    id: 3,
    type: 'activity',
    emoji: '⬜',
    title: 'Il quadrato',
    content: (
      <div className="space-y-4">
        <p className="font-body text-gray-600 leading-relaxed">
          Il <strong>quadrato</strong> ha 4 lati uguali e 4 angoli retti.
        </p>
        <div className="bg-pastel-pink/30 rounded-xl p-4 text-center">
          <span className="text-6xl">⬜</span>
        </div>
        <p className="font-body text-gray-600 leading-relaxed">
          Esempi: quadrati del pane, piastrelle, fogli di carta.
        </p>
      </div>
    ),
    activity: {
      type: 'fill',
      question: 'Quanti lati ha il quadrato?',
      exercises: [
        { sequence: 'Il quadrato ha __ lati', answer: '4' },
        { sequence: 'Il quadrato ha __ angoli', answer: '4' },
        { sequence: 'Quanti quadrati vedi? ⬜⬜⬜ = __', answer: '3' },
        { sequence: 'Se metti insieme 2 quadrati, ottieni __ lati', answer: '8' },
        { sequence: 'Un quadrato diviso a metà fa __ triangoli', answer: '2' },
      ],
    },
  },
  {
    id: 4,
    type: 'activity',
    emoji: '🔷',
    title: 'Il rettangolo',
    content: (
      <div className="space-y-4">
        <p className="font-body text-gray-600 leading-relaxed">
          Il <strong>rettangolo</strong> ha 4 lati e 4 angoli, ma i lati opposti sono uguali.
        </p>
        <div className="bg-pastel-peach/30 rounded-xl p-4 text-center">
          <span className="text-6xl">📐</span>
        </div>
        <p className="font-body text-gray-600 leading-relaxed">
          Esempi: porte, finestre, libri, banchi.
        </p>
      </div>
    ),
    activity: {
      type: 'fill',
      question: 'Riconosci le forme!',
      exercises: [
        { sequence: 'Il rettangolo ha __ lati', answer: '4' },
        { sequence: 'Una porta è un __', answer: 'rettangolo' },
        { sequence: 'Un quadrato è un tipo di __', answer: 'rettangolo' },
        { sequence: 'Quante forme in tutto? ⬜ + 📐 = __', answer: '2' },
        { sequence: 'Un rettangolo ha __ coppie di lati uguali', answer: '2' },
      ],
    },
  },
  {
    id: 5,
    type: 'activity',
    emoji: '⭕',
    title: 'Il cerchio',
    content: (
      <div className="space-y-4">
        <p className="font-body text-gray-600 leading-relaxed">
          Il <strong>cerchio</strong> non ha lati né angoli. È una forma rotonda perfetta!
        </p>
        <div className="bg-pastel-sky/30 rounded-xl p-4 text-center">
          <span className="text-6xl">⭕</span>
        </div>
        <p className="font-body text-gray-600 leading-relaxed">
          Esempi: ruote, piatti, palloni, orologi.
        </p>
      </div>
    ),
    activity: {
      type: 'fill',
      question: 'Il cerchio!',
      exercises: [
        { sequence: 'Il cerchio ha __ lati', answer: '0' },
        { sequence: 'Il cerchio ha __ angoli', answer: '0' },
        { sequence: 'Una ruota è un __', answer: 'cerchio' },
        { sequence: 'Un pallone è un __', answer: 'cerchio' },
        { sequence: 'Quanti cerchi? ⭕⭕⭕ = __', answer: '3' },
      ],
    },
  },
  {
    id: 6,
    type: 'activity',
    emoji: '🔷',
    title: 'Le forme nel villaggio',
    content: (
      <div className="space-y-4">
        <p className="font-body text-gray-600 leading-relaxed">
          Riesci a trovare tutte le forme nel villaggio?
        </p>
        <div className="bg-pastel-cream rounded-xl p-4 text-center">
          <span className="text-4xl">🏠🪟🚪🏪</span>
          <p className="font-body text-gray-600 mt-2">
            Casa: tetto=triangolo, finestre=rettangolo, maniglia=cerchio
          </p>
        </div>
      </div>
    ),
    activity: {
      type: 'fill',
      question: 'Trova le forme!',
      exercises: [
        { sequence: 'Il tetto della casa è un __', answer: 'triangolo' },
        { sequence: 'La finestra della casa è un __', answer: 'rettangolo' },
        { sequence: 'La ruota del carrello è un __', answer: 'cerchio' },
        { sequence: 'Il cartello stradale STOP ha __ lati', answer: '8' },
        { sequence: 'Una matita ha forma di __', answer: 'rettangolo' },
      ],
    },
  },
  {
    id: 7,
    type: 'activity',
    emoji: '📐',
    title: 'Contare i lati',
    content: (
      <div className="space-y-4">
        <p className="font-body text-gray-600 leading-relaxed">
          Impariamo a contare i lati di ogni forma!
        </p>
      </div>
    ),
    activity: {
      type: 'fill',
      question: 'Conta i lati!',
      exercises: [
        { sequence: 'Triangolo: __ lati', answer: '3' },
        { sequence: 'Quadrato: __ lati', answer: '4' },
        { sequence: 'Rettangolo: __ lati', answer: '4' },
        { sequence: 'Cerchio: __ lati', answer: '0' },
        { sequence: 'Un triangolo + un quadrato = __ lati totali', answer: '7' },
      ],
    },
  },
  {
    id: 8,
    type: 'activity',
    emoji: '🧭',
    title: 'Forme e direzioni',
    content: (
      <div className="space-y-4">
        <p className="font-body text-gray-600 leading-relaxed">
          Ada insegnò a orientarsi usando le forme!
        </p>
        <div className="bg-pastel-mint/30 rounded-xl p-4">
          <p className="font-display font-semibold text-gray-700 mb-3">Frecce e forme:</p>
          <p className="font-body text-gray-600">
            △ = avanti, ▽ = indietro, ◁ = sinistra, ▷ = destra
          </p>
        </div>
      </div>
    ),
    activity: {
      type: 'fill',
      question: 'Segui le forme!',
      exercises: [
        { sequence: '△ + △ + ▷ = __ passi avanti, __ a destra', answer: '2,1' },
        { sequence: '▽ + ◁ + ▽ = __ passi indietro, __ a sinistra', answer: '2,1' },
        { sequence: '△ + ▷ + ▷ + ▽ = __ avanti, __ destra, __ indietro', answer: '1,2,1' },
        { sequence: '3 triangoli △△△ = __ passi avanti', answer: '3' },
        { sequence: '2 quadrati ▢▢ + 1 triangolo △ = __ passi totali', answer: '3' },
      ],
    },
  },
  {
    id: 9,
    type: 'checklist',
    emoji: '✅',
    title: 'Quello che ora so fare',
    content: (
      <div className="space-y-4">
        <p className="font-body text-gray-600 leading-relaxed">
          Bravo! Hai quasi conquistato la freccia dorata!
        </p>
        <p className="font-body text-gray-600 leading-relaxed">
          Metti una stellina accanto a quello che sai fare:
        </p>
      </div>
    ),
    checklist: [
      'So riconoscere il triangolo',
      'So riconoscere il quadrato',
      'So riconoscere il rettangolo',
      'So riconoscere il cerchio',
      'So contare i lati delle forme',
      'So trovare le forme nella vita reale',
    ],
  },
  {
    id: 10,
    type: 'challenge',
    emoji: '🏆',
    title: 'Super Missione Finale',
    content: (
      <div className="space-y-4">
        <p className="font-body text-gray-600 leading-relaxed">
          Sulla collina trovarono una grande freccia dorata!
        </p>
        <div className="bg-pastel-mint/30 rounded-xl p-4 text-center">
          <p className="font-display font-bold text-pastel-mint-dark">
            "Chi completa la Super Missione conquista la Freccia Dorata!"
          </p>
        </div>
      </div>
    ),
    challenge: {
      title: 'Super Missione',
      exercises: [
        { question: 'Quanti lati ha un esagono? __', answer: '6', type: 'fill' },
        { question: 'Un pentagono ha __ lati', answer: '5', type: 'fill' },
        { question: 'Quanti triangoli per fare un esagono? __', answer: '4', type: 'fill' },
        { question: 'Un quadrato + un triangolo = __ lati', answer: '7', type: 'fill' },
        { question: 'Quattro triangoli fanno un __', answer: 'quadrato', type: 'fill' },
        { question: 'Un rettangolo può essere diviso in __ triangoli', answer: '2', type: 'fill' },
        { question: 'Quante forme? 🔺 + ⬜ + ⭕ = __', answer: '3', type: 'fill' },
      ],
      badge: {
        title: 'Guida delle Forme e dei Percorsi',
        emoji: '🧭',
        description: 'Hai conquistato la freccia dorata!',
      },
    },
  },
]
