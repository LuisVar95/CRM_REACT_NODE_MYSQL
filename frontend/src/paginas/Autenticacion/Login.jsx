import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Alerta from '../../components/Alerta'
import clienteAxios from '../../config/clienteAxios'
import useAuth from '../../hooks/useAuth'

const Login = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [alerta, setAlerta] = useState({})
    const { setAuth } = useAuth();
    const navigate = useNavigate()


    const handleSubmit = async e => {
        e.preventDefault();

        if([email, password].includes('')) {
            setAlerta({
                msg: 'Todos los campos son obligatorios',
                error: true
            });
            return
        }

        try {
            const { data } = await clienteAxios.post('/usuarios/login', { email, password})
            setAlerta({})
            localStorage.setItem('token', data.token)
            setAuth(data)
            navigate('/')
        } catch (error) {
            setAlerta({
                msg: error.response.data.msg,
                error: true
            })
        }

    }

    const { msg } = alerta

  return (
    <>
    <section className="seccion-formulario m">
            <form onSubmit={handleSubmit} className="formulario-auth ">
                <h1 className="formulario__heading">Login</h1>
                {msg && <Alerta alerta={alerta } />}
                <div className="formulario__campo">
                    <label htmlFor="email" className="formulario__label">Email:</label>
                    <input onChange={e => setEmail(e.target.value)} value={email} id="email" type="email" className="formulario__input" placeholder="Tu Email"/>
                </div>

                <div className="formulario__campo">
                    <label htmlFor="password" className="formulario__label">Password:</label>
                    <input onChange={e => setPassword(e.target.value)} value={password} id="password" type="password" className="formulario__input" placeholder="Password"/>
                </div>

                <input type="submit" className="formulario__boton" value="Login"/>
            </form>
        </section>
        <nav className="enlaces__nav">
            <div className="enlaces__flex">
                <div className="enlaces__campo">
                    <Link to={'/auth/registrar'} className="enlaces__enlace">¿No tienes una cuenta? Crea Una</Link>
                </div>
                <div className="enlaces__campo">
                    <Link to={'/auth/olvide-password'} className="enlaces__enlace">¿Olvidaste tu Password? Recuperar Password</Link>
                </div>
            </div>
        </nav>
    </>
  )
}

export default Login