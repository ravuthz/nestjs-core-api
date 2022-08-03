import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import constant from '../auth.constants';
import { User } from '../../user/entities/user.entity';

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(private reflector: Reflector) {
  }

  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    const requiredPermissions = this.reflector.getAllAndOverride<any[]>(
      constant.PERMISSIONS_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (!requiredPermissions) {
      return true;
    }

    const { user }: { user: User } = context.switchToHttp().getRequest();
    const permissions = await user.getAllPermissionNames();
    return requiredPermissions.some((role) => permissions.includes(role));
  }
}
