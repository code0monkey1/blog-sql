import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../utils/db.js';

class User extends Model {
    async disable() {
        this.disabled = true;
        await this.save();
        // Remove all sessions for this user
        await sequelize.models.session.removeUserSessions(this.id);
    }

    async enable() {
        this.disabled = false;
        await this.save();
    }
}

User.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    username: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    disabled: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    }
}, {
    sequelize,
    underscored: true,
    timestamps: true,
    modelName: 'user'
});

export default User;