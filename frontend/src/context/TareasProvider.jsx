import { useState, useEffect, createContext } from "react";
import { useNavigate } from "react-router-dom";
import clienteAxios from "../config/clienteAxios";
import useAuth from '../hooks/useAuth';

const TareasContext = createContext();

const TareasProvider = ({children}) => {

    const [tareas, setTareas] = useState([]);
    const [alerta, setAlerta] = useState({});
    const [tarea, setTarea] = useState({});
    const [cargando, setCargando] = useState(false);
    const {auth} = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const obtenerTareas = async () => {
            try {
                const token = localStorage.getItem('token');
                if(!token) return
                

                const config = {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    }
                }
                const { data } = await clienteAxios('/tareas/tareas', config);
                setTareas(data)
            } catch (error) {
                console.log(error)
            }
        }
        obtenerTareas()
    }, [auth])

    const mostrarAlerta = alerta => {
        setAlerta(alerta)

        setTimeout(() => {
            setAlerta({})
        }, 5000);
    }

    const submitTarea = async tarea => {
        if(tarea.id) {
            await editarTarea(tarea)
        } else {
            await nuevaTarea(tarea)
        }
    }

    const editarTarea = async tarea => {
        try {
            const token = localStorage.getItem('token')
            if(!token) return

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            const { data } = await clienteAxios.put(`/tareas/editar-tarea/${tarea.id}`, tarea, config)

            // Sincronizar el state
            const tareasActualizadas = tareas.map(tareaState => tareaState.id === data.id ? data : tareaState)
            setTareas(tareasActualizadas)

            setAlerta({
                msg: 'Tarea Actualizada Correctamente',
                error: false
            })

            setTimeout(() => {
                setAlerta({})
                navigate('/tareas')
            }, 3000);
        } catch (error) {
            console.log(error)
        }
    }

    const nuevaTarea = async tarea => {
        try {
            const token = localStorage.getItem('token')
            if(!token) return

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            const { data } = await clienteAxios.post('/tareas/crear-tarea', tarea, config)

            setTareas([...tareas, data])

            setAlerta({
                msg: 'Tarea Creada Correctamente',
                error: false
            })

            setTimeout(() => {
                setAlerta({})
                navigate('/tareas')
            }, 3000);
        } catch (error) {
            console.log(error)
        }
    }

    const obtenerTarea = async id => {
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

            const { data } = await clienteAxios(`/tareas/tarea/${id}`, config )
            setTarea(data)
            setAlerta({})
        } catch (error) {
            navigate('/tareas')
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

    const eliminarTarea = async id => {
        try {
            const token = localStorage.getItem('token')
            if(!token) return

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            const { data } = await clienteAxios.delete(`/tareas/eliminar-tarea/${id}`, config)

            // Sincronizar el state
            const tareasActualizadas = tareas.filter(tareasState => tareasState._id !== id )
            setTareas(tareasActualizadas)

            setAlerta({
                msg: data.msg,
                error: false
            })

            setTimeout(() => {
                setAlerta({})
                navigate('/tareas')
            }, 3000);
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <TareasContext.Provider
            value={{
                tareas, 
                mostrarAlerta,
                alerta,
                submitTarea,
                obtenerTarea,
                tarea,
                cargando,
                eliminarTarea
            }}
        >
            {children}
        </TareasContext.Provider>
    )
}

export {
    TareasProvider
}

export default TareasContext;