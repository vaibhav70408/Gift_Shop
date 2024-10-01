import { DataTypes } from 'sequelize';
import sequelize from "../config/databaseConfig";

const themeModel = sequelize.define(
  'themes',
  {
    themeId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    themeName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    themeDetails: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    themePrice: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
  },
  {
    tableName: 'themes',
  },
);

export default themeModel;
