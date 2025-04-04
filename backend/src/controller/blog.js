import * as blogService from '../services/blog.js';

export const createBlog = async (req, res) => {
  const { title, description } = req.body;
  if (!title || !description) {
    return res
      .status(400)
      .json({ err: 'Insufficient details to create blog.' });
  }
  try {
    const blog = await blogService.createBlog({
      title,
      description,
      image: req.file ? `/uploads/${req.file.filename}` : null,
      userId: req.user._id,
    });
    res.status(201).json(blog);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Some error occurred!' });
  }
};

export const updateBlog = async (req, res) => {
  const { title, description } = req.body;
  if (!title || !description) {
    return res
      .status(400)
      .json({ err: 'Insufficient details to create blog.' });
  }
  const { blogId } = req.params;
  try {
    const updatedBlog = { title, description };

    if (req.file) {
      updatedBlog.image = `/uploads/${req.file.filename}`;
    }
    const blog = await blogService.updateBlog(blogId, updatedBlog);
    res.status(200).json(blog);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Some error occurred!' });
  }
};

export const deleteBlog = async (req, res) => {
  const { blogId } = req.params;
  try {
    const deletedBlog = await blogService.deleteBlog(blogId);

    if (!deletedBlog) {
      return res.status(404).json({ error: 'Blog not found.' });
    }

    res.status(200).json({ message: 'Blog permanently deleted.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Some error occurred!' });
  }
};
export const getAllBlogs = async (req, res) => {
  try {
    const blogs = await blogService.getBlogs();
    res.status(200).json(blogs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Some error occurred!' });
  }
};

export const getAllBlogsByUser = async (req, res) => {
  try {
    const userId = req.user._id;
    const blogs = await blogService.getBlogByUserId(userId);
    res.status(200).json(blogs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Some error occurred!' });
  }
};

export const getBlogById = async (req, res) => {
  try {
    const blogId = req.params.blogId;
    const blog = await blogService.getBlogById(blogId);
    res.status(200).json(blog);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Some error occurred!' });
  }
};
