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

export const crearMaceta = async (maceta: any) => {
  const response = await fetch(`${API_URL}/macetas`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(maceta)
  });

  if (!response.ok) {
    throw new Error('Error al crear la maceta');
  }

  return await response.json();
};


export const obtenerColores = async () => {
  const res = await fetch(`${API_URL}/macetas/colores`);
  return await res.json();
};

export const obtenerModelos = async () => {
  const res = await fetch(`${API_URL}/macetas/modelos`);
  return await res.json();
};

export const obtenerDisenos = async () => {
  const res = await fetch(`${API_URL}/macetas/disenos`);
  return await res.json();
};

export const obtenerTamanos = async () => {
  const res = await fetch(`${API_URL}/macetas/tamanos`);
  return await res.json();
};


export const eliminarMaceta = async (id: number) => {
  const res = await fetch(`${API_URL}/macetas/${id}`, {
    method: "DELETE"
  });

  if (!res.ok) {
    throw new Error("Error al eliminar");
  }
};

export const obtenerMacetaPorId = async (id: number) => {
  const res = await fetch(`${API_URL}/macetas/${id}`);
  return await res.json();
};

export const actualizarMaceta = async (id: number, maceta: any) => {
  const res = await fetch(`${API_URL}/macetas/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(maceta)
  });

  if (!res.ok) {
    throw new Error("Error al actualizar");
  }
};