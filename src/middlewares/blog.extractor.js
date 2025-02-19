import { Blog } from "../models/index.js"

const blogExtractor=async(req,res,next)=>{
    
    req.blog = await Blog.findByPk(req.params.id)
    
    next(); 
}

export default blogExtractor;