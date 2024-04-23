import Tarea from "../models/Tarea.js";

const obtenerTareas = async (req, res) => {
    const tareas = await Tarea.findAll()

    res.json(tareas)
}

const crearTarea = async (req, res) => {
    const { fecha, nombre, descripcion } = req.body;

    try {
        const tarea = await Tarea.create({
            fecha,
            nombre, 
            descripcion
        });

        res.json(tarea);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Hubo un error al crear la Tarea' });
    }
};

const editarTarea = async (req, res) => {
    const { id } = req.params;

    const tarea = await Tarea.findByPk(id);
  
    if (!tarea) {
      const error = new Error("No Encontrado");
      return res.status(404).json({ msg: error.message });
    }

    tarea.fecha = req.body.fecha || tarea.fecha;
    tarea.nombre = req.body.nombre || tarea.nombre;
    tarea.descripcion = req.body.descripcion || tarea.descripcion
    
    try {
        const tareaAlmacenada = await tarea.save();
        res.json(tareaAlmacenada);
    } catch (error) {
        console.log(error);
    }
}

const obtenerTarea = async (req, res) => {
    const { id } = req.params;

    const tarea = await Tarea.findByPk(id)

    if(!tarea) {
        const error = new Error("No Encontrado");
        return res.status(404).json({ msg: error.message })
    }

    res.json(tarea);
}

const eliminarTarea = async (req, res) => {
    const { id } = req.params;

    const tarea = await Tarea.findByPk(id);

    if (!tarea) {
        const error = new Error("No Encontrado");
        return res.status(404).json({ msg: error.message });
    }

    try {
        await tarea.destroy();
        res.json({ msg: "Tarea Eliminada" });
      } catch (error) {
        console.log(error);
      }
}

export {
    obtenerTareas,
    crearTarea,
    editarTarea,
    obtenerTarea,
    eliminarTarea
}