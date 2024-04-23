import { useContext } from 'react'
import PedidosContext from '../context/PedidosProvider';

const usePedidos = () => {
    return useContext(PedidosContext)
}

export default usePedidos;