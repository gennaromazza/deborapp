export const PETS_WORDS = [
  { id: 'dog', word: 'dog', translation: 'cane', emoji: '🐶', color: '#cc8844', category: 'animal', audioText: { word: 'dog', slow: 'doog', sentence: 'It is a dog' } },
  { id: 'cat', word: 'cat', translation: 'gatto', emoji: '🐱', color: '#ffaa44', category: 'animal', audioText: { word: 'cat', slow: 'caaat', sentence: 'It is a cat' } },
  { id: 'fish', word: 'fish', translation: 'pesce', emoji: '🐟', color: '#44aacc', category: 'animal', audioText: { word: 'fish', slow: 'fiiish', sentence: 'It is a fish' } },
  { id: 'bird', word: 'bird', translation: 'uccello', emoji: '🐦', color: '#44ccaa', category: 'animal', audioText: { word: 'bird', slow: 'birrrd', sentence: 'It is a bird' } },
  { id: 'rabbit', word: 'rabbit', translation: 'coniglio', emoji: '🐰', color: '#ddbb99', category: 'animal', audioText: { word: 'rabbit', slow: 'rabbbbit', sentence: 'It is a rabbit' } },
  { id: 'hamster', word: 'hamster', translation: 'criceto', emoji: '🐹', color: '#eebb77', category: 'animal', audioText: { word: 'hamster', slow: 'hammmster', sentence: 'It is a hamster' } },
  { id: 'turtle', word: 'turtle', translation: 'tartaruga', emoji: '🐢', color: '#66aa44', category: 'animal', audioText: { word: 'turtle', slow: 'turrrtle', sentence: 'It is a turtle' } },
]

export const PETS_SENTENCES = [
  { id: 'pets-s1', italian: 'Il cane è piccolo', english: 'The dog is small', words: ['The', 'dog', 'is', 'small'], gap: 'small', gapOptions: ['small', 'big', 'red'] },
  { id: 'pets-s2', italian: 'Ho un gatto', english: 'I have a cat', words: ['I', 'have', 'a', 'cat'], gap: 'cat', gapOptions: ['cat', 'dog', 'fish'] },
  { id: 'pets-s3', italian: 'Il pesce nuota', english: 'The fish swims', words: ['The', 'fish', 'swims'], gap: 'swims', gapOptions: ['swims', 'flies', 'runs'] },
  { id: 'pets-s4', italian: 'Il coniglio salta', english: 'The rabbit jumps', words: ['The', 'rabbit', 'jumps'], gap: 'jumps', gapOptions: ['jumps', 'swims', 'sings'] },
  { id: 'pets-s5', italian: 'L\'uccello vola', english: 'The bird flies', words: ['The', 'bird', 'flies'], gap: 'flies', gapOptions: ['flies', 'swims', 'reads'] },
]

export const PETS_MISSIONS = [
  { id: 'pets-1', type: 'tap', instruction: 'Tocca tutti gli animali!', instructionEN: 'Tap all the animals!', targetWords: PETS_WORDS.map(w => w.id) },
  { id: 'pets-2', type: 'drag', instruction: 'Metti il CANE nello zaino 🎒', instructionEN: 'Put the DOG in the backpack', targetWords: ['dog'] },
  { id: 'pets-3', type: 'match', instruction: 'Quale nuota? 🐟', instructionEN: 'Which one swims?', targetWords: ['fish'] },
  { id: 'pets-4', type: 'sentence', instruction: 'Costruisci la frase!', instructionEN: 'Build the sentence!', sentences: PETS_SENTENCES.slice(0, 2) },
  { id: 'pets-5', type: 'speaking', instruction: 'Ascolta e ripeti!', instructionEN: 'Listen and repeat!', sentences: PETS_SENTENCES.slice(0, 2) },
  { id: 'pets-6', type: 'fillgap', instruction: 'Completa la frase!', instructionEN: 'Complete the sentence!', sentences: PETS_SENTENCES.slice(0, 2) },
]

export const PETS_WORLD = {
  id: 'pets',
  name: 'My Little Pets',
  emoji: '🐶',
  background: 'from-green-300 via-yellow-200 to-orange-200',
  words: PETS_WORDS,
  missions: PETS_MISSIONS,
  requiredWords: 3,
}
