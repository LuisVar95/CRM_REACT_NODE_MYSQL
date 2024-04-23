import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import FormularioPedido from '../components/FormularioPedido'
import usePedidos from '../hooks/usePedidos'

const EditarPedido = () => {

    const params = useParams();
    const { pedido, obtenerPedido, cargando } = usePedidos();

    useEffect(() => {
        obtenerPedido(params.id)
    }, [])

    const {emailCliente} = pedido

    if(cargando) return 'Cargando...'

  return (
    <>
        <h1 className="dashboard__heading m-l">Editar Pedido: {emailCliente}</h1>
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

export default EditarPedido