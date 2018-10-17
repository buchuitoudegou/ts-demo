import mongoose from "./db";

export const DB_CONNECT_ERROR = -1;
export const SUCCESS = 0;
export const DUPLICATED_USERNAME = 1;
export const DUPLICATED_EMAIL = 2;
export const INVALID_PASSWORD = 3;

export interface IUserBasic {
  username: string;
  email: string;
  userid: number;
  password?: string;
};

export interface IUser extends mongoose.Document, IUserBasic {};
