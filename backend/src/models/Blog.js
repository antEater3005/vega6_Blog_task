import mongoose from 'mongoose';

const blogSchema = mongoose.Schema({
  userId: { type: mongoose.Types.ObjectId, ref: 'User' },
  title: {
    type: String,
    required: [true, 'Title is required'],
    minLength: [5, 'Title must be at least 5 characters long'],
    maxLength: [100, 'Title cannot exceed 100 characters'],
  },
  image: { type: String },
  description: { type: String, required: true },
});

export default mongoose.model('Blog', blogSchema);
