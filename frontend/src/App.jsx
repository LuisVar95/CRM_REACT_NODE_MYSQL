import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import './App.css';
/** Componentes **/
import Layout from './layouts/Layout';
import LayoutAutenticacion from './layouts/LayoutAutenticacion';
import Index from './paginas/Index';
import Clientes from './paginas/Clientes';
import EditarCliente from './paginas/EditarCliente'
import Pedidos from './paginas/Pedidos';
import Tareas from './paginas/Tareas';
import Graficas from './paginas/Graficas';
import CrearCliente from './paginas/CrearCliente';
import CrearPedido from './paginas/CrearPedido';
import EditarPedido from './paginas/EditarPedido';
import EliminarPedido from './paginas/EliminarPedido';
import CrearTarea from './paginas/CrearTarea';
import EditarTarea from './paginas/EditarTarea';
import EliminarTarea from './paginas/EliminarTarea';
import Login from './paginas/Autenticacion/Login';
import Registrar from './paginas/Autenticacion/Registrar';
import OlvidePassword from './paginas/Autenticacion/OlvidePassword';
import NuevoPassword from './paginas/Autenticacion/NuevoPassword';
import ConfirmarCuenta from './paginas/Autenticacion/ConfirmarCuenta';
import EliminarCliente from './paginas/EliminarCliente';
/** Provider **/
import { ClientesProvider } from './context/ClientesProvider';
import { GraficasProvider } from './context/GraficasProvider';
import { PedidosProvider } from './context/PedidosProvider';
import { ProductosProvider } from './context/ProductosProvider';
import { TareasProvider } from './context/TareasProvider';
import { AuthProvider } from './context/AuthProvider';


function App() {

  return (
    <>
      <Router>
        <AuthProvider>
          <TareasProvider>
            <ProductosProvider>
              <PedidosProvider>
                <GraficasProvider>
                  <ClientesProvider>
                      <Routes>
                          <Route path="/" element={<Layout/>}>
                            <Route index element={<Index/>} />
                            <Route path='clientes' element={<Clientes/>}/>
                            <Route path='crear-cliente' element={<CrearCliente/>}/>
                            <Route path='editar-cliente/:id' element={<EditarCliente/>}/>
                            <Route path='eliminar-cliente/:id' element={<EliminarCliente/>}/>
                            <Route path='pedidos' element={<Pedidos/>}/>
                            <Route path='crear-pedido' element={<CrearPedido/>}/>
                            <Route path='editar-pedido/:id' element={<EditarPedido/>}/>
                            <Route path='eliminar-pedido/:id' element={<EliminarPedido/>}/>
                            <Route path='tareas' element={<Tareas/>}/>
                            <Route path='crear-tarea' element={<CrearTarea/>}/>
                            <Route path='editar-tarea/:id' element={<EditarTarea/>}/> 
                            <Route path='eliminar-tarea/:id' element={<EliminarTarea/>}/>                           
                            <Route path='graficas' element={<Graficas/>}/>
                            <Route path='graficas/:anio' element={<Graficas/>}/>
                          </Route>

                          <Route path='/auth' element={<LayoutAutenticacion/>}>
                            <Route index element={<Login/>}/>
                            <Route path='registrar' element={<Registrar/>} />
                            <Route path='confirmar/:token' element={<ConfirmarCuenta/>} />
                            <Route path='olvide-password' element={<OlvidePassword/>} />
                            <Route path='olvide-password/:token' element={<NuevoPassword/>} />
                          </Route>
                      </Routes>
                  </ClientesProvider>
                </GraficasProvider>
              </PedidosProvider>
            </ProductosProvider>
          </TareasProvider>
        </AuthProvider>
      </Router>

    </>
  );
};

export default App;
