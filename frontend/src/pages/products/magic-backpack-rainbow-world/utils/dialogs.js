// Sistema dialoghi personalizzati con nomi del bambino e familiari

export const DIALOG_TEMPLATES = {
  // Benvenuto
  welcome: [
    "Ciao {child}! Oggi impariamo l'inglese! 🎒",
    "Benvenuto {child}! Sei pronto per l'avventura? ✨",
    "{child}, il tuo zaino magico ti aspetta! 🌈",
    "Eccoti {child}! Iniziamo a giocare! 🎮",
  ],

  // Inizio missione
  mission_start: [
    "{child}, trova {target}! 🎯",
    "Aiuta {child} a trovare {target}! 🔍",
    "{child}, tocca {target}! 👆",
    "Dov'è {target}, {child}? 🤔",
  ],

  // Successo
  success: [
    "Bravo {child}! 🎉",
    "{child} è fantastico! ⭐",
    "Evviva {child}! Hai fatto benissimo! 🌟",
    "Che bravo {child}! 🏆",
  ],

  // Successo con genitore
  success_with_parent: [
    "Bravo {child}! {parent} sarebbe fiero/a di te! 💕",
    "{child}, {parent} ti direbbe: sei un campione! 🌟",
    "Wow {child}! {parent} sarebbe contentissimo/a! 🎉",
  ],

  // Successo con amico
  success_with_friend: [
    "{child} e {friend} sarebbero contenti! 🎊",
    "Bravo {child}! {friend} ti farebbe i complimenti! ⭐",
    "{child}, hai fatto un grande lavoro! {friend} ne sarebbe fiero/a! 🏆",
  ],

  // Errore gentile
  error: [
    "Ops {child}! Riprova! 💪",
    "Quasi {child}! Ancora un tentativo! 🌟",
    "{child}, tu ce la fai! Riprova! 💫",
    "Non preoccuparti {child}, prova ancora! 🎯",
  ],

  // Mondo completato
  world_complete: [
    "{child} ha completato {world}! 🏆",
    "Evviva {child}! {world} è tuo! 🌟",
    "Bravissimo {child}! {parent} sarebbe fiero/a! 🎉",
    "{child} e {friend} hanno vinto! {world} completato! 🎊",
  ],

  // Zaino
  backpack_open: [
    "{child}, guarda cosa hai raccolto! 🎒",
    "Lo zaino di {child} ha {count} parole! ⭐",
    "Wow {child}! Il tuo zaino si sta riempiendo! 🌈",
  ],

  // Streak
  streak: [
    "{child}, {days} giorni di fila! 🔥",
    "Sei un campione {child}! {days} giorni! ⭐",
    "{child} non si ferma mai! {days} giorni! 🏆",
  ],

  // Real world challenge
  real_world: [
    "{child}, trova qualcosa di {target} nella stanza! 🔍",
    "Sfida speciale {child}: tocca qualcosa di {target}! 🎯",
    "{child}, cerca {target} intorno a te! 🌟",
  ],

  // Story mode
  story_start: [
    "{child}, ascolta la storia di {world}! 📖",
    "C'era una volta... {child} nel mondo di {world}! ✨",
  ],
}

// Funzione per ottenere un dialogo randomizzato
export function getDialog(type, userProfile, extras = {}) {
  const templates = DIALOG_TEMPLATES[type]
  if (!templates) return ''

  const template = templates[Math.floor(Math.random() * templates.length)]
  const { childName, familyMembers } = userProfile

  const parent = familyMembers?.find(m => ['Mamma', 'Papà', 'Nonna', 'Nonno'].includes(m.role))
  const friend = familyMembers?.find(m => ['Amico/a', 'Fratello', 'Sorella'].includes(m.role))

  let dialog = template
    .replace('{child}', childName || 'amico')
    .replace('{parent}', parent?.name || 'la mamma')
    .replace('{friend}', friend?.name || 'il tuo amico')
    .replace('{target}', extras.target || '')
    .replace('{world}', extras.world || '')
    .replace('{count}', extras.count || '0')
    .replace('{days}', extras.days || '1')

  return dialog
}

// Hook per dialoghi
export function useDialogs(userProfile) {
  return {
    get: (type, extras) => getDialog(type, userProfile, extras),
  }
}
