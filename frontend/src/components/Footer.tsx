import { Link } from 'react-router-dom';
import { ShieldCheck, Github, Users } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="mt-20 border-t-4 border-amazon-dark bg-amazon-pulp py-12 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
        
        {/* Columna 1: Identidad Sonora */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 font-bold text-2xl uppercase tracking-tighter text-amazon-dark">
            <div className="bg-amazon-dark text-amazon-pulp px-2 py-1">TRA</div>
            <span>VESÍAS</span>
          </div>
          <p className="font-serif italic text-amazon-earth text-sm max-w-xs leading-relaxed">
            Plataforma de memoria sonora y ritmos territoriales. 
            Un registro del paisaje auditivo amazónico.
          </p>
        </div>

        {/* Columna 2: Navegación Estilo Fanzine */}
        <div className="flex flex-col gap-2 uppercase font-bold text-[10px] tracking-[0.2em] text-amazon-dark">
          <span className="text-amazon-clay mb-2 opacity-50">— Explorar —</span>
          <Link to="/musica" className="hover:text-amazon-green transition-colors w-fit">Catálogo</Link>
          <Link to="/biblioteca" className="hover:text-amazon-green transition-colors w-fit">Mi Biblioteca</Link>
          <Link to="/subir" className="hover:text-amazon-green transition-colors w-fit">Aportar Música</Link>
        </div>

        {/* Columna 3: Créditos del Equipo y Admin */}
        <div className="flex flex-col justify-between items-start md:items-end gap-6 md:text-right text-amazon-dark">
          <div className="flex gap-4">
            <a href="https://github.com" target="_blank" rel="noreferrer" className="p-2 border-2 border-amazon-dark hover:bg-amazon-dark hover:text-white transition-all shadow-[2px_2px_0_0_#1a2f23]">
              <Github size={18} />
            </a>
          </div>
          
          <div className="flex flex-col md:items-end space-y-2">
            <div className="flex items-center gap-2 text-amazon-clay opacity-80 md:justify-end">
              <span className="text-[9px] font-bold uppercase tracking-widest">Desarrollado por</span>
              <Users size={12} />
            </div>
            
            <div className="text-[10px] font-bold uppercase tracking-tighter leading-tight flex flex-col gap-1 opacity-60">
              <p>Mercy Dayanna Florez Parra</p>
              <p>Carlos Daniel Gomez Murcia</p>
              <p>Esteban ...</p> {/* Puedes añadir el apellido de Esteban aquí */}
            </div>

            <p className="text-[8px] font-display uppercase tracking-[0.3em] opacity-30 mt-2">
              © 2026 Universidad de la Amazonia
            </p>

            {/* Acceso discreto al Admin */}
            <Link 
              to="/admin" 
              className="flex items-center gap-1 text-[9px] font-bold uppercase mt-4 opacity-10 hover:opacity-100 hover:text-amazon-clay transition-all"
            >
              <ShieldCheck size={10} /> Consola de Moderación
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}