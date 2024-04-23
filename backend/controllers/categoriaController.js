import Categoria from "../models/Categoria.js";

const obtenerCategorias = async (req, res) => {
    const categorias = await Categoria.findAll()

    res.json(categorias)
}

const crearCategoria = async (req, res) => {
    const categoria = new Categoria(req.body);

    try {
        const categoriaAlmacenada = await categoria.save();
        res.json(categoriaAlmacenada);
    } catch (error) {
        console.log(error);
    }
};

const editarCategoria = async (req, res) => {
    const { id } = req.params;

    const categoria = await Categoria.findByPk(id);
  
    if (!categoria) {
      const error = new Error("No Encontrado");
      return res.status(404).json({ msg: error.message });
    }

    categoria.nombre = req.body.nombre || categoria.nombre;

    try {
        const categoriaAlmacenada = await categoria.save();
        res.json(categoriaAlmacenada);
    } catch (error) {
        console.log(error);
    }
}

const eliminarCategoria = async (req, res) => {
    const { id } = req.params;

    const categoria = await Categoria.findByPk(id);

    if (!categoria) {
        const error = new Error("No Encontrado");
        return res.status(404).json({ msg: error.message });
    }

    try {
        await categoria.destroy({ where: {id : id }});
        res.json({ msg: "Categoria Eliminada" });
      } catch (error) {
        console.log(error);
      }
}

export {
    obtenerCategorias,
    crearCategoria,
    editarCategoria,
    eliminarCategoria
}