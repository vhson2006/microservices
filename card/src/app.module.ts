import { Module } from '@nestjs/common';
import * as Joi from '@hapi/joi';
import { ConfigModule, ConfigService } from '@nestjs/config';
import appConfig from './config/app.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommonModule } from './common/common.module';
import { utilities as nestWinstonModuleUtilities, WinstonModule } from 'nest-winston';
import * as winston from 'winston';
import { ScheduleModule } from '@nestjs/schedule';
import { TasksModule } from './tasks/tasks.module';
import { S3Module } from './s3/s3.module';
import { CrawlerModule } from './crawler/crawler.module';

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
        nestWinstonModuleUtilities.format.nestLike('MyApp', {
          // options
        }),
      ),
      transports: [
        new winston.transports.File({
          dirname: 'logs',
          filename: 'error.log',
          level: 'error',
        }),
        // new winston.transports.Console({
        //   level: 'debug',
        // }),
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
    ScheduleModule.forRoot(),
    TasksModule,
    CommonModule,
    S3Module,
    CrawlerModule,
  ]
})
export class AppModule {}
