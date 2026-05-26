/**
 * URL base para todas las llamadas a la API de Travesías.
 * Si existe una variable de entorno la usa, de lo contrario usa localhost por defecto.
 */
export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3006';

// También puedes exportar rutas específicas si quieres ser más organizado
export const API_ROUTES = {
  CANCIONES: `${API_URL}/api/canciones`,
  SOLICITUDES: `${API_URL}/api/solicitudes`,
  LOGIN: `${API_URL}/api/auth/login`, // Ajusta según tus rutas reales
};