import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import FormularioTarea from '../components/FormularioTarea'
import useTareas from '../hooks/useTareas'

const EditarTarea = () => {
    const params = useParams();
    const { tarea, obtenerTarea, cargando } = useTareas();

    useEffect(() => {
        obtenerTarea(params.id)
    }, [])

    const {nombre} = tarea

    if(cargando) return 'Cargando...'
    
  return (
    <>
        <h1 className="dashboard__heading m-l">Editar Cliente: {nombre} </h1>
        <div className="dashboard__acciones-flex">
            <div className="dashboard__contenedor-boton">
                <Link className="dashboard__boton" to="/tareas">
                    <img src="/img/back.png" alt="imagen" className="dashboard__boton-logo"/>
                    <p className="dashboard__boton-texto">Volver</p>
                </Link>
            </div>
        </div>
        <section className="seccion-formulario">
            <FormularioTarea/>
        </section>
    </>
  )
}

export default EditarTarea