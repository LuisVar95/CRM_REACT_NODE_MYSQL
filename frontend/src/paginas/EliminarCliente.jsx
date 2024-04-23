import React, { useEffect } from 'react'
import useClientes from '../hooks/useClientes';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const EliminarCliente = () => {

    const params = useParams();
    const navigate = useNavigate();

    const {eliminarCliente} = useClientes();

    useEffect(() => {
        eliminarCliente(params.id)
        navigate('/clientes')
    }, [])

  return null;
}

export default EliminarCliente