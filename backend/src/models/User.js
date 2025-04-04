import mongoose from 'mongoose';

const userSchema = mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: { type: String },
    profileImage: { type: String },
  },
  {
    toJSON: {
      transform(doc, ret) {
        delete ret.password;
        delete ret._v;
      },
    },

    timestamps: true,
  }
);

export default mongoose.model('User', userSchema);
