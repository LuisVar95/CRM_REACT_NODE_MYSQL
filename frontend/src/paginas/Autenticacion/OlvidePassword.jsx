import { useState } from 'react'
import { Link } from 'react-router-dom'
import clienteAxios from '../../config/clienteAxios'
import Alerta from '../../components/Alerta'

const OlvidePassword = () => {

    const [email, setEmail] = useState('')
    const [alerta, setAlerta] = useState({})

    const handleSubmit = async  e => {
        e.preventDefault();

        if(email === '' || email.length < 6) {
            setAlerta({
                msg: 'El Email es obligatorio',
                error: true
            });
            return
        }

        try {
            const { data } = await clienteAxios.post(`/usuarios/olvide-password`, {email})
            setAlerta({
                msg: data.msg,
                error: false
            })
        } catch (error) {
            setAlerta({
                msg: error.response.data.msg,
                error: true
            })
        }
    }

    const {msg}= alerta

  return (
    <>
        <section className="seccion-formulario">
                <form onSubmit={handleSubmit} className="formulario-auth">
                    <h1 className="formulario__heading">Recupera tu Password</h1>
                    { msg && <Alerta alerta={alerta} />}
                    <div className="formulario__campo">
                        <label htmlFor="email" className="formulario__label">Email:</label>
                        <input onChange={ e => setEmail(e.target.value)} value={email} id="email" type="email" className="formulario__input" placeholder="Tu Email"/>
                    </div>

                    <input type="submit" className="formulario__boton" value="Enviar"/>
                </form>
            </section>
            <nav className="enlaces__nav">
                <div className="enlaces__flex">
                    <div className="enlaces__campo">
                        <Link to={'/auth/registrar'} className="enlaces__enlace">¿No tienes una cuenta? Crea Una</Link>
                    </div>
                    <div className="enlaces__campo">
                        <Link to={'/auth'} className="enlaces__enlace">¿Ya Tienes una cuenta? Inicia sesión</Link>
                    </div>
                </div>
            </nav>
    </>
  )
}

export default OlvidePassword