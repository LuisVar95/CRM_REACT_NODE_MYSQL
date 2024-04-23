import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import FormularioCliente from '../components/FormularioCliente'
import useClientes from '../hooks/useClientes'

const EditarCliente = () => {
    const params = useParams();
    const { cliente, obtenerCliente, cargando } = useClientes();

    useEffect(() => {
        obtenerCliente(params.id)
    }, [])

    const {nombre} = cliente

    if(cargando) return 'Cargando...'
    
  return (
    <>
        <h1 className="dashboard__heading m-l">Editar Cliente: {nombre} </h1>
        <div className="dashboard__acciones-flex">
            <div className="dashboard__contenedor-boton">
                <Link className="dashboard__boton" to="/clientes">
                    <img src="/img/back.png" alt="imagen" className="dashboard__boton-logo"/>
                    <p className="dashboard__boton-texto">Volver</p>
                </Link>
            </div>
        </div>
        <section className="seccion-formulario">
            <FormularioCliente/>
        </section>
    </>
  )
}

export default EditarCliente