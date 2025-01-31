'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ChevronRight, Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import AnimatedGradientText from './ui/animated-gradient-text'
import { cn } from '@/lib/utils'

const navLinks = [
    { href: '#', label: 'Home' },
    { href: '#about', label: 'About' },
    { href: '#features', label: 'Features' },
    { href: '#team', label: 'Team' },
    { href: '#mentors', label: 'Mentors' },
    { href: '#contact', label: 'Contact' },
]

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false)
    const [isScrolled, setIsScrolled] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    return (
        <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'py-2' : 'py-4'} bg-gradient-to-r from-gray-900 to-black shadow-lg`}>
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center">
                    <Link href="/" className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
                        ComplexiPy
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center space-x-6">
                        {navLinks.map((link) => (
                            <Link
                                key={link.label}
                                href={link.href}
                                className="text-gray-300 hover:text-cyan-400 transition-colors duration-300"
                            >
                                {link.label}
                            </Link>
                        ))}
                        <Link href={"/code-input"}>
                            <AnimatedGradientText className="bg-transparent">
                                🎉 <hr className="mx-2 h-4 w-px shrink-0 bg-gray-300" />{" "}
                                <span
                                    className={cn(
                                        `inline animate-gradient bg-gradient-to-r from-[#ffaa40] via-[#9c40ff] to-[#ffaa40] bg-[length:var(--bg-size)_100%] bg-clip-text text-transparent`,
                                    )}
                                >
                                    Introducing ComplexiPy
                                </span>
                                <ChevronRight className="ml-1 size-3 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
                            </AnimatedGradientText>
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="text-gray-300 hover:text-cyan-400 transition-colors duration-300"
                        >
                            {isOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <div className={`md:hidden fixed top-0 left-0 w-full h-full bg-gray-900 transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                <div className="flex justify-end p-4">
                    <button
                        onClick={() => setIsOpen(false)}
                        className="text-gray-300 hover:text-cyan-400 transition-colors duration-300"
                    >
                        <X size={24} />
                    </button>
                </div>
                <div className="flex flex-col items-center justify-center h-full space-y-8">
                    {navLinks.map((link) => (
                        <Link
                            key={link.label}
                            href={link.href}
                            className="text-xl text-gray-300 hover:text-cyan-400 transition-colors duration-300"
                            onClick={() => setIsOpen(false)}
                        >
                            {link.label}
                        </Link>
                    ))}
                    <Link href={"/code-input"}>
                        <Button className="mt-4 bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white font-bold py-2 px-4 rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/50">
                            Get Started
                        </Button>
                    </Link>
                </div>
            </div>
        </nav>
    )
}

