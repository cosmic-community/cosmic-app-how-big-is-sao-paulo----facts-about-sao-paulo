import Link from 'next/link'
import { Post } from '@/types'
import CategoryBadge from './CategoryBadge'
import AuthorCard from './AuthorCard'

interface PostCardProps {
  post: Post
}

export default function PostCard({ post }: PostCardProps) {
  const featuredImage = post.metadata?.featured_image
  const author = post.metadata?.author
  const categories = post.metadata?.categories || []
  
  return (
    <article className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-200">
      {featuredImage && (
        <Link href={`/posts/${post.slug}`}>
          <img
            src={`${featuredImage.imgix_url}?w=800&h=400&fit=crop&auto=format,compress`}
            alt={post.title}
            className="w-full h-48 object-cover hover:opacity-90 transition-opacity"
          />
        </Link>
      )}
      
      <div className="p-6">
        {categories.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-3">
            {categories.map((category) => (
              <CategoryBadge key={category.id} category={category} />
            ))}
          </div>
        )}
        
        <Link href={`/posts/${post.slug}`}>
          <h2 className="text-2xl font-bold mb-3 hover:text-primary transition-colors">
            {post.title}
          </h2>
        </Link>
        
        {post.metadata?.content && (
          <p className="text-gray-600 mb-4 line-clamp-3">
            {post.metadata.content.substring(0, 150)}...
          </p>
        )}
        
        {author && <AuthorCard author={author} compact />}
      </div>
    </article>
  )
}