import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { APP_SECRET } from '../config/index.js';

export const GenerateSalt = async () => {
  return await bcryptjs.genSalt();
};

export const GeneratePassword = async (password, salt) => {
  return await bcryptjs.hash(password, salt);
};

export const ValidatePassword = async (enteredPassword, savedPassword) => {
  return await bcryptjs.compare(enteredPassword, savedPassword);
};

export const GenerateSignature = async (payload) => {
  try {
    return jwt.sign(payload, APP_SECRET, { expiresIn: '30d' });
  } catch (error) {
    console.error('Error generating JWT:', error.message);
    return null;
  }
};

export const ValidateSignature = async (req) => {
  try {
    const signature = req.get('Authorization');
    if (!signature || !signature.startsWith('Bearer ')) return false;
    const token = signature.split(' ')[1];
    const payload = await jwt.verify(token, APP_SECRET);
    req.user = payload;
    return true;
  } catch (error) {
    console.log('JWT Verification Failed:', error.message);
    return false;
  }
};
