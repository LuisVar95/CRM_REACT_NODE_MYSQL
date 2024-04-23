import express from "express";
import { obtenerPedidos, crearPedido, editarPedido, eliminarPedido, obtenerPedido } from "../controllers/pedidoController.js";
import checkAuth from "../middleware/checkAuth.js";

const router = express.Router();

router.get("/pedidos", checkAuth, obtenerPedidos);
router.post("/nuevo-pedido", checkAuth, crearPedido);

router.get("/pedido/:id", checkAuth, obtenerPedido);
router.put("/editar-pedido/:id", checkAuth, editarPedido);
router.delete("/eliminar-pedido/:id", checkAuth, eliminarPedido);

export default router;