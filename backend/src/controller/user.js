import * as userService from '../services/user.js';
import {
  GeneratePassword,
  GenerateSalt,
  GenerateSignature,
  ValidatePassword,
} from '../utils/index.js';

export const userSignUp = async (req, res) => {
  {
    const { email, password, name } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ err: 'Insufficient details to create user.' });
    }
    try {
      const existingUser = await userService.getUserByEmail(email);
      if (!existingUser) {
        let salt = await GenerateSalt();

        let userPassword = await GeneratePassword(password, salt);

        const newUser = await userService.createUser({
          email,
          profileImage: req.file ? `/uploads/${req.file.filename}` : null,
          password: userPassword,
          name,
        });

        const token = await GenerateSignature({
          email: email,
          _id: newUser._id,
        });

        return res.status(200).json({ token });
      } else {
        res.status(409).json({ message: 'User already exists!' });
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Some error occurred!' });
    }
  }
};

export const userSignIn = async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await userService.getUserByEmail(email);
    if (existingUser) {
      const validPassword = await ValidatePassword(
        password,
        existingUser.password
      );

      if (validPassword) {
        const token = await GenerateSignature({
          email: existingUser.email,
          _id: existingUser._id,
        });
        return res.status(200).json({ token });
      } else {
        return res.status(401).json({ message: 'Wrong Password!' });
      }
    }
    return res.status(404).json({ message: 'User not found!' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Some error occurred!' });
  }
};

export const getUserById = async (req, res) => {
  const userId = req.user._id;
  try {
    const user = await userService.getUserById(userId);
    res.status(200).json(user);
  } catch (error) {
    console.error(err);
    res.status(500).json({ message: error.message });
  }
};
