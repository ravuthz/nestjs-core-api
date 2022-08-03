import { SetMetadata } from '@nestjs/common';
import constant from '../auth.constants';

export const Permissions = (...args: string[]) =>
  SetMetadata(constant.PERMISSIONS_KEY, args);
