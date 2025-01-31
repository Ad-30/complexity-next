import { Github, Linkedin, Twitter } from 'lucide-react'
import Link from 'next/link'

export default function FooterSection() {
  return (
    <footer className="py-10 bg-gradient-to-t from-gray-900 to-black">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <nav className="mb-4 md:mb-0">
            <ul className="flex space-x-6">
              <li><Link href="/" className="text-gray-400 hover:text-cyan-400 transition-colors">Home</Link></li>
              <li><a href="#features" className="text-gray-400 hover:text-cyan-400 transition-colors">Features</a></li>
              <li><a href="#team" className="text-gray-400 hover:text-cyan-400 transition-colors">Team</a></li>
              <li><a href="#mentor" className="text-gray-400 hover:text-cyan-400 transition-colors">Contact</a></li>
            </ul>
          </nav>
          <div className="flex items-center space-x-4">
            <a href="mailto:info@complexipy.com" className="text-gray-400 hover:text-cyan-400 transition-colors">info@complexipy.com</a>
            <a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors">
              <Github className="w-6 h-6" />
            </a>
            <a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors">
              <Linkedin className="w-6 h-6" />
            </a>
            <a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors">
              <Twitter className="w-6 h-6" />
            </a>
          </div>
        </div>
        <div className="mt-8 text-center text-gray-500">
          © 2024 ComplexiPy. All rights reserved.
        </div>
      </div>
    </footer>
  )
}

