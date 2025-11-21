import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RefreshCw, Ghost } from 'lucide-react';
import { getGameRecommendations } from '../services/geminiService';
import { GameRecommendation } from '../types';
import { useLanguage } from '../contexts/LanguageContext';

const Recommender: React.FC = () => {
  const { t, language } = useLanguage();
  const [query, setQuery] = useState('');
  const [games, setGames] = useState<GameRecommendation[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setGames([]);
    try {
      const results = await getGameRecommendations(query, language);
      setGames(results);
      setHasSearched(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-24 px-6 bg-off-black text-white relative overflow-hidden min-h-[80vh]">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 pointer-events-none"></div>

        <div className="max-w-7xl mx-auto relative z-10">
            <motion.div 
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="mb-16"
            >
                <h2 className="text-6xl md:text-8xl font-display font-bold mb-4 text-acid-green">{t.recommender.title}</h2>
                <p className="text-xl md:text-2xl font-mono text-gray-400 max-w-2xl">
                    {t.recommender.subtitle}
                </p>
            </motion.div>

            <div className="mb-20">
                <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4">
                    <input 
                        type="text" 
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder={t.recommender.placeholder}
                        className="flex-1 bg-transparent border-b-4 border-white text-2xl md:text-4xl py-4 text-white placeholder-gray-600 focus:outline-none focus:border-hot-pink focus:placeholder-transparent transition-colors font-display font-bold"
                    />
                    <button 
                        type="submit"
                        disabled={loading}
                        className="px-12 py-6 bg-white text-black font-bold text-xl uppercase hover:bg-electric-blue hover:text-white transition-all disabled:opacity-50 hover:skew-x-6 whitespace-nowrap"
                    >
                        {loading ? <RefreshCw className="animate-spin" /> : t.recommender.button}
                    </button>
                </form>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <AnimatePresence mode="popLayout">
                    {loading && (
                         <motion.div 
                            initial={{ opacity: 0 }} 
                            animate={{ opacity: 1 }} 
                            exit={{ opacity: 0 }}
                            className="col-span-2 h-64 flex items-center justify-center"
                         >
                             <div className="flex gap-2">
                                {[1,2,3].map(i => (
                                    <motion.div 
                                        key={i}
                                        className="w-6 h-32 bg-acid-green"
                                        animate={{ scaleY: [1, 2, 1], opacity: [0.5, 1, 0.5] }}
                                        transition={{ duration: 0.5, repeat: Infinity, delay: i * 0.1 }}
                                    />
                                ))}
                             </div>
                         </motion.div>
                    )}

                    {games.map((game, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100, rotate: index % 2 === 0 ? -5 : 5 }}
                            animate={{ opacity: 1, x: 0, rotate: 0 }}
                            transition={{ type: "spring", bounce: 0.4, duration: 0.8, delay: index * 0.1 }}
                            className={`
                                relative p-8 border-4 border-white hover:border-none group transition-all duration-300
                                ${game.colorTheme === 'pink' ? 'hover:bg-hot-pink' : ''}
                                ${game.colorTheme === 'blue' ? 'hover:bg-electric-blue' : ''}
                                ${game.colorTheme === 'green' ? 'hover:bg-acid-green' : ''}
                                ${game.colorTheme === 'purple' ? 'hover:bg-deep-purple' : ''}
                            `}
                        >
                            <div className="absolute top-0 right-0 p-4 font-mono text-4xl opacity-20 font-bold">0{index + 1}</div>
                            <div className="relative z-10 group-hover:text-white transition-colors">
                                <span className="inline-block px-3 py-1 bg-white text-black font-mono text-sm font-bold mb-4 group-hover:bg-black group-hover:text-white">{game.genre}</span>
                                <h3 className="text-4xl md:text-5xl font-display font-bold mb-2 uppercase leading-tight">{game.title}</h3>
                                <div className="h-1 w-20 bg-current mb-6"></div>
                                <p className="text-lg md:text-xl font-medium mb-6 opacity-90">{game.description}</p>
                                <div className="flex justify-between items-end border-t border-white/30 pt-4">
                                    <div className="font-mono text-sm">
                                        <p>YEAR: {game.year}</p>
                                        <p>VIBE: {game.vibe}</p>
                                    </div>
                                    <div className="text-6xl font-display font-bold opacity-50 group-hover:opacity-100">
                                        {game.score}<span className="text-2xl">/10</span>
                                    </div>
                                </div>
                            </div>
                            <div className="absolute inset-0 bg-black transform translate-x-2 translate-y-2 -z-10 group-hover:translate-x-4 group-hover:translate-y-4 transition-transform"></div>
                        </motion.div>
                    ))}

                    {hasSearched && games.length === 0 && !loading && (
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="col-span-2 text-center py-20"
                        >
                            <Ghost size={64} className="mx-auto mb-4 text-gray-600" />
                            <p className="text-2xl font-display text-gray-500">{t.recommender.empty}</p>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    </section>
  );
};

export default Recommender;