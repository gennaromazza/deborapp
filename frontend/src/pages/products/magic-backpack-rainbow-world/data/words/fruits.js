export const FRUITS_WORDS = [
  { id: 'apple', word: 'apple', translation: 'mela', emoji: '🍎', color: '#ff4444', category: 'fruit', audioText: { word: 'apple', slow: 'aaapple', sentence: 'It is an apple' } },
  { id: 'banana', word: 'banana', translation: 'banana', emoji: '🍌', color: '#ffdd44', category: 'fruit', audioText: { word: 'banana', slow: 'banaaana', sentence: 'It is a banana' } },
  { id: 'orange', word: 'orange', translation: 'arancia', emoji: '🍊', color: '#ff8800', category: 'fruit', audioText: { word: 'orange', slow: 'oorange', sentence: 'It is an orange' } },
  { id: 'grape', word: 'grape', translation: 'uva', emoji: '🍇', color: '#8844aa', category: 'fruit', audioText: { word: 'grape', slow: 'graaape', sentence: 'It is a grape' } },
  { id: 'strawberry', word: 'strawberry', translation: 'fragola', emoji: '🍓', color: '#ff4466', category: 'fruit', audioText: { word: 'strawberry', slow: 'straaawberry', sentence: 'It is a strawberry' } },
  { id: 'watermelon', word: 'watermelon', translation: 'anguria', emoji: '🍉', color: '#44cc44', category: 'fruit', audioText: { word: 'watermelon', slow: 'waaatermelon', sentence: 'It is a watermelon' } },
  { id: 'pear', word: 'pear', translation: 'pera', emoji: '🍐', color: '#aacc44', category: 'fruit', audioText: { word: 'pear', slow: 'peaar', sentence: 'It is a pear' } },
]

export const FRUITS_SENTENCES = [
  { id: 'fruits-s1', italian: 'La mela è rossa', english: 'The apple is red', words: ['The', 'apple', 'is', 'red'], gap: 'red', gapOptions: ['red', 'blue', 'green'] },
  { id: 'fruits-s2', italian: 'Mi piace la banana', english: 'I like the banana', words: ['I', 'like', 'the', 'banana'], gap: 'banana', gapOptions: ['banana', 'apple', 'grape'] },
  { id: 'fruits-s3', italian: 'L\'arancia è dolce', english: 'The orange is sweet', words: ['The', 'orange', 'is', 'sweet'], gap: 'sweet', gapOptions: ['sweet', 'sour', 'salty'] },
  { id: 'fruits-s4', italian: 'L\'uva è viola', english: 'The grape is purple', words: ['The', 'grape', 'is', 'purple'], gap: 'purple', gapOptions: ['purple', 'red', 'yellow'] },
  { id: 'fruits-s5', italian: 'L\'anguria è grande', english: 'The watermelon is big', words: ['The', 'watermelon', 'is', 'big'], gap: 'big', gapOptions: ['big', 'small', 'tall'] },
]

export const FRUITS_MISSIONS = [
  { id: 'fruits-1', type: 'tap', instruction: 'Tocca tutta la frutta!', instructionEN: 'Tap all the fruits!', targetWords: FRUITS_WORDS.map(w => w.id) },
  { id: 'fruits-2', type: 'drag', instruction: 'Metti la MELA nello zaino 🎒', instructionEN: 'Put the APPLE in the backpack', targetWords: ['apple'] },
  { id: 'fruits-3', type: 'match', instruction: 'Quale è dolce? 🍓', instructionEN: 'Which one is sweet?', targetWords: ['strawberry'] },
  { id: 'fruits-4', type: 'sentence', instruction: 'Costruisci la frase!', instructionEN: 'Build the sentence!', sentences: FRUITS_SENTENCES.slice(0, 2) },
  { id: 'fruits-5', type: 'speaking', instruction: 'Ascolta e ripeti!', instructionEN: 'Listen and repeat!', sentences: FRUITS_SENTENCES.slice(0, 2) },
  { id: 'fruits-6', type: 'fillgap', instruction: 'Completa la frase!', instructionEN: 'Complete the sentence!', sentences: FRUITS_SENTENCES.slice(0, 2) },
]

export const FRUITS_WORLD = {
  id: 'fruits',
  name: 'Fruit Party',
  emoji: '🍎',
  background: 'from-pink-300 via-red-200 to-yellow-200',
  words: FRUITS_WORDS,
  missions: FRUITS_MISSIONS,
  requiredWords: 3,
}
