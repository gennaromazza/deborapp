export const TRANSPORT_WORDS = [
  { id: 'car', word: 'car', translation: 'auto', emoji: '🚗', color: '#ff4444', category: 'vehicle', audioText: { word: 'car', slow: 'caar', sentence: 'It is a car' } },
  { id: 'bus', word: 'bus', translation: 'autobus', emoji: '🚌', color: '#ffcc00', category: 'vehicle', audioText: { word: 'bus', slow: 'buus', sentence: 'It is a bus' } },
  { id: 'plane', word: 'plane', translation: 'aereo', emoji: '✈️', color: '#4488cc', category: 'vehicle', audioText: { word: 'plane', slow: 'plaaane', sentence: 'It is a plane' } },
  { id: 'boat', word: 'boat', translation: 'barca', emoji: '⛵', color: '#44aacc', category: 'vehicle', audioText: { word: 'boat', slow: 'boaat', sentence: 'It is a boat' } },
  { id: 'train', word: 'train', translation: 'treno', emoji: '🚂', color: '#666666', category: 'vehicle', audioText: { word: 'train', slow: 'traaain', sentence: 'It is a train' } },
  { id: 'bicycle', word: 'bicycle', translation: 'bicicletta', emoji: '🚲', color: '#44cc44', category: 'vehicle', audioText: { word: 'bicycle', slow: 'biicycle', sentence: 'It is a bicycle' } },
  { id: 'helicopter', word: 'helicopter', translation: 'elicottero', emoji: '🚁', color: '#888888', category: 'vehicle', audioText: { word: 'helicopter', slow: 'helicoopter', sentence: 'It is a helicopter' } },
]

export const TRANSPORT_SENTENCES = [
  { id: 'transport-s1', italian: 'L\'aereo vola', english: 'The plane flies', words: ['The', 'plane', 'flies'], gap: 'flies', gapOptions: ['flies', 'swims', 'runs'] },
  { id: 'transport-s2', italian: 'La barca naviga', english: 'The boat sails', words: ['The', 'boat', 'sails'], gap: 'sails', gapOptions: ['sails', 'flies', 'drives'] },
  { id: 'transport-s3', italian: 'Il treno è veloce', english: 'The train is fast', words: ['The', 'train', 'is', 'fast'], gap: 'fast', gapOptions: ['fast', 'slow', 'small'] },
  { id: 'transport-s4', italian: 'L\'auto è rossa', english: 'The car is red', words: ['The', 'car', 'is', 'red'], gap: 'red', gapOptions: ['red', 'blue', 'green'] },
  { id: 'transport-s5', italian: 'La bicicletta va sulla strada', english: 'The bicycle goes on the road', words: ['The', 'bicycle', 'goes', 'on', 'the', 'road'], gap: 'road', gapOptions: ['road', 'sky', 'water'] },
]

export const TRANSPORT_MISSIONS = [
  { id: 'transport-1', type: 'tap', instruction: 'Tocca tutti i veicoli!', instructionEN: 'Tap all the vehicles!', targetWords: TRANSPORT_WORDS.map(w => w.id) },
  { id: 'transport-2', type: 'drag', instruction: 'Metti l\'AEREO nello zaino 🎒', instructionEN: 'Put the PLANE in the backpack', targetWords: ['plane'] },
  { id: 'transport-3', type: 'match', instruction: 'Quale vola? ✈️', instructionEN: 'Which one flies?', targetWords: ['plane'] },
  { id: 'transport-4', type: 'sentence', instruction: 'Costruisci la frase!', instructionEN: 'Build the sentence!', sentences: TRANSPORT_SENTENCES.slice(0, 2) },
  { id: 'transport-5', type: 'speaking', instruction: 'Ascolta e ripeti!', instructionEN: 'Listen and repeat!', sentences: TRANSPORT_SENTENCES.slice(0, 2) },
  { id: 'transport-6', type: 'fillgap', instruction: 'Completa la frase!', instructionEN: 'Complete the sentence!', sentences: TRANSPORT_SENTENCES.slice(0, 2) },
]

export const TRANSPORT_WORLD = {
  id: 'transport',
  name: 'On the Move',
  emoji: '🚗',
  background: 'from-blue-400 via-sky-300 to-green-200',
  words: TRANSPORT_WORDS,
  missions: TRANSPORT_MISSIONS,
  requiredWords: 3,
}
