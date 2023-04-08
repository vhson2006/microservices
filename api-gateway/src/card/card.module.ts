import {  Module } from '@nestjs/common';
import { CardController } from './card.controller';
import { CardService } from './card.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Account } from 'src/entities/account.entity';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forFeature([Account]),
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

  controllers: [CardController],
  providers: [CardService],
  exports: [CardService],
})
export class CardModule {}
