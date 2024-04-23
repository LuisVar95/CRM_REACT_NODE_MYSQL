import { DataTypes, Sequelize } from "sequelize";
import db from "../config/db.js";
import Pedido from "./Pedido.js";

const Ventas = db.define('ventas', {
    total: {
        type: DataTypes.DECIMAL(10, 3), // 10 dígitos en total, 3 dígitos a la derecha del punto decimal
        allowNull: false
    },
    fecha: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW, // Establece la fecha y hora actuales como valor predeterminado
        get() {
            // Obtener la fecha en hora local de Guadalajara, México
            const fecha = this.getDataValue('fecha');
            const fechaLocal = new Date(fecha.toLocaleString('en-US', {timeZone: 'America/Mexico_City'}));
            return fechaLocal;
        }
    },
    pedidoId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: Pedido,
          key: 'id'
        }
    },
});

Ventas.belongsTo(Pedido, { as: 'pedido', foreignKey: 'pedidoId' });


export default Ventas;