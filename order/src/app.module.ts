import { Module } from '@nestjs/common';
import * as Joi from '@hapi/joi';
import { ConfigModule, ConfigService } from '@nestjs/config';
import appConfig from './config/app.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderModule } from './order/order.module';
import { CommonModule } from './common/common.module';
import { WinstonModule } from 'nest-winston';
import * as winston from 'winston';
import { PackageModule } from './package/package.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        DATABASE_HOST: Joi.required(),
        DATABASE_PORT: Joi.number(),
      }),
      load: [appConfig],
      isGlobal: true,
      envFilePath: '.env',
    }),
    WinstonModule.forRoot({
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json(),
      ),
      transports: [
        new winston.transports.File({
          dirname: 'logs',
          filename: 'error.log',
          level: 'error',
        }),
      ],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: configService.get('database.type') as any,
        host: configService.get('database.host'),
        port: configService.get('database.port'),
        username: configService.get('database.user'),
        password: configService.get('database.password'),
        database: configService.get('database.name') as any,
        schema: configService.get('database.schema'),
        autoLoadEntities: true,
        logging: true,
        eager: true,
      }),
      inject: [ConfigService],
    }),
    OrderModule,
    PackageModule,
    CommonModule,
  ],
})
export class AppModule {}
