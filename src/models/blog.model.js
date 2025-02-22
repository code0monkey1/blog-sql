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
    year: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            isValidYear(value) {
                const currentYear = new Date().getFullYear();
                if (value < 1991) {
                    throw new Error('Year must be at least 1991');
                }
                if (value > currentYear) {
                    throw new Error(`Year cannot be greater than ${currentYear}`);
                }
            }
        }
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