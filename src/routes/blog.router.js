
import { Router } from "express";
import blogController from '../controllers/blog.controller.js';
import blogExtractor from "../middlewares/blog.extractor.js";
import tokenExtractor from "../middlewares/token.extractor.js";

const route = Router();

route.post('/',tokenExtractor,blogController.postBlog);

route.get('/',blogController.getAllBlogs);

route.get('/:id',blogExtractor, blogController.getBlogById);

route.put('/:id',tokenExtractor, blogExtractor,blogController.updateBlogById);

route.delete('/:id',tokenExtractor,blogExtractor,blogController.deleteBlogById);

export default route;