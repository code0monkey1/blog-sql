
import { Model, DataTypes } from 'sequelize';

import {sequelize}  from '../utils/db.js'

class ReadingList extends Model {}

ReadingList.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    blogId:{
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'blogs',
            key: 'id'
        }
    },
    userId:{
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'users',
            key: 'id'
        }
    }, 
    read:{
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    }
},
    {
        sequelize,
        timestamps: true,
        modelName: 'reading_list'
    }
);

export default ReadingList;