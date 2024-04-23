import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import useClientes from '../hooks/useClientes'
import Alerta from "./Alerta"

const FormularioCliente = () => {
    const [id, setId] = useState(null)
    const [nombre, setNombre] = useState('')
    const [apellido, setApellido] = useState('')
    const [telefono, setTelefono] = useState('')
    const [email, setEmail] = useState('')

    const params = useParams();
    const {mostrarAlerta, alerta, submitCliente, cliente} = useClientes();

    useEffect(() => {
        if( params.id ) {
            setId(cliente.id)
            setNombre(cliente.nombre)
            setApellido(cliente.apellido)
            setTelefono(cliente.telefono)
            setEmail(cliente.email)
        }
    }, [params])

    const handleSubmit = async e => {
        e.preventDefault();

        if([nombre, apellido, telefono, email].includes('')) {
            mostrarAlerta({
                msg: 'Todos los campos son obligatorios',
                error: true
            })

            return
        }

        // Pasar los datos hacia el provider
        await submitCliente(params.id ? {id, nombre, apellido, telefono, email} : {nombre, apellido, telefono, email})

        setId(null)
        setNombre('')
        setApellido('')
        setTelefono('')
        setEmail('')
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
            <label htmlFor="apellido" className="formulario__label">Apellido:</label>
            <input onChange={e => setApellido(e.target.value)} value={apellido} id="apellido" type="text" className="formulario__input" placeholder="Apellido de Cliente"/>
        </div>

        <div className="formulario__campo">
            <label htmlFor="telefono" className="formulario__label">Telefono:</label>
            <input onChange={e => setTelefono(e.target.value)} value={telefono} id="telefono" type="tel" className="formulario__input" placeholder="Telefono de Cliente"/>
        </div>

        <div className="formulario__campo">
            <label htmlFor="correo" className="formulario__label">Email:</label>
            <input onChange={e => setEmail(e.target.value)} value={email} id="correo" type="email" className="formulario__input" placeholder="Correo de Cliente"/>
        </div>

        <input type="submit" className="formulario__boton" value={id ? 'Actualizar Cliente': 'Crear Cliente'}/>
    </form>
  )
}

export default FormularioCliente