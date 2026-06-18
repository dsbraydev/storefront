import { Link } from 'react-router-dom'
import { ArrowRight, Tag } from 'lucide-react'

export default function HeroBanner() {
  return (
    <section className="relative overflow-hidden animate-gradient-shift rounded-2xl">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="relative px-8 py-16 md:py-24 lg:py-28 max-w-3xl">
        <div className="inline-flex items-center gap-2 bg-white/20 text-white text-xs font-semibold px-3 py-1.5 rounded-full mb-6 animate-fade-in">
          <Tag className="h-3.5 w-3.5" />
          New arrivals just dropped
        </div>

        <h1 className="animate-fade-in text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight tracking-tight"
          style={{ animationDelay: '80ms' }}>
          Shop the Latest<br />
          <span className="text-indigo-200">Collection</span>
        </h1>

        <p className="animate-fade-in mt-4 text-lg text-indigo-100 max-w-lg leading-relaxed"
          style={{ animationDelay: '160ms' }}>
          Discover quality products across clothing, electronics, and jewellery — all at prices you'll love.
        </p>

        <div className="animate-fade-in mt-8 flex flex-wrap gap-3"
          style={{ animationDelay: '240ms' }}>
          <Link
            to="/products"
            className="inline-flex items-center gap-2 bg-white text-indigo-700 font-semibold px-6 py-3 rounded-lg hover:bg-indigo-50 transition-colors shadow-md"
          >
            Shop Now
            <ArrowRight className="h-4 w-4" />
          </Link>
          <a
            href="#categories"
            className="inline-flex items-center gap-2 bg-white/10 text-white font-semibold px-6 py-3 rounded-lg hover:bg-white/20 transition-colors border border-white/20"
          >
            Browse Categories
          </a>
        </div>
      </div>
    </section>
  )
}
