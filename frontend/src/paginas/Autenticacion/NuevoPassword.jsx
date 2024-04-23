import { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import clienteAxios from '../../config/clienteAxios'
import Alerta from '../../components/Alerta'

const NuevoPassword = () => {

  const [ password, setPassword ] = useState('')
  const [ repetirPassword, setRepetirPassword ] = useState('')
  const [ tokenValido, setTokenValido ] = useState(false)
  const [ passwordModificado, setPasswordModificado] = useState(false)
  const [ alerta, setAlerta] = useState({})

  const params = useParams()
    const { token } = params

    useEffect(() => {
        const comprobarToken = async () => {
            try {
                await clienteAxios(`/usuarios/olvide-password/${token}`)
                setTokenValido(true)
            } catch (error) {
                setAlerta({
                    msg: error.response.data.msg,
                    error: true
                })
            }
        }
        comprobarToken()
    }, [])

    const handleSubmit = async e => {
        e.preventDefault();

        if(password.length < 6) {
            setAlerta({
                msg: 'El Password debe ser minimo de 6 caracteres',
                error: true
            })
            return
        }

        if(password !== repetirPassword) {
            setAlerta({
                msg: 'Los password son diferentes',
                error: true
            })
            return
        }

        try {
            const url = `/usuarios/olvide-password/${token}`

            const { data } = await clienteAxios.post(url, { password })
            setAlerta({
                msg: data.msg,
                error: false
            })
            setPasswordModificado(true)
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
      { tokenValido && (
      <section className="seccion-formulario">
          <form onSubmit={handleSubmit} className="formulario-auth">
              <h1 className="formulario__heading">Nuevo Password</h1>
              {msg && <Alerta alerta={alerta} />}
              <div className="formulario__campo">
                  <label htmlFor="password" className="formulario__label">Password:</label>
                  <input onChange={ e => setPassword(e.target.value)} value={password} id="password" type="password" className="formulario__input" placeholder="Password"/>
              </div>

              <div className="formulario__campo">
                  <label htmlFor="repetir-password" className="formulario__label">Repite Password:</label>
                  <input onChange={ e => setRepetirPassword(e.target.value)} value={repetirPassword} id="repetir-password" type="password" className="formulario__input" placeholder="Repetir Password"/>
              </div>

              <input type="submit" className="formulario__boton" value="Guardar"/>
          </form>
      </section>
    )}

    {passwordModificado && (
      <div className='nuevo__campo'>
          <Link to={'/auth'} className='nuevo__link'>
            Inicia Sesion
          </Link>
      </div>
    )}
  </>
  )
}

export default NuevoPassword