import * as bcrypt from 'bcrypt';
import { Logger } from '@nestjs/common';

const logger = new Logger('Utils');

export const comparePasswords = async (userPassword, currentPassword) => {
  const compared = await bcrypt.compare(currentPassword, userPassword);
  logger.debug(`comparePasswords(${currentPassword}, ${userPassword}) == ${!!compared}`);
  return compared;
};

export const encryptPassword = async (password) => {
  const encoded = await bcrypt.hash(password, 16);
  logger.debug(`encryptPassword(${password}) == ${encoded}`);
  return encoded;
};