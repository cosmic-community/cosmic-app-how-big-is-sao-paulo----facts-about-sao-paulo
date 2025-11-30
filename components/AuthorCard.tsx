import Link from 'next/link'
import { Author } from '@/types'

interface AuthorCardProps {
  author: Author
  compact?: boolean
}

export default function AuthorCard({ author, compact = false }: AuthorCardProps) {
  const profilePicture = author.metadata?.profile_picture
  const bio = author.metadata?.bio
  
  if (compact) {
    return (
      <Link href={`/authors/${author.slug}`} className="flex items-center gap-3 hover:opacity-80 transition-opacity">
        {profilePicture && (
          <img
            src={`${profilePicture.imgix_url}?w=80&h=80&fit=crop&auto=format,compress`}
            alt={author.title}
            className="w-10 h-10 rounded-full object-cover"
          />
        )}
        <div>
          <p className="font-medium text-gray-900">{author.title}</p>
          <p className="text-sm text-gray-600">Author</p>
        </div>
      </Link>
    )
  }
  
  return (
    <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
      <Link href={`/authors/${author.slug}`} className="block hover:opacity-80 transition-opacity">
        <div className="flex items-start gap-4">
          {profilePicture && (
            <img
              src={`${profilePicture.imgix_url}?w=160&h=160&fit=crop&auto=format,compress`}
              alt={author.title}
              className="w-20 h-20 rounded-full object-cover"
            />
          )}
          <div>
            <h3 className="text-xl font-bold mb-2">{author.title}</h3>
            {bio && (
              <p className="text-gray-600">{bio}</p>
            )}
          </div>
        </div>
      </Link>
    </div>
  )
}