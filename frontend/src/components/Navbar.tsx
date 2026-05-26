import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Home, Book, Music, Sun, Moon, Coffee } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

export default function Navbar() {
  const { user } = useAuth();
  const { theme, setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  const themes = [
    { id: 'claro', icon: Sun, label: 'Claro' },
    { id: 'kraft', icon: Coffee, label: 'Kraft' },
    { id: 'oscuro', icon: Moon, label: 'Tinta Oscura' },
  ] as const;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-4 py-4 pointer-events-none">
      <div className="max-w-7xl mx-auto flex justify-between items-start pointer-events-auto">
        <Link to="/" className="zine-paper px-4 py-2 block hover:bg-amazon-sand/10">
          <h1 className="text-2xl font-display font-bold uppercase tracking-widest leading-none">
            Travesías
          </h1>
        </Link>

        <div className="flex flex-col items-end gap-2">
          <div className="flex gap-2">
             <div className="zine-paper flex gap-2 p-1 px-2 items-center bg-amazon-pulp">
              {themes.map((t) => {
                const Icon = t.icon;
                return (
                  <button
                    key={t.id}
                    onClick={() => setTheme(t.id)}
                    className={`p-2 transition-colors cursor-pointer rounded ${
                      theme === t.id ? 'bg-amazon-dark text-amazon-pulp' : 'hover:bg-amazon-sand/30'
                    }`}
                    title={t.label}
                  >
                    <Icon size={16} />
                  </button>
                );
              })}
            </div>

            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="zine-paper p-3 hover:bg-amazon-sand/10 transition-colors cursor-pointer"
            >
              {isOpen ? <X /> : <Menu />}
            </button>
          </div>

          <AnimatePresence>
            {isOpen && (
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="zine-paper p-6 min-w-[240px]"
              >
                <div className="flex flex-col gap-4 font-display font-medium text-lg">
                  <Link to="/" onClick={() => setIsOpen(false)} className="hover:text-amazon-green flex items-center gap-3">
                    <Home size={20} /> Inicio
                  </Link>
                  <Link to="/biblioteca" onClick={() => setIsOpen(false)} className="hover:text-amazon-green flex items-center gap-3">
                    <Book size={20} /> Biblioteca
                  </Link>
                  <Link to="/musica" onClick={() => setIsOpen(false)} className="hover:text-amazon-green flex items-center gap-3">
                    <Music size={20} /> Música
                  </Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </nav>
  );
}
