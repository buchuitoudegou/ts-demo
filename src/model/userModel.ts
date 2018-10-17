import mongoose from './db';
import { Schema } from 'mongoose';
import { IUser } from './typings';

const UserSchema: Schema = new Schema({
  username: String,
  password: String,
  userid: Number,
  email: String
});

const userModel: mongoose.Model<IUser> = mongoose.model('User', UserSchema);

export default userModel;