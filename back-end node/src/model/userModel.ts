import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/databaseConfig';

class UserModel extends Model {
    public email!: string;
    public password!: string;
    public userName!: string;
    public mobileNumber!: number;
    public userRole!: string;
}

UserModel.init({
    userName: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
    },
    mobileNumber: {
        type: DataTypes.BIGINT,
        allowNull: false,
    },
    userRole: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    sequelize,
    tableName: 'users',
});

export default UserModel;
