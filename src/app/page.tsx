// Explanation: Fixed the home page with proper React component export
// This resolves the "default export is not a React Component" error
import { Header } from '@/components/layout/header'

// Make sure this is a proper React component
export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="py-12">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900">
            Welcome to MediumPlatform
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            Start writing and sharing your stories with the world.
          </p>
        </div>
      </main>
    </div>
  )
}

