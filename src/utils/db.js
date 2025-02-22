import {Sequelize} from 'sequelize';
import config from './config.js';
import { Umzug, SequelizeStorage } from 'umzug';


export const sequelize = new Sequelize(
     config.DATABASE_URL,
     {
         dialect: 'postgres',
     }
)

const migrationsConfig = {
    migrations: {
       glob: 'migrations/*.js',
    },
    context: sequelize.getQueryInterface(),
    storage: new SequelizeStorage({ 
        sequelize,
        tableName: 'migrations' 
    }),
    logger: console
};

// Configure Umzug
export const runMigrations = async () => {
        const migrator = new Umzug(migrationsConfig);
        const migrations = await migrator.up();
        console.log('Migrations completed successfully:', {
            files: migrations.map(migration => migration.name)
        });
}

export const rollbackMigration = async () => {
    const migrator = new Umzug(migrationsConfig);
    await migrator.down();
}

export const connectToDb = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
        // Run migrations
        console.log('Running migrations...');
        await runMigrations();
        console.log('Migrations completed successfully.');
    } catch (error) {
        console.error('Database setup failed:', {
            message: error.message,
            stack: error.stack
        });
        process.exit(1);
    }
}


