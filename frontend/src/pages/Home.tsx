import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Music, Book, Leaf, History, Play, Loader2, Heart } from 'lucide-react';
import { useMusic } from '../context/MusicContext';
import { API_URL } from '../config'; // Importamos la URL centralizada

export default function Home() {
  const { playSong, favoritos, toggleFavorito } = useMusic();
  const [cancionesRecientes, setCancionesRecientes] = useState([]);
  const [cargando, setCargando] = useState(true);

  // Cargamos las canciones reales desde la configuración global
  useEffect(() => {
    const fetchCanciones = async () => {
      try {
        const response = await fetch(`${API_URL}/api/canciones`);
        if (response.ok) {
          const data = await response.json();
          // Tomamos las últimas 5 para el flujo del Home
          setCancionesRecientes(data.slice(0, 5));
        }
      } catch (error) {
        // Manejo silencioso para la presentación
      } finally {
        setCargando(false);
      }
    };
    fetchCanciones();
  }, []);

  const ultimaCancion = cancionesRecientes[0];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-16 pb-20"
    >
      {/* Banner Principal - Estilo Zine Industrial */}
      <section className="relative zine-paper p-0 overflow-hidden group border-4 border-amazon-dark shadow-zine">
        <div className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1514525253344-f814d0729586?q=80&w=1000&auto=format&fit=crop')] bg-cover bg-center group-hover:scale-105 transition-transform duration-1000" />
        <div className="relative p-12 md:p-20 flex flex-col items-center text-center space-y-6 bg-amazon-pulp/40 backdrop-blur-sm">
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="w-24 h-24 bg-amazon-pulp rounded-full flex items-center justify-center text-amazon-dark mb-4 border-4 border-amazon-dark shadow-[4px_4px_0_0_#1a2f23]"
          >
            <Music size={48} />
          </motion.div>
          <h2 className="text-4xl md:text-7xl font-bold uppercase tracking-tighter leading-none text-amazon-dark">
            Catálogo Musical <br /> <span className="text-amazon-clay italic">Travesías</span>
          </h2>
          <p className="max-w-xl mx-auto text-xl font-serif italic text-amazon-earth">
            "Explora la memoria sonora y los ritmos de nuestra comunidad."
          </p>
        </div>
      </section>

      {/* Accesos Rápidos con Efecto Zine */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Link to="/musica" className="zine-tab group bg-amazon-green text-amazon-pulp border-4 border-amazon-dark hover:shadow-[8px_8px_0_0_#1a2f23] transition-all">
          <div className="flex items-center justify-between p-8">
            <div className="space-y-2">
              <h3 className="text-4xl font-bold uppercase tracking-tight">Música</h3>
              <p className="font-serif italic text-amazon-pulp/80 text-lg">Explora el territorio</p>
            </div>
            <Music size={64} className="opacity-30 group-hover:opacity-100 transition-opacity" />
          </div>
        </Link>
        <Link to="/biblioteca" className="zine-tab group bg-amazon-clay text-amazon-pulp border-4 border-amazon-dark hover:shadow-[8px_8px_0_0_#1a2f23] transition-all">
          <div className="flex items-center justify-between p-8">
            <div className="space-y-2">
              <h3 className="text-4xl font-bold uppercase tracking-tight">Biblioteca</h3>
              <p className="font-serif italic text-amazon-pulp/80 text-lg">Saberes locales</p>
            </div>
            <Book size={64} className="opacity-30 group-hover:opacity-100 transition-opacity" />
          </div>
        </Link>
      </section>

      {/* Música Recomendada Dinámica */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 text-amazon-dark">
        {/* Canciones Populares */}
        <section className="lg:col-span-1 space-y-6">
          <h3 className="font-display uppercase font-bold tracking-widest text-amazon-clay flex items-center gap-2">
            <Leaf size={18} /> Recomendadas
          </h3>
          <div className="zine-paper p-6 space-y-4 bg-amazon-pulp border-4 border-amazon-dark shadow-zine">
            {cargando ? (
               <div className="flex justify-center py-10"><Loader2 className="animate-spin text-amazon-clay" /></div>
            ) : cancionesRecientes.slice(0, 4).map((song: any, i) => (
              <div 
                key={song._id} 
                onClick={() => playSong(song, cancionesRecientes)}
                className="flex items-center justify-between border-b-2 border-amazon-dark/10 pb-3 group cursor-pointer hover:bg-amazon-sand/20 transition-colors px-2"
              >
                <div className="flex items-center gap-4">
                  <span className="font-display font-bold text-amazon-earth">{i+1}</span>
                  <div>
                    <p className="font-bold uppercase text-sm leading-none tracking-tight">{song.titulo}</p>
                    <p className="font-serif italic text-[10px] text-amazon-earth mt-1">{song.artista}</p>
                  </div>
                </div>
                <Play size={14} className="opacity-0 group-hover:opacity-100 text-amazon-green" />
              </div>
            ))}
            <Link to="/musica" className="block text-center text-[10px] font-bold uppercase tracking-widest hover:text-amazon-green py-3 border-t-2 border-amazon-dark/10 mt-2">Ver todo el catálogo</Link>
          </div>
        </section>

        {/* Portadas Recientes */}
        <section className="lg:col-span-2 space-y-6">
          <h3 className="font-display uppercase font-bold tracking-widest text-amazon-clay flex items-center gap-2">
            <Music size={18} /> Portadas Recientes
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {cancionesRecientes.slice(0, 2).map((song: any) => {
              const songId = (song._id || song.id).toString();
              return (
                <div 
                  key={songId} 
                  className="zine-paper p-4 group bg-amazon-pulp border-4 border-amazon-dark hover:shadow-zine transition-all relative"
                >
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorito(songId);
                    }}
                    className="absolute top-6 right-6 z-10 p-2 bg-amazon-pulp border-2 border-amazon-dark rounded-full cursor-pointer hover:scale-110 transition-transform shadow-zine"
                  >
                    <Heart 
                      size={16} 
                      className={favoritos.includes(songId) ? "text-amazon-clay fill-amazon-clay" : "text-amazon-dark"} 
                    />
                  </button>

                  <div 
                    onClick={() => playSong(song, cancionesRecientes)}
                    className="aspect-square bg-amazon-dark border-2 border-amazon-dark mb-4 overflow-hidden cursor-pointer"
                  >
                    <img 
                      src={song.portada_url ? `${API_URL}${song.portada_url}` : 'https://via.placeholder.com/400'} 
                      className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500" 
                      alt={song.titulo}
                    />
                  </div>
                  <h4 className="font-bold uppercase tracking-tight truncate text-xl">{song.titulo}</h4>
                  <p className="font-serif italic text-amazon-earth leading-none">{song.artista}</p>
                </div>
              );
            })}
          </div>
        </section>
      </div>

      {/* Banner de Novedad */}
      {ultimaCancion && (
        <section className="space-y-6 text-amazon-dark">
          <h3 className="font-display uppercase font-bold tracking-widest text-amazon-clay flex items-center gap-2">
            <History size={18} /> Novedad en la Plataforma
          </h3>
          <div className="zine-paper p-8 bg-amazon-sand/10 border-4 border-dashed border-amazon-dark shadow-zine">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="w-24 h-24 bg-amazon-dark shrink-0 flex items-center justify-center text-amazon-pulp font-display font-bold text-3xl shadow-zine border-2 border-amazon-pulp">
                NEW
              </div>
              <div className="flex-1 text-center md:text-left">
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-amazon-clay bg-amazon-pulp px-3 py-1 border border-amazon-dark inline-block mb-3">Último ingreso</span>
                <h4 className="text-4xl font-bold uppercase leading-tight tracking-tighter">{ultimaCancion.titulo}</h4>
                <p className="font-serif italic text-amazon-earth text-xl">{ultimaCancion.artista}</p>
              </div>
              <button 
                onClick={() => playSong(ultimaCancion, cancionesRecientes)}
                className="px-10 py-5 bg-amazon-dark text-white font-bold hover:bg-amazon-clay transition-all cursor-pointer shadow-zine uppercase tracking-widest text-sm border-2 border-amazon-dark"
              >
                Escuchar ahora
              </button>
            </div>
          </div>
        </section>
      )}
    </motion.div>
  );
}