import express from "express";
import { obtenerTareas, crearTarea, editarTarea, eliminarTarea, obtenerTarea } from "../controllers/tareaController.js";
import checkAuth from "../middleware/checkAuth.js";

const router = express.Router();

router.get("/tareas", checkAuth, obtenerTareas);
router.post("/crear-tarea", checkAuth, crearTarea);
router.get("/tarea/:id", checkAuth, obtenerTarea);
router.put("/editar-tarea/:id", checkAuth, editarTarea);
router.delete("/eliminar-tarea/:id", checkAuth, eliminarTarea)


export default router;
