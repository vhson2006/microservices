import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CORRECT, INCORRECT } from 'src/config/app.constant';
import { Account } from 'src/entities/account.entity';
import { Repository } from 'typeorm';
import { transformProfile } from './profile.transform';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(Account)
    private readonly accountRepository: Repository<Account>
  ) {}

  async getProfile(id: string) {
    const account = await this.accountRepository.findOne(id)
    if (account) {
      return transformProfile(account)
    }

    return INCORRECT;
  }

  async updateProfile(id: string, data: any) {
    const account = await this.accountRepository.findOne(id)
    if (account) {
      const response = await this.accountRepository.update(id, data)
      console.log(response)
      if (response.affected > 0) {
        return CORRECT;
      }

      return INCORRECT;
    }

    return INCORRECT;
  }
}
