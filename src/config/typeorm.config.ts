// src/config/typeorm.config.ts
import { ConfigModule, ConfigService } from '@nestjs/config';
import {
  TypeOrmModuleAsyncOptions,
  TypeOrmModuleOptions,
} from '@nestjs/typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

export const typeOrmAsyncConfig: TypeOrmModuleAsyncOptions = {
  imports: [ConfigModule], // ConfigService ni inject qilish uchun kerak
  inject: [ConfigService], // ConfigService ni inject qilish uchun kerak
  useFactory: async (
    configService: ConfigService,
  ): Promise<TypeOrmModuleOptions> => {
    return {
      type: 'postgres',
      host: configService.get<string>('DATABASE_HOST'),
      port: configService.get<number>('DATABASE_PORT'),
      username: configService.get<string>('DATABASE_USERNAME'),
      password: configService.get<string>('DATABASE_PASSWORD'),
      database: configService.get<string>('DATABASE_NAME'),
      entities: [__dirname + '/../**/*.entity.{js,ts}'],
      migrations: [__dirname + '/../database/migrations/*.ts'],
      migrationsRun: true,
      synchronize: true,
      logging: false,
      namingStrategy: new SnakeNamingStrategy(),

      // ssl: configService.get<string>('NODE_ENV') === 'production'
      //   ? { rejectUnauthorized: false }
      //   : false,
    };
  },
};
