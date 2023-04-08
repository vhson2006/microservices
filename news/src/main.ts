import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { TimeoutInterceptor } from './common/interceptors/timeout.interceptor';
import { WrapResponseInterceptor } from './common/interceptors/wrap-response.interceptor';
import { NotFoundExceptionFilter } from './common/filters/not-found-exception.filter';
import * as dotenv from 'dotenv';
dotenv.config();

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.KAFKA,
      options: {
        client: {
          clientId: 'news',
          brokers: [
            `${process.env.BROKER_HOST}:${process.env.BROKER_PORT}`,
            // `${process.env.BROKER_HOST}-1:${process.env.BROKER_PORT}`,
            // `${process.env.BROKER_HOST}-2:${process.env.BROKER_PORT}`,
          ],
        },
        consumer: {
          groupId: 'news-consumer',
        },
      },
    },
  );
  const config = app.get<ConfigService>(ConfigService);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalFilters(new NotFoundExceptionFilter());
  app.useGlobalInterceptors(
    new WrapResponseInterceptor(),
    new TimeoutInterceptor(config.get('global.timeout')),
  );

  await app.listen();
}
bootstrap();
