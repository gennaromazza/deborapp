// Template per il contenuto dei capitoli
// Ogni array rappresenta le pagine di un capitolo

export const chapter1Pages = [
  {
    id: 1,
    type: 'story',
    emoji: '📖',
    title: 'Titolo Pagina 1',
    content: (
      <div className="space-y-4">
        <p className="font-body text-gray-600 leading-relaxed">
          Scrivi qui il contenuto della storia...
        </p>
      </div>
    ),
  },
  {
    id: 2,
    type: 'activity',
    emoji: '🎯',
    title: 'Attività',
    content: (
      <div className="space-y-4">
        <p className="font-body text-gray-600 leading-relaxed">
          Istruzioni per l'attività...
        </p>
      </div>
    ),
    activity: {
      type: 'fill',
      question: 'Domanda per l\'esercizio',
      exercises: [
        { sequence: '1 + 1 = __', answer: '2' },
        { sequence: '2 + 2 = __', answer: '4' },
      ],
    },
  },
]

// Copia e rinomina per altri capitoli:
// export const chapter2Pages = [...]
// export const chapter3Pages = [...]
// etc.
