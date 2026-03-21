// src/components/ListaMacetas.tsx
import { useMacetas } from '../hooks/useMacetas';

const ListaMacetas = () => {
  // Solo llamamos a nuestro hook y desestructuramos lo que necesitamos
  const { macetas, cargando, error } = useMacetas();

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
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListaMacetas;