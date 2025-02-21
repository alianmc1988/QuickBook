import { DBConfig } from '@/database/databaseConfig.interface';

export default () => ({
  port: parseInt(process.env.PORT!, 10) || 3000,
  database: {
    type: 'postgres',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT!, 10) || 5432,
    dbUserName: process.env.DB_USERNAME,
    dbPassword: process.env.DB_PASSWORD,
    dbName: process.env.DB_NAME,
    syncronize: process.env.NODE_ENV === 'development',
    dbLoggin: process.env.NODE_ENV === 'development',
    autoLoadEntities: process.env.NODE_ENV === 'development',
  } as DBConfig,
});
