import { ResponseUserDto } from '../user/dto/response-user.dto';
import { UserService } from '../user/user.service';
import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ITokenPayload } from './interfaces/tokenPayload.interface';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UserService))
    private userService: UserService,

    private jwtService: JwtService,
  ) {}

  async validateUser(
    email: string,
    password: string,
  ): Promise<ResponseUserDto | null> {
    const user = await this.userService.findByEmailAndPassword(email, password);
    return user ? new ResponseUserDto(user) : null;
  }

  login(user: ResponseUserDto) {
    const payload: ITokenPayload = {
      email: user.email,
      name: user.name,
      sub: user.userId,
      roles: user.roles?.map((role) => role.id) || [],
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
