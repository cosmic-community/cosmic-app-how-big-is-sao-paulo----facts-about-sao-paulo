import Link from 'next/link'
import { Category } from '@/types'

interface CategoryBadgeProps {
  category: Category
  large?: boolean
}

export default function CategoryBadge({ category, large = false }: CategoryBadgeProps) {
  const icon = category.metadata?.icon
  
  const baseClasses = "inline-flex items-center gap-2 rounded-full border border-gray-300 bg-white hover:bg-gray-50 transition-colors"
  const sizeClasses = large ? "px-6 py-3 text-lg" : "px-3 py-1 text-sm"
  
  return (
    <Link 
      href={`/categories/${category.slug}`}
      className={`${baseClasses} ${sizeClasses}`}
    >
      {icon && <span>{icon}</span>}
      <span className="font-medium">{category.title}</span>
    </Link>
  )
}