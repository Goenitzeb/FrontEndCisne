import { Routes, Route, Link } from 'react-router-dom'
// Importamos el componente que creamos en el paso anterior
import ListaMacetas from './components/listaMacetas' 

const Inicio = () => <h2>Bienvenido al Inventario de Macetas 🪴</h2>;
const NuevaMaceta = () => <h2>Agregar nueva maceta</h2>;

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
        </Routes>
      </main>
    </div>
  )
}

export default App