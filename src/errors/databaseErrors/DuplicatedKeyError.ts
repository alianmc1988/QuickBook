import { HttpException, HttpStatus } from '@nestjs/common';

export class DuplicatedKeyError extends HttpException {
  constructor(message: string) {
    super(message, HttpStatus.UNPROCESSABLE_ENTITY);
  }
}
