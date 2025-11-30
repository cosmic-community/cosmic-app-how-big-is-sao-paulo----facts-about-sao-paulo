import Link from 'next/link'

export default function Header() {
  return (
    <header className="border-b border-gray-200 bg-white sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="text-2xl font-bold text-gray-900 hover:text-primary transition-colors">
            Modern Blog
          </Link>
          
          <nav className="flex items-center space-x-8">
            <Link href="/" className="text-gray-600 hover:text-gray-900 transition-colors">
              Home
            </Link>
            <Link href="/categories/travel" className="text-gray-600 hover:text-gray-900 transition-colors">
              Travel
            </Link>
            <Link href="/categories/technology" className="text-gray-600 hover:text-gray-900 transition-colors">
              Technology
            </Link>
            <Link href="/categories/lifestyle" className="text-gray-600 hover:text-gray-900 transition-colors">
              Lifestyle
            </Link>
          </nav>
        </div>
      </div>
    </header>
  )
}