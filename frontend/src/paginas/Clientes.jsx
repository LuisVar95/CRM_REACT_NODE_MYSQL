import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import useClientes from '../hooks/useClientes';
import { formatarCelular } from '../helpers/funcionesFormatos';

const Clientes = () => {
    const { clientes } = useClientes();
    const [busqueda, setBusqueda] = useState('');

    // Filtrar clientes basado en el valor de búsqueda
    const clientesFiltrados = clientes.filter(cliente =>
        cliente.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
        cliente.apellido.toLowerCase().includes(busqueda.toLowerCase()) ||
        cliente.email.toLowerCase().includes(busqueda.toLowerCase()) ||
        formatarCelular(cliente.telefono).toLowerCase().includes(busqueda.toLowerCase())
    );

    return (
        <>
            <h1 className="dashboard__heading">Clientes</h1>
            <div className="dashboard__acciones-flex">
                <div className="dashboard__contenedor-boton">
                    <Link className="dashboard__boton" to="/crear-cliente">
                        <img src="/img/plus2.png" alt="imagen" className="dashboard__boton-logo" />
                        <p className="dashboard__boton-texto">Añadir Cliente</p>
                    </Link>
                </div>
                <div className="dashboard__buscador">
                    <input
                        type="text"
                        placeholder="Email, nombre, etc.."
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
                            <th className="tabla__th">Nombre</th>
                            <th className="tabla__th">Apellido</th>
                            <th className="tabla__th">Correo</th>
                            <th className="tabla__th">Teléfono</th>
                            <th className="tabla__th">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {clientesFiltrados.length > 0 ? (
                            clientesFiltrados.map(cliente => (
                                    <tr className="tabla__tr" key={cliente.id}>
                                        <td className="tabla__td">{cliente.nombre}</td>
                                        <td className="tabla__td">{cliente.apellido}</td>
                                        <td className="tabla__td">{cliente.email}</td>
                                        <td className="tabla__td">{formatarCelular(cliente.telefono)}</td>
                                        <td className="tabla__td">
                                            <div className="tabla__td-alinear">
                                                <div className="tabla__flex">
                                                    <Link to={`/editar-cliente/${cliente.id}`} className="tabla__acciones">
                                                        <img src="/img/editar.png" alt="" className="tabla__icono" />
                                                        <p className="tabla__boton">Editar</p>
                                                    </Link>
                                                    <Link to={`/eliminar-cliente/${cliente.id}`} className="tabla__acciones tabla__acciones-eliminar">
                                                        <img src="/img/eliminar.png" alt="" className="tabla__icono" />
                                                        <p className="tabla__boton">Eliminar</p>
                                                    </Link>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>                               
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5" className='texto__nohay'> No hay Clientes aún </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default Clientes;