export interface DBConfig {
  type: string;
  host: string;
  port: number;
  dbUserName: string;
  dbPassword: string;
  dbName: string;
  syncronize: boolean | undefined;
  dbLoggin: boolean | undefined;
  autoLoadEntities: boolean | undefined;
}
