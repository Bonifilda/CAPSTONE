'use client'

// Explanation: Fixed authentication hook with proper type handling:
// - Separates Supabase auth user from application user
// - Fetches full user profile after authentication
// - Handles type conversion between different user types
import { useEffect, useState } from 'react'
import { AppUser, AuthUser } from '@/types/auth'
import { supabase } from '@/lib/supabase'
import { getUserProfile, createUserProfile } from '@/lib/user-utils'

export function useAuth() {
  const [user, setUser] = useState<AppUser | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Function to convert auth session to app user
  const getAppUserFromSession = async (session: any): Promise<AppUser | null> => {
    if (!session?.user) return null
    
    try {
      const userProfile = await getUserProfile(session.user.id)
      return userProfile
    } catch (error) {
      console.error('Error fetching user profile:', error)
      return null
    }
  }

  useEffect(() => {
    let mounted = true

    const initializeAuth = async () => {
      try {
        // Get initial session
        const { data: { session } } = await supabase.auth.getSession()
        
        if (mounted) {
          if (session) {
            const appUser = await getAppUserFromSession(session)
            setUser(appUser)
          } else {
            setUser(null)
          }
          setIsLoading(false)
        }
      } catch (error) {
        console.error('Auth initialization error:', error)
        if (mounted) {
          setUser(null)
          setIsLoading(false)
        }
      }
    }

    initializeAuth()

    // Listen for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (!mounted) return

        try {
          if (session) {
            const appUser = await getAppUserFromSession(session)
            setUser(appUser)
          } else {
            setUser(null)
          }
          setIsLoading(false)
        } catch (error) {
          console.error('Auth state change error:', error)
          setUser(null)
          setIsLoading(false)
        }
      }
    )

    return () => {
      mounted = false
      subscription.unsubscribe()
    }
  }, [])

  const signUp = async (email: string, password: string, userData: Partial<AppUser>) => {
    setIsLoading(true)
    
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      })

      if (error) throw error

      if (data.user) {
        // Create user profile with application-specific fields
        await createUserProfile(data.user.id, email, userData)
        
        // Fetch the complete user profile
        const appUser = await getUserProfile(data.user.id)
        setUser(appUser)
      }

      return data
    } catch (error) {
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const signIn = async (email: string, password: string) => {
    setIsLoading(true)
    
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) throw error

      if (data.user) {
        // Fetch the complete user profile
        const appUser = await getUserProfile(data.user.id)
        setUser(appUser)
      }

      return data
    } catch (error) {
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const signOut = async () => {
    setIsLoading(true)
    
    try {
      const { error } = await supabase.auth.signOut()
      if (error) throw error
      setUser(null)
    } catch (error) {
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  return {
    user,
    isLoading,
    signUp,
    signIn,
    signOut,
  }
}