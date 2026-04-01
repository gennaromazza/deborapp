export const DIALOG_TEMPLATES = {
  welcome: {
    male: [
      "Ciao {child}! Oggi impariamo l'inglese! 🎒",
      "Benvenuto {child}! Sei pronto per l'avventura? ✨",
      "{child}, il tuo zaino magico ti aspetta! 🌈",
      "Eccoti {child}! Iniziamo a giocare! 🎮",
    ],
    female: [
      "Ciao {child}! Oggi impariamo l'inglese! 🎒",
      "Benvenuta {child}! Sei pronta per l'avventura? ✨",
      "{child}, il tuo zaino magico ti aspetta! 🌈",
      "Eccoti {child}! Iniziamo a giocare! 🎮",
    ],
  },

  mission_start: [
    "{child}, trova {target}! 🎯",
    "Aiuta {child} a trovare {target}! 🔍",
    "{child}, tocca {target}! 👆",
    "Dov'è {target}, {child}? 🤔",
  ],

  success: {
    male: [
      "Bravo {child}! 🎉",
      "{child} è fantastico! ⭐",
      "Evviva {child}! Hai fatto benissimo! 🌟",
      "Che bravo {child}! 🏆",
    ],
    female: [
      "Brava {child}! 🎉",
      "{child} è fantastica! ⭐",
      "Evviva {child}! Hai fatto benissimo! 🌟",
      "Che brava {child}! 🏆",
    ],
  },

  success_with_parent: {
    male: [
      "Bravo {child}! {parent} sarebbe fiero di te! 💕",
      "{child}, {parent} ti direbbe: sei un campione! 🌟",
      "Wow {child}! {parent} sarebbe contentissimo! 🎉",
    ],
    female: [
      "Brava {child}! {parent} sarebbe fiera di te! 💕",
      "{child}, {parent} ti direbbe: sei una campionessa! 🌟",
      "Wow {child}! {parent} sarebbe contentissima! 🎉",
    ],
  },

  success_with_friend: {
    male: [
      "{child} e {friend} sarebbero contenti! 🎊",
      "Bravo {child}! {friend} ti farebbe i complimenti! ⭐",
      "{child}, hai fatto un grande lavoro! {friend} ne sarebbe fiero! 🏆",
    ],
    female: [
      "{child} e {friend} sarebbero contente! 🎊",
      "Brava {child}! {friend} ti farebbe i complimenti! ⭐",
      "{child}, hai fatto un grande lavoro! {friend} ne sarebbe fiera! 🏆",
    ],
  },

  error: [
    "Ops {child}! Riprova! 💪",
    "Quasi {child}! Ancora un tentativo! 🌟",
    "{child}, tu ce la fai! Riprova! 💫",
    "Non preoccuparti {child}, prova ancora! 🎯",
  ],

  world_complete: {
    male: [
      "{child} ha completato {world}! 🏆",
      "Evviva {child}! {world} è tuo! 🌟",
      "Bravissimo {child}! {parent} sarebbe fiero! 🎉",
      "{child} e {friend} hanno vinto! {world} completato! 🎊",
    ],
    female: [
      "{child} ha completato {world}! 🏆",
      "Evviva {child}! {world} è tuo! 🌟",
      "Bravissima {child}! {parent} sarebbe fiera! 🎉",
      "{child} e {friend} hanno vinto! {world} completato! 🎊",
    ],
  },

  backpack_open: [
    "{child}, guarda cosa hai raccolto! 🎒",
    "Lo zaino di {child} ha {count} parole! ⭐",
    "Wow {child}! Il tuo zaino si sta riempiendo! 🌈",
  ],

  streak: {
    male: [
      "{child}, {days} giorni di fila! 🔥",
      "Sei un campione {child}! {days} giorni! ⭐",
      "{child} non si ferma mai! {days} giorni! 🏆",
    ],
    female: [
      "{child}, {days} giorni di fila! 🔥",
      "Sei una campionessa {child}! {days} giorni! ⭐",
      "{child} non si ferma mai! {days} giorni! 🏆",
    ],
  },

  real_world: [
    "{child}, trova qualcosa di {target} nella stanza! 🔍",
    "Sfida speciale {child}: tocca qualcosa di {target}! 🎯",
    "{child}, cerca {target} intorno a te! 🌟",
  ],

  story_start: [
    "{child}, ascolta la storia di {world}! 📖",
    "C'era una volta... {child} nel mondo di {world}! ✨",
  ],
}

export function getDialog(type, userProfile, extras = {}) {
  const templates = DIALOG_TEMPLATES[type]
  if (!templates) return ''

  const { childName, familyMembers, childGender } = userProfile
  const gender = childGender || 'male'

  let templateList
  if (typeof templates === 'object' && !Array.isArray(templates)) {
    templateList = templates[gender] || templates.male || templates
  } else {
    templateList = templates
  }

  if (!Array.isArray(templateList) || templateList.length === 0) return ''

  const template = templateList[Math.floor(Math.random() * templateList.length)]

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

export function useDialogs(userProfile) {
  return {
    get: (type, extras) => getDialog(type, userProfile, extras),
  }
}