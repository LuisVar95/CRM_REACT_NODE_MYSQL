import { useState, useEffect, createContext } from "react";
import { useNavigate } from "react-router-dom";
import clienteAxios from "../config/clienteAxios";

const GraficasContext = createContext();

const GraficasProvider = ({children}) => {

    return (
        <GraficasContext.Provider
            value={{

            }}
        >
            {children}
        </GraficasContext.Provider>
    )
}

export {
    GraficasProvider
}

export default GraficasContext;