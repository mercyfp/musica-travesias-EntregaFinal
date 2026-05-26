import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Check, X, Shield, Clock, Loader2 } from 'lucide-react';
import { API_URL } from '../config';
// import { useAuth } from '../context/AuthContext'; // Comentado temporalmente para evitar errores

export default function AdminPage() {
  const navigate = useNavigate();
  const [solicitudes, setSolicitudes] = useState([]);
  const [cargando, setCargando] = useState(true);

  // --- BYPASS TEMPORAL PARA LA PRESENTACIÓN ---
  const user = { role: 'admin', nombre: "Carlos Daniel" };
  const authLoading = false;
  // --------------------------------------------

  /* // LÓGICA REAL (Descomentar después de la presentación)
  const { user, loading: authLoading } = useAuth();
  useEffect(() => {
    if (!authLoading && (!user || user.role !== 'admin')) {
      navigate('/login');
    }
  }, [user, authLoading, navigate]);
  */

  const cargarDatos = async () => {
    try {
      const res = await fetch(`${API_URL}/api/solicitudes`);
      if (res.ok) {
        const data = await res.json();
        setSolicitudes(data);
      }
    } catch (error) {
      console.error("Error al conectar con la API:", error);
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    // Solo cargamos si tenemos el rol (que ahora está forzado arriba)
    if (user?.role === 'admin') {
      cargarDatos();
    }
  }, [user]);

  const gestionarSolicitud = async (id: string, nuevoEstado: string) => {
    try {
      const res = await fetch(`${API_URL}/api/solicitudes/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ estado: nuevoEstado })
      });

      if (res.ok) {
        setSolicitudes((prev: any) => 
          prev.map((s: any) => (s._id || s.id).toString() === id.toString() ? { ...s, estado: nuevoEstado } : s)
        );
      }
    } catch (error) {
      alert("Error al actualizar la solicitud");
    }
  };

  if (authLoading) return (
    <div className="h-screen flex items-center justify-center bg-amazon-pulp">
      <Loader2 className="animate-spin text-amazon-clay" size={48} />
    </div>
  );

  return (
    <div className="space-y-12 pb-32 text-amazon-dark">
      <header className="border-b-8 border-amazon-dark pb-6">
        <div className="flex items-center gap-4 text-amazon-clay mb-2">
          <Shield size={20} />
          <span className="font-display font-bold uppercase tracking-[0.2em] text-xs text-amazon-dark">Archivo Central de Moderación (MODO PRESENTACIÓN)</span>
        </div>
        <h2 className="text-6xl md:text-8xl font-bold uppercase tracking-tighter leading-none">
          Panel de <br /> <span className="text-amazon-green">Control</span>
        </h2>
      </header>

      {/* Estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="zine-paper bg-amazon-dark text-amazon-pulp p-6 border-4 border-amazon-dark shadow-zine">
          <p className="font-display uppercase text-xs font-bold opacity-80 tracking-widest">Total Solicitudes</p>
          <p className="text-5xl font-bold">{solicitudes.length}</p>
        </div>
        <div className="zine-paper bg-amazon-pulp p-6 border-4 border-amazon-dark shadow-zine text-amazon-dark">
          <p className="font-display uppercase text-xs font-bold text-amazon-clay tracking-widest">Pendientes</p>
          <p className="text-5xl font-bold">{solicitudes.filter((s: any) => s.estado === 'Pendiente').length}</p>
        </div>
        <div className="zine-paper bg-amazon-green text-white p-6 border-4 border-amazon-dark shadow-zine">
          <p className="font-display uppercase text-xs font-bold opacity-80 tracking-widest">Aceptadas</p>
          <p className="text-5xl font-bold">{solicitudes.filter((s: any) => s.estado === 'Aceptada').length}</p>
        </div>
      </div>

      <section className="space-y-6">
        <h3 className="text-3xl font-bold uppercase flex items-center gap-3 tracking-tighter">
          <Clock className="text-amazon-clay" size={28} /> Solicitudes de la Comunidad
        </h3>

        <div className="zine-paper bg-amazon-pulp border-4 border-amazon-dark overflow-hidden shadow-zine">
          {cargando ? (
            <div className="p-20 text-center space-y-4">
              <Loader2 className="animate-spin inline-block text-amazon-clay" size={32} />
              <p className="font-serif italic text-amazon-earth">Accediendo a los registros...</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-amazon-dark text-amazon-pulp uppercase text-[10px] font-bold tracking-[0.2em]">
                    <th className="p-5">Información del Tema</th>
                    <th className="p-5 text-center">Estado</th>
                    <th className="p-5 text-right">Acciones</th>
                  </tr>
                </thead>
                <tbody className="divide-y-2 divide-amazon-dark/10">
                  <AnimatePresence>
                    {solicitudes.map((req: any) => (
                      <motion.tr 
                        layout
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        key={req._id || req.id} 
                        className="group hover:bg-amazon-sand/10 transition-colors"
                      >
                        <td className="p-5">
                          <p className="font-bold text-xl uppercase leading-tight tracking-tight">{req.nombre_cancion}</p>
                          <p className="font-serif italic text-amazon-earth text-sm">{req.artista_sugerido}</p>
                        </td>
                        <td className="p-5 text-center">
                          <span className={`inline-block px-3 py-1 border-2 font-bold uppercase text-[9px] tracking-widest shadow-[2px_2px_0_0_#1a2f23] ${
                            req.estado === 'Aceptada' ? 'bg-amazon-green text-white border-amazon-dark' : 
                            req.estado === 'Rechazada' ? 'bg-amazon-clay text-white border-amazon-dark' : 
                            'bg-amazon-sand text-amazon-dark border-amazon-dark/20'
                          }`}>
                            {req.estado}
                          </span>
                        </td>
                        <td className="p-5 text-right">
                          <div className="flex justify-end gap-3">
                            <button 
                              onClick={() => gestionarSolicitud(req._id || req.id, 'Aceptada')}
                              className="p-3 border-2 border-amazon-dark bg-amazon-pulp hover:bg-amazon-green hover:text-white transition-all cursor-pointer shadow-[3px_3px_0_0_#1a2f23]"
                            >
                              <Check size={18} />
                            </button>
                            <button 
                              onClick={() => gestionarSolicitud(req._id || req.id, 'Rechazada')}
                              className="p-3 border-2 border-amazon-dark bg-amazon-pulp hover:bg-amazon-clay hover:text-white transition-all cursor-pointer shadow-[3px_3px_0_0_#1a2f23]"
                            >
                              <X size={18} />
                            </button>
                          </div>
                        </td>
                      </motion.tr>
                    ))}
                  </AnimatePresence>
                </tbody>
              </table>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}