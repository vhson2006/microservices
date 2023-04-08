import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientKafka } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { CORRECT, INCORRECT } from 'src/config/app.constant';
import { CryptoService } from 'src/crypto/crypto.service';
import { Account } from 'src/entities/account.entity';
import { Repository } from 'typeorm';
import { ForgotPasswordRequestDto } from './dto/request-reset-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { SendEmailEvent } from './event/send-email.event';

@Injectable()
export class ForgotPasswordService {
  constructor(
    @InjectRepository(Account)
    private readonly accountRepository: Repository<Account>,
    @Inject('EMAIL_SERVICE')
    private readonly emailClient: ClientKafka,
    private readonly crytoService: CryptoService,
    private readonly configService: ConfigService
  ) {}
  
  async requestForgotPassword(forgotPasswordRequest: ForgotPasswordRequestDto) {
    const { email } = forgotPasswordRequest;
    const account = await this.accountRepository.findOne({ where: { email: email }})
    if (account) {
      const forgotPasswordToken = this.crytoService.generateUniqueCode()
      await this.accountRepository.update(
        account.id, 
        { forgotToken: forgotPasswordToken }
      )
      
      return this.emailClient.send(
        'email_send', 
        new SendEmailEvent(
          'resetPassword', 
          email, 
          `${this.configService.get('global.frontend')}/auth/reset-password/${forgotPasswordToken}`
        )
      );
    }
    return INCORRECT;
  }

  async resetPassword(data: ResetPasswordDto) {
    const { resetToken, password } = data
    const account = await this.accountRepository.findOne({ where: { resetToken: resetToken }})
    if (account) {
      await this.accountRepository.update(
        account.id, 
        { 
          password: this.crytoService.hashPassword(password),
          resetToken: this.crytoService.generateUniqueCode()
        }
      )
      
      return CORRECT;
    }
    return INCORRECT;
  }

  async getResetToken(token: string) {
    const account = await this.accountRepository.findOne({ where: { forgotToken: token }})
    if (account) {
      const resetToken = this.crytoService.generateUniqueCode()
      await this.accountRepository.update(
        account.id, 
        { 
          forgotToken: this.crytoService.generateUniqueCode(),
          resetToken: resetToken
        }
      )
      
      return resetToken;
    }
    return INCORRECT;
  }

 
}
