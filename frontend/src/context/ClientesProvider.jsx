import { useState, useEffect, createContext } from "react";
import { useNavigate } from "react-router-dom";
import clienteAxios from "../config/clienteAxios";
import useAuth from "../hooks/useAuth";

const ClientesContext = createContext();

const ClientesProvider = ({children}) => {

    const [clientes, setClientes] = useState([]);
    const [alerta, setAlerta] = useState({});
    const [cliente, setCliente] = useState({});
    const [cargando, setCargando] = useState(false);

    const navigate = useNavigate();
    const {auth} = useAuth()

    useEffect(() => {
        const obtenerClientes = async () => {
            try {
                const token = localStorage.getItem('token')
                if(!token) return

                const config = {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    }
                }
                const { data } = await clienteAxios('/clientes/clientes', config)
                setClientes(data)
            } catch (error) {
                console.log(error)
            }
        }
        obtenerClientes()
    }, [auth])

    const mostrarAlerta = alerta => {
        setAlerta(alerta)

        setTimeout(() => {
            setAlerta({})
        }, 3000);
    }

    const submitCliente = async cliente => {
        if(cliente.id) {
            await editarCliente(cliente)
        } else {
            await nuevoCliente(cliente)
        }
    }

    const nuevoCliente = async cliente => {
        try {
            const token = localStorage.getItem('token')
            if(!token) return

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            const { data } = await clienteAxios.post('/clientes/nuevo-cliente', cliente, config)

            setClientes([...clientes, data])
            console.log(clientes)

            setAlerta({
                msg: 'Cliente Creado Correctamente',
                error: false
            })

            setTimeout(() => {
                setAlerta({})
                navigate('/clientes')
            }, 3000);
        } catch (error) {
            console.log(error)
        }
    }

    const obtenerCliente = async id => {
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

            const { data } = await clienteAxios(`/clientes/cliente/${id}`, config)
            setCliente(data)
            setAlerta([])
        } catch (error) {
            navigate('/')
            setAlerta({
                msg: error.response.data.msg,
                error: true
            })
            setTimeout(() => {
                setAlerta({})
            }, 3000)
        } finally {
            setCargando(false)
        }
    }

    const editarCliente = async cliente => {
        try {
            const token = localStorage.getItem('token')
            if(!token) return

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            const { data } = await clienteAxios.put(`/clientes/editar-cliente/${cliente.id}`, cliente, config)
            // Sinconizar el state
            const clientesActualizados = clientes.map(clienteState => clienteState.id === data.id ? data : clienteState)
            setClientes(clientesActualizados)

            setAlerta({
                msg: 'Cliente Actualizado Correctamente',
                error: false
            })

            setTimeout(() => {
                setAlerta({})
                navigate('/clientes')
            }, 3000)
        } catch (error) {
            console.log(error)
        }
    }

    const eliminarCliente = async id => {
        try {
            const token = localStorage.getItem('token')
            if(!token) return

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }


            const { data } = await clienteAxios.delete(`/clientes/eliminar-cliente/${id}`, config)

            const clientesActualizados = clientes.filter(clienteState => clienteState.id !== id )
            setClientes(clientesActualizados)

            setAlerta({
                msg: data.msg,
                error: false
            })

            setTimeout(() => {
                setAlerta({})
                navigate('/clientes')
            }, 3000)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <ClientesContext.Provider
            value={{
                clientes,
                mostrarAlerta,
                alerta,
                submitCliente,
                obtenerCliente,
                cliente,
                cargando,
                eliminarCliente
            }}
        >
            {children}
        </ClientesContext.Provider>
    )
}

export {
    ClientesProvider
}

export default ClientesContext;