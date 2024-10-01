import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/databaseConfig';

class OrderAttributes extends Model {
  orderId!: string;
  orderName!: string;
  orderDescription!: string;
  themeModel!: object;
  giftModel!: object;
  orderDate!: Date;
  orderPrice!: number;
  orderAddress!: string;
  orderPhone!: number;
  orderEmail!: string;
  orderStatus!: 'confirmed' | 'pending' | 'processing' | 'dispatched' | 'delivered' | 'cancelled'; 
  orderUpdatedBy!: string; 
}

OrderAttributes.init(
  {
    orderId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    orderName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    orderDescription: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    themeModel: {
      type: DataTypes.JSON,
      allowNull: false,
    },
    giftModel: {
      type: DataTypes.JSON,
      allowNull: false,
    },
    orderDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    orderPrice: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    orderAddress: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    orderPhone: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    orderEmail: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    orderStatus: {
      type: DataTypes.ENUM('confirmed','pending','processing','dispatched','delivered','cancelled'), 
      allowNull: false,
    },
    orderUpdatedBy: {
      type: DataTypes.STRING, 
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'orders',
    timestamps: true,
  },
);

export default OrderAttributes;