export interface ITokenPayload {
  sub: string;
  name: string;
  email: string;
  roles: Array<string>;
}

export interface IStaffTokenPayload extends ITokenPayload {
  roleName: string;
  companyRole: string;
}
