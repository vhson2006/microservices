import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { RegisterAccountDto } from './dto/register-account.dto';
import { INCORRECT, CORRECT } from '../config/app.constant';
import { CryptoService } from '../crypto/crypto.service';
import { Account } from '../entities/account.entity';
import { LoginAccountDto } from './dto/login-account.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Account)
    private readonly accountRepository: Repository<Account>,
    private readonly jwtService: JwtService,
    private readonly cryptoService: CryptoService,
    
  ) {}

  async register(registerData: RegisterAccountDto): Promise<number> {
    const { email, phone } = registerData;
    const account = await this.accountRepository.findOne({
      where: [
        {
          email: email
        },
        {
          phone: phone
        }
      ],
    });

    if (account) {
      return INCORRECT;
    }
    
    const { password, ...newAccount } = registerData
    const response = await this.accountRepository.insert({
      password: this.cryptoService.hashPassword(password),
      ...newAccount
    })
    if (response && response.identifiers && response.identifiers[0]?.id) {
      return CORRECT;
    }

    return INCORRECT;
  }

  async login(loginData: LoginAccountDto): Promise<any> {
    const { email, password } = loginData;
    const account = await this.accountRepository.findOne({
      where: {
        email: email,
        password: this.cryptoService.hashPassword(password),
      },
    });
    if (account) {
      const payload = {
        email: account.email,
        sub: account.id,
        session: account.webSession + 1,
      };
      await this.accountRepository.update(account.id, {
        webSession: account.webSession + 1,
      });

      return {
        accessToken: this.jwtService.sign(payload),
      };
    }

    return INCORRECT;
  }

  async logout(id: string): Promise<number> {
    const account = await this.accountRepository.findOne({where: {id: id}});
    const response = await this.accountRepository.update(id, {
      webSession: account.webSession + 1,
    });
    if (response.affected > 0) {
      return CORRECT;
    }
    return INCORRECT;
  }
}
