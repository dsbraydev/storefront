import { Link } from 'react-router-dom'
import { Globe, Mail, ExternalLink } from 'lucide-react'

const shopLinks = [
  { label: 'All Products', to: '/products' },
  { label: "Men's Clothing", to: "/products?category=men's clothing" },
  { label: "Women's Clothing", to: "/products?category=women's clothing" },
  { label: 'Electronics', to: '/products?category=electronics' },
  { label: 'Jewellery', to: '/products?category=jewelery' },
]

const supportLinks = ['FAQ', 'Shipping', 'Returns', 'Contact']
const legalLinks = ['Privacy Policy', 'Terms of Service']

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="text-white text-xl font-bold tracking-tight">
              Storefront
            </Link>
            <p className="mt-3 text-sm leading-relaxed">
              Quality products, great prices. Shop with confidence.
            </p>
            <div className="mt-4 flex gap-3">
              <span aria-label="Website" className="text-gray-600">
                <Globe className="h-5 w-5" />
              </span>
              <span aria-label="Email" className="text-gray-600">
                <Mail className="h-5 w-5" />
              </span>
              <span aria-label="More links" className="text-gray-600">
                <ExternalLink className="h-5 w-5" />
              </span>
            </div>
          </div>

          {/* Shop */}
          <div>
            <h3 className="text-white text-sm font-semibold uppercase tracking-wider mb-4">Shop</h3>
            <ul className="space-y-2 text-sm">
              {shopLinks.map((link) => (
                <li key={link.label}>
                  <Link to={link.to} className="hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-white text-sm font-semibold uppercase tracking-wider mb-4">Support</h3>
            <ul className="space-y-2 text-sm">
              {supportLinks.map((label) => (
                <li key={label}>
                  <span className="text-gray-500">{label}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-white text-sm font-semibold uppercase tracking-wider mb-4">Legal</h3>
            <ul className="space-y-2 text-sm">
              {legalLinks.map((label) => (
                <li key={label}>
                  <span className="text-gray-500">{label}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-gray-800 pt-6 text-sm text-center">
          © {new Date().getFullYear()} Storefront. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
