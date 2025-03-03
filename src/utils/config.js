import dotenv from 'dotenv';

dotenv.config();

export default {
       PORT : process.env.PORT,
       DATABASE_URL:process.env.DATABASE_URL,
       JWT_SECRET:process.env.JWT_SECRET,
       RUN_MIGRATIONS:process.env.RUN_MIGRATIONS
}