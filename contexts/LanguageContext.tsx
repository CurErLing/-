import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Language, Translation } from '../types';

const translations: Record<Language, Translation> = {
  zh: {
    brandName: "每日游讯",
    logo: "游讯.",
    hero: {
      subtitle: "// 你的每日精神食粮",
      line1: "每日",
      line2: "游讯",
      cta: "阅读今日头条"
    },
    nav: {
      work: "精选",
      about: "关于",
      contact: "投稿"
    },
    marquee: {
      hero: "每日游讯 /// 独立游戏 /// 3A大作 /// 行业内幕 /// 游戏美学 /// ",
      footer: "每日游讯 /// 保持饥渴 /// 每日游讯 /// 保持愚蠢 /// "
    },
    recommender: {
      title: "AI 荐游",
      subtitle: "告诉我们你现在的心情，AI 编辑将为你生成专属推荐。",
      placeholder: "例如：想找一款赛博朋克风格的侦探游戏...",
      button: "生成推荐",
      loading: "搜索数据库...",
      empty: "暂无符合条件的推荐，请换个说法试试。"
    },
    blog: {
      title: "编辑精选",
      subtitle: "/// 深度长文"
    },
    footer: {
      newsletter: "订阅日报",
      placeholder: "YOUR@EMAIL.COM",
      submit: "订阅",
      designedBy: "每日游讯出品"
    }
  },
  en: {
    brandName: "DAILY GAME NEWS",
    logo: "DGN.",
    hero: {
      subtitle: "// YOUR DAILY DOSE",
      line1: "DAILY",
      line2: "NEWS",
      cta: "READ HEADLINES"
    },
    nav: {
      work: "FEATURED",
      about: "ABOUT",
      contact: "CONTACT"
    },
    marquee: {
      hero: "DAILY GAME NEWS /// INDIE GEMS /// AAA TITLES /// INDUSTRY INSIGHTS /// AESTHETICS /// ",
      footer: "DAILY GAME NEWS /// STAY HUNGRY /// DAILY GAME NEWS /// STAY FOOLISH /// "
    },
    recommender: {
      title: "AI PICK",
      subtitle: "Tell us your current mood, and our AI editor will curate a list for you.",
      placeholder: "e.g. A cyberpunk detective game with pixel art...",
      button: "Generate",
      loading: "Searching Database...",
      empty: "No matches found in the archives. Try a different query."
    },
    blog: {
      title: "EDITOR'S CHOICE",
      subtitle: "/// DEEP DIVES"
    },
    footer: {
      newsletter: "NEWSLETTER",
      placeholder: "YOUR@EMAIL.COM",
      submit: "SUBSCRIBE",
      designedBy: "PRODUCED BY DGN"
    }
  }
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translation;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('zh');

  const value = {
    language,
    setLanguage,
    t: translations[language]
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};