import { DataTypes } from 'sequelize';

export const up = async ({ context: queryInterface }) => {
    await queryInterface.createTable('sessions', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: { model: 'users', key: 'id' },
        },
        token: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: false,
        },
    });
};

export const down = async ({ context: queryInterface }) => {
    await queryInterface.dropTable('sessions');
};
