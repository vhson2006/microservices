import { Module } from '@nestjs/common';
import { PackageController } from './package.controller';
import { PackageService } from './package.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Account } from 'src/entities/account.entity';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forFeature([Account]),
    ClientsModule.registerAsync([
      {
        name: "ORDER_SERVICE",
        imports: [ConfigModule],
        useFactory: (configService: ConfigService) => ({
          transport: Transport.KAFKA,
          options: {
            client: {
              clientId: 'order',
              brokers: [`${configService.get('broker.host')}:${configService.get('broker.port')}`],
            },
            consumer: {
              groupId: 'order-consumer',
            },
          },
        }),
        inject: [ConfigService],
      }
    ]),
  ],
  controllers: [PackageController],
  providers: [PackageService, ],
  exports: [PackageService],
})
export class PackageModule {}
