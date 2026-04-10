import { Routes, Route, Link } from 'react-router-dom'
// Importamos el componente que creamos en el paso anterior
<<<<<<< Feature1
import ListaMacetas from './components/listaMacetas' 
import NuevaMaceta from './components/NuevaMaceta';

const Inicio = () => <h2>Bienvenido al Inventario de Macetas 🪴</h2>;
=======
import ListaMacetas from './components/listaMacetas' ;
import NuevaMaceta from './components/nuevaMaceta';
import EditarMaceta from './components/editarMaceta';

const Inicio = () => <h2>Bienvenido al Inventario de Macetas 🪴</h2>;
//const NuevaMaceta = () => <h2>Agregar nueva maceta</h2>;
>>>>>>> main

function App() {
  return (
    <div>
      <nav>
        <Link to="/" style={{ marginRight: '10px' }}>Inicio</Link>
        <Link to="/macetas" style={{ marginRight: '10px' }}>Inventario</Link>
        <Link to="/nueva">Agregar Maceta</Link>
      </nav>

      <main>
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/macetas" element={<ListaMacetas />} />
          <Route path="/nueva" element={<NuevaMaceta />} />
          <Route path="/editar/:id" element={<EditarMaceta />} />
        </Routes>
      </main>
    </div>
  )
}

export default App