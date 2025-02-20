export enum UserRolesEnum {
  ADMIN = 'admin',
  MANAGER = 'manager',
  STAFF = 'staff',
}

export const NumericStaffEnum = {
  [UserRolesEnum.ADMIN]: 10,
  [UserRolesEnum.MANAGER]: 20,
  [UserRolesEnum.STAFF]: 50,
};
