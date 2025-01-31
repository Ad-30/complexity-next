"use client"

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Code, Brain, Share2, Database, VideoIcon as Vector, Bug } from 'lucide-react'
import { useAnimationStore } from '@/store/animationStore'

const navItems = [
  { name: 'Code Input', icon: Code, href: '/code-input' },
  { name: 'Cognitive Complexity', icon: Brain, href: '/cognitive-complexity' },
  { name: 'CFG', icon: Share2, href: '/cfg' },
  { name: 'Node Features', icon: Database, href: '/node-features' },
  { name: 'Fixed-Size Vector', icon: Vector, href: '/fixed-size-vector' },
  { name: 'Defect Detection', icon: Bug, href: '/defect-detection' },
]

const Sidebar: React.FC = () => {
  const pathname = usePathname()
  const { isAnalyzing, analysisCompleted, toggleButtonClicked } = useAnimationStore()

  const handleCognitiveComplexityClick = () => {
    // Toggle the 'buttonClicked' state when 'Cognitive Complexity' link is clicked
    toggleButtonClicked()
  }

  if (pathname === '/') return null

  return (
    <nav className="w-64 bg-secondary h-full">
      <ul className="py-6">
        {navItems.map((item) => (
          <li key={item.name} className="mb-4">
            <Link
              href={item.href}
              onClick={item.name === 'Cognitive Complexity' ? handleCognitiveComplexityClick : undefined} // Add the click handler for Cognitive Complexity
              className={`flex items-center px-6 py-3 text-sm transition-all duration-200 ease-in-out ${pathname === item.href
                  ? 'text-primary bg-background border-l-4 border-primary'
                  : 'text-foreground hover:text-primary hover:bg-background/10'
                } ${item.name === 'Cognitive Complexity' && isAnalyzing ? 'animate-pulse' : ''} ${item.name !== 'Code Input' && !analysisCompleted ? 'opacity-50 pointer-events-none' : ''
                } hover:scale-105`}
            >
              <item.icon className="mr-3 h-5 w-5" />
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default Sidebar