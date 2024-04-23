import { useState, useEffect, createContext } from "react";
import { useNavigate } from "react-router-dom";
import clienteAxios from "../config/clienteAxios";
import useAuth from "../hooks/useAuth";

const PedidosContext = createContext();

const PedidosProvider = ({children}) => {

    const [pedidos, setPedidos] = useState([]);
    const [alerta, setAlerta] = useState({})
    const [pedido, setPedido] = useState({})
    const [cargando, setCargando] = useState(false)
    const navigate = useNavigate();
    const {auth} = useAuth()

    useEffect(() => {
        const obtenerPedidos = async () => {
            try {
                const token = localStorage.getItem('token')
                if(!token) return
                 
                const config = {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    }
                }
                const { data } = await clienteAxios('/pedidos/pedidos', config)
                setPedidos(data)
            } catch (error) {
                console.log(error)
            }
        }
        obtenerPedidos()
    }, [auth])

    const mostrarAlerta = alerta => {
        setAlerta(alerta)

        setTimeout(() => {
            setAlerta({})
        }, 5000);
    }

    const submitPedido = async pedido => {
        if(pedido.id) {
            await editarPedido(pedido)
        } else {
            await nuevoPedido(pedido)
        }
    }

    const nuevoPedido = async pedido => {
        try {
            const token = localStorage.getItem('token')
            if(!token) return

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            const {data} =await clienteAxios.post('/pedidos/nuevo-pedido', pedido, config)

            setPedidos([...pedidos, data])

            setAlerta({
                msg: 'Pedido Creado Correctamente', 
                error: false
            })

            setTimeout(() => {
                setAlerta({})
                navigate('/pedidos')
            }, 3000);
        } catch (error) {
            console.log(error)
        }
    }

    const editarPedido = async pedido => {
        try {
            const token = localStorage.getItem('token')
            if(!token) return

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            const {data} = await clienteAxios.put(`/pedidos/editar-pedido/${pedido.id}`, pedido, config)
        
             const pedidosActualizados = pedidos.map(pedidoState => pedidoState.id === data.id ? data : pedidoState)
            setPedidos(pedidosActualizados);

            setAlerta({
                msg: 'Pedido Actualizado Correctamente',
                error: false
            })

            setTimeout(() => {
                setAlerta({})
                navigate('/pedidos')
            }, 3000)
        } catch (error) {
            console.log(error)
        }
    }

    const obtenerPedido = async id => {
        setCargando(true)
        try {
            const token = localStorage.getItem('token')
            if(!token) return

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            const { data } = await clienteAxios(`/pedidos/pedido/${id}`, config)
            setPedido(data)
            setAlerta({})
        } catch (error) {
            navigate('/pedidos')
            setAlerta({
                msg: error.response.data.msg,
                error: true
            })
            setTimeout(() => {
                setAlerta({})
            }, 3000);
        } finally {
            setCargando(false)
        }
    }

    const eliminarPedido = async id => {
        try {
            const token = localStorage.getItem('token')
            if(!token) return

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            const { data } = await clienteAxios.delete(`/pedidos/eliminar-pedido/${id}`, config)

            const pedidosActualizados = pedidos.filter(pedidoState => pedidoState.id !== id )
            setPedidos(pedidosActualizados)

            setAlerta({
                msg: data.msg,
                error: false
            })

            setTimeout(() => {
                setAlerta({})
                navigate('/pedidos')
            }, 3000)
        } catch (error) {
            console.log(error)
        }
    }



    return (
        <PedidosContext.Provider
            value={{
                pedidos,
                mostrarAlerta,
                alerta,
                submitPedido,
                obtenerPedido,
                pedido,
                cargando,
                eliminarPedido
            }}
        >
            {children}
        </PedidosContext.Provider>
    )
}

export {
    PedidosProvider
}

export default PedidosContext;