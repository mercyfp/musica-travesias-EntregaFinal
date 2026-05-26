export interface Saber {
  id: string;
  title: string;
  category: 'Plants' | 'Rituals' | 'Crafts' | 'Language';
  description: string;
  image?: string;
  author: string;
  date: string;
}

export interface Historia {
  id: string;
  title: string;
  content: string;
  summary: string;
  author: string;
  image?: string;
  audioUrl?: string;
  region: string;
}

export interface Musica {
  id: string;
  title: string;
  artist: string;
  url: string;
  cover?: string;
  genre: string;
  duration: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user';
}

export interface Song extends Musica {
  category: string;
  image: string;
}
