import { DataTypes } from "sequelize";
import db from "../config/db.js";
import Categoria from "./Categoria.js";

const Producto = db.define('productos', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
     },
     categoriaId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: 'categorias',
          key: 'id'
        }
     },
     precio: {
        type: DataTypes.DECIMAL(10, 2), // 10 dígitos en total, 2 dígitos a la derecha del punto decimal
        allowNull: false
      }
});

Producto.belongsTo(Categoria, {
    foreignKey: 'categoriaId',
    targetKey: 'id'
});
  

export default Producto;