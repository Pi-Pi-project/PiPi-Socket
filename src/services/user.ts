import { User } from "../models/user";

export const findUser = async (email: string): Promise<User> => {
  const user: any = await User.findOne({ where: { email } });
  return user;
};
