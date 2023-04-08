import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Item } from 'src/entities/item.entity';
import { Order } from 'src/entities/order.entity';
import { Package } from 'src/entities/package.entity';
import { PackageController } from './package.controller';
import { PackageService } from './package.service';
import { PackageTransform } from './package.transform';

@Module({
  imports: [
    TypeOrmModule.forFeature([Order, Package, Item]),
    ClientsModule.registerAsync([
      {
        name: "PRODUCT_SERVICE",
        imports: [ConfigModule],
        useFactory: (configService: ConfigService) => ({
          transport: Transport.KAFKA,
          options: {
            client: {
              clientId: 'product',
              brokers: [`${configService.get('broker.host')}:${configService.get('broker.port')}`],
            },
            consumer: {
              groupId: 'product-consumer',
            },
          },
        }),
        inject: [ConfigService],
      },
    ]),
  ],
  controllers: [PackageController],
  providers: [PackageService, PackageTransform],
  exports: [PackageService],
})
export class PackageModule {}
