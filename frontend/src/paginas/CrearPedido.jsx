import React from 'react'
import { Link } from 'react-router-dom'
import FormularioPedido from '../components/FormularioPedido'

const CrearPedido = () => {
  return (
    <>
        <h1 className="dashboard__heading m-l">Nuevo Pedidos</h1>
            <div className="dashboard__acciones-flex">
                <div className="dashboard__contenedor-boton">
                    <Link className="dashboard__boton" to="/pedidos">
                        <img src="/img/back.png" alt="imagen" className="dashboard__boton-logo"/>
                        <p className="dashboard__boton-texto">Volver</p>
                    </Link>
                </div>
            </div>
            <section className="seccion-formulario">
                <FormularioPedido/>
            </section>
    </>
  )
}

export default CrearPedido