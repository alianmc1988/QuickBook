import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConsoleLogger } from '@nestjs/common';

async function bootstrap() {
  const env = process.env.NODE_ENV;
  const app = await NestFactory.create(AppModule, {
    logger: new ConsoleLogger({
      prefix: 'QuickBook',
      timestamp: true,
      json: true,
      colors: !env || env === 'development',
    }),
  });
  const PORT = process.env.PORT ?? 3000;
  await app.listen(PORT, () => {
    console.log(`
      API listening on port ${PORT},
      ENV=${env}
      `);
  });
}
bootstrap();
