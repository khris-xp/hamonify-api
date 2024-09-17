import { SetMetadata } from '@nestjs/common';
import { UserRole } from 'src/shared/enums/user-role';

export const ROLES_KEY = 'roles';

export const Roles = (...roles: UserRole[]) => SetMetadata(ROLES_KEY, roles);

export const ExcludeRoles = (...roles: UserRole[]) => {
  const allowedRoles = Object.values(UserRole).filter(
    (role) => !roles.includes(role),
  );

  return SetMetadata(ROLES_KEY, allowedRoles);
};
