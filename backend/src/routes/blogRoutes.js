import express from 'express';
import {
  createBlog,
  deleteBlog,
  getAllBlogs,
  getAllBlogsByUser,
  getBlogById,
  updateBlog,
} from '../controller/blog.js';
import { upload } from '../utils/multer.js';
import userAuth from '../middleware/userAuth.js';

const blogRoutes = express.Router();

blogRoutes.get('/', getAllBlogs);
blogRoutes.get('/by-user', userAuth, getAllBlogsByUser);
blogRoutes.get('/:blogId', getBlogById);
blogRoutes.post('/', userAuth, upload.single('image'), createBlog);
blogRoutes.put('/:blogId', userAuth, upload.single('image'), updateBlog);
blogRoutes.delete('/:blogId', userAuth, deleteBlog);

export default blogRoutes;
