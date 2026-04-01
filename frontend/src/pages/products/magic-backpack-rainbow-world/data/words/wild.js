export const WILD_WORDS = [
  { id: 'lion', word: 'lion', translation: 'leone', emoji: '🦁', color: '#cc8800', category: 'animal', audioText: { word: 'lion', slow: 'lioon', sentence: 'It is a lion' } },
  { id: 'elephant', word: 'elephant', translation: 'elefante', emoji: '🐘', color: '#8899aa', category: 'animal', audioText: { word: 'elephant', slow: 'elephhant', sentence: 'It is an elephant' } },
  { id: 'monkey', word: 'monkey', translation: 'scimmia', emoji: '🐵', color: '#aa7744', category: 'animal', audioText: { word: 'monkey', slow: 'monnkey', sentence: 'It is a monkey' } },
  { id: 'giraffe', word: 'giraffe', translation: 'giraffa', emoji: '🦒', color: '#ddaa44', category: 'animal', audioText: { word: 'giraffe', slow: 'giraaaffe', sentence: 'It is a giraffe' } },
  { id: 'zebra', word: 'zebra', translation: 'zebra', emoji: '🦓', color: '#333333', category: 'animal', audioText: { word: 'zebra', slow: 'zeeebra', sentence: 'It is a zebra' } },
  { id: 'snake', word: 'snake', translation: 'serpente', emoji: '🐍', color: '#44aa44', category: 'animal', audioText: { word: 'snake', slow: 'snaaake', sentence: 'It is a snake' } },
  { id: 'tiger', word: 'tiger', translation: 'tigre', emoji: '🐯', color: '#ee8800', category: 'animal', audioText: { word: 'tiger', slow: 'tiiiger', sentence: 'It is a tiger' } },
]

export const WILD_SENTENCES = [
  { id: 'wild-s1', italian: 'Il leone ruggisce', english: 'The lion roars', words: ['The', 'lion', 'roars'], gap: 'roars', gapOptions: ['roars', 'sings', 'reads'] },
  { id: 'wild-s2', italian: 'L\'elefante è grande', english: 'The elephant is big', words: ['The', 'elephant', 'is', 'big'], gap: 'big', gapOptions: ['big', 'small', 'red'] },
  { id: 'wild-s3', italian: 'La scimmia arrampica', english: 'The monkey climbs', words: ['The', 'monkey', 'climbs'], gap: 'climbs', gapOptions: ['climbs', 'flies', 'swims'] },
  { id: 'wild-s4', italian: 'La giraffa è alta', english: 'The giraffe is tall', words: ['The', 'giraffe', 'is', 'tall'], gap: 'tall', gapOptions: ['tall', 'short', 'blue'] },
  { id: 'wild-s5', italian: 'La zebra corre', english: 'The zebra runs', words: ['The', 'zebra', 'runs'], gap: 'runs', gapOptions: ['runs', 'flies', 'sings'] },
]

export const WILD_MISSIONS = [
  { id: 'wild-1', type: 'tap', instruction: 'Tocca tutti gli animali selvatici!', instructionEN: 'Tap all the wild animals!', targetWords: WILD_WORDS.map(w => w.id) },
  { id: 'wild-2', type: 'drag', instruction: 'Metti il LEONE nello zaino 🎒', instructionEN: 'Put the LION in the backpack', targetWords: ['lion'] },
  { id: 'wild-3', type: 'match', instruction: 'Quale arrampica? 🐵', instructionEN: 'Which one climbs?', targetWords: ['monkey'] },
  { id: 'wild-4', type: 'sentence', instruction: 'Costruisci la frase!', instructionEN: 'Build the sentence!', sentences: WILD_SENTENCES.slice(0, 2) },
  { id: 'wild-5', type: 'speaking', instruction: 'Ascolta e ripeti!', instructionEN: 'Listen and repeat!', sentences: WILD_SENTENCES.slice(0, 2) },
  { id: 'wild-6', type: 'fillgap', instruction: 'Completa la frase!', instructionEN: 'Complete the sentence!', sentences: WILD_SENTENCES.slice(0, 2) },
]

export const WILD_WORLD = {
  id: 'wild',
  name: 'Into the Wild',
  emoji: '🦁',
  background: 'from-green-600 via-yellow-500 to-green-400',
  words: WILD_WORDS,
  missions: WILD_MISSIONS,
  requiredWords: 3,
}
