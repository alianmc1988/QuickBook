import { AuthService } from './auth.service';
import { Controller, Post, UseGuards, Request, Get } from '@nestjs/common';
import { ResponseUserDto } from '../user/dto/response-user.dto';
import { LocalAuthGuard } from './guards/local.auth.guard';
import { JwtAuthGuard } from './guards/jwt.auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  login(@Request() req: { user: ResponseUserDto }) {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/test')
  test(@Request() req: { user: ResponseUserDto }) {
    return req.user;
  }
}
