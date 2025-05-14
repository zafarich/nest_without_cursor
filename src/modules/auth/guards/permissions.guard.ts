import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PERMISSIONS_KEY } from '../decorators/permissions.decorator';
import { Role } from '@/modules/roles/entities/role.entity'; // Role entity import qilinishi kerak

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredPermissions = this.reflector.getAllAndOverride<string[]>(
      PERMISSIONS_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (!requiredPermissions) {
      return true; // Agar hech qanday ruxsat talab qilinmasa, ruxsat beriladi
    }

    const { user } = context.switchToHttp().getRequest();

    if (!user || !user.roles) {
      return false; // Agar foydalanuvchi yoki uning rollari mavjud bo'lmasa, ruxsat berilmaydi
    }

    // Foydalanuvchining barcha rollaridagi ruxsatlarni yig'amiz
    const userPermissions = user.roles.reduce((acc: string[], role: Role) => {
      if (role.permissions) {
        role.permissions.forEach((permission) => {
          if (!acc.includes(permission.name)) {
            acc.push(permission.name);
          }
        });
      }
      return acc;
    }, []);

    // Talab qilingan ruxsatlarning hammasi foydalanuvchida borligini tekshiramiz
    return requiredPermissions.every((permission) =>
      userPermissions.includes(permission),
    );
  }
}
