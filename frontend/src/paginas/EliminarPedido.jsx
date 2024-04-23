import React, { useEffect } from 'react'
import usePedidos from '../hooks/usePedidos';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const EliminarPedido = () => {

    const params = useParams();
    const navigate = useNavigate();

    const {eliminarPedido} = usePedidos();

    useEffect(() => {
        eliminarPedido(params.id)
        navigate('/pedidos')
    }, [])

  return null;
}

export default EliminarPedido