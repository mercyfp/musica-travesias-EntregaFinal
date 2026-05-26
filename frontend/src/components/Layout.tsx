import { ReactNode } from 'react';
import Navbar from './Navbar';
import MusicPlayer from './MusicPlayer';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    // min-h-screen y flex-col aseguran que el footer siempre se empuje al fondo
    <div className="min-h-screen flex flex-col pt-24 zine-texture relative bg-amazon-pulp">
      <Navbar />
      
      {/* flex-grow hace que este contenedor ocupe todo el espacio disponible,
          empujando al Footer (que pusimos en AppRouter) hacia abajo.
      */}
      <main className="max-w-5xl mx-auto w-full px-4 flex-grow min-h-[70vh]">
        {children}
      </main>

      {/* El MusicPlayer suele ser fixed, así que su posición 
          aquí no afecta el flujo del Footer.
      */}
      <MusicPlayer />
    </div>
  );
}