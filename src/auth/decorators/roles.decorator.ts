import { SetMetadata } from '@nestjs/common';
import constant from '../auth.constants';

export const Roles = (...args: string[]) =>
  SetMetadata(constant.ROLES_KEY, args);
