import userModel from './userModel';
import { DB_CONNECT_ERROR, DUPLICATED_USERNAME, DUPLICATED_EMAIL, INVALID_PASSWORD, IUser, SUCCESS, IUserBasic } from './typings';

export async function findUser(
  condition: IUser
): Promise<IUserBasic[]> {
  const result: IUser[] = await userModel.find(condition);
  const basicResult: IUserBasic[] = [];
  result.forEach((item: IUser) => {
    basicResult.push({
      username: item.username,
      userid: item.userid,
      email: item.email,
    });
  });
  return Promise.resolve(basicResult);
}

export async function addUser(
  newUser: IUser
): Promise<number> {
  let result = await findUser({ username: newUser.username } as IUser);
  if (result.length > 0) {
    return Promise.resolve(DUPLICATED_USERNAME);
  }
  result = await findUser({ email: newUser.email } as IUser);
  if (result.length > 0) {
    return Promise.resolve(DUPLICATED_EMAIL);
  }
  if (newUser.password.length < 6) {
    return Promise.resolve(INVALID_PASSWORD);
  }
  const id = (await findUser({} as IUser)).length;
  newUser.userid = id;
  try {
    await userModel.create(newUser);
    return Promise.resolve(SUCCESS);
  } catch (error) {
    console.log(error);
    return Promise.resolve(DB_CONNECT_ERROR);
  }
}