import { connectDb } from './src/utils/db.js';
import Blog from './src/models/blog.model.js';

async function printBlogs() {
    try {
        await connectDb();
        const blogs = await Blog.findAll();
        blogs.forEach(blog => {
            console.log(`${blog.author}: '${blog.title}', ${blog.likes} likes`);
        });
    } catch (err) {
        console.error('Error fetching blogs:', err);
    }
}

printBlogs();