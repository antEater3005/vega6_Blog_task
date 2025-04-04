import User from '../models/User.js';

// Create a new user
export const createUser = async ({ email, password, profileImage, name }) => {
  try {
    const user = new User({ email, password, profileImage, name });
    return await user.save();
  } catch (error) {
    throw new Error('Error creating user: ' + error.message);
  }
};

// Get all users
export const getAllUsers = async () => {
  try {
    return await User.find();
  } catch (error) {
    throw new Error('Error fetching users: ' + error.message);
  }
};

// Find user by ID
export const getUserById = async (userId) => {
  try {
    return await User.findById(userId);
  } catch (error) {
    throw new Error('Error fetching user: ' + error.message);
  }
};

// Find user by email
export const getUserByEmail = async (email) => {
  try {
    return await User.findOne({ email });
  } catch (error) {
    throw new Error('Error fetching user: ' + error.message);
  }
};

// Update user details
export const updateUser = async (userId, updateData) => {
  try {
    return await User.findByIdAndUpdate(userId, updateData, {
      new: true,
    });
  } catch (error) {
    throw new Error('Error updating user: ' + error.message);
  }
};

// Delete user
export const deleteUser = async (userId) => {
  try {
    return await User.findByIdAndDelete(userId);
  } catch (error) {
    throw new Error('Error deleting user: ' + error.message);
  }
};
