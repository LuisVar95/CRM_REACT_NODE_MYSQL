import React, {useEffect} from 'react'
import { Outlet, Navigate, Link } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import Spinner from '../components/Spinner';

const Layout = () => {

    const { cerrarSesionAuth, auth, cargando } = useAuth()

    if (cargando) {
        return <Spinner />
    }

    const handleCerrarSesion = () => {
        cerrarSesionAuth()
        cerrarSesionProyectos()
        localStorage.removeItem('token')
    }

  return (
    <>
        {auth.id ? (
        <div className='dashboard'>
            <header className="dashboard__header">
                <div className="dashboard__header-grid">
                    <Link to="/">
                        <div className='dashboard__logo-flex'>
                            <img src="../public/img/crm.png" width={120} height={70} className="dashboard__logo"/>
                            <p className='dashboard__logo-texto'>CRM-REACT</p>
                        </div>
                    </Link>

                    <nav className="dashboard__nav">
                        <button onClick={handleCerrarSesion} type="button" className="dashboard__enlace-logout">Cerrar Sesion</button>
                    </nav>
                </div>
            </header>
            <div className="dashboard__grid">
            <aside className="dashboard__sidebar">
                <nav className="dashboard__menu">
                    <Link to="/" className={window.location.pathname === '/' ? 'dashboard__enlace dashboard__enlace-activo' : 'dashboard__enlace'}>
                        <img src='../public/img/home.png' alt="Imagen" className="dashboard__enlace-imagen"/>
                        <p className="dashboard__enlace-texto">Inicio</p>
                    </Link>
                    <Link to="/clientes" className={window.location.pathname === '/clientes' ? 'dashboard__enlace dashboard__enlace-activo' : 'dashboard__enlace'}>
                        <img src='../public/img/usuarios.png' alt="Imagen" className="dashboard__enlace-imagen"/>
                        <p className="dashboard__enlace-texto">Clientes</p>
                    </Link>
                    <Link to="/pedidos" className={window.location.pathname === '/pedidos' ? 'dashboard__enlace dashboard__enlace-activo' : 'dashboard__enlace'}>
                        <img src='../public/img/pedido.png' alt="Imagen" className="dashboard__enlace-imagen"/>
                        <p className="dashboard__enlace-texto">Pedidos</p>
                    </Link>
                    <Link to="/tareas" className={window.location.pathname === '/tareas' ? 'dashboard__enlace dashboard__enlace-activo' : 'dashboard__enlace'}>
                        <img src='../public/img/tareas.png' alt="Imagen" className="dashboard__enlace-imagen"/>
                        <p className="dashboard__enlace-texto">Tareas</p>
                    </Link>
                    <Link to="/graficas" className={window.location.pathname === '/graficas' ? 'dashboard__enlace dashboard__enlace-activo' : 'dashboard__enlace'}>
                        <img src='../public/img/grafica.png' alt="Imagen" className="dashboard__enlace-imagen"/>
                        <p className="dashboard__enlace-texto">Graficas</p>
                    </Link>
                </nav>
            </aside>
                <main className="dashboard__contenido">
                    <Outlet/>
                </main>
            </div>
        </div>
        ) : <Navigate to="/auth" /> }
    </>
  )
}

export default Layout