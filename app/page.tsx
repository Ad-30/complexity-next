import React from 'react';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import FeaturesSection from '@/components/FeaturesSection';
import TeamSection from '@/components/TeamSection';
import MentorSection from '@/components/MentorSection';
import FooterSection from '@/components/FooterSection';
import Navbar from '@/components/NavbarHome';

export default function Home() {
  return (
    <>
      <main className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
        <Navbar />
        <HeroSection />
        <div id="about"><AboutSection /></div>
        <div id="features"><FeaturesSection /></div>
        <div id="team"><TeamSection /></div>
        <div id="mentors"><MentorSection /></div>
        <FooterSection />
      </main>

    </>
  );
}
