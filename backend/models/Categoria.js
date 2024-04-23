import { DataTypes } from "sequelize";
import db from "../config/db.js";

const Categoria = db.define('categorias', {
   id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true
  },
   nombre: {
        type: DataTypes.STRING,
        allowNull: false
   }
});

export default Categoria;