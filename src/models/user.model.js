
import { Model, DataTypes } from 'sequelize';

import {sequelize}  from '../utils/db.js'

class User extends Model {}

User.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    username:{
        type: DataTypes.STRING,
        allowNull:false,
        unique: {
            msg: "Username already exists"
        },
        validate: {
        isEmail: {
            msg: "Validation isEmail on username failed"
        }
    }
    },
    name:{
        type: DataTypes.STRING,
        allowNull: false
    }
},
    {
        sequelize,
        timestamps: true,
        modelName: 'user'
    }
);

export default User;