import { Controller, Inject, OnModuleInit } from '@nestjs/common';
import { ClientKafka, EventPattern, MessagePattern } from '@nestjs/microservices';
import { CORRECT, INCORRECT } from 'src/config/app.constant';
import { PackageService } from './package.service';

@Controller()
export class PackageController implements OnModuleInit {
  constructor(
    private readonly packageService: PackageService,
    @Inject('PRODUCT_SERVICE') private readonly productClient: ClientKafka,
  ) {}

  @MessagePattern('package_get_list')
  async getPackageList(data: any) {
    const { value } = data
    const { userId, ...query } = value
    const response = await this.packageService.getPackageList(userId, query);
    if (response === INCORRECT) {
      return {
        status: INCORRECT,
        message: 'Something wrong',
      };
    }

    return {
      status: CORRECT,
      ...response
    };
  }

  @MessagePattern('package_get_detail')
  async getPackageDetail(data: any) {
    const { value } = data
    const { packageId } = value
    const response = await this.packageService.getPackageDetail(packageId);
    if (response === INCORRECT) {
      return {
        status: INCORRECT,
        message: 'Something wrong',
      };
    }

    return {
      status: CORRECT,
      data: response,
    };
  }

  @MessagePattern('package_remove')
  async removePackage(data: any) {
    const { value } = data
    const { packageId, userId } = value
    const response = await this.packageService.removePackage(packageId, userId);
    if (response === INCORRECT) {
      return {
        status: INCORRECT,
        message: 'Something wrong',
      };
    }

    return {
      status: CORRECT,
      data: response,
    };
  }

  @MessagePattern('package_complete')
  async completePackage(data: any) {
    const { value } = data
    const { packageId, userId } = value
    const response = await this.packageService.completePackage(packageId, userId);
    if (response === INCORRECT) {
      return {
        status: INCORRECT,
        message: 'Something wrong',
      };
    }

    return {
      status: CORRECT,
      data: response,
    };
  }

  onModuleInit() {
    // this.productClient.subscribeToResponseOf('get_user');
  }
}
