// app/categories/[slug]/page.tsx
import { getCategory, getCategories, getPostsByCategory } from '@/lib/cosmic'
import { Category, Post } from '@/types'
import PostCard from '@/components/PostCard'
import Link from 'next/link'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const categories = await getCategories() as Category[]
  
  return categories.map((category) => ({
    slug: category.slug,
  }))
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params
  const category = await getCategory(slug) as Category | null
  
  if (!category) {
    return {
      title: 'Category Not Found',
    }
  }
  
  return {
    title: `${category.title} - Category`,
    description: category.metadata?.description,
  }
}

export default async function CategoryPage({ params }: PageProps) {
  const { slug } = await params
  const category = await getCategory(slug) as Category | null
  
  if (!category) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold mb-4">Category Not Found</h1>
        <Link href="/" className="text-primary hover:underline">
          Return to Homepage
        </Link>
      </div>
    )
  }
  
  const posts = await getPostsByCategory(category.id) as Post[]
  const icon = category.metadata?.icon
  const description = category.metadata?.description
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Link href="/" className="text-primary hover:underline mb-8 inline-block">
        ← Back to Home
      </Link>
      
      <div className="text-center mb-12">
        {icon && <div className="text-6xl mb-4">{icon}</div>}
        <h1 className="text-5xl font-bold mb-4">{category.title}</h1>
        {description && (
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">{description}</p>
        )}
      </div>
      
      <div>
        <h2 className="text-2xl font-bold mb-8">{category.title} Articles</h2>
        {posts && posts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <p className="text-gray-600">No articles in this category yet.</p>
        )}
      </div>
    </div>
  )
}