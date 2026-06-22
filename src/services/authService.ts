import bcrypt from 'bcrypt';
import User, { IUser } from '../models/User';
import { sign } from 'jsonwebtoken';

export const registerUser = async (data: any): Promise<IUser> => {
  const existingUser = await User.findOne({ email: data.email });
  if (existingUser) {
    throw new Error('Email is already registered');
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(data.password, salt);

  const user = await User.create({
    name: data.name,
    email: data.email,
    password: hashedPassword,
  });

  return user;
};

export const loginUser = async (data: any): Promise<{ user: IUser; token: string }> => {
  const user = await User.findOne({ email: data.email });
  if (!user) {
    throw new Error('Invalid email or password');
  }

  const isMatch = await bcrypt.compare(data.password, user.password as string);
  if (!isMatch) {
    throw new Error('Invalid email or password');
  }
  const token = sign(
    { userId: user._id.toString() }, 
    process.env.JWT_SECRET as string, 
    { expiresIn: '1d' }
  );

  return { user, token };
};