import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import useTareas from '../hooks/useTareas'
import { formatarFecha } from '../helpers/funcionesFormatos'


const Tareas = () => {

    const {tareas} = useTareas();
    const [busqueda, setBusqueda] = useState(''); 
    // Estado local para el estado de cada tarea (pendiente o activo)
    const [estadoTareas, setEstadoTareas] = useState(tareas.map(() => false));

    const toggleEstado = (index) => {
        const newEstadoTareas = [...estadoTareas];
        newEstadoTareas[index] = !newEstadoTareas[index];
        setEstadoTareas(newEstadoTareas);
    };

    const tareasFiltradas = tareas.filter(tarea => 
        tarea.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
        tarea.descripcion.toLowerCase().includes(busqueda.toLowerCase()) ||
        tarea.fecha.toString().includes(busqueda)
    );

  return (
    <>
        <h1 className="dashboard__heading">Tareas</h1>
        <div className="dashboard__acciones-flex">
            <div className="dashboard__contenedor-boton">
                <Link className="dashboard__boton" to="/crear-tarea">
                    <img src="/img/plus2.png" alt="imagen" className="dashboard__boton-logo"/>
                    <p className="dashboard__boton-texto">Crear Tarea</p>
                </Link>
            </div>
            <div className="dashboard__buscador">
                <input 
                    type="text" 
                    placeholder="Titulo o Descripcion" 
                    className="dashboard__buscar"
                    value={busqueda}
                    onChange={(e) => setBusqueda(e.target.value)}
                />
            </div>
        </div>

        {tareasFiltradas.length > 0 ? (
            tareasFiltradas.map((tarea, index) => {
                const fechaISO = tarea.fecha.includes("T") ? tarea.fecha : `${tarea.fecha}T00:00:00.000Z`;
                const fecha = new Date(fechaISO);
                const fechaFormateada = isNaN(fecha.getTime()) ? "Fecha inválida" : formatarFecha(fechaISO);

                return (
                    <div key={tarea.id} className="tareas">
                        <div className="tareas__campo">
                            <div className="tareas__flex">
                                <div className="tareas__info">
                                    <p><span className="tareas__span">Fecha de Entrega:<br/></span> {fechaFormateada}</p>
                                    <p className="tareas__nombre"><span className="tareas__span">Titulo:<br/></span> {tarea.nombre}</p>
                                    <p className="tareas__descripcion"><span className="tareas__span">Descripcion:<br/></span> {tarea.descripcion}</p>
                                </div>
                                <div className="tareas__botones">
                                    <button className={`tareas__boton-toggle ${estadoTareas[index] ? 'tareas__boton-activo' : 'tareas__boton-pendiente'}`} onClick={() => toggleEstado(index)}>
                                        {estadoTareas[index] ? 'Completada' : 'Pendiente'}
                                    </button>
                                    <Link to={`/editar-tarea/${tarea.id}`} className="tareas__boton tareas__boton-editar">Editar</Link>
                                    <Link to={`/eliminar-tarea/${tarea.id}`} className="tareas__boton tareas__boton-eliminar">Eliminar</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            })
        ) : (
            <p className='texto__nohay'> No hay Tareas aún </p>
        )}
    </>
  )
}

export default Tareas