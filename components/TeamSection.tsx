"use client"
import Image from 'next/image'
import { Github, Linkedin, Twitter } from 'lucide-react'
import { MagicCard } from './ui/magic-card'
import { useTheme } from "next-themes";
const teamMembers = [
  {
    name: "Aditya Vyas",
    role: "Team Lead",
    image: "/aditya-vyas-img.png",
    socials: {
      github: "https://github.com/alice",
      linkedin: "https://linkedin.com/in/alice",
      twitter: "https://twitter.com/alice"
    }
  },
  {
    name: "Aditya Singh Rajawat",
    role: "Backend Developer",
    image: "/aditya-singh-rajawat.jpg",
    socials: {
      github: "https://github.com/bob",
      linkedin: "https://linkedin.com/in/bob",
      twitter: "https://twitter.com/bob"
    }
  },
  {
    name: "Avani Choudhary",
    role: "AI Specialist",
    image: "/team-member-3.jpg",
    socials: {
      github: "https://github.com/charlie",
      linkedin: "https://linkedin.com/in/charlie",
      twitter: "https://twitter.com/charlie"
    }
  }
]

export default function TeamSection() {
  const { theme } = useTheme();
  return (
    <section className="py-20 bg-gray-900">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold mb-12 text-center text-cyan-400">Our Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <MagicCard
              key={index}
              className="cursor-pointer flex-col items-center justify-center shadow-2xl text-center p-6 bg-gray-800 rounded-xl"
              gradientColor={theme === "dark" ? "#262626" : "#D9D9D955"}
            >
              <Image
                src={member.image}
                alt={member.name}
                width={150}
                height={150}
                className="rounded-full mx-auto mb-4 bg-imageBackground"
              />
              <h3 className="text-xl font-semibold mb-2 text-white">{member.name}</h3>
              <p className="text-gray-400 mb-4">{member.role}</p>
              <div className="flex justify-center space-x-4">
                <a href={member.socials.github} className="text-gray-400 hover:text-cyan-400 transition-colors">
                  <Github className="w-6 h-6" />
                </a>
                <a href={member.socials.linkedin} className="text-gray-400 hover:text-cyan-400 transition-colors">
                  <Linkedin className="w-6 h-6" />
                </a>
                <a href={member.socials.twitter} className="text-gray-400 hover:text-cyan-400 transition-colors">
                  <Twitter className="w-6 h-6" />
                </a>
              </div>
            </MagicCard>
          ))}
        </div>
      </div>
    </section>

  )
}

