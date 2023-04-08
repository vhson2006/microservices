import { Module } from '@nestjs/common';
import { ProfileController } from './profile.controller';
import { ProfileService } from './profile.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Account } from 'src/entities/account.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Account]),
  ],
  controllers: [ProfileController],
  providers: [ProfileService, ],
  exports: [ProfileService],
})
export class ProfileModule {}
