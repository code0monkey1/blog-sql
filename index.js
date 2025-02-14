// create an express app with CRUD for blog routes
import express from 'express';
import {connectDb} from './src/utils/db.js';
import Blog from './src/models/blog.model.js';

await connectDb()

const app = express();

app.use(express.json());

// import routes

app.post('/api/blogs',async(req,res,next) => {

    try{
        // create a new blog
       const newBlog = await Blog.create(req.body);
       res.json(newBlog);

    }catch(err){
        next(err);
    }
});

// get all blogs route

app.get('/api/blogs',async(req,res,next) => {
    try{

        // get all blogs
       const blogs = await Blog.findAll();
       res.json(blogs);

    }catch(err){
        next(err);
    }
});

//error handling

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


const PORT  = 3001

app.listen(PORT,function(){
    console.log(`Server is running on port ${PORT}`);
});
