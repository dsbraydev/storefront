export default function DetailSkeleton() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="h-5 w-32 rounded bg-gray-200 animate-pulse mb-8" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 animate-pulse">
        <div className="aspect-square rounded-xl bg-gray-200" />
        <div className="flex flex-col gap-4 pt-2">
          <div className="h-4 w-24 rounded bg-gray-200" />
          <div className="h-8 w-3/4 rounded bg-gray-200" />
          <div className="h-4 w-32 rounded bg-gray-200" />
          <div className="h-8 w-20 rounded bg-gray-200" />
          <div className="space-y-2 mt-2">
            <div className="h-3 rounded bg-gray-200" />
            <div className="h-3 rounded bg-gray-200" />
            <div className="h-3 w-2/3 rounded bg-gray-200" />
          </div>
          <div className="h-12 rounded-md bg-gray-200 mt-4" />
        </div>
      </div>
    </div>
  )
}
