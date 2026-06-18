import { Shirt, Sparkles, Cpu, Gem, type LucideIcon } from 'lucide-react'

export interface CategoryMeta {
  gradient: string
  textColor: string
  icon: LucideIcon
  label?: string
}

export const categoryMeta: Record<string, CategoryMeta> = {
  "men's clothing": {
    gradient: 'from-violet-400 to-violet-600',
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
    label: 'Jewelry',
  },
}

export function getCategoryMeta(category: string): CategoryMeta {
  return (
    categoryMeta[category] ?? {
      gradient: 'from-violet-500 to-violet-700',
      textColor: 'text-white',
      icon: Shirt,
    }
  )
}
