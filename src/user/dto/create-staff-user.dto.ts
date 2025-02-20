import { UserRolesEnum } from '../valueObjects/UserType.enum';

export class CreateStaffRoleUserDto {
  role: UserRolesEnum;
  companyId: string;
  userId: string;
  phoneNumber: string;
  roleNumber: number;
}
