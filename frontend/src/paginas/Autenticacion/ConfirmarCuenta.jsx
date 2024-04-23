import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { Link } from "react-router-dom"
import clienteAxios from "../../config/clienteAxios"
import Alerta from "../../components/Alerta"


const ConfirmarCuenta = () => {

  const [alerta, setAlerta] = useState({})
  const [cuentaConfirmada, setCuentaConfirmada] = useState(false)

  const params = useParams();
  const { token } = params;

  useEffect(() => {

    const confirmarCuenta = async () => {
      try {
        const url =`/usuarios/confirmar/${token}`
        const { data } = await clienteAxios(url)

        setAlerta({
          msg: data.msg,
          error: false
        })
        setCuentaConfirmada(true)
      } catch (error) {
         setAlerta({
            msg: error.response.data.msg,
            error: true
         })
      }
    }
    confirmarCuenta();
  }, [])

  const { msg } = alerta

  return (
    <>
      <h1 className="dashboard__heading">Confirma tu cuenta</h1>

      <div className="confirma">
          { msg && <Alerta alerta={alerta} />}
      </div>

      {cuentaConfirmada && (
        <div className="confirma__campo">
          <Link
            to={'/auth'}
            className="confirma__link"
          >
            Inicia Sesión
          </Link>
        </div>
      )}
    </>
  )
}

export default ConfirmarCuenta