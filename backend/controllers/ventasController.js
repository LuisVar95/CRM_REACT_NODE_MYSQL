import Ventas from "../models/Ventas.js";
import { Sequelize } from "sequelize";

const obtenerVentasAnio = async (req, res) => {
    try {
        const { anio } = req.params; // Obtener el año desde req.query
        // Lógica para obtener las ventas del año seleccionado
        const ventas = await Ventas.findAll({
            where: Sequelize.where(Sequelize.fn('YEAR', Sequelize.col('fecha')), anio),
        });

        // Formatear la fecha de cada venta
        const ventasFormateadas = ventas.map((venta) => {
            return {
                ...venta.toJSON(),
                fecha: venta.fecha.toLocaleString('es-MX', { timeZone: 'America/Mexico_City' })
            };
        });
        res.json(ventasFormateadas);
    } catch (error) {
        console.error(error);
    }
};

const obtenerVentasMes = async (req, res) => {
    try {
        const { mes } = req.body;
        //logica para obtener las ventas del mes seleccionado
        const ventas = await Ventas.findAll({
            where: Sequelize.where(Sequelize.fn('MONTH', Sequelize.col('fecha')), mes),
        });

        // Formatear la fecha de cada venta
         const ventasFormateadas = ventas.map((venta) => {
            return {
                ...venta.toJSON(),
                fecha: venta.fecha.toLocaleString('es-MX', { timeZone: 'America/Mexico_City' })
            };
        });

        res.json(ventasFormateadas);
    } catch (error) {
        console.log(error)
    }
};

export {
    obtenerVentasMes,
    obtenerVentasAnio
}