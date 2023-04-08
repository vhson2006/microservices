import { Module } from '@nestjs/common';
import { ForgotPasswordController } from './forgot-password.controller';
import { ForgotPasswordService } from './forgot-password.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Account } from 'src/entities/account.entity';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CryptoService } from 'src/crypto/crypto.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Account]),
    ClientsModule.registerAsync([
      {
        name: "EMAIL_SERVICE",
        imports: [ConfigModule],
        useFactory: (configService: ConfigService) => ({
          transport: Transport.KAFKA,
          options: {
            client: {
              clientId: 'email',
              brokers: [`${configService.get('broker.host')}:${configService.get('broker.port')}`],
            },
            consumer: {
              groupId: 'email-consumer',
            },
          },
        }),
        inject: [ConfigService],
      },
    ]),
  ],
  controllers: [ForgotPasswordController],
  providers: [ForgotPasswordService, CryptoService],
  exports: [ForgotPasswordService],
})
export class ForgotPasswordModule {}
