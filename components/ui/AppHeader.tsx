'use client'

import Link from 'next/link'
import { useUser } from '@clerk/nextjs'

interface AppHeaderProps {
  children?: React.ReactNode
}

export default function AppHeader({ children }: AppHeaderProps) {
  const { isSignedIn } = useUser()

  // Smart navigation: go to dashboard if logged in, home if not
  const logoHref = isSignedIn ? '/dashboard' : '/'

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <Link href={logoHref} className="flex items-center">
          <div className="text-2xl font-bold text-gray-900 hover:text-blue-600 transition-colors">
            LevrX
          </div>
        </Link>
        {children && (
          <nav className="flex items-center space-x-6">
            {children}
          </nav>
        )}
      </div>
    </header>
  )
}