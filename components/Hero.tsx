import React from 'react';
import { motion, Variants } from 'framer-motion';
import { ArrowDownRight } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const Hero: React.FC = () => {
  const { t } = useLanguage();
  
  const letterVariants: Variants = {
    hidden: { y: 400, opacity: 0, skewY: 20 },
    visible: (i: number) => ({
      y: 0,
      opacity: 1,
      skewY: 0,
      transition: {
        ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
        duration: 1.2,
        delay: i * 0.05
      }
    })
  };

  const word = t.hero.line1.split("");
  const word2 = t.hero.line2.split("");

  return (
    <section className="relative w-full min-h-screen flex flex-col justify-center items-center overflow-hidden bg-white selection:bg-acid-green selection:text-black pt-20">
      {/* Animated Background Shapes */}
      <motion.div 
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute -right-20 top-20 w-96 h-96 border-[20px] border-electric-blue rounded-full opacity-20 blur-3xl pointer-events-none"
      />
      <motion.div 
        animate={{ rotate: -360, scale: [1, 1.2, 1] }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        className="absolute -left-20 bottom-20 w-72 h-72 bg-hot-pink rounded-full opacity-10 blur-3xl pointer-events-none"
      />

      <div className="relative z-10 text-center w-full max-w-[95vw]">
        <motion.div className="flex justify-center overflow-hidden mb-4">
          <motion.span 
             initial={{ y: 100 }}
             animate={{ y: 0 }}
             transition={{ duration: 0.8, delay: 0.2 }}
             className="text-xl md:text-2xl font-mono text-deep-purple tracking-widest uppercase"
          >
            {t.hero.subtitle}
          </motion.span>
        </motion.div>

        <div className="flex overflow-hidden justify-center flex-wrap leading-none">
          {word.map((char, i) => (
            <motion.h1
              key={`l1-${i}`}
              custom={i}
              variants={letterVariants}
              initial="hidden"
              animate="visible"
              className="text-[25vw] md:text-[18vw] leading-[0.85] font-display font-black text-off-black tracking-tighter mix-blend-multiply whitespace-pre"
            >
              {char}
            </motion.h1>
          ))}
        </div>
        
        <div className="flex overflow-hidden justify-center -mt-2 md:-mt-8 flex-wrap leading-none">
           {word2.map((char, i) => (
            <motion.h1
              key={`l2-${i}`}
              custom={i + word.length}
              variants={letterVariants}
              initial="hidden"
              animate="visible"
              className="text-[25vw] md:text-[18vw] leading-[0.85] font-display font-black text-transparent bg-clip-text bg-gradient-to-r from-hot-pink to-electric-blue tracking-tighter italic whitespace-pre"
            >
              {char}
            </motion.h1>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.5, type: "spring" }}
          className="mt-12 flex justify-center"
        >
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-acid-green to-electric-blue rounded-lg blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
            <button className="relative px-8 py-4 bg-black text-white font-bold text-lg uppercase tracking-wider flex items-center gap-2 hover:bg-white hover:text-black transition-colors duration-300 border-2 border-black">
              {t.hero.cta} <ArrowDownRight />
            </button>
          </div>
        </motion.div>
      </div>
      
      <div className="absolute bottom-10 left-0 w-full">
        <div className="border-y-2 border-black bg-acid-green py-3 transform -rotate-1 origin-left scale-105">
             <div className="whitespace-nowrap overflow-hidden text-black font-bold font-mono text-lg">
                {t.brandName} /// {t.brandName} /// {t.brandName} /// {t.brandName} /// {t.brandName} ///
             </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;