import { Star } from 'lucide-react'

interface RatingStarsProps {
  rate: number
  count: number
}

export default function RatingStars({ rate, count }: RatingStarsProps) {
  const filled = Math.round(rate)
  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center gap-0.5">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={`h-4 w-4 ${i < filled ? 'text-amber-400 fill-amber-400' : 'text-gray-300'}`}
          />
        ))}
      </div>
      <span className="text-sm text-gray-500">{rate} ({count} reviews)</span>
    </div>
  )
}
