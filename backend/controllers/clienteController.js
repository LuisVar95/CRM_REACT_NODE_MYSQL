import Cliente from "../models/Cliente.js";

const obtenerClientes = async  (req, res) => {
    const clientes = await Cliente.findAll()
    res.json(clientes)
};

const nuevoCliente = async (req, res) => {
    const cliente = new Cliente(req.body);

    try {
        const clienteAlmacenado = await cliente.save();
        res.json(clienteAlmacenado)
    } catch (error) {
        console.log(error)
    }
}

const obtenerCliente = async (req, res) => {
    const { id } = req.params;

    const cliente = await Cliente.findByPk(id)

    if(!cliente) {
        const error = new Error("No Encontrado");
        return res.status(404).json({ msg: error.message })
    }

    res.json(cliente);
}

const editarCliente = async (req, res) => {
    const { id } = req.params;

    const cliente = await Cliente.findByPk(id);
  
    if (!cliente) {
      const error = new Error("No Encontrado");
      return res.status(404).json({ msg: error.message });
    }

    cliente.nombre = req.body.nombre || cliente.nombre;
    cliente.apellido = req.body.apellido || cliente.apellido;
    cliente.email = req.body.email || cliente.email;
    cliente.telefono = req.body.telefono || cliente.telefono;

    try {
        const clienteAlmacenado = await cliente.save();
        res.json(clienteAlmacenado);
    } catch (error) {
        console.log(error);
    }
}

const eliminarCliente = async (req, res) => {
    const { id } = req.params;

    const cliente = await Cliente.findByPk(id);

    if (!cliente) {
        const error = new Error("No Encontrado");
        return res.status(404).json({ msg: error.message });
    }

    try {
        await cliente.destroy();
        res.json({ msg: "Cliente Eliminado" });
      } catch (error) {
        console.log(error);
      }
}

export {
    obtenerClientes,
    nuevoCliente,
    obtenerCliente,
    editarCliente,
    eliminarCliente
}