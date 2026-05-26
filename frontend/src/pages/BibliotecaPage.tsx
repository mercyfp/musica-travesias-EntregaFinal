import { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, Disc, Loader2, Play, Pause, Heart } from 'lucide-react';
import { useMusic } from '../context/MusicContext';
import { API_URL } from '../config'; // Importamos la URL centralizada

export default function BibliotecaPage() {
  const { playSong, currentSong, isPlaying, togglePlay, favoritos, toggleFavorito } = useMusic();
  const [canciones, setCanciones] = useState([]);
  const [cargando, setCargando] = useState(true);

  // Traemos todas las canciones del archivo sonoro
  useEffect(() => {
    const obtenerBiblioteca = async () => {
      try {
        const response = await fetch(`${API_URL}/api/canciones`);
        if (response.ok) {
          const data = await response.json();
          setCanciones(data);
        }
      } catch (error) {
        // Manejo silencioso para la entrega
      } finally {
        setCargando(false);
      }
    };
    obtenerBiblioteca();
  }, []);

  // Filtramos los favoritos asegurando que la comparación sea por String
  const misFavoritos = useMemo(() => {
    return canciones.filter((song: any) => 
      favoritos.includes((song._id || song.id).toString())
    );
  }, [canciones, favoritos]);

  return (
    <div className="space-y-16 text-amazon-dark pb-32">
      <header className="border-b-8 border-amazon-dark pb-8">
        <Link to="/musica" className="flex items-center gap-2 font-display text-amazon-clay font-bold mb-6 hover:text-amazon-dark transition-colors text-xs tracking-widest uppercase">
          <ChevronLeft size={14} /> Volver al Catálogo
        </Link>
        <h2 className="text-6xl md:text-8xl uppercase font-bold tracking-tighter leading-none">Mi <br /> <span className="text-amazon-clay">Biblioteca</span></h2>
        <p className="font-serif italic text-amazon-earth mt-4 text-lg">Tu curaduría personal del archivo sonoro de Travesías.</p>
      </header>

      {cargando ? (
        <div className="flex flex-col items-center py-24 gap-4">
          <Loader2 className="animate-spin text-amazon-clay" size={40} />
          <p className="font-serif italic opacity-60 text-lg">Desempolvando los archivos...</p>
        </div>
      ) : (
        <>
          {/* SECCIÓN 1: MIS FAVORITOS (GRILLA DINÁMICA) */}
          <section className="space-y-8">
            <h3 className="text-3xl font-bold uppercase tracking-tighter flex items-center gap-3">
              <Heart size={32} className="text-amazon-clay fill-amazon-clay" /> Mis Favoritos
            </h3>
            
            <AnimatePresence mode='popLayout'>
              {misFavoritos.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                  {misFavoritos.map((song: any) => {
                    const songId = (song._id || song.id).toString();
                    const currentId = (currentSong?.id || currentSong?._id)?.toString();

                    return (
                      <motion.div 
                        layout
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        key={songId}
                        className="zine-paper bg-amazon-pulp border-4 border-amazon-dark p-5 flex items-center gap-5 relative shadow-zine"
                      >
                        <div className="w-20 h-20 bg-amazon-dark shrink-0 overflow-hidden border-2 border-amazon-dark shadow-[2px_2px_0_0_#1a2f23]">
                          <img 
                            src={song.portada_url ? `${API_URL}${song.portada_url}` : 'https://via.placeholder.com/150'} 
                            className="w-full h-full object-cover" 
                            alt={song.titulo}
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-bold uppercase truncate text-base leading-tight tracking-tight">{song.titulo}</h4>
                          <p className="font-serif italic text-xs text-amazon-earth truncate">{song.artista}</p>
                        </div>
                        <div className="flex flex-col items-center gap-3">
                          <button 
                            onClick={() => toggleFavorito(songId)}
                            className="p-1 text-amazon-clay hover:scale-125 transition-transform cursor-pointer"
                          >
                            <Heart size={20} fill="currentColor" />
                          </button>
                          <button 
                            onClick={() => {
                              if (currentId === songId) togglePlay();
                              else playSong(song, misFavoritos); // Llenamos la cola con tus favoritos
                            }}
                            className="w-10 h-10 rounded-full bg-amazon-dark text-amazon-pulp flex items-center justify-center hover:bg-amazon-clay transition-colors cursor-pointer shadow-zine"
                          >
                            {currentId === songId && isPlaying ? <Pause size={18} /> : <Play size={18} className="ml-1" />}
                          </button>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              ) : (
                <div className="p-16 border-4 border-dashed border-amazon-dark/10 bg-amazon-sand/5 text-center zine-paper">
                  <p className="font-serif italic text-amazon-earth/60 text-lg">"El silencio también es parte de la travesía..." <br /> Aún no tienes canciones guardadas.</p>
                </div>
              )}
            </AnimatePresence>
          </section>

          {/* SECCIÓN 2: ARCHIVO GENERAL (ESTILO LISTA TÉCNICA) */}
          <section className="space-y-8 pt-16 border-t-8 border-amazon-dark">
            <h3 className="text-3xl font-bold uppercase tracking-tighter flex items-center gap-3">
              <Disc size={32} className="text-amazon-green" /> Registro General
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-4">
              {canciones.map((song: any) => {
                const songId = (song._id || song.id).toString();
                const isFav = favoritos.includes(songId);

                return (
                  <div 
                    key={songId} 
                    className="flex items-center justify-between border-b-2 border-amazon-dark/10 pb-3 group hover:border-amazon-dark transition-colors"
                  >
                    <div className="flex items-center gap-4 min-w-0">
                      <div className="w-12 h-12 bg-amazon-dark/5 border-2 border-amazon-dark/20 overflow-hidden grayscale group-hover:grayscale-0 transition-all shadow-[2px_2px_0_0_rgba(0,0,0,0.1)]">
                        <img 
                          src={song.portada_url ? `${API_URL}${song.portada_url}` : 'https://via.placeholder.com/100'} 
                          className="w-full h-full object-cover opacity-60 group-hover:opacity-100" 
                        />
                      </div>
                      <div className="min-w-0">
                        <h4 className="font-bold uppercase text-xs leading-none group-hover:text-amazon-green truncate tracking-tight">{song.titulo}</h4>
                        <p className="font-serif italic text-[10px] text-amazon-earth truncate mt-1">{song.artista}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button 
                        onClick={() => toggleFavorito(songId)}
                        className="p-2 text-amazon-dark/20 hover:text-amazon-clay transition-colors cursor-pointer"
                      >
                        <Heart size={16} fill={isFav ? "currentColor" : "none"} className={isFav ? "text-amazon-clay" : ""} />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        </>
      )}
    </div>
  );
}