import Cliente from "../models/Cliente.js";
import Pedido from "../models/Pedido.js";
import Producto from "../models/Producto.js";
import Ventas from "../models/Ventas.js";

const obtenerPedidos = async (req, res) => {
    const pedidos = await Pedido.findAll()

    res.json(pedidos);
};

const crearPedido = async (req, res) => {
    try {
        const { cantidad, productoId, clienteId } = req.body;

        //Buscar el producto y el cliente en la base de datos
        const producto = await Producto.findByPk(productoId);
        const cliente = await Cliente.findByPk(clienteId);

        // Extraer el nombre del producto y del cliente
        const nombreProducto = producto.nombre;
        const nombreCliente = cliente.nombre;
        const emailCliente = cliente.email;

        // Si el producto no existe, devuelve un error
        if (!producto) {
            return res.status(404).json({ error: 'Producto no encontrado' });
        }
        // Si el producto no existe, devuelve un error
        if (!cliente) {
            return res.status(404).json({ error: 'Cliente no encontrado' });
        }

        // Calcular el total
        let total = producto.precio * cantidad;

        // Redondeamos el total a dos decimales
        total = Math.round(total * 100) / 100;

        // Crea el pedido con el producto asociado
        const pedido = await Pedido.create({
            cantidad,
            total,
            productoId,
            clienteId,
            nombreProducto,
            nombreCliente,
            emailCliente
        });

        // Crea un registro en la tabla ventas con el total del pedido y la fecha actual
        await Ventas.create({ total, pedidoId: pedido.id });

        // Devuelve el pedido creado
        return res.status(201).json({ pedido });

    } catch (error) {
        console.error('Error al crear el pedido:', error);
        return res.status(500).json({ error: 'Error interno del servidor' });
    }
};

const obtenerPedido = async (req, res) => {
    const { id } = req.params;

    const pedido = await Pedido.findByPk(id)

    if(!pedido) {
        const error = new Error("No Encontrado");
        return res.status(404).json({ msg: error.message })
    }

    res.json(pedido);
}

const editarPedido = async (req, res) => {
    const { id } = req.params;

    const pedido = await Pedido.findByPk(id);
  
    if (!pedido) {
      const error = new Error("No Encontrado");
      return res.status(404).json({ msg: error.message });
    }

    //buscamos el producto desde req para sincronizar de nuevo con mi pedido
    const producto = await Producto.findByPk(req.body.productoId);
    const cliente = await Cliente.findByPk(req.body.clienteId)
    const nombreProducto = producto.nombre;
    const nombreCliente = cliente.nombre 
    const emailCliente = cliente.email  
    
    //Buscamos la venta con el id del pedido
    let venta = await Ventas.findOne({where: {pedidoId : id}})

    if (!producto) {
        return res.status(404).json({ error: 'Producto no encontrado' });
    }

    //Editamos el pedido o si no dejamos lo que tenemos en pedido
    pedido.cantidad = req.body.cantidad || pedido.cantidad;
    pedido.clienteId = req.body.clienteId || pedido.clienteId;
    pedido.productoId = req.body.productoId || pedido.productoId
    pedido.total = producto.precio * pedido.cantidad;
    pedido.nombreProducto = nombreProducto;
    pedido.nombreCliente = nombreCliente;
    pedido.emailCliente = emailCliente;

    // Redondeamos el total a dos decimales
    pedido.total = Math.round(pedido.total * 100) / 100;

    venta.total = pedido.total;

    try {
        await venta.save();
        const pedidoAlmacenado = await pedido.save();
        res.json(pedidoAlmacenado);
    } catch (error) {
        console.log(error);
    }
};

const eliminarPedido = async (req, res) => {
    const { id } = req.params;

    const pedido = await Pedido.findByPk(id);

    if (!pedido) {
        const error = new Error("Pedido no encontrado");
        return res.status(404).json({ msg: error.message });
    }

    try {
        await pedido.destroy();
        res.json({ msg: "Pedido eliminado" });
    } catch (error) {
        console.log(error);
    }
};

export {
    obtenerPedidos,
    crearPedido,
    obtenerPedido,
    editarPedido,
    eliminarPedido
};