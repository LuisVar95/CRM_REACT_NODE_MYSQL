import { useState } from 'react';
import { Link } from 'react-router-dom';
import clienteAxios from '../../config/clienteAxios';
import Alerta from '../../components/Alerta';

const Registrar = () => {
    const [ nombre, setNombre ] = useState('')
    const [ email, setEmail ] = useState('')
    const [ password, setPassword ] = useState('')
    const [ repetirPassword, setRepetirPassword ] = useState('')
    const [ alerta, setAlerta] = useState({})

    const handleSubmit = async e => {
        e.preventDefault();

        if([nombre, email, password, repetirPassword].includes('')) {
            setAlerta({
                msg: 'Todos los campos son obligatorios',
                error: true
            });
            return
        }


        if(password !== repetirPassword ) {
            setAlerta({
                msg: 'Los password no son iguales',
                error: true
            })
            return
        }

        if(password.length < 6 ) {
            setAlerta({
                msg: 'El Password es muy corto, agrega minimo 6 caracteres',
                error: true
            })
            return
        }

        setAlerta({})

        // Crear el usuario en la API
        try {
            const {data} = await clienteAxios.post(`/usuarios/registrar`, {nombre, email, password})

            setAlerta({
                msg: data.msg,
                error: false
            })

            setNombre('')
            setEmail('')
            setPassword('')
            setRepetirPassword('')
        } catch (error) {
            setAlerta({
                Name
            })
        }

       
    }

    const {msg} = alerta

  return (
    <>
        <section className="seccion-formulario m">
                <form onSubmit={handleSubmit} className="formulario-auth">
                    <h1 className="formulario__heading">Crear Una Cuenta</h1>
                    {msg && <Alerta alerta={alerta} />}
                    <div className="formulario__campo">
                        <label htmlFor="nombre" className="formulario__label">Nombre:</label>
                        <input onChange={e => setNombre(e.target.value)} value={nombre} id="nombre" type="text" className="formulario__input" placeholder="Tu Nombre"/>
                    </div>

                    <div className="formulario__campo">
                        <label htmlFor="email" className="formulario__label">Email:</label>
                        <input onChange={e => setEmail(e.target.value)} value={email} id="email" type="email" className="formulario__input" placeholder="Email"/>
                    </div>

                    <div className="formulario__campo">
                        <label htmlFor="password" className="formulario__label">Password:</label>
                        <input onChange={e => setPassword(e.target.value)} value={password} id="password" type="password" className="formulario__input" placeholder="Password"/>
                    </div>

                    <div className="formulario__campo">
                        <label htmlFor="repetir-password" className="formulario__label">Repetir Password:</label>
                        <input onChange={e => setRepetirPassword(e.target.value)} value={repetirPassword} id="repetir-password" type="password" className="formulario__input" placeholder="Repite tu password"/>
                    </div>

                    <input type="submit" className="formulario__boton" value="Crear"/>
                </form>
            </section>
            <nav className="enlaces__nav">
                <div className="enlaces__flex">
                    <div className="enlaces__campo">
                        <Link to={'/auth'} className="enlaces__enlace">¿Ya Tienes una cuenta? Inicia sesión</Link>
                    </div>
                    <div className="enlaces__campo">
                        <Link to={'/auth/olvide-password'} className="enlaces__enlace">¿Olvidaste tu Password? Recuperar Password</Link>
                    </div>
                </div>
            </nav>
    </>
  )
}

export default Registrar