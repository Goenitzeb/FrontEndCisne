import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  obtenerMacetaPorId,
  actualizarMaceta,
  obtenerColores,
  obtenerModelos,
  obtenerDisenos,
  obtenerTamanos
} from "../services/macetasService";

const EditarMaceta = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState<any>({
    id: 0,
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

  useEffect(() => {
    const cargar = async () => {
      const data = await obtenerMacetaPorId(Number(id));
      setForm(data);

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
    };

    cargar();
  }, [id]);

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
      await actualizarMaceta(form.id, form);
      navigate("/macetas");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Editar Maceta</h2>

      {mensaje && <p>{mensaje}</p>}

      <input name="nombre" value={form.nombre} onChange={handleChange} />
      <input name="precio" type="number" value={form.precio} onChange={handleChange} />
      <input name="stock" type="number" value={form.stock} onChange={handleChange} />

      <select name="colorId" value={form.colorId} onChange={handleChange}>
        {colores.map((c) => (
          <option key={c.id} value={c.id}>
            {c.nombre}
          </option>
        ))}
      </select>

      <select name="disenoId" value={form.disenoId} onChange={handleChange}>
        {disenos.map((d) => (
          <option key={d.id} value={d.id}>
            {d.nombre}
          </option>
        ))}
      </select>

      <select name="modeloId" value={form.modeloId} onChange={handleChange}>
        {modelos.map((m) => (
          <option key={m.id} value={m.id}>
            {m.nombre}
          </option>
        ))}
      </select>

      <select name="tamanoId" value={form.tamanoId} onChange={handleChange}>
        {tamanos.map((t) => (
          <option key={t.id} value={t.id}>
            {t.nombre}
          </option>
        ))}
      </select>

      <button type="submit">Actualizar</button>
    </form>
  );
};

export default EditarMaceta;
