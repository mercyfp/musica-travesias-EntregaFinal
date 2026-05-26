import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from '../components/Layout';
import Home from '../pages/Home';
import LoginPage from '../pages/LoginPage';
import AdminPage from '../pages/AdminPage';
import SubirPage from '../pages/SubirPage';
import Footer from '../components/Footer';
import BibliotecaPage from '../pages/BibliotecaPage';
import MusicaPage from '../pages/MusicaPage';
import ScrollToTop from '../components/ScrollToTop'; // Importamos el nuevo componente
import { AuthProvider } from '../context/AuthContext';
import { MusicProvider } from '../context/MusicContext';
import { ThemeProvider } from '../context/ThemeContext';

export default function AppRouter() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <MusicProvider>
          <Router>
            {/* ScrollToTop debe estar dentro del Router pero fuera del Layout */}
            <ScrollToTop /> 
            
            <Layout>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/biblioteca" element={<BibliotecaPage />} />
                <Route path="/musica" element={<MusicaPage />} />
                <Route path="/subir" element={<SubirPage />} />
                
                {/* Ruta de Administración */}
                <Route path="/admin" element={<AdminPage />} />
                
                {/* Redirección para rutas no encontradas */}
                <Route path="*" element={<Navigate to="/" />} />
              </Routes>

              {/* Footer global para todas las vistas */}
              <Footer />
            </Layout>
          </Router>
        </MusicProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}