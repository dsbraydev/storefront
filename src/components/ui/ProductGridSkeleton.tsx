import SkeletonCard from './SkeletonCard'

interface ProductGridSkeletonProps {
  count?: number
  cols?: 'standard' | 'featured'
}

export default function ProductGridSkeleton({ count = 8, cols = 'standard' }: ProductGridSkeletonProps) {
  const gridClass = cols === 'featured'
    ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'
    : 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
  return (
    <div className={gridClass}>
      {Array.from({ length: count }).map((_, i) => <SkeletonCard key={i} />)}
    </div>
  )
}
