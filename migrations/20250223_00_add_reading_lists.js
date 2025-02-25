import { DataTypes } from 'sequelize';

export const up = async ({ context: queryInterface }) => {
    // Create Users table
    await queryInterface.createTable('reading_lists', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            
        },
       blogId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'blogs',
                key: 'id'
            }
        },
       userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'users',
                key: 'id'
            }
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: false,
        }
    });

    await queryInterface.addColumn('reading_lists', 'read', {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    })

}

export const down = async ({ context: queryInterface }) => {
    // Drop tables in reverse order to handle foreign key constraints
    await queryInterface.dropTable('reading_lists');
    await queryInterface.removeColumn('reading_lists', 'read');
}


