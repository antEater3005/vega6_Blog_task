import Blog from '../models/Blog.js';
import { deleteFile } from '../utils/multer.js';

export const createBlog = async ({ title, description, image, userId }) => {
  try {
    const blog = new Blog({ title, description, image, userId });
    return await blog.save();
  } catch (error) {
    throw new Error('Error creating blog: ' + error.message);
  }
};

export const getBlogs = async () => {
  try {
    return await Blog.find();
  } catch (error) {
    throw new Error('Error fetching blogs: ' + error.message);
  }
};

export const getBlogById = async (id) => {
  try {
    return await Blog.findById(id);
  } catch (error) {
    throw new Error('Error fetching blogs: ' + error.message);
  }
};

export const getBlogByUserId = async (userId) => {
  try {
    return await Blog.find({ userId });
  } catch (error) {
    throw new Error('Error fetching blogs: ' + error.message);
  }
};

export const updateBlog = async (blogId, updateBlog) => {
  try {
    const prevBlog = await Blog.findById(blogId);
    if (prevBlog.image && updateBlog.image) {
      await deleteFile(prevBlog.image);
    }
    return await Blog.findByIdAndUpdate(blogId, updateBlog, {
      new: true,
      runValidators: true,
    });
  } catch (error) {
    throw new Error('Error updating blog: ' + error.message);
  }
};

export const deleteBlog = async (id, userId) => {
  try {
    const blog = await Blog.findById(id);
    if (blog.userId.toString() !== userId)
      throw new Error('No delete permission.');
    deleteFile(blog.image);
    return await Blog.findByIdAndDelete(id);
  } catch (error) {
    throw new Error('Error deleting blog: ' + error.message);
  }
};
