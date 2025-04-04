import mongoose from 'mongoose';
import { DB_URL } from './index.js';

export const dbConnect = async () => {
  try {
    await mongoose.connect(DB_URL);
    console.log('Database connected!');
  } catch (error) {
    console.log('Error! Cannot connect to Database!');
    console.log(error);
    process.exit(1);
  }
};
