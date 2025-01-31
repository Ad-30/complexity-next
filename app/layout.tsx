import './globals.css'
import { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Navbar from '@/components/Navbar'
import Sidebar from '@/components/Sidebar'
import BackgroundAnimation from '@/components/BackgroundAnimation'
import ParticleBackground from '@/components/ParticleBackground'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'ComplexiPy - Advanced Code Analysis Tool',
  description: 'ComplexiPy is an advanced code analysis tool that leverages cognitive complexity metrics and graph convolutional networks to predict software defects in Python code.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}

