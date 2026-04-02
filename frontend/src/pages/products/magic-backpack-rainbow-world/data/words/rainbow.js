export const RAINBOW_WORDS = [
  { id: 'red', word: 'red', translation: 'rosso', emoji: '🔴', color: '#ff4444', category: 'color', audioText: { word: 'red', slow: 'reeed', sentence: 'It is red' } },
  { id: 'blue', word: 'blue', translation: 'blu', emoji: '🔵', color: '#4488ff', category: 'color', audioText: { word: 'blue', slow: 'blooo', sentence: 'It is blue' } },
  { id: 'yellow', word: 'yellow', translation: 'giallo', emoji: '🟡', color: '#ffcc00', category: 'color', audioText: { word: 'yellow', slow: 'yellloow', sentence: 'It is yellow' } },
  { id: 'green', word: 'green', translation: 'verde', emoji: '🟢', color: '#44cc44', category: 'color', audioText: { word: 'green', slow: 'greeeen', sentence: 'It is green' } },
  { id: 'orange-color', word: 'orange', translation: 'arancione', emoji: '🟠', color: '#ff8800', category: 'color', audioText: { word: 'orange', slow: 'oorange', sentence: 'It is orange' } },
  { id: 'purple', word: 'purple', translation: 'viola', emoji: '🟣', color: '#9944cc', category: 'color', audioText: { word: 'purple', slow: 'purrrple', sentence: 'It is purple' } },
  { id: 'pink', word: 'pink', translation: 'rosa', emoji: '💗', color: '#ff88cc', category: 'color', audioText: { word: 'pink', slow: 'piink', sentence: 'It is pink' } },
  { id: 'white', word: 'white', translation: 'bianco', emoji: '⚪', color: '#ffffff', category: 'color', audioText: { word: 'white', slow: 'whiiite', sentence: 'It is white' } },
  { id: 'black', word: 'black', translation: 'nero', emoji: '⚫', color: '#333333', category: 'color', audioText: { word: 'black', slow: 'blaack', sentence: 'It is black' } },
]

export const RAINBOW_SENTENCES = [
  { id: 'rainbow-s1', italian: 'La palla è rossa', english: 'The ball is red', words: ['The', 'ball', 'is', 'red'], gap: 'red', gapOptions: ['red', 'blue', 'yellow'] },
  { id: 'rainbow-s2', italian: 'Il sole è giallo', english: 'The sun is yellow', words: ['The', 'sun', 'is', 'yellow'], gap: 'yellow', gapOptions: ['yellow', 'green', 'orange-color'] },
  { id: 'rainbow-s3', italian: 'Il cielo è blu', english: 'The sky is blue', words: ['The', 'sky', 'is', 'blue'], gap: 'blue', gapOptions: ['blue', 'red', 'pink'] },
  { id: 'rainbow-s4', italian: 'L\'erba è verde', english: 'The grass is green', words: ['The', 'grass', 'is', 'green'], gap: 'green', gapOptions: ['green', 'purple', 'white'] },
  { id: 'rainbow-s5', italian: 'La mela è rossa', english: 'The apple is red', words: ['The', 'apple', 'is', 'red'], gap: 'red', gapOptions: ['red', 'orange-color', 'black'] },
]

export const RAINBOW_MISSIONS = [
  { id: 'rainbow-1', type: 'tap', instruction: 'Tocca tutti i colori!', instructionEN: 'Tap all the colors!', targetWords: RAINBOW_WORDS.map(w => w.id) },
  { id: 'rainbow-2', type: 'drag', instruction: 'Metti il ROSSO nello zaino 🎒', instructionEN: 'Put RED in the backpack', targetWords: ['red'] },
  { id: 'rainbow-3', type: 'match', instruction: 'Qual è il GIALLO? 🟡', instructionEN: 'Which one is YELLOW?', targetWords: ['yellow'] },
  { id: 'rainbow-4', type: 'sentence', instruction: 'Costruisci la frase!', instructionEN: 'Build the sentence!', sentences: RAINBOW_SENTENCES.slice(0, 2) },
  { id: 'rainbow-5', type: 'speaking', instruction: 'Ascolta e ripeti!', instructionEN: 'Listen and repeat!', sentences: RAINBOW_SENTENCES.slice(0, 2) },
  { id: 'rainbow-6', type: 'fillgap', instruction: 'Completa la frase!', instructionEN: 'Complete the sentence!', sentences: RAINBOW_SENTENCES.slice(0, 2) },
]

export const RAINBOW_WORLD = {
  id: 'rainbow',
  name: 'Rainbow World',
  emoji: '🌈',
  background: 'from-purple-400 via-pink-300 to-yellow-200',
  words: RAINBOW_WORDS,
  missions: RAINBOW_MISSIONS,
  requiredWords: 3,
}
