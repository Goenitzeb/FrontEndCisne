// src/components/ListaMacetas.tsx
import { useMacetas } from '../hooks/useMacetas';
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
  const { macetas, cargando, error } = useMacetas();

  const editarMaceta = (id: number) => {
    navigate(`/editar/${id}`);
  };

  if (cargando) return <p>Cargando inventario de macetas... ⏳</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <div>
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
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListaMacetas;