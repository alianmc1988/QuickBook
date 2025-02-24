import { DBConfig } from '@/database/databaseConfig.interface';

export interface IJwtSecret {
  secret: string;
  expiresIn: string;
}

export default () => ({
  port: parseInt(process.env.PORT!, 10) || 3000,
  database: {
    type: 'postgres',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT!, 10) || 5432,
    dbUserName: process.env.DB_USERNAME,
    dbPassword: process.env.DB_PASSWORD,
    dbName: process.env.DB_NAME,
    syncronize: process.env.NODE_ENV !== 'production',
    dbLoggin: process.env.NODE_ENV !== 'production',
    autoLoadEntities: process.env.NODE_ENV === 'production',
  } as DBConfig,
  jwt: {
    secret: process.env.JWT_SECRET || 'secret',
    expiresIn: process.env.JWT_EXPIRES_IN || '1h',
  } as IJwtSecret,
});

export const envConfig = (nodeEnv: string | undefined): string => {
  console.log(nodeEnv);
  if (nodeEnv) {
    if (nodeEnv === 'test') return '.env.test';
    if (nodeEnv === 'production') return '.env';
  }
  return '.env.local';
};
