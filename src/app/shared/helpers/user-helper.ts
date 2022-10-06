import { UserData } from '@schemas/user.interface';
import { UserRolesEnum } from '@shared/enums/user-roles.enum';

export default class UserHelper {
  static isProfessionalSellerRole(user: UserData): boolean {
    return user.role_id === UserRolesEnum.PROFESSIONAL_SELLER;
  }

  static isTvbAdminRole(user: UserData): boolean {
    return user.role_id === UserRolesEnum.TVB_ADMIN;
  }

  static isRoleIdTvbAdmin(roleId: number | UserRolesEnum): boolean {
    return roleId == UserRolesEnum.TVB_ADMIN;
  }

  static getUserId(user: UserData): number {
    return UserHelper.isProfessionalSellerRole(user)
      ? user.id
      : 0;
  }
}
