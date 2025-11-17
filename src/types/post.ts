// Explanation: Type definitions for blog posts and editor content
// This ensures type safety when working with posts throughout the application

export interface Post {
  id: string
  title: string
  content: string
  excerpt?: string
  slug: string
  author_id: string
  published: boolean
  created_at: string
  updated_at: string
  published_at?: string
  tags?: string[]
  featured_image?: string
  read_time?: number
}

export interface CreatePostData {
  title: string
  content: string
  excerpt?: string
  published: boolean
  tags?: string[]
  featured_image?: string
}

export interface UpdatePostData {
  title?: string
  content?: string
  excerpt?: string
  published?: boolean
  tags?: string[]
  featured_image?: string
}

export interface PostFormData {
  title: string
  content: string
  excerpt: string
  published: boolean
  tags: string[]
  featured_image: string
}