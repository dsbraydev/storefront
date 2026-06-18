import { Shirt, Sparkles, Cpu, Gem, type LucideIcon } from 'lucide-react'

export interface CategoryMeta {
  gradient: string
  textColor: string
  icon: LucideIcon
}

export const categoryMeta: Record<string, CategoryMeta> = {
  "men's clothing": {
    gradient: 'from-blue-500 to-indigo-600',
    textColor: 'text-white',
    icon: Shirt,
  },
  "women's clothing": {
    gradient: 'from-pink-500 to-rose-600',
    textColor: 'text-white',
    icon: Sparkles,
  },
  electronics: {
    gradient: 'from-slate-600 to-gray-800',
    textColor: 'text-white',
    icon: Cpu,
  },
  jewelery: {
    gradient: 'from-amber-400 to-yellow-500',
    textColor: 'text-gray-900',
    icon: Gem,
  },
}

export function getCategoryMeta(category: string): CategoryMeta {
  return (
    categoryMeta[category] ?? {
      gradient: 'from-indigo-500 to-indigo-700',
      textColor: 'text-white',
      icon: Shirt,
    }
  )
}
