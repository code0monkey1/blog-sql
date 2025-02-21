// create an express app with CRUD for blog routes
import express from 'express';
import {connectToDb} from './src/utils/db.js';
import config from './src/utils/config.js';
import blogRouter from './src/routes/blog.router.js';
import userRouter from './src/routes/user.router.js';
import loginRouter from './src/routes/login.router.js';
import authorRouter from './src/routes/author.router.js';
const app = express();

app.use(express.json());

// import routes
app.use('/api/blogs',blogRouter);
app.use('/api/users',userRouter);
app.use('/api/login',loginRouter);
app.use('/api/authors',authorRouter);

app.use((err, req, res, next) => {
    
    console.error("error message",err.message);
    console.error(err.stack);

    res.status(err.status || 500);
    res.json({
        error: {
            message: err.message,
            stack: err.stack,
        },
    });
});

const PORT  = config.PORT || 3001

const start=async()=>{
     //db connection
     await connectToDb()
     //server linsten start server

    app.listen(PORT,function(){
        console.log(`Server is running on port ${PORT}`);
    });
}

start();



