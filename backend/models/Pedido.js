import { DataTypes } from "sequelize";
import db from "../config/db.js";
import Producto from "./Producto.js";
import Cliente from "./Cliente.js"

const Pedido = db.define('pedidos', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true
    },
    cantidad: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    productoId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: Producto,
          key: 'id'
        }
    },
    nombreProducto: {
        type: DataTypes.STRING,
        allowNull: false
    },
    nombreCliente: {
        type: DataTypes.STRING,
        allowNull: false
    },
    emailCliente: {
        type: DataTypes.STRING,
        allowNull: false
    },
    clienteId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: Cliente,
          key: 'id'
        }
    },
    total: {
        type: DataTypes.DECIMAL(10, 3), // 10 dígitos en total, 3 dígitos a la derecha del punto decimal
        allowNull: false
    }
});

// Define la relación uno a uno entre Pedido y Producto
Pedido.belongsTo(Producto, { as: 'producto', foreignKey: 'productoId' });
Pedido.belongsTo(Cliente, { as: 'cliente', foreignKey: 'clienteId' });

export default Pedido;