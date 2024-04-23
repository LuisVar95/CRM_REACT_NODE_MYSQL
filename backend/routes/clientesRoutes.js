import express from "express";
import { obtenerClientes, nuevoCliente, obtenerCliente, editarCliente, eliminarCliente } from "../controllers/clienteController.js";
import checkAuth from "../middleware/checkAuth.js";

const router = express.Router();

router.get("/clientes", checkAuth, obtenerClientes);
router.post("/nuevo-cliente", checkAuth, nuevoCliente);

router.get("/cliente/:id", checkAuth, obtenerCliente);
router.put("/editar-cliente/:id", checkAuth, editarCliente);
router.delete("/eliminar-cliente/:id", checkAuth, eliminarCliente);

export default router;
