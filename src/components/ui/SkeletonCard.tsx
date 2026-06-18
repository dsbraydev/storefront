export default function SkeletonCard() {
  return (
    <div data-testid="skeleton-card" className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="aspect-square animate-shimmer" />
      <div className="p-4 flex flex-col gap-3">
        <div className="h-3 w-16 animate-shimmer rounded" />
        <div className="space-y-2">
          <div className="h-4 animate-shimmer rounded" />
          <div className="h-4 w-3/4 animate-shimmer rounded" />
        </div>
        <div className="flex items-center justify-between pt-2">
          <div className="h-6 w-16 animate-shimmer rounded" />
          <div className="h-4 w-20 animate-shimmer rounded" />
        </div>
        <div className="h-8 animate-shimmer rounded-md mt-1" />
      </div>
    </div>
  )
}
