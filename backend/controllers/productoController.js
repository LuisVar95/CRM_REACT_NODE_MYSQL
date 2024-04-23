import Producto from "../models/Producto.js";

const obtenerProductos = async (req, res) => {
    const productos = await Producto.findAll()

    res.json(productos)
}

const crearProducto = async (req, res) => {
    const { categoriaId, nombre, precio } = req.body;

    try {
        const producto = await Producto.create({
            categoriaId,
            nombre, 
            precio
        });

        res.json(producto);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Hubo un error al crear el producto' });
    }
};

const editarProducto = async (req, res) => {
    const { id } = req.params;

    const producto = await Producto.findByPk(id);
  
    if (!producto) {
      const error = new Error("No Encontrado");
      return res.status(404).json({ msg: error.message });
    }

    producto.nombre = req.body.nombre || producto.nombre;
    producto.precio = req.body.precio || producto.precio;
    producto.categoriaId = req.body.categoriaId || producto.categoriaId

    try {
        const productoAlmacenado = await producto.save();
        res.json(productoAlmacenado);
    } catch (error) {
        console.log(error);
    }
}

const eliminarProducto = async (req, res) => {
    const { id } = req.params;

    const producto = await Producto.findByPk(id);

    if (!producto) {
        const error = new Error("No Encontrado");
        return res.status(404).json({ msg: error.message });
    }

    try {
        await producto.destroy({ where: {id : id }});
        res.json({ msg: "Producto Eliminado" });
      } catch (error) {
        console.log(error);
      }
}

export {
    obtenerProductos,
    crearProducto,
    editarProducto,
    eliminarProducto
}