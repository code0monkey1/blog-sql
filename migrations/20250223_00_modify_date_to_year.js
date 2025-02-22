import { DataTypes } from 'sequelize';

export const up = async ({ context: queryInterface }) => {
    // First remove the date column if it exists
    await queryInterface.removeColumn('blogs', 'date');

    // Then add the year column with validation
    await queryInterface.addColumn('blogs', 'year', {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            min: {
                args: 1991,
                msg: "Year must be at least 1991"
            },
            max: {
                args: new Date().getFullYear(),
                msg: `Year cannot be greater than ${new Date().getFullYear()}`
            }
        }
    });
};

export const down = async ({ context: queryInterface }) => {
    // Remove the year column
    await queryInterface.removeColumn('blogs', 'year');
    
    // Add back the date column
    await queryInterface.addColumn('blogs', 'date', {
        type: DataTypes.DATE,
        allowNull: true
    });
}; 