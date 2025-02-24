import { AuthGuard } from '@nestjs/passport';
import { LocalAuthGuard } from './local.auth.guard';
import { JwtAuthGuard } from './jwt.auth.guard';

export const guardStrategy = (): ReturnType<typeof AuthGuard> => {
  if (process.env.NODE_ENV === 'development') {
    return LocalAuthGuard;
  }
  return JwtAuthGuard;
};
