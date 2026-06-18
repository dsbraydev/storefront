export default function SkeletonCard() {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden animate-pulse">
      <div className="aspect-square bg-gray-200" />
      <div className="p-4 flex flex-col gap-3">
        <div className="h-3 w-16 bg-gray-200 rounded" />
        <div className="space-y-2">
          <div className="h-4 bg-gray-200 rounded" />
          <div className="h-4 w-3/4 bg-gray-200 rounded" />
        </div>
        <div className="flex items-center justify-between pt-2">
          <div className="h-6 w-16 bg-gray-200 rounded" />
          <div className="h-8 w-24 bg-gray-200 rounded-md" />
        </div>
      </div>
    </div>
  )
}
