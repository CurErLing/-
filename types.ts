export interface GameRecommendation {
  title: string;
  description: string;
  genre: string;
  vibe: string;
  score: number;
  year: number;
  colorTheme: 'pink' | 'blue' | 'green' | 'purple';
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: string;
  imageUrl: string;
}

export type Language = 'zh' | 'en';

export interface Translation {
  brandName: string;
  logo: string;
  hero: {
    subtitle: string;
    line1: string;
    line2: string;
    cta: string;
  };
  nav: {
    work: string;
    about: string;
    contact: string;
  };
  marquee: {
    hero: string;
    footer: string;
  };
  recommender: {
    title: string;
    subtitle: string;
    placeholder: string;
    button: string;
    loading: string;
    empty: string;
  };
  blog: {
    title: string;
    subtitle: string;
  };
  footer: {
    newsletter: string;
    placeholder: string;
    submit: string;
    designedBy: string;
  };
}