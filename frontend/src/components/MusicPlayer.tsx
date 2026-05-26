import { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import { Play, Pause, SkipForward, SkipBack, Volume2, VolumeX, Music } from 'lucide-react';
import { useMusic } from '../context/MusicContext';

export default function MusicPlayer() {
  // Extraemos las nuevas funciones del contexto
  const { currentSong, isPlaying, togglePlay, nextSong, prevSong } = useMusic();
  const audioRef = useRef<HTMLAudioElement>(null);
  
  const [volume, setVolume] = useState(0.7); 
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const formatTime = (time: number) => {
    if (isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
      setDuration(audioRef.current.duration);
    }
  };

  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (audioRef.current) {
      const newTime = parseFloat(e.target.value);
      audioRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  // Sincronización del audio con el estado global
  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch((err) => console.log("Error al reproducir:", err));
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, currentSong]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);

  if (!currentSong) return null;

  return (
    <motion.div 
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      className="fixed bottom-0 left-0 right-0 z-[100] p-4 pointer-events-none"
    >
      {/* Etiqueta de audio oculta con evento onEnded automático */}
      <audio 
        ref={audioRef} 
        src={currentSong.url} 
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleTimeUpdate}
        onEnded={() => nextSong()} // Salta automáticamente al terminar
      />

      <div className="max-w-5xl mx-auto zine-paper bg-amazon-pulp p-4 pointer-events-auto flex items-center justify-between gap-6 overflow-hidden border-2 border-amazon-dark shadow-zine">
        
        {/* INFO CANCIÓN */}
        <div className="flex items-center gap-4 min-w-0 w-64">
          <div className="w-14 h-14 bg-amazon-dark shrink-0 overflow-hidden border-2 border-amazon-dark aspect-square flex items-center justify-center p-0 shadow-zine">
            {currentSong.image ? (
              <img 
                src={currentSong.image} 
                alt={currentSong.title} 
                className="w-full h-full object-cover block" 
                onError={(e) => { (e.target as HTMLImageElement).src = 'https://via.placeholder.com/150?text=Travesia'; }}
              />
            ) : (
              <Music className="text-amazon-sand/40" size={20} />
            )}
          </div>
          <div className="min-w-0">
            <p className="font-bold uppercase truncate text-sm tracking-tight text-amazon-dark leading-none">
              {currentSong.title}
            </p>
            <p className="font-serif italic text-xs text-amazon-earth truncate mt-1">
              {currentSong.artist}
            </p>
          </div>
        </div>

        {/* BARRA DE PROGRESO CENTRAL */}
        <div className="hidden md:flex flex-col flex-1 px-4 space-y-1">
          <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest opacity-60 text-amazon-dark">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
          <input 
            type="range"
            min="0"
            max={duration || 0}
            step="0.1"
            value={currentTime}
            onChange={handleProgressChange}
            className="w-full h-1 bg-amazon-dark/10 accent-amazon-dark cursor-pointer appearance-none rounded-full"
            style={{ 
              background: `linear-gradient(to right, #1a2f23 ${ (currentTime / (duration || 1)) * 100}%, rgba(26, 47, 35, 0.1) 0%)` 
            }}
          />
        </div>

        {/* CONTROLES DE NAVEGACIÓN */}
        <div className="flex items-center gap-3">
          <button 
            onClick={() => prevSong()} 
            className="p-2 hover:text-amazon-clay transition-colors cursor-pointer text-amazon-dark"
          >
            <SkipBack size={20} />
          </button>

          <button 
            onClick={togglePlay} 
            className="p-3 border-2 border-amazon-dark bg-amazon-sand/20 hover:bg-amazon-dark hover:text-white transition-all cursor-pointer text-amazon-dark shadow-[2px_2px_0_0_#1a2f23]"
          >
            {isPlaying ? <Pause size={20} fill="currentColor" /> : <Play size={20} fill="currentColor" />}
          </button>

          <button 
            onClick={() => nextSong()} 
            className="p-2 hover:text-amazon-green transition-colors cursor-pointer text-amazon-dark"
          >
            <SkipForward size={20} />
          </button>
        </div>

        {/* VOLUMEN */}
        <div className="hidden lg:flex items-center gap-3 w-32">
          <button 
            onClick={() => setIsMuted(!isMuted)}
            className="cursor-pointer text-amazon-dark hover:text-amazon-clay transition-colors"
          >
            {isMuted || volume === 0 ? <VolumeX size={18} /> : <Volume2 size={18} />}
          </button>
          <input 
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={isMuted ? 0 : volume}
            onChange={(e) => {
              setVolume(parseFloat(e.target.value));
              setIsMuted(false);
            }}
            className="flex-1 h-1 appearance-none cursor-pointer accent-amazon-dark rounded-full"
            style={{ 
                background: `linear-gradient(to right, #1a2f23 ${ (isMuted ? 0 : volume) * 100}%, rgba(26, 47, 35, 0.1) 0%)` 
            }}
          />
        </div>
      </div>
    </motion.div>
  );
}