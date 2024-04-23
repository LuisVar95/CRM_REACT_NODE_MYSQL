import express from "express";
import checkAuth from "../middleware/checkAuth.js";
import { crearCategoria, editarCategoria, eliminarCategoria, obtenerCategorias } from "../controllers/categoriaController.js";

const router = express.Router();

router.get("/categorias", checkAuth, obtenerCategorias);
router.post("/crear-categoria", checkAuth, crearCategoria);
router.put("/editar-categoria/:id", checkAuth, editarCategoria);
router.delete("/eliminar-categoria/:id", checkAuth, eliminarCategoria);

export default router;
