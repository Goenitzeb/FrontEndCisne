import { type Maceta } from '../types/maceta';

// Leemos la URL de las variables de entorno de Vite
const API_URL = import.meta.env.VITE_API_URL;

export const obtenerMacetas = async (): Promise<Maceta[]> => {
  try {
    console.debug(`${API_URL}/Macetas`);
    console.log(`${API_URL}/Macetas`)
    const response = await fetch(`${API_URL}/Macetas`); 
    
    
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

export const crearMaceta = async (datosMaceta: any) => {
  try {
    const response = await fetch(`${API_URL}/macetas`, {
      method: 'POST', // Indicamos que queremos CREAR un recurso
      headers: {
        'Content-Type': 'application/json', // Le decimos a la API que le enviamos JSON
      },
      body: JSON.stringify(datosMaceta), // Convertimos nuestro objeto de JS a texto JSON
    });

    if (!response.ok) {
      throw new Error(`Error al crear la maceta: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error creando la maceta:", error);
    throw error;

  }
};