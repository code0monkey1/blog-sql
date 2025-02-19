import { Model, DataTypes } from 'sequelize';

import {sequelize}  from '../utils/db.js'

class Blog extends Model {}

Blog.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    author: {
        type: DataTypes.STRING,
        allowNull: false
    },
    url: {
        type: DataTypes.STRING,
        allowNull: false
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    likes: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    }
},
    {
        sequelize,
        timestamps: true,
        modelName: 'blog'
    }
);

export default Blog;