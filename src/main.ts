import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConsoleLogger } from '@nestjs/common';

async function bootstrap() {
  const env = process.env.NODE_ENV;
  console.log(env);
  const app = await NestFactory.create(AppModule, {
    logger: new ConsoleLogger({
      prefix: 'QuickBook', // Default is "Nest",
      timestamp: true,
      json: true,
      colors: !env || env === 'development',
    }),
  });
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
