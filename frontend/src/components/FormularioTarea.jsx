import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import useTareas from '../hooks/useTareas'
import Alerta from './Alerta'

const FormularioTarea = () => {
    const [id, setId] = useState(null)
    const [nombre, setNombre] = useState('')
    const [fecha, setFecha] = useState('')
    const [descripcion, setDescripcion] = useState('')


    const params = useParams();
    const {mostrarAlerta, alerta, submitTarea, tarea} = useTareas();

    useEffect(() => {
        if( params.id ) {
            setId(tarea.id)
            setNombre(tarea.nombre)
            setFecha(tarea.fecha)
            setDescripcion(tarea.descripcion)
        }
    }, [params])

    const handleSubmit = async e => {
        e.preventDefault();

        if([nombre, fecha, descripcion].includes('')) {
            mostrarAlerta({
                msg: 'Todos los campos son obligatorios',
                error: true
            })

            return
        }

        // Pasar los datos hacia el provider
        await submitTarea(params.id ? {id, nombre, fecha, descripcion} : {nombre, fecha, descripcion})

        setId(null)
        setNombre('')
        setFecha('')
        setDescripcion('')
    }

    const { msg } = alerta
  return (
    <form onSubmit={handleSubmit} className="formulario">
         {msg && <Alerta alerta={alerta} />}
        <div className="formulario__campo">
            <label htmlFor="nombre" className="formulario__label">Nombre:</label>
            <input onChange={e => setNombre(e.target.value)} value={nombre} id="nombre" type="text" className="formulario__input" placeholder="Nombre de Cliente"/>
        </div>

        <div className="formulario__campo">
            <label htmlFor="fecha" className="formulario__label">Fecha de Entrega:</label>
            <input onChange={e => setFecha(e.target.value)} value={fecha} id="fecha" type="date" className="formulario__input" placeholder="Apellido de Cliente"/>
        </div>

        <div className="formulario__campo">
            <label htmlFor="descripcion" className="formulario__label">Descripcion:</label>
            <textarea onChange={e => setDescripcion(e.target.value)} value={descripcion} id="descripcion" rows="7" className="formulario__input" placeholder="Descripcion de la tarea"></textarea>
        </div>

        <input type="submit" className="formulario__boton" value={id ? 'Actualizar Tarea': 'Crear Tarea'}/>
    </form>
  )
}

export default FormularioTarea