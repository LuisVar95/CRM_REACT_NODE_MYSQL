import express from "express";
import checkAuth from "../middleware/checkAuth.js";
import { obtenerProductos, editarProducto, eliminarProducto, crearProducto } from "../controllers/productoController.js";

const router = express.Router();

router.get("/productos", checkAuth, obtenerProductos);
router.post("/crear-producto", checkAuth, crearProducto);
router.put("/editar-producto/:id", checkAuth, editarProducto);
router.delete("/eliminar-producto/:id", checkAuth, eliminarProducto);

export default router;
