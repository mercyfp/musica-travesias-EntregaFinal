import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ChevronLeft, Upload, Music, Image as ImageIcon, Tags, Loader2 } from 'lucide-react';
import { API_URL } from '../config'; // Importamos la URL centralizada

export default function SubirPage() {
  const navigate = useNavigate();
  const [subiendo, setSubiendo] = useState(false);

  const handleSubir = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubiendo(true);
    
    const formData = new FormData(e.currentTarget);

    try {
      const response = await fetch(`${API_URL}/api/canciones`, {
        method: 'POST',
        headers: {
          // No añadimos 'Content-Type': 'multipart/form-data' manualmente
          // El navegador lo hace solo al enviar un FormData
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: formData 
      });

      if (response.ok) {
        alert("¡Música cargada con éxito a la plataforma!");
        navigate('/musica'); // Usamos el hook navigate en lugar de window.location
      } else {
        const errorData = await response.json();
        alert(`Error al subir: ${errorData.error || 'Verifica los archivos.'}`);
      }
    } catch (error) {
      console.error(error);
      alert("Error de conexión con el servidor. Verifica que el backend esté encendido.");
    } finally {
      setSubiendo(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8 text-amazon-dark pb-20">
      <Link to="/musica" className="flex items-center gap-2 font-display text-amazon-clay font-bold transition-colors hover:text-amazon-dark">
        <ChevronLeft size={16} /> Volver al Catálogo
      </Link>
      
      <div className="space-y-2">
        <h2 className="text-5xl md:text-6xl uppercase font-bold tracking-tighter leading-none">Cargar Melodía</h2>
        <p className="font-serif italic text-amazon-earth">Agrega nuevas piezas al archivo sonoro del Caquetá.</p>
      </div>

      <form onSubmit={handleSubir} className="zine-paper p-8 space-y-6 bg-amazon-pulp border-4 border-amazon-dark shadow-zine">
        <div className="space-y-4">
          {/* Título */}
          <div className="space-y-2">
            <label className="font-display uppercase text-[10px] font-bold tracking-widest text-amazon-clay">Título del Tema</label>
            <input 
              name="titulo" 
              type="text" 
              required 
              disabled={subiendo}
              className="w-full p-4 border-2 border-amazon-dark bg-amazon-sand/5 outline-none font-serif italic text-lg focus:bg-white transition-all disabled:opacity-50" 
            />
          </div>

          {/* Artista */}
          <div className="space-y-2">
            <label className="font-display uppercase text-[10px] font-bold tracking-widest text-amazon-clay">Artista o Comunidad</label>
            <input 
              name="artista" 
              type="text" 
              required 
              disabled={subiendo}
              className="w-full p-4 border-2 border-amazon-dark bg-amazon-sand/5 outline-none font-serif italic text-lg focus:bg-white transition-all disabled:opacity-50" 
            />
          </div>

          {/* Género */}
          <div className="space-y-2">
            <label className="font-display uppercase text-[10px] font-bold tracking-widest text-amazon-clay flex items-center gap-2">
              <Tags size={14} /> Género Musical
            </label>
            <div className="relative">
              <select 
                name="genero" 
                required 
                disabled={subiendo}
                className="w-full p-4 border-2 border-amazon-dark bg-amazon-sand/5 outline-none font-serif italic text-lg focus:bg-white transition-all appearance-none cursor-pointer disabled:opacity-50"
              >
                <option value="" disabled selected>Selecciona un género...</option>
                <option value="Popular">Popular</option>
                <option value="Vallenato">Vallenato</option>
                <option value="Ranchera">Ranchera</option>
                <option value="Reggaetón">Reggaetón</option>
                <option value="Cristiana">Cristiana</option>
                <option value="Instrumental">Instrumental</option>
                <option value="Tradicional">Tradicional</option>
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                <ChevronLeft size={16} className="-rotate-90 text-amazon-clay" />
              </div>
            </div>
          </div>

          {/* Archivos */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
            <div className="space-y-2">
              <label className="font-display uppercase text-[10px] font-bold tracking-widest text-amazon-clay flex items-center gap-2">
                <Music size={14} /> Archivo MP3
              </label>
              <input 
                name="audio" 
                type="file" 
                accept="audio/mpeg,audio/mp3" 
                required 
                disabled={subiendo}
                className="text-xs file:zine-paper file:bg-amazon-dark file:text-white file:border-none file:mr-4 file:px-4 file:py-2 file:cursor-pointer hover:file:bg-amazon-clay transition-all disabled:opacity-50" 
              />
            </div>

            <div className="space-y-2">
              <label className="font-display uppercase text-[10px] font-bold tracking-widest text-amazon-clay flex items-center gap-2">
                <ImageIcon size={14} /> Portada (Opcional)
              </label>
              <input 
                name="portada" 
                type="file" 
                accept="image/*" 
                disabled={subiendo}
                className="text-xs file:zine-paper file:bg-amazon-clay file:text-white file:border-none file:mr-4 file:px-4 file:py-2 file:cursor-pointer hover:file:bg-amazon-dark transition-all disabled:opacity-50" 
              />
            </div>
          </div>
        </div>

        <button 
          type="submit" 
          disabled={subiendo}
          className="w-full justify-center py-5 bg-amazon-dark text-amazon-pulp font-bold uppercase tracking-[0.2em] text-xs flex items-center gap-3 cursor-pointer hover:bg-amazon-clay transition-all shadow-zine disabled:bg-amazon-earth disabled:cursor-not-allowed"
        >
          {subiendo ? (
            <>
              <Loader2 size={20} className="animate-spin" /> PUBLICANDO TEMA...
            </>
          ) : (
            <>
              <Upload size={20} /> PUBLICAR EN TRAVESÍAS
            </>
          )}
        </button>
      </form>
      
      <p className="text-center font-serif italic text-[10px] text-amazon-earth opacity-60">
        Recuerda que todos los archivos subidos deben respetar los derechos de autor y la identidad cultural.
      </p>
    </div>
  );
}