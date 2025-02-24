import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { IJwtSecret } from '@/config/configuration';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [
    forwardRef(() => UserModule),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const jwtSecrets = configService.get<IJwtSecret>('jwt');
        return {
          secret: jwtSecrets?.secret,
          signOptions: { expiresIn: jwtSecrets?.expiresIn },
        };
      },
    }),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
