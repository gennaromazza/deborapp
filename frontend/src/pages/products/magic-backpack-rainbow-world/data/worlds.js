import { RAINBOW_WORLD } from './words/rainbow'
import { PETS_WORLD } from './words/pets'
import { WILD_WORLD } from './words/wild'
import { FRUITS_WORLD } from './words/fruits'
import { TRANSPORT_WORLD } from './words/transport'

export const WORLDS = [
  RAINBOW_WORLD,
  PETS_WORLD,
  WILD_WORLD,
  FRUITS_WORLD,
  TRANSPORT_WORLD,
]

export const WORLD_MAP = {
  center: { emoji: '🎒', label: 'Backpack' },
  worlds: WORLDS.map(w => ({
    id: w.id,
    name: w.name,
    emoji: w.emoji,
    background: w.background,
    requiredWords: w.requiredWords,
  })),
}

export default WORLDS
