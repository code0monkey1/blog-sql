import { Op } from "sequelize";
import { Blog,User } from "../models/index.js";
 
 const postBlog=async(req,res,next) => {

    try{
        // create a new blog
      // extract the id from the decodedToken in the request object and assign it to the blog
       const newBlog = await Blog.create({...req.body,userId:req.decodedToken.id});

       
       res.json(newBlog);

    }catch(err){
        next(err);
    }
}

 const getAllBlogs=async(req,res,next) => {

    try{

      // filter as per the search parameters
      const where={

      }

      if(req.query.search){
          where[Op.or] = [

                { title: { [Op.iLike]: `%${req.query.search}%` } },
                { author: { [Op.iLike]: `%${req.query.search}%` } }
            ];
      }

      // get all blogs
      const blogs = await Blog.findAll({
         include: {
           model: User,
           attributes: ['name']
         },
         where,
         order: [['createdAt','DESC']]
      });

      res.json(blogs);

    }catch(err){
        next(err);
    }
}


 const getBlogById =async(req,res,next)=>{

    try{
        // get a single blog
       const blog = req.blog;

       console.log("🚀 ~ getBlogById ~ blog:", blog)

       if(!blog){
           return res.status(404).send('Blog not found');
       }
       res.json(blog);

    }catch(err){
        next(err);
    }

}


 const updateBlogById=async(req,res,next)=>{
    try{
        // update a blog
       const blog = req.blog;

             // ensure that the blog is deleted by the user who created it

        if(blog.userId!==req.decodedToken.id){
           return res.status(401).send('Unauthorized');
         }


       if(!blog){
           return res.status(404).send('Blog not found');
       }
       
       blog.likes = req.body.likes;

       await blog.save();
       
       res.json(blog);
       
    }catch(err){
        next(err);
    }
}


 const deleteBlogById=async(req,res,next)=>{
    try{
        // delete a blog
       const blog = req.blog;

       // ensure that the blog is deleted by the user who created it

         if(blog.userId!==req.decodedToken.id){
           return res.status(401).send('Unauthorized');
         }


       if(!blog){
           return res.status(404).send('Blog not found');
       }

       await blog.destroy();
       
       res.json({message: 'Blog deleted successfully'});

    }catch(err){
        next(err);
    }
 }


 export default {
    postBlog,
    getAllBlogs,
    getBlogById,
    updateBlogById,
    deleteBlogById,
 }

