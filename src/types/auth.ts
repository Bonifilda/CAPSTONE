// Explanation: TypeScript interfaces for authentication-related data structures.
// This ensures type safety across the application when working with user data.
export interface User {
  id: string
  email: string
  username: string
  full_name: string
  avatar_url?: string
  bio?: string
  created_at: string
}

export interface AuthState {
  user: User | null
  isLoading: boolean
}