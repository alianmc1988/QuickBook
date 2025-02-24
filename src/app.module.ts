import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { CompanyModule } from './company/company.module';
import { ReservationModule } from './reservation/reservation.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration, { envConfig } from './config/configuration';
import { dbConfigFactory } from './database/dbConfig';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
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
    UserModule,
    CompanyModule,
    ReservationModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
