import React, { useState } from 'react';
import { usePathname } from 'next/navigation';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import BackgroundAnimation from './BackgroundAnimation';
import ParticleBackground from './ParticleBackground';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const pathname = usePathname();
  const isHomePage = pathname === '/';

  return (
    <div className="flex flex-col min-h-screen">
      {isHomePage ? <ParticleBackground /> : <BackgroundAnimation />}
      <Navbar onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} showTryOut={isHomePage} />
      <div className="flex flex-1">
        {!isHomePage && <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />}
        <main className={`flex-1 overflow-y-auto p-6 ${isHomePage ? 'w-full' : ''}`}>
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;

