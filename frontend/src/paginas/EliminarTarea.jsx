import React, { useEffect } from 'react'
import useTareas from '../hooks/useTareas';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const EliminarTarea = () => {

    const params = useParams();
    const navigate = useNavigate();

    const {eliminarTarea} = useTareas();

    useEffect(() => {
        eliminarTarea(params.id)
        navigate('/tareas')
    }, [])

  return null;
}

export default EliminarTarea