

import { Model, DataTypes } from 'sequelize';

import {sequelize}  from '../utils/db.js'

class Session extends Model {}

Session.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'users', key: 'id' },
    },
    token: {
        type: DataTypes.STRING,
        allowNull: false,
    }
}, {
    sequelize,
    timestamps: true,
    modelName: 'session'
});

export default Session;