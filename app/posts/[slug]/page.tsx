// app/posts/[slug]/page.tsx
import { getPost, getPosts } from '@/lib/cosmic'
import { Post } from '@/types'
import ReactMarkdown from 'react-markdown'
import AuthorCard from '@/components/AuthorCard'
import CategoryBadge from '@/components/CategoryBadge'
import Link from 'next/link'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const posts = await getPosts() as Post[]
  
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params
  const post = await getPost(slug) as Post | null
  
  if (!post) {
    return {
      title: 'Post Not Found',
    }
  }
  
  return {
    title: post.title,
    description: post.metadata?.content?.substring(0, 160),
  }
}

export default async function PostPage({ params }: PageProps) {
  const { slug } = await params
  const post = await getPost(slug) as Post | null
  
  if (!post) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold mb-4">Post Not Found</h1>
        <Link href="/" className="text-primary hover:underline">
          Return to Homepage
        </Link>
      </div>
    )
  }
  
  const featuredImage = post.metadata?.featured_image
  const author = post.metadata?.author
  const categories = post.metadata?.categories || []
  const publishedDate = post.metadata?.published_date
  
  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Link href="/" className="text-primary hover:underline mb-8 inline-block">
        ← Back to Home
      </Link>
      
      {categories.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-6">
          {categories.map((category) => (
            <CategoryBadge key={category.id} category={category} />
          ))}
        </div>
      )}
      
      <h1 className="text-5xl font-bold mb-6">{post.title}</h1>
      
      <div className="flex items-center gap-4 mb-8">
        {publishedDate && (
          <time className="text-gray-600">
            {new Date(publishedDate).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </time>
        )}
      </div>
      
      {featuredImage && (
        <img
          src={`${featuredImage.imgix_url}?w=1600&h=800&fit=crop&auto=format,compress`}
          alt={post.title}
          className="w-full h-96 object-cover rounded-lg mb-12"
        />
      )}
      
      <div className="prose prose-lg max-w-none mb-12">
        {post.metadata?.content && (
          <ReactMarkdown>{post.metadata.content}</ReactMarkdown>
        )}
      </div>
      
      {author && (
        <div className="mt-12">
          <h3 className="text-2xl font-bold mb-6">About the Author</h3>
          <AuthorCard author={author} />
        </div>
      )}
    </article>
  )
}