import React from 'react';
import { motion } from 'framer-motion';
import { BlogPost } from '../types';
import { ArrowUpRight } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const postsEn: BlogPost[] = [
  {
    id: '1',
    title: 'The Death of UI',
    excerpt: 'Why diegetic interfaces are returning to AAA titles.',
    date: 'OCT 02',
    readTime: '5 MIN',
    category: 'DESIGN',
    imageUrl: 'https://picsum.photos/800/600?random=1'
  },
  {
    id: '2',
    title: 'Pixel Art in 4K',
    excerpt: 'Scaling nostalgia for modern retina displays without losing soul.',
    date: 'SEP 28',
    readTime: '8 MIN',
    category: 'TECH',
    imageUrl: 'https://picsum.photos/600/800?random=2'
  },
  {
    id: '3',
    title: 'Silent Narratives',
    excerpt: 'How environment tells the story better than dialogue.',
    date: 'SEP 15',
    readTime: '4 MIN',
    category: 'CRITIQUE',
    imageUrl: 'https://picsum.photos/800/800?random=3'
  },
  {
    id: '4',
    title: 'Glitch Aesthetic',
    excerpt: 'Embracing errors as a feature in cyberpunk visuals.',
    date: 'AUG 30',
    readTime: '6 MIN',
    category: 'ART',
    imageUrl: 'https://picsum.photos/800/500?random=4'
  }
];

const postsZh: BlogPost[] = [
  {
    id: '1',
    title: 'UI 之死',
    excerpt: '为什么叙事性界面（Diegetic Interfaces）正在回归 3A 大作。',
    date: '10月 02',
    readTime: '5 分钟',
    category: '设计',
    imageUrl: 'https://picsum.photos/800/600?random=1'
  },
  {
    id: '2',
    title: '4K 时代的像素艺术',
    excerpt: '如何在现代视网膜屏幕上扩展怀旧感而不失灵魂。',
    date: '9月 28',
    readTime: '8 分钟',
    category: '技术',
    imageUrl: 'https://picsum.photos/600/800?random=2'
  },
  {
    id: '3',
    title: '沉默的叙事',
    excerpt: '环境如何比对话更好地讲述故事。',
    date: '9月 15',
    readTime: '4 分钟',
    category: '评论',
    imageUrl: 'https://picsum.photos/800/800?random=3'
  },
  {
    id: '4',
    title: '故障美学',
    excerpt: '在赛博朋克视觉中将错误视为一种特性。',
    date: '8月 30',
    readTime: '6 分钟',
    category: '艺术',
    imageUrl: 'https://picsum.photos/800/500?random=4'
  }
];

const BlogGrid: React.FC = () => {
  const { t, language } = useLanguage();
  const posts = language === 'zh' ? postsZh : postsEn;

  return (
    <section className="py-32 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-20 border-b-4 border-black pb-6">
          <h2 className="text-7xl md:text-9xl font-display font-black text-black tracking-tighter">{t.blog.title}</h2>
          <span className="text-xl font-mono font-bold mb-4 text-hot-pink animate-pulse">{t.blog.subtitle}</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {posts.map((post, i) => (
            <motion.article 
              key={post.id}
              initial={{ opacity: 0, y: 100 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.1 }}
              className={`group cursor-pointer ${i % 2 !== 0 ? 'md:mt-24' : ''}`}
            >
              <div className="relative overflow-hidden mb-6 border-2 border-black bg-black">
                <motion.img 
                  whileHover={{ scale: 1.1, filter: "invert(1) hue-rotate(180deg)" }}
                  transition={{ duration: 0.4 }}
                  src={post.imageUrl} 
                  alt={post.title} 
                  className="w-full aspect-[4/3] object-cover opacity-90"
                />
                <div className="absolute top-0 left-0 bg-acid-green px-4 py-2 font-mono font-bold text-sm border-b-2 border-r-2 border-black">
                  {post.category}
                </div>
              </div>
              
              <div className="flex items-start justify-between group-hover:translate-x-2 transition-transform duration-300">
                <div>
                   <h3 className="text-4xl md:text-5xl font-display font-bold leading-none mb-3 group-hover:text-electric-blue transition-colors">
                    {post.title}
                   </h3>
                   <p className="text-xl font-medium text-gray-600 max-w-md">{post.excerpt}</p>
                </div>
                <ArrowUpRight size={48} className="text-black group-hover:rotate-45 transition-transform duration-300" />
              </div>
              <div className="mt-6 flex gap-6 font-mono text-sm text-gray-500 border-t border-gray-200 pt-4">
                <span>{post.date}</span>
                <span>{post.readTime} {language === 'en' ? 'READ' : '阅读'}</span>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogGrid;