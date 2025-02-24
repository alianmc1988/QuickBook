import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration, { envConfig } from '../src/config/configuration';
import { dbConfigFactory } from '../src/database/dbConfig';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        AppModule,
        ConfigModule.forRoot({
          envFilePath: envConfig(process.env.NODE_ENV),
          load: [configuration],
          isGlobal: true,
        }),
        TypeOrmModule.forRootAsync({
          imports: [ConfigModule],
          useFactory: dbConfigFactory,
          inject: [ConfigService],
        }),
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });
});
