import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { TimeoutInterceptor } from './common/interceptors/timeout.interceptor';
import { WrapResponseInterceptor } from './common/interceptors/wrap-response.interceptor';
import rateLimit from 'express-rate-limit';
import * as helmet from 'helmet';
import * as compression from 'compression';
import { NotFoundExceptionFilter } from './common/filters/not-found-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get<ConfigService>(ConfigService);
  if (config.get('environment') === 'production') {
    app.use(
      rateLimit({
        windowMs: config.get('global.slotTime'),
        max: config.get('global.numberRequestPerSlot'),
      }),
    );
  }
  app.enableCors({
    origin: config.get('environment') === 'production'
      ? /^(https?:\/\/([^\.]*\.)?tcgplayer\.online)/
      : '*',
  });
  app.use(compression());

  app.use(
    helmet({
      contentSecurityPolicy: false,
    }),
  );
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
  app.setGlobalPrefix('api');
  const options = new DocumentBuilder()
    .addSecurity('basic', {
      type: 'http',
      scheme: 'basic',
    })
    .setTitle('Swagger')
    .setDescription('KIOT API')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, options);

  SwaggerModule.setup('swagger', app, document);

  await app.listen(config.get('global.port'));
}
bootstrap();
