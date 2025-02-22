import { runMigrations } from "./db.js";

(async () =>{
    try{
        await runMigrations();
   } catch (error) {
       console.error('Database setup failed:', {
           message: error.message,
           stack: error.stack
       });
       process.exit(1);
   }

})()