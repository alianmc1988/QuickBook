import { Role } from '../entities/Role.entity';
import { User } from '../entities/user.entity';

export class ResponseUserDto {
  userId: string;

  email: string;

  name: string;

  roles: Role[];

  createdAt: Date;

  updatedAt: Date;

  constructor(user: User) {
    this.userId = user.id;
    this.email = user.email;
    this.name = user.name;
    this.roles = user.roles;
    this.createdAt = user.createdAt;
    this.updatedAt = user.updatedAt;
  }
}
