import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import db from './config/db.js';
import usuariosRoutes from './routes/usuariosRoutes.js';
import clientesRoutes from './routes/clientesRoutes.js';
import categoriaRoutes from './routes/categoriasRoutes.js';
import productosRoutes from './routes/productosRoutes.js';
import tareasRoutes from './routes/tareasRoutes.js';
import pedidosRoutes from './routes/pedidosRoutes.js';
import ventasRoutes from './routes/ventasRoutes.js'

const app = express();
app.use(express.json());

dotenv.config();

// Conexion a la base de datos 
try {
    await db.authenticate();
    db.sync()
    console.log('Conexion Correcta a la base de datos')
} catch (error) {
    console.log(error);
}

//Configurar CORS
const whitelist = [process.env.FRONTEND_URL];

const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.includes(origin)) {
      // Puede consultar la API
     callback(null, true);
    } else {
      // No esta permitido
      callback(new Error("Error de Cors"));
    }
  },
};

app.use(cors(corsOptions));

//Routing
app.use("/api/usuarios", usuariosRoutes);
app.use("/api/clientes", clientesRoutes);
app.use("/api/categorias", categoriaRoutes);
app.use("/api/productos", productosRoutes);
app.use("/api/tareas", tareasRoutes);
app.use("/api/pedidos", pedidosRoutes);
app.use("/api/ventas", ventasRoutes);


const PORT = process.env.PORT || 4000;
const servidor = app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
