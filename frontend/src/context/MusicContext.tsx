import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { Song } from '../types';
import { API_URL } from '../config'; // Importamos la URL centralizada

interface MusicContextType {
  currentSong: Song | null;
  isPlaying: boolean;
  favoritos: string[];
  queue: any[]; 
  playSong: (song: any, allSongs?: any[]) => void;
  togglePlay: () => void;
  nextSong: () => void;
  prevSong: () => void;
  toggleFavorito: (id: string) => void;
}

const MusicContext = createContext<MusicContextType | undefined>(undefined);

export function MusicProvider({ children }: { children: ReactNode }) {
  const [currentSong, setCurrentSong] = useState<Song | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [queue, setQueue] = useState<any[]>([]); 
  
  // Persistencia de favoritos
  const [favoritos, setFavoritos] = useState<string[]>(() => {
    const savedFavs = localStorage.getItem('travesias_favs');
    return savedFavs ? JSON.parse(savedFavs) : [];
  });

  useEffect(() => {
    localStorage.setItem('travesias_favs', JSON.stringify(favoritos));
  }, [favoritos]);

 const playSong = (song: any, allSongs?: any[]) => {
    if (allSongs && allSongs.length > 0) {
      setQueue(allSongs);
    }

    const songId = (song._id || song.id).toString();
    const rawUrl = song.url || song.archivo_url;
    let audioUrl;

    if (rawUrl?.startsWith('data:') || !rawUrl?.startsWith('http')) {
      audioUrl = `${API_URL}/api/canciones/${songId}/audio`;
    } else {
      audioUrl = rawUrl;
    }

    let imageUrl = song.image || song.portada_url;
    if (imageUrl?.startsWith('data:') || (imageUrl && !imageUrl.startsWith('http'))) {
      imageUrl = `${API_URL}/api/canciones/${songId}/portada`;
    }

    setCurrentSong({
      ...song,
      id: songId,
      url: audioUrl,
      image: imageUrl,
      title: song.title || song.titulo,
      artist: song.artist || song.artista
    });
    setIsPlaying(true);
  };

    // Normalización de la URL del Audio usando la configuración global
    const audioUrl = (song.url || song.archivo_url)?.startsWith('http') 
      ? (song.url || song.archivo_url)
      : `${API_URL}${song.url || song.archivo_url}`;

    // Normalización de la URL de la Portada
    let imageUrl = song.image || song.portada_url;
    if (imageUrl && !imageUrl.startsWith('http')) {
      imageUrl = `${API_URL}${imageUrl}`;
    }

    setCurrentSong({
      ...song,
      id: (song.id || song._id).toString(),
      url: audioUrl,
      image: imageUrl,
      title: song.title || song.titulo,
      artist: song.artist || song.artista
    });
    setIsPlaying(true);
  };

  const togglePlay = () => {
    if (!currentSong) return;
    setIsPlaying(!isPlaying);
  };

  const nextSong = () => {
    if (!currentSong || queue.length === 0) return;
    
    const currentIndex = queue.findIndex(s => {
      const sId = (s._id || s.id).toString();
      const currentId = (currentSong.id || currentSong._id).toString();
      return sId === currentId;
    });

    const nextIndex = currentIndex === -1 ? 0 : (currentIndex + 1) % queue.length;
    const next = queue[nextIndex];
    
    playSong(next);
  };

  const prevSong = () => {
    if (!currentSong || queue.length === 0) return;
    
    const currentIndex = queue.findIndex(s => {
      const sId = (s._id || s.id).toString();
      const currentId = (currentSong.id || currentSong._id).toString();
      return sId === currentId;
    });

    const prevIndex = currentIndex <= 0 ? queue.length - 1 : currentIndex - 1;
    const prev = queue[prevIndex];
    
    playSong(prev);
  };

  const toggleFavorito = (id: string) => {
    setFavoritos((prev) => 
      prev.includes(id) 
        ? prev.filter(favId => favId !== id) 
        : [...prev, id]
    );
  };

  return (
    <MusicContext.Provider value={{ 
      currentSong, 
      isPlaying, 
      favoritos, 
      queue,
      playSong, 
      togglePlay, 
      nextSong, 
      prevSong,
      toggleFavorito 
    }}>
      {children}
    </MusicContext.Provider>
  );
}

export function useMusic() {
  const context = useContext(MusicContext);
  if (!context) throw new Error('useMusic must be used within a MusicProvider');
  return context;
}