import express from "express";
import { obtenerVentasAnio, obtenerVentasMes } from "../controllers/ventasController.js";
import checkAuth from "../middleware/checkAuth.js";

const router = express.Router();

router.get("/ventas-anio/:anio", checkAuth, obtenerVentasAnio);
router.get("/ventas-mes", checkAuth, obtenerVentasMes);

export default router;
