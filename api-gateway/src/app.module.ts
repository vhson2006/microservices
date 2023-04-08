import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as Joi from '@hapi/joi';
import duplicate from 'duplicate-requests';
import appConfig from './config/app.config';
import { NewsModule } from './news/news.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { CommonModule } from './common/common.module';
import { ProfileModule } from './profile/profile.module';
import { ForgotPasswordModule } from './forgot-password/forgot-password.module';
import { ProductModule } from './product/product.module';
import { UserProductModule } from './user-product/user-product.module';
import { OrderModule } from './order/order.module';
import { PackageModule } from './package/package.module';
import { CardModule } from './card/card.module';

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
    CommonModule,
    AuthModule,
    ProfileModule,
    NewsModule,
    ForgotPasswordModule,
    ProductModule,
    UserProductModule,
    OrderModule,
    PackageModule,
    CardModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule implements NestModule {
  constructor(private configService: ConfigService) {}

  configure(consumer: MiddlewareConsumer) {
    if (this.configService.get('environment') === 'production') {
      consumer
        .apply(
          duplicate({
            expiration: '1s',
            property: (req) => JSON.stringify(req.body),
            prefix: 'kache',
          }),
        )
        .forRoutes({
          path: '*',
          method: 1
        })
    }
  }
}
