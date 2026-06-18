import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { useCategories } from '../../hooks/useProducts'
import { getCategoryMeta } from '../../utils/categoryMeta'

function CategorySkeleton() {
  return (
    <div className="h-40 rounded-2xl bg-gray-200 animate-pulse" />
  )
}

export default function CategoryCards() {
  const { data: categories, isLoading } = useCategories()

  return (
    <section id="categories" className="scroll-mt-24">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Shop by Category</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {isLoading
          ? Array.from({ length: 4 }).map((_, i) => <CategorySkeleton key={i} />)
          : categories?.map((category, i) => {
              const meta = getCategoryMeta(category)
              const Icon = meta.icon
              return (
                <Link
                  key={category}
                  to={`/products?category=${encodeURIComponent(category)}`}
                  className={`animate-fade-in group relative overflow-hidden rounded-2xl bg-gradient-to-br ${meta.gradient} p-6 flex flex-col justify-between min-h-40 hover:scale-[1.03] transition-transform duration-200 shadow-sm`}
                  style={{ animationDelay: `${i * 60}ms` }}
                >
                  <Icon className={`h-8 w-8 ${meta.textColor} opacity-90`} />
                  <div>
                    <p className={`text-base font-bold capitalize ${meta.textColor}`}>
                      {category}
                    </p>
                    <p className={`mt-1 text-xs font-medium flex items-center gap-1 ${meta.textColor} opacity-80`}>
                      Shop now <ArrowRight className="h-3 w-3" />
                    </p>
                  </div>
                </Link>
              )
            })}
      </div>
    </section>
  )
}
