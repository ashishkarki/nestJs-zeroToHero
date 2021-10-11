import { configValidationSchema } from './config.schema';
import { ConfigModule, ConfigService } from '@nestjs/config';
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
    ConfigModule.forRoot({
      envFilePath: [`.env.stage.${process.env.STAGE}`],
      validationSchema: configValidationSchema,
    }),
    TasksModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const isProd = configService.get('STAGE') === 'prod';
        return {
          ssl: isProd,
          extra: {
            ssl: isProd ? { rejectUnauthorized: false } : null,
          },

          type: 'postgres',
          autoLoadEntities: true,
          synchronize: true,
          host: configService.get('DB_HOST_NAME'),
          port: configService.get('DB_PORT_NUM'),
          username: configService.get('DB_USERNAME'),
          password: configService.get('DB_PASSWORD'),
          database: configService.get('DB_DATABASE_NAME'),
        };
      },
    }),
    AuthModule,
  ],
})
export class AppModule {}
