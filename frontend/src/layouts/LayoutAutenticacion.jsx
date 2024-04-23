import React from 'react'
import { Outlet, Link } from 'react-router-dom'

const LayoutAutenticacion = () => {
  return (
    <>
    <header className="dashboard__header">
        <div className="dashboard__header-grid">
        <Link to="/">
            <div className='dashboard__logo-flex'>
                <img src="../public/img/crm.png" width={120} height={70} className="dashboard__logo"/>
                <p className='dashboard__logo-texto'>CRM-REACT</p>
            </div>
        </Link>
        </div>
    </header>
        <main className="dashboard__contenido-auth">
            <Outlet/>
        </main>
    </>
  )
}

export default LayoutAutenticacion;