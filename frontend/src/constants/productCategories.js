export const DEFAULT_PRODUCT_CATEGORY = 'attivita-stampabili'

export const PRODUCT_CATEGORIES = [
  {
    key: 'mini-app-interattive',
    label: 'Mini App Interattive',
    shortLabel: 'Mini App',
    iconKey: 'monitor',
    badgeClass: 'bg-pastel-lavender text-pastel-lavender-dark',
  },
  {
    key: 'attivita-stampabili',
    label: 'Attività Stampabili',
    shortLabel: 'Da Stampare',
    iconKey: 'printer',
    badgeClass: 'bg-pastel-mint text-pastel-mint-dark',
  },
  {
    key: 'percorsi-educativi',
    label: 'Percorsi Educativi',
    shortLabel: 'Educativo',
    iconKey: 'book',
    badgeClass: 'bg-pastel-sky text-pastel-sky-dark',
  },
  {
    key: 'storie-avventure',
    label: 'Storie & Avventure',
    shortLabel: 'Storie',
    iconKey: 'book',
    badgeClass: 'bg-pastel-pink text-pastel-pink-dark',
  },
  {
    key: 'kit-famiglia',
    label: 'Kit Famiglia',
    shortLabel: 'In Famiglia',
    iconKey: 'users',
    badgeClass: 'bg-pastel-peach text-pastel-peach-dark',
  },
]

export const PRODUCT_CATEGORY_FILTERS = [
  { key: 'all', label: 'Tutte' },
  ...PRODUCT_CATEGORIES.map((category) => ({
    key: category.key,
    label: category.label,
  })),
]

const categoryMap = PRODUCT_CATEGORIES.reduce((acc, category) => {
  acc[category.key] = category
  return acc
}, {})

function titleCaseWord(word) {
  if (!word) return word
  return word.charAt(0).toUpperCase() + word.slice(1)
}

export function formatCategoryLabel(categoryKey) {
  return (categoryKey || '')
    .split('-')
    .filter(Boolean)
    .map(titleCaseWord)
    .join(' ')
}

export function getProductCategory(categoryKey) {
  const normalizedKey = categoryKey || DEFAULT_PRODUCT_CATEGORY
  const knownCategory = categoryMap[normalizedKey]

  if (knownCategory) {
    return knownCategory
  }

  const fallbackLabel = formatCategoryLabel(normalizedKey) || 'Attività'
  return {
    key: normalizedKey,
    label: fallbackLabel,
    shortLabel: fallbackLabel,
    iconKey: 'book',
    badgeClass: 'bg-pastel-lavender text-pastel-lavender-dark',
  }
}
