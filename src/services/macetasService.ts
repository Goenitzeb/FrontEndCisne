import { type Maceta } from '../types/maceta';

// Leemos la URL de las variables de entorno de Vite
const API_URL = import.meta.env.VITE_API_URL;

export const obtenerMacetas = async (): Promise<Maceta[]> => {
  try {
    console.debug(`${API_URL}/macetas`);
    const response = await fetch(`${API_URL}/macetas`); 
    
    
    if (!response.ok) {
      throw new Error(`Error en la petición: ${response.statusText}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error obteniendo las macetas:", error);
    throw error; 
  }
};