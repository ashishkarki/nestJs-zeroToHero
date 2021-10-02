import {
  POSTGRES_USERNAME,
  POSTGRES_PASSWORD,
  POSTGRES_TASKMGMT_DB_NAME,
  HOST_NAME,
  POSTGRES_PORT_NUM,
} from './secrets/db-connection-creds';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksModule } from './tasks/tasks.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TasksModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: HOST_NAME,
      port: POSTGRES_PORT_NUM,
      username: POSTGRES_USERNAME,
      password: POSTGRES_PASSWORD,
      database: POSTGRES_TASKMGMT_DB_NAME,
      autoLoadEntities: true,
      synchronize: true,
    }),
    AuthModule,
  ],
})
export class AppModule {}
