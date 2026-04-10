// src/components/ListaMacetas.tsx
import { useState } from 'react';
import { useMacetas } from '../hooks/useMacetas';
<<<<<<< Feature1
import './listaMacetas.css';

const ListaMacetas = () => {
=======
import { eliminarMaceta } from "../services/macetasService";
import { useNavigate } from "react-router-dom";

const eliminar = async (id: number) => {
  if (!confirm("¿Seguro que quieres eliminar esta maceta?")) return;

  try {
    await eliminarMaceta(id);
    window.location.reload(); // Esto lo tenemos que cambiar
  } catch (error) {
    console.error(error);
  }
};


const ListaMacetas = () => {
  const navigate = useNavigate();

  // Solo llamamos a nuestro hook y desestructuramos lo que necesitamos
>>>>>>> main
  const { macetas, cargando, error } = useMacetas();
  const [busqueda, setBusqueda] = useState('');

  const editarMaceta = (id: number) => {
    navigate(`/editar/${id}`);
  };

  if (cargando) return <p>Cargando inventario de macetas... ⏳</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  const macetasFiltradas = macetas.filter((maceta) =>
    maceta.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <div>
<<<<<<< Feature1
      {/* Contenedor Superior: Título y Buscador juntos */}
      <div className="cabecera-inventario">
        <h2 style={{ color: '#2e7d32', margin: 0 }}>📦 Inventario Actual</h2>
        
        <div className="buscador-wrapper">
          <span className="icono-lupa">🔍</span>
          <input
            type="text"
            placeholder="Buscar maceta por nombre..."
            className="buscador-input"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
          />
        </div>
      </div>

      {/* Tabla */}
      <div className="contenedor-tabla">
        <table className="tabla-macetas">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Modelo</th>
              <th>Diseño</th>
              <th>Color</th>
              <th>Tamaño</th>
              <th>Stock</th>
              <th>Precio</th>
=======
      <h2>Inventario Actual</h2>
      
       <table border={1}>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Color</th>
            <th>Diseño</th>
            <th>Modelo</th>
            <th>Tamaño</th>
            <th>Precio</th>
            <th>Stock</th>
            <th>Acciones</th>
          </tr>
        </thead>

        <tbody>
          {macetas.map((maceta) => (
            <tr key={maceta.id}>
              <td>{maceta.nombre}</td>
              <td>{maceta.color.nombre}</td>
              <td>{maceta.diseno.nombre}</td>
              <td>{maceta.modelo.nombre}</td>
              <td>{maceta.tamano.nombre}</td>
              <td>{maceta.precio}</td>
              <td>{maceta.stock}</td>

              <td>
                <button onClick={() => editarMaceta(maceta.id)}>
                  Editar
                </button>

                <button onClick={() => eliminar(maceta.id)}>
                  Eliminar
                </button>
              </td>
>>>>>>> main
            </tr>
          </thead>
          <tbody>
            {macetasFiltradas.length === 0 ? (
              <tr>
                <td colSpan={8} style={{ textAlign: 'center', padding: '30px', color: '#666' }}>
                  No se encontraron macetas con el nombre "<strong>{busqueda}</strong>". 🪴
                </td>
              </tr>
            ) : (
              macetasFiltradas.map((maceta) => (
                <tr key={maceta.id}>
                  <td><strong>{maceta.nombre}</strong></td>
                  <td>{maceta.modelo}</td>
                  <td>{maceta.diseno}</td>
                  <td>{maceta.color}</td>
                  <td>{maceta.tamano}</td>
                  <td>
                    <span className={maceta.stock < 5 ? 'stock-bajo' : 'stock-alto'}>
                      {maceta.stock}
                    </span>
                  </td>
                  <td><strong>${maceta.precio}</strong></td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ListaMacetas;