import { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Search, ChevronLeft, Play, Pause, Music, History, Plus, Heart, Loader2 } from 'lucide-react';
import { useMusic } from '../context/MusicContext';
import { useAuth } from '../context/AuthContext';
import { API_URL } from '../config'; // Importamos la URL centralizada

export default function MusicaPage() {
  const { playSong, currentSong, isPlaying, togglePlay, favoritos, toggleFavorito } = useMusic();
  const { user } = useAuth(); 
  
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todas');
  
  const [cancionesReales, setCancionesReales] = useState([]);
  const [solicitudesReales, setSolicitudesReales] = useState([]); 
  const [cargandoDatos, setCargandoDatos] = useState(true);

  const [nombreCancion, setNombreCancion] = useState('');
  const [artistaSugerido, setArtistaSugerido] = useState('');
  const [enviandoSolicitud, setEnviandoSolicitud] = useState(false);

  const cargarTodo = async () => {
    try {
      const [resSongs, resRequests] = await Promise.all([
        fetch(`${API_URL}/api/canciones`),
        fetch(`${API_URL}/api/solicitudes`)
      ]);

      if (resSongs.ok) setCancionesReales(await resSongs.json());
      if (resRequests.ok) setSolicitudesReales(await resRequests.json());
    } catch (error) {
      // Error manejado silenciosamente para la experiencia de usuario
    } finally {
      setCargandoDatos(false);
    }
  };

  useEffect(() => {
    cargarTodo();
  }, []);

  const categories = ['Todas', 'Popular', 'Vallenato', 'Ranchera', 'Reggaetón', 'Cristiana', 'Instrumental', 'Tradicional'];

  const filteredSongs = useMemo(() => {
    return cancionesReales.filter(song => {
      const matchesSearch = song.titulo.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            song.artista.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'Todas' || song.genero === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory, cancionesReales]);

  const handleEnviarSolicitud = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!nombreCancion || !artistaSugerido) return alert("Completa los datos para la comunidad.");

    setEnviandoSolicitud(true);
    try {
      const response = await fetch(`${API_URL}/api/solicitudes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nombre_cancion: nombreCancion, artista_sugerido: artistaSugerido })
      });
      if (response.ok) {
        setNombreCancion('');
        setArtistaSugerido('');
        cargarTodo();
      }
    } catch (error) {
      // Error manejado silenciosamente
    } finally {
      setEnviandoSolicitud(false);
    }
  };

  return (
    <div className="space-y-12 text-amazon-dark pb-32">
      <header className="space-y-8">
        <div className="flex flex-col md:flex-row justify-between items-end gap-6">
          <div>
            <Link to="/" className="flex items-center gap-2 font-display text-amazon-clay font-bold mb-4 uppercase text-xs tracking-widest hover:text-amazon-dark transition-colors">
              <ChevronLeft size={14} /> Volver al Inicio
            </Link>
            <div className="flex items-center gap-6">
              <h2 className="text-5xl md:text-7xl uppercase font-bold tracking-tighter leading-none">Música</h2>
              
              {/* ACCESO RESTRINGIDO: Solo visible para administradores */}
              {user?.role === 'admin' && (
                <Link to="/subir" className="zine-paper bg-amazon-dark text-amazon-pulp px-4 py-2 text-[10px] font-bold uppercase tracking-widest hover:bg-amazon-clay transition-colors shadow-zine">
                  <Plus size={14} className="inline mr-1" /> Subir Tema
                </Link>
              )}
            </div>
          </div>
          <div className="w-full md:w-96 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-amazon-earth" size={20} />
            <input 
              type="text" 
              placeholder="Buscar en el archivo..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full p-4 pl-12 bg-amazon-sand/10 border-4 border-amazon-dark outline-none font-serif italic text-lg focus:bg-white transition-all shadow-zine"
            />
          </div>
        </div>

        <div className="flex flex-wrap gap-3 pb-4">
          {categories.map((cat) => (
            <button 
              key={cat} 
              onClick={() => setSelectedCategory(cat)}
              className={`px-6 py-2 border-2 border-amazon-dark font-display uppercase font-bold text-[10px] tracking-widest cursor-pointer transition-all ${
                selectedCategory === cat ? 'bg-amazon-dark text-amazon-pulp shadow-zine' : 'bg-amazon-pulp hover:bg-amazon-sand'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </header>

      {/* Grid de Canciones */}
      {cargandoDatos ? (
        <div className="flex flex-col items-center py-24 gap-4">
          <Loader2 className="animate-spin text-amazon-clay" size={40} />
          <p className="font-serif italic text-amazon-earth">Sintonizando el territorio...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence>
            {filteredSongs.map((song) => (
              <motion.div 
                layout 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                key={song._id} 
                className="zine-paper group overflow-hidden flex flex-col bg-amazon-pulp border-4 border-amazon-dark relative shadow-zine"
              >
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFavorito(song._id.toString());
                  }}
                  className="absolute top-4 right-4 z-20 p-2 bg-amazon-pulp border-2 border-amazon-dark rounded-full hover:scale-110 transition-transform cursor-pointer shadow-zine"
                >
                  <Heart 
                    size={16} 
                    className={favoritos.includes(song._id.toString()) ? "text-amazon-clay fill-amazon-clay" : "text-amazon-dark"} 
                  />
                </button>

                <div className="aspect-square relative overflow-hidden bg-amazon-dark border-b-4 border-amazon-dark">
                  <img 
                    src={song.portada_url ? `${API_URL}${song.portada_url}` : 'https://via.placeholder.com/400'} 
                    className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-all duration-700 group-hover:scale-105" 
                    alt={song.titulo}
                  />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-amazon-dark/20 backdrop-blur-[2px]">
                    <button 
                      onClick={() => {
                        const songId = (song._id || song.id).toString();
                        const currentId = (currentSong?.id || currentSong?._id)?.toString();

                        if (currentId === songId) {
                          togglePlay();
                        } else {
                          playSong(song, filteredSongs);
                        }
                      }}
                      className="w-20 h-20 bg-amazon-pulp rounded-full flex items-center justify-center border-4 border-amazon-dark shadow-zine cursor-pointer hover:scale-110 transition-transform"
                    >
                      {((currentSong?._id || currentSong?.id)?.toString() === song._id.toString()) && isPlaying ? (
                        <Pause size={32} />
                      ) : (
                        <Play size={32} className="ml-1" />
                      )}
                    </button>
                  </div>
                </div>
                <div className="p-6 space-y-1">
                  <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-amazon-clay border border-amazon-clay/30 px-2 py-0.5">{song.genero || 'General'}</span>
                  <h3 className="text-2xl font-bold uppercase truncate tracking-tighter">{song.titulo}</h3>
                  <p className="font-serif italic text-amazon-earth text-sm">{song.artista}</p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      {/* Sección Inferior: Solicitudes */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-24 pt-16 border-t-8 border-amazon-dark">
        <section className="space-y-6">
          <h3 className="text-3xl font-bold uppercase tracking-tighter flex items-center gap-3">
            <Plus className="text-amazon-clay" size={28} /> Proponer Melodía
          </h3>
          <div className="zine-paper p-8 space-y-6 bg-amazon-pulp border-4 border-amazon-dark shadow-zine">
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest opacity-60">Título Sugerido</label>
              <input 
                type="text" 
                value={nombreCancion} 
                onChange={(e) => setNombreCancion(e.target.value)} 
                className="w-full p-4 border-2 border-amazon-dark bg-amazon-sand/5 font-serif italic text-lg outline-none focus:bg-white transition-all" 
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest opacity-60">Artista o Comunidad</label>
              <input 
                type="text" 
                value={artistaSugerido} 
                onChange={(e) => setArtistaSugerido(e.target.value)} 
                className="w-full p-4 border-2 border-amazon-dark bg-amazon-sand/5 font-serif italic text-lg outline-none focus:bg-white transition-all" 
              />
            </div>
            <button 
              onClick={handleEnviarSolicitud} 
              disabled={enviandoSolicitud} 
              className="w-full py-5 bg-amazon-dark text-amazon-pulp font-bold uppercase tracking-[0.2em] text-xs hover:bg-amazon-clay transition-all cursor-pointer shadow-zine disabled:opacity-50"
            >
              {enviandoSolicitud ? 'Procesando...' : 'Registrar Solicitud'}
            </button>
          </div>
        </section>

        <section className="space-y-6">
          <h3 className="text-3xl font-bold uppercase tracking-tighter flex items-center gap-3">
            <History className="text-amazon-green" size={28} /> Estado de Solicitudes
          </h3>
          <div className="zine-paper p-8 bg-amazon-sand/5 border-4 border-dashed border-amazon-dark min-h-[350px]">
            {solicitudesReales.length > 0 ? (
              <ul className="space-y-6">
                {solicitudesReales.slice(0, 6).map((req: any) => (
                  <li key={req._id} className="flex justify-between items-start border-b-2 border-amazon-dark/10 pb-4 group">
                    <div>
                      <p className="font-bold uppercase text-base group-hover:text-amazon-clay transition-colors leading-tight">{req.nombre_cancion}</p>
                      <p className="text-[11px] font-serif italic text-amazon-earth mt-1">{req.artista_sugerido}</p>
                    </div>
                    <span className={`text-[8px] px-2 py-1 border-2 font-bold uppercase tracking-tighter shadow-[2px_2px_0_0_#1a2f23] whitespace-nowrap ${
                      req.estado === 'Aceptada' ? 'bg-amazon-green text-white border-amazon-dark' : 
                      req.estado === 'Rechazada' ? 'bg-amazon-clay text-white border-amazon-dark' : 
                      'bg-amazon-sand text-amazon-dark border-amazon-dark/20'
                    }`}>
                      {req.estado}
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="h-full flex items-center justify-center py-20">
                <p className="font-serif italic text-amazon-earth opacity-40">No hay registros pendientes en el archivo.</p>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}