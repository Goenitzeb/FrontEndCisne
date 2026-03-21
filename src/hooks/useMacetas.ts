// src/hooks/useMacetas.ts
import { useState, useEffect } from 'react';
import { type Maceta } from '../types/maceta';
import { obtenerMacetas } from '../services/macetasService';

export const useMacetas = () => {
  const [macetas, setMacetas] = useState<Maceta[]>([]);
  const [cargando, setCargando] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Función autoejecutable para poder usar async/await dentro de useEffect
    const cargarDatos = async () => {
      try {
        setCargando(true);
        const data = await obtenerMacetas();
        setMacetas(data);
      } catch (err) {
        setError('No se pudieron cargar las macetas. Intenta de nuevo más tarde.');
      } finally {
        setCargando(false);
      }
    };

    cargarDatos();
  }, []); // El arreglo vacío indica que esto se ejecuta solo una vez al montar el componente

  return { macetas, cargando, error };
};