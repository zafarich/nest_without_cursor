import {
  Module,
  UnprocessableEntityException,
  ValidationPipe,
} from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from '@/app.controller';
import { AppService } from '@/app.service';
import { environmentValidationSchema } from '@common/validations/global';
import configuration from '@config/configuration';
import { dataSourceOptions } from '@database/data-source';
import { WinstonModule } from 'nest-winston';
import { loggerConfig } from '@config/logger.config';
import { APP_FILTER, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { HttpExceptionFilter } from '@common/filters/http-exception.filter';
import { TransformInterceptor } from '@common/interceptors/transform.interceptor';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmAsyncConfig } from '@config/typeorm.config';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { CategoriesModule } from './modules/categories/categories.module';
import { RolesModule } from '@/modules/roles/roles.module';
import { SuperusersModule } from '@/modules/superusers/superusers.module';

import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.env.${process.env.NODE_ENV || 'development'}`,
      isGlobal: true,
      load: [configuration],
      validationSchema: environmentValidationSchema,
      validationOptions: {
        allowUnknown: true,
        abortEarly: false,
      },
    }),

    // ServeStaticModule.forRoot({
    //   rootPath: join(process.cwd(), 'public'),
    // }),

    TypeOrmModule.forRootAsync(typeOrmAsyncConfig),

    TypeOrmModule.forRoot(dataSourceOptions),

    WinstonModule.forRoot(loggerConfig),

    UsersModule,

    AuthModule,

    CategoriesModule,

    RolesModule,

    SuperusersModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
        exceptionFactory: (errors) => {
          const formattedErrors = errors.map((error: any) => ({
            field: error.property,
            message: Object.values(error.constraints).join(', '),
          }));

          console.log('formattedErrors', formattedErrors);

          return new UnprocessableEntityException(formattedErrors);
        },
      }),
    },
    // {
    //   provide: APP_INTERCEPTOR,
    //   useClass: TransformInterceptor,
    // },
  ],
})
export class AppModule {}
