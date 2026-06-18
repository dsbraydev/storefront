import HeroBanner from '../components/home/HeroBanner'
import CategoryCards from '../components/home/CategoryCards'
import FeaturedProducts from '../components/home/FeaturedProducts'

export default function HomePage() {
  return (
    <div className="flex flex-col gap-16">
      <HeroBanner />
      <CategoryCards />
      <FeaturedProducts />
    </div>
  )
}
