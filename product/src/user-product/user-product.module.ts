import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserProductController } from './user-product.controller';
import { UserProductService } from './user-product.service';
import { UserProduct } from '../entities/user-product.entity'
import { UserProductTransform } from './user-product.transform';

@Module({
  imports: [TypeOrmModule.forFeature([UserProduct])],
  controllers: [UserProductController],
  providers: [UserProductService, UserProductTransform],
  exports: [UserProductService],
})
export class UserProductModule {}
