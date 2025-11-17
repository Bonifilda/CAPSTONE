'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export function Header() {
  const pathname = usePathname()

  return (
    <header className="border-b border-gray-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="text-xl font-bold text-gray-900">
              MediumPlatform
            </Link>
            <nav className="ml-8 flex space-x-4">
              <Link
                href="/"
                className={`px-3 py-2 text-sm font-medium ${
                  pathname === '/' 
                    ? 'text-gray-900' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Home
              </Link>
              <Link
                href="/create"
                className={`px-3 py-2 text-sm font-medium ${
                  pathname === '/create' 
                    ? 'text-gray-900' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Write
              </Link>
            </nav>
          </div>
          <div className="flex items-center space-x-4">
            <Link
              href="/login"
              className="text-sm font-medium text-gray-500 hover:text-gray-700"
            >
              Sign In
            </Link>
            <Link
              href="/signup"
              className="rounded-full bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700"
            >
              Get Started
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}