// Explanation: Simplified user types that work with Supabase's built-in types
// We extend the basic User type from Supabase with our custom fields

export interface User {
  id: string
  email?: string
  user_metadata?: {
    username?: string
    full_name?: string
    avatar_url?: string
  }
  // Our custom fields that will be stored in profiles table
  username?: string
  full_name?: string
  avatar_url?: string
  bio?: string
  created_at?: string
}

export interface AuthState {
  user: User | null
  isLoading: boolean
}