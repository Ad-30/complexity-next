import Link from "next/link"
import { RainbowButton } from "./ui/rainbow-button";
export default function HeroSection() {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-black">
        <div className="absolute inset-0 bg-[url('/particle-bg.png')] opacity-50"></div>
      </div>
      <div className="relative z-10 text-center">
        <h1 className="text-6xl md:text-8xl font-bold mb-4 animate-pulse text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
          ComplexiPy
        </h1>
        <p className="text-xl md:text-2xl text-gray-300 mb-8">
          Simplifying Complexity, Visualizing Insights
        </p>
        <Link href={"/code-input"}>
          <RainbowButton>Get Started</RainbowButton>
        </Link>

      </div>
    </section>
  )
}

