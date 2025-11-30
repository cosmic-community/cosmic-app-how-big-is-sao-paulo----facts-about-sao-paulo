export default function Footer() {
  const currentYear = new Date().getFullYear()
  
  return (
    <footer className="bg-gray-50 border-t border-gray-200 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Modern Blog</h3>
            <p className="text-gray-600">
              Discover insights on travel, technology, and lifestyle from our community of writers.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Categories</h3>
            <ul className="space-y-2">
              <li>
                <a href="/categories/travel" className="text-gray-600 hover:text-gray-900 transition-colors">
                  Travel
                </a>
              </li>
              <li>
                <a href="/categories/technology" className="text-gray-600 hover:text-gray-900 transition-colors">
                  Technology
                </a>
              </li>
              <li>
                <a href="/categories/lifestyle" className="text-gray-600 hover:text-gray-900 transition-colors">
                  Lifestyle
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Connect</h3>
            <p className="text-gray-600">
              Built with <a href="https://www.cosmicjs.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Cosmic</a>
            </p>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-gray-200 text-center text-gray-600">
          <p>&copy; {currentYear} Modern Blog. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}