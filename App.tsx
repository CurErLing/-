import React, { useEffect } from 'react';
import Hero from './components/Hero';
import Recommender from './components/Recommender';
import BlogGrid from './components/BlogGrid';
import Footer from './components/Footer';
import AnimatedCursor from './components/AnimatedCursor';
import Marquee from './components/Marquee';
import { motion, useScroll, useSpring } from 'framer-motion';
import { LanguageProvider, useLanguage } from './contexts/LanguageContext';

const AppContent = () => {
  const { scrollYProgress } = useScroll();
  const { language, setLanguage, t } = useLanguage();
  
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);

  return (
    <div className="bg-white min-h-screen selection:bg-hot-pink selection:text-white cursor-none">
      <AnimatedCursor />
      
      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-2 bg-black origin-left z-50 mix-blend-difference"
        style={{ scaleX }}
      />

      {/* Navigation (Floating) */}
      <nav className="fixed top-6 left-6 right-6 z-40 flex justify-between items-center mix-blend-difference text-white pointer-events-none">
         <div className="pointer-events-auto">
            <span className="font-display font-black text-2xl tracking-tighter">{t.logo}</span>
         </div>
         
         <div className="pointer-events-auto flex items-center gap-8">
            <div className="flex gap-6 font-mono text-sm font-bold hidden md:flex">
              <button className="hover:underline decoration-2 underline-offset-4">{t.nav.work}</button>
              <button className="hover:underline decoration-2 underline-offset-4">{t.nav.about}</button>
              <button className="hover:underline decoration-2 underline-offset-4">{t.nav.contact}</button>
            </div>
            
            {/* Language Toggle */}
            <button 
              onClick={() => setLanguage(language === 'zh' ? 'en' : 'zh')}
              className="font-mono font-bold text-lg tracking-widest hover:text-acid-green transition-colors"
            >
              {language === 'zh' ? 'EN' : '中文'}
            </button>
         </div>
      </nav>

      <main>
        <Hero />
        
        <div className="bg-black py-4 -rotate-1 scale-105 origin-right z-20 relative border-y-4 border-white">
           <Marquee 
             text={t.marquee.hero}
             className="text-4xl font-bold font-display text-white"
             speed={20}
           />
        </div>

        <BlogGrid />

        <Recommender />
      </main>

      <Footer />
    </div>
  );
};

function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}

export default App;