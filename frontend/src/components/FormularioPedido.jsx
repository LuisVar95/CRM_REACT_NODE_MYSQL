import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import useProductos from '../hooks/useProductos'
import useClientes from '../hooks/useClientes'
import usePedidos from '../hooks/usePedidos'
import Alerta from './Alerta'
import { formatearTotal } from '../helpers/funcionesFormatos'

const FormularioPedido = () => {

    const [id, setId] = useState(null)
    const [producto, setProducto] = useState({});
    const [cliente, setCliente] = useState({});
    const [cantidad, setCantidad] = useState(0)
    const [total, setTotal] = useState(0)

    //hooks personalizados
    const {productos} = useProductos()
    const {clientes} = useClientes()
    const { mostrarAlerta, alerta, submitPedido, pedido} = usePedidos();

    const params = useParams();

    useEffect(() => {
        if (params.id && pedido) {
            setId(pedido.id);
            setProducto(pedido.productoId);
            setCliente(pedido.clienteId);
            setCantidad(pedido.cantidad);
            setTotal(pedido.total);
        }
    }, [params])

    useEffect(() => {
        if (producto && cantidad) {
            const totalTemporal = (producto.precio * cantidad).toFixed(2);
            setTotal(totalTemporal)
        }
    }, [producto, cantidad])

    // Manejar el estado de producto
    function handleChangeProducto(e) {
        const id = e.target.value;
        const productoSeleccionado = productos.find(producto => producto.id === id);
        setProducto(productoSeleccionado);
    }

    //Manejar el estado de cliente
    function handleChangeCliente(e) {
        const id = e.target.value;
        const clienteSeleccionado = clientes.find(cliente => cliente.id === id);
        setCliente(clienteSeleccionado);
    }

    const handleSubmit = async e => {
        e.preventDefault();

        if (!producto || !cliente || cantidad <= 0 || total <= 0) {
            mostrarAlerta({
                msg: 'Todos los campos son obligatorios',
                error: true
            });
            return;
        }

        //Pasar los datos al provider
        await submitPedido(params.id ? {id,  productoId: producto.id, clienteId: cliente.id, cantidad} : {productoId: producto.id, clienteId: cliente.id, cantidad})

        setId(null)
        setProducto('')
        setCliente('')
        setCantidad(0)
        setTotal(0)
    }

    const { msg } = alerta

  return (
    <form onSubmit={handleSubmit} className="formulario">
        {msg && <Alerta alerta={alerta} />}
        <div className="formulario__campo">
            <label htmlFor="producto" className="formulario__label">Producto:</label>
            <select onChange={handleChangeProducto} value={producto.id} className="formulario__select">
                <option className="formulario__option">-- Seleccionar --</option>
                {productos.map(producto => (
                    <option key={producto.id} value={producto.id} className="formulario__option">{producto.nombre}</option>
                ))}
            </select>
        </div>

        <div className="formulario__campo">
            <label htmlFor="cantidad" className="formulario__label">Cantidad:</label>
            <input onChange={e => setCantidad(e.target.value)} value={cantidad} id="cantidad" type="number" className="formulario__input" placeholder="Cantidad"/>
        </div>

        <div className="formulario__campo">
            <label htmlFor="cliente" className="formulario__label">Cliente:</label>
            <select onChange={handleChangeCliente} value={cliente.id} className="formulario__select">
                <option className="formulario__option">-- Seleccionar --</option>
                {clientes.map(cliente => (
                    <option key={cliente.id} value={cliente.id} className="formulario__option">Nombre: {cliente.nombre}, Email: {cliente.email}</option>
                ))}
            </select>
        </div>

        <div className="formulario__acciones">
            <input type="submit" className="formulario__boton" value={id ? 'Actualizar Pedido': 'Crear Pedido'}/>
            <p className="formulario__precio">Total: <span className="formulario__span">{cantidad && producto ? `${formatearTotal(total)}` : 0}</span></p>
        </div>
    </form>
  )
}

export default FormularioPedido