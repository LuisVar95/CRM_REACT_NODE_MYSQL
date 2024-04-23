import { useState, useEffect, createContext } from "react";
import { useNavigate } from "react-router-dom";
import clienteAxios from "../config/clienteAxios";
import useAuth from "../hooks/useAuth";

const ProductosContext = createContext();

const ProductosProvider = ({children}) => {

    const [productos, setProductos] = useState([]);

    const navigate = useNavigate();
    const {auth} = useAuth()

    useEffect(() => {
        const obtenerProductos = async () => {
            try {
                const token = localStorage.getItem('token')
                if(!token) return
                 
                const config = {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    }
                }
                const { data } = await clienteAxios('/productos/productos', config)
                setProductos(data)
            } catch (error) {
                console.log(error)
            }
        }
        obtenerProductos()
    }, [auth])
    

    return (
        <ProductosContext.Provider
            value={{
                productos
            }}
        >
            {children}
        </ProductosContext.Provider>
    )
}

export {
    ProductosProvider
}

export default ProductosContext;