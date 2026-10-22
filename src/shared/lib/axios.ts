import axios from "axios";

// Cliente HTTP del backend de Vetzium. Interceptores (sesión, errores) se agregan
// cuando se defina la autenticación.
const api = axios.create({
  baseURL: import.meta.env.VITE_VETZIUM_API_URL,
});

export default api;
