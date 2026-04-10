import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  crearMaceta,
  obtenerColores,
  obtenerModelos,
  obtenerDisenos,
  obtenerTamanos
} from "../services/macetasService";

const NuevaMaceta = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    nombre: "",
    precio: 0,
    stock: 0,
    colorId: 0,
    disenoId: 0,
    modeloId: 0,
    tamanoId: 0
  });

  const [colores, setColores] = useState<any[]>([]);
  const [modelos, setModelos] = useState<any[]>([]);
  const [disenos, setDisenos] = useState<any[]>([]);
  const [tamanos, setTamanos] = useState<any[]>([]);

  const [mensaje, setMensaje] = useState<string | null>(null);
  const [cargando, setCargando] = useState(false);

  useEffect(() => {
    const cargar = async () => {
      try {
        const [c, m, d, t] = await Promise.all([
          obtenerColores(),
          obtenerModelos(),
          obtenerDisenos(),
          obtenerTamanos()
        ]);

        setColores(c);
        setModelos(m);
        setDisenos(d);
        setTamanos(t);
      } catch (error) {
        console.error("Error cargando catálogos:", error);
      }
    };

    cargar();
  }, []);

  const handleChange = (e: any) => {
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: ["precio", "stock", "colorId", "disenoId", "modeloId", "tamanoId"].includes(name)
        ? Number(value)
        : value
    });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!form.nombre.trim()) {
      setMensaje("El nombre es obligatorio");
      return;
    }

    if (form.precio <= 0) {
      setMensaje("El precio debe ser mayor a 0");
      return;
    }

    if (form.stock < 0) {
      setMensaje("El stock no puede ser negativo");
      return;
    }

    if (!form.colorId || !form.disenoId || !form.modeloId || !form.tamanoId) {
      setMensaje("Debes seleccionar todas las opciones");
      return;
    }

    try {
      setCargando(true);
      await crearMaceta(form);

      setMensaje("Maceta creada correctamente");

      setTimeout(() => {
        navigate("/macetas");
      }, 1000);
    } catch (error) {
      console.error(error);
      setMensaje("Error al crear la maceta");
    } finally {
      setCargando(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Agregar Maceta</h2>

      {mensaje && <p>{mensaje}</p>}

      <input name="nombre" placeholder="Nombre" onChange={handleChange} required />

      <input name="precio" type="number" placeholder="Precio" onChange={handleChange} required />

      <input name="stock" type="number" placeholder="Stock" onChange={handleChange} required />

      <select name="colorId" onChange={handleChange} required>
        <option value="">Selecciona un color</option>
        {colores.map((c) => (
          <option key={c.id} value={c.id}>
            {c.nombre}
          </option>
        ))}
      </select>

      <select name="disenoId" onChange={handleChange} required>
        <option value="">Selecciona un diseño</option>
        {disenos.map((d) => (
          <option key={d.id} value={d.id}>
            {d.nombre}
          </option>
        ))}
      </select>

      <select name="modeloId" onChange={handleChange} required>
        <option value="">Selecciona un modelo</option>
        {modelos.map((m) => (
          <option key={m.id} value={m.id}>
            {m.nombre}
          </option>
        ))}
      </select>

      <select name="tamanoId" onChange={handleChange} required>
        <option value="">Selecciona un tamaño</option>
        {tamanos.map((t) => (
          <option key={t.id} value={t.id}>
            {t.nombre}
          </option>
        ))}
      </select>

      <button type="submit" disabled={cargando}>
        {cargando ? "Guardando..." : "Guardar"}
      </button>
    </form>
  );
};

export default NuevaMaceta;
