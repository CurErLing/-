import React from 'react';
import Marquee from './Marquee';
import { useLanguage } from '../contexts/LanguageContext';

const Footer: React.FC = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-acid-green pt-20 pb-10 overflow-hidden">
      <Marquee 
        text={t.marquee.footer}
        className="text-[12vw] font-black font-display text-black leading-none opacity-10 mix-blend-overlay select-none pointer-events-none" 
        speed={40}
      />
      
      <div className="max-w-7xl mx-auto px-6 mt-[-5vw] relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
          <div>
            <h4 className="text-4xl font-bold font-display mb-6">{t.footer.newsletter}</h4>
            <div className="flex border-b-4 border-black">
              <input 
                type="email" 
                placeholder={t.footer.placeholder}
                className="bg-transparent w-full py-4 text-2xl font-mono text-black placeholder-black/50 focus:outline-none"
              />
              <button className="px-6 font-bold text-xl hover:text-white transition-colors uppercase">{t.footer.submit}</button>
            </div>
          </div>
          <div className="flex flex-col items-start md:items-end font-mono text-lg font-bold gap-2">
            <a href="#" className="hover:bg-black hover:text-white px-2 transition-colors">TWITTER / X</a>
            <a href="#" className="hover:bg-black hover:text-white px-2 transition-colors">INSTAGRAM</a>
            <a href="#" className="hover:bg-black hover:text-white px-2 transition-colors">STEAM</a>
            <a href="#" className="hover:bg-black hover:text-white px-2 transition-colors">DISCORD</a>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-end border-t-2 border-black pt-8">
          <h2 className="text-[10vw] md:text-[8vw] leading-[0.8] font-black font-display tracking-tighter">
            {t.brandName}
          </h2>
          <div className="mb-4 md:mb-8 text-right">
            <p className="font-mono font-bold uppercase">{t.footer.designedBy}</p>
            <p className="font-mono font-bold">© 2024</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;