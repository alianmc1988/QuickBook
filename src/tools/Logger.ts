import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class AppLogger {
  private logger: Logger;
  constructor(private serviceName: string) {
    this.logger = new Logger(this.serviceName);
  }

  log(msg: string) {
    return this.logger.log(msg);
  }

  warn(msg: string) {
    return this.logger.warn(msg);
  }
}
