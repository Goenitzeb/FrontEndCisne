// src/components/NuevaMaceta.tsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { crearMaceta } from '../services/macetasService';
import type { AtributoMaceta } from '../types/maceta'; // Importamos la interfaz que creamos antes
 // Importamos la interfaz que creamos antes
import './NuevaMaceta.css';

// Obtenemos la URL base desde las variables de entorno
const API_URL = import.meta.env.VITE_API_URL;

const NuevaMaceta = () => {
  const navigate = useNavigate();
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Estados para guardar las listas que vienen de la API
  const [colores, setColores] = useState<AtributoMaceta[]>([]);
  const [disenos, setDisenos] = useState<AtributoMaceta[]>([]);
  const [tamanos, setTamanos] = useState<AtributoMaceta[]>([]);
  const [modelos, setModelos] = useState<AtributoMaceta[]>([]);

  const [formulario, setFormulario] = useState({
    nombre: '',
    stock: '',
    precio: '',
    color_id: '',
    diseno_id: '',
    tamano_id: '',
    modelo_id: ''
  });

  // useEffect para descargar las opciones de la API al abrir la página
  useEffect(() => {
    const cargarOpciones = async () => {
      try {
        // Hacemos las 4 peticiones al mismo tiempo para que sea súper rápido
        const [resColores, resDisenos, resTamanos, resModelos] = await Promise.all([
          fetch(`${API_URL}/color`),
          fetch(`${API_URL}/diseno`),
          fetch(`${API_URL}/tamano`),
          fetch(`${API_URL}/modelo`)
        ]);

        // Convertimos las respuestas a JSON y actualizamos los estados
        setColores(await resColores.json());
        setDisenos(await resDisenos.json());
        setTamanos(await resTamanos.json());
        setModelos(await resModelos.json());
      } catch (err) {
        console.error("Error cargando opciones de la API:", err);
        // Aquí podrías poner un setError si falla la carga inicial
      }
    };

    cargarOpciones();
  }, []); // El arreglo vacío [] asegura que esto solo pase 1 vez al cargar la página

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormulario({
      ...formulario,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); 
    setCargando(true);
    setError(null);

    const stockNumero = Number(formulario.stock);
    const precioNumero = Number(formulario.precio);

    if (stockNumero < 0) {
      setError('El stock no puede ser un número negativo.');
      setCargando(false);
      return; 
    }

    if (precioNumero <= 0) {
      setError('El precio debe ser mayor a $0.');
      setCargando(false);
      return; 
    }

    try {
      const datosParaEnviar = {
        ...formulario,
        stock: stockNumero,
        precio: precioNumero,
        // Convertimos los IDs foráneos a números, ya que los select los guardan como texto
        color_id: Number(formulario.color_id),
        diseno_id: Number(formulario.diseno_id),
        tamano_id: Number(formulario.tamano_id),
        modelo_id: Number(formulario.modelo_id)
      };

      await crearMaceta(datosParaEnviar);
      alert('¡Maceta creada con éxito! 🪴');
      navigate('/macetas'); 
    } catch (err) {
      setError('Hubo un problema al guardar la maceta. Revisa los datos.');
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="contenedor-formulario">
      <h2 style={{ color: '#2e7d32' }}>🌱 Registrar Nueva Maceta</h2>
      
      {error && <p className="mensaje-error">{error}</p>}

      <form onSubmit={handleSubmit} className="formulario-maceta">
        {/* --- DATOS GENERALES --- */}
        <div className="grupo-input">
          <label>Nombre de la Maceta:</label>
          <input type="text" name="nombre" required value={formulario.nombre} onChange={handleChange} placeholder="Ej. Maceta Orquídea" />
        </div>

        <div className="fila-inputs">
          <div className="grupo-input">
            <label>Stock (Cantidad):</label>
            <input 
              type="number" name="stock" required min="0" step="1" value={formulario.stock} onChange={handleChange}
              onKeyDown={(e) => { if (['-', 'e', 'E', '+'].includes(e.key)) e.preventDefault(); }}
            />
          </div>
          <div className="grupo-input">
            <label>Precio ($):</label>
            <input 
              type="number" name="precio" required min="0.01" step="0.01" value={formulario.precio} onChange={handleChange}
              onKeyDown={(e) => { if (['-', 'e', 'E', '+'].includes(e.key)) e.preventDefault(); }}
            />
          </div>
        </div>

        {/* --- SECCIÓN DE LLAVES FORÁNEAS (LISTAS DESPLEGABLES) --- */}
        <hr className="divisor" />

        <div className="fila-inputs">
          <div className="grupo-input">
            <label>Modelo:</label>
            <select name="modelo_id" required value={formulario.modelo_id} onChange={handleChange}>
              <option value="">-- Selecciona un modelo --</option>
              {modelos.map((modelo) => (
                <option key={modelo.id} value={modelo.id}>{modelo.nombre}</option>
              ))}
            </select>
          </div>
          <div className="grupo-input">
            <label>Diseño:</label>
            <select name="diseno_id" required value={formulario.diseno_id} onChange={handleChange}>
              <option value="">-- Selecciona un diseño --</option>
              {disenos.map((diseno) => (
                <option key={diseno.id} value={diseno.id}>{diseno.nombre}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="fila-inputs">
          <div className="grupo-input">
            <label>Color:</label>
            <select name="color_id" required value={formulario.color_id} onChange={handleChange}>
              <option value="">-- Selecciona un color --</option>
              {colores.map((color) => (
                <option key={color.id} value={color.id}>{color.nombre}</option>
              ))}
            </select>
          </div>
          <div className="grupo-input">
            <label>Tamaño:</label>
            <select name="tamano_id" required value={formulario.tamano_id} onChange={handleChange}>
              <option value="">-- Selecciona un tamaño --</option>
              {tamanos.map((tamano) => (
                <option key={tamano.id} value={tamano.id}>{tamano.nombre}</option>
              ))}
            </select>
          </div>
        </div>

        <button type="submit" className="btn-guardar" disabled={cargando}>
          {cargando ? 'Guardando...' : 'Guardar Maceta'}
        </button>
      </form>
    </div>
  );
};

export default NuevaMaceta;