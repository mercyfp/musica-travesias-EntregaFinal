import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { useAuth } from '../context/AuthContext';

export default function LoginPage() {
  const { login, user } = useAuth();
  const [email, setEmail] = useState('');

  if (user) return <Navigate to="/" />;

  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <motion.div 
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="zine-paper p-10 max-w-md w-full space-y-8 bg-amazon-pulp text-amazon-dark"
      >
        <div className="text-center">
          <h2 className="text-3xl font-bold uppercase tracking-tighter">Entrar a la Red</h2>
          <p className="font-serif italic text-amazon-earth text-lg mt-2">Únete a nuestra travesía territorial</p>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <label className="font-display uppercase text-xs font-bold tracking-widest">Correo Electrónico</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="tu@correo.com"
              className="w-full p-4 bg-amazon-sand/30 border-2 border-amazon-dark focus:bg-white outline-none font-display text-amazon-dark"
            />
          </div>
          <button 
            onClick={() => login(email)}
            disabled={!email}
            className="zine-btn zine-btn-primary w-full justify-center text-lg py-4"
          >
            Conectar
          </button>
        </div>

        <p className="text-center font-serif text-sm text-amazon-earth italic">
          Al entrar, verás contenidos exclusivos compartidos por la comunidad.
        </p>
      </motion.div>
    </div>
  );
}
