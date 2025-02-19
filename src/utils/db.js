import {Sequelize} from 'sequelize';
import config from './config.js';

export const sequelize = new Sequelize(
     config.DATABASE_URL,
     {
         dialect: 'postgres',
     }
 )

export const connectToDb=async()=>{
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
        process.exit(1);
    }
}


