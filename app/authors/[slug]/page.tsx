// app/authors/[slug]/page.tsx
import { getAuthor, getAuthors, getPostsByAuthor } from '@/lib/cosmic'
import { Author, Post } from '@/types'
import PostCard from '@/components/PostCard'
import Link from 'next/link'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const authors = await getAuthors() as Author[]
  
  return authors.map((author) => ({
    slug: author.slug,
  }))
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params
  const author = await getAuthor(slug) as Author | null
  
  if (!author) {
    return {
      title: 'Author Not Found',
    }
  }
  
  return {
    title: `${author.title} - Author`,
    description: author.metadata?.bio,
  }
}

export default async function AuthorPage({ params }: PageProps) {
  const { slug } = await params
  const author = await getAuthor(slug) as Author | null
  
  if (!author) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold mb-4">Author Not Found</h1>
        <Link href="/" className="text-primary hover:underline">
          Return to Homepage
        </Link>
      </div>
    )
  }
  
  const posts = await getPostsByAuthor(author.id) as Post[]
  const profilePicture = author.metadata?.profile_picture
  const bio = author.metadata?.bio
  const email = author.metadata?.email
  const twitterHandle = author.metadata?.twitter_handle
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Link href="/" className="text-primary hover:underline mb-8 inline-block">
        ← Back to Home
      </Link>
      
      <div className="bg-white rounded-lg p-8 mb-12 shadow-sm border border-gray-200">
        <div className="flex flex-col md:flex-row gap-8">
          {profilePicture && (
            <img
              src={`${profilePicture.imgix_url}?w=320&h=320&fit=crop&auto=format,compress`}
              alt={author.title}
              className="w-40 h-40 rounded-full object-cover"
            />
          )}
          
          <div className="flex-1">
            <h1 className="text-4xl font-bold mb-4">{author.title}</h1>
            {bio && <p className="text-lg text-gray-600 mb-4">{bio}</p>}
            
            <div className="flex flex-wrap gap-4">
              {email && (
                <a 
                  href={`mailto:${email}`}
                  className="text-primary hover:underline"
                >
                  {email}
                </a>
              )}
              {twitterHandle && (
                <a 
                  href={`https://twitter.com/${twitterHandle.replace('@', '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  {twitterHandle}
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
      
      <div>
        <h2 className="text-3xl font-bold mb-8">Articles by {author.title}</h2>
        {posts && posts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <p className="text-gray-600">No articles published yet.</p>
        )}
      </div>
    </div>
  )
}