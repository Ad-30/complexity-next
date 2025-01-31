"use client"

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu } from 'lucide-react'

interface NavbarProps {
  onToggleSidebar?: () => void
}

const Navbar: React.FC<NavbarProps> = ({ onToggleSidebar }) => {
  const pathname = usePathname()
  const isHomePage = pathname === '/'

  return (
    <nav className="bg-primary text-background h-16 flex items-center justify-between px-6">
      <div className="flex items-center">
        {!isHomePage && (
          <button
            className="mr-4 md:hidden"
            onClick={onToggleSidebar}
            aria-label="Toggle sidebar"
          >
            <Menu size={24} />
          </button>
        )}
        <Link href="/" className="text-2xl font-bold">
          ComplexiPy
        </Link>
      </div>
      {isHomePage && (
        <Link href="/code-input" className="bg-accent text-background px-4 py-2 rounded-lg hover:bg-accent/80 transition-colors duration-200">
          Try Out
        </Link>
      )}
    </nav>
  )
}

export default Navbar

