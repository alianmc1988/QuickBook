import { ConfigService } from '@nestjs/config';
import { DBConfig } from './databaseConfig.interface';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const dbConfigFactory = (
  configService: ConfigService,
): TypeOrmModuleOptions => {
  const dbConfig = configService.get<DBConfig>('database');
  return {
    type: 'postgres',
    host: dbConfig?.host,
    port: dbConfig?.port,
    username: dbConfig?.dbUserName,
    password: dbConfig?.dbPassword,
    database: dbConfig?.dbName,
    autoLoadEntities: dbConfig?.autoLoadEntities,
    synchronize: dbConfig?.syncronize,
  };
};
