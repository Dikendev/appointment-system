import * as bcrypt from 'bcrypt';
import { _SALT_ROUNDS } from './salt.constant';

export const hashPassword = async (password: string): Promise<string> => {
  const saltRounds = _SALT_ROUNDS;
  const salt = await bcrypt.genSalt(saltRounds);
  return bcrypt.hash(password, salt);
};
