import React, {useEffect, useState} from 'react'
import { Link } from 'react-router-dom'
import usePedidos from '../hooks/usePedidos'
import { formatearTotal } from '../helpers/funcionesFormatos'

const Pedidos = () => {

    const {pedidos} = usePedidos();
    const [busqueda, setBusqueda] = useState(''); 

    // Filtrar pedidos basado en el valor de busqueda
    const pedidosFiltrados = pedidos.filter(pedido => 
        (pedido.id && pedido.id.toLowerCase().includes(busqueda.toLowerCase())) ||
        (pedido.cantidad && pedido.cantidad.toString().includes(busqueda.toString())) ||
        (pedido.nombreProducto && pedido.nombreProducto.toLowerCase().includes(busqueda.toLowerCase())) ||
        (pedido.nombreCliente && pedido.nombreCliente.toLowerCase().includes(busqueda.toLowerCase())) ||
        (pedido.emailCliente && pedido.emailCliente.toLowerCase().includes(busqueda.toLowerCase()))
    );

  return (
    <>
         <h1 className="dashboard__heading">Pedidos</h1>
            <div className="dashboard__acciones-flex">
                <div className="dashboard__contenedor-boton">
                    <Link className="dashboard__boton" to="/crear-pedido">
                        <img src="/img/plus2.png" alt="imagen" className="dashboard__boton-logo"/>
                        <p className="dashboard__boton-texto">Crear Pedido</p>
                    </Link>
                </div>
                <div className="dashboard__buscador">
                    <input 
                        type="text" 
                        placeholder="Id, correo, etc.." 
                        className="dashboard__buscar"
                        value={busqueda}
                        onChange={(e) => setBusqueda(e.target.value)}
                        />
                </div>
            </div>
            <div className="dashboard__tabla">
                <table className="tabla">
                    <thead className="tabla__thead">
                        <tr className="tabla__tr">
                            <th className="tabla__th">id-Pedido</th>
                            <th className="tabla__th">Producto</th>
                            <th className="tabla__th">Cantidad</th>
                            <th className="tabla__th">Email-Cliente</th>
                            <th className="tabla__th">Nombre-Cliente</th>
                            <th className="tabla__th">Total</th>
                            <th className="tabla__th">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pedidosFiltrados.length > 0 ? (
                            pedidosFiltrados.map(pedido => (                           
                                    <tr className="tabla__tr" key={pedido.id}>
                                        <td className="tabla__td">{pedido.id}</td>
                                        <td className="tabla__td">{pedido.nombreProducto}</td>
                                        <td className="tabla__td">{pedido.cantidad}</td>
                                        <td className="tabla__td">{pedido.emailCliente}</td>
                                        <td className="tabla__td">{pedido.nombreCliente}</td>
                                        <td className="tabla__td">{formatearTotal(pedido.total)}</td>
                                        <td className="tabla__td">
                                            <div className="tabla__td-alinear">
                                                <div className="tabla__flex">
                                                    <Link to={`/editar-pedido/${pedido.id}`} className="tabla__acciones">
                                                        <img src="/img/editar.png" alt="" className="tabla__icono"/>
                                                        <p className="tabla__boton">Editar</p>
                                                    </Link>
                                                    <Link to={`/eliminar-pedido/${pedido.id}`} className="tabla__acciones tabla__acciones-eliminar">
                                                        <img src="/img/eliminar.png" alt="" className="tabla__icono"/>
                                                        <p className="tabla__boton">Eliminar</p>
                                                    </Link>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                        ))
                        ) : (
                            <tr>
                                <td colSpan="5" className='texto__nohay'> No hay Pedidos aún </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
    </>
  )
}

export default Pedidos