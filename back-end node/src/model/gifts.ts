import sequelize from '../config/databaseConfig';
import {DataTypes} from "sequelize"

const gifts = sequelize.define(
  'gifts',
  {
    giftId: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue:DataTypes.UUIDV4
    },
    giftName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    giftImageUrl: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    giftDetails: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    giftPrice: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
  },
  {
    tableName:"gifts"
  },
);

export { gifts };
