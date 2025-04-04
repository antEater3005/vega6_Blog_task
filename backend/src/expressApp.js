import express from 'express';
import path from 'path';
import cors from 'cors';
import morgan from 'morgan';
import userRoutes from './routes/userRoutes.js';
import blogRoutes from './routes/blogRoutes.js';
const expressApp = async (app) => {
  app.use(express.json({ limit: '5mb' }));
  app.use(express.urlencoded({ extended: true, limit: '5mb' }));
  app.use(cors());
  app.use(morgan('dev'));

  // Serve static file
  app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));

  app.use('/api/auth', userRoutes);
  app.use('/api/blogs', blogRoutes);

  app.get('/', (re, res) => {
    res.status(200).json({ message: 'Blog backend!' });
  });
};

export default expressApp;
