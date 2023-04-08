import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { GetPackageListEvent } from './events/get-package-list.event';
import { GetPackageDetailEvent } from './events/get-package-detail.event';
import { RemovePackageEvent } from './events/remove-package.event';
import { CompletePackageEvent } from './events/complete-package.event';

@Injectable()
export class PackageService {
  constructor(
    @Inject('ORDER_SERVICE') private readonly orderClient: ClientKafka,
  ) {}

  async getPackage(packageId: string) {
    return this.orderClient.send(
      'package_get_detail', 
      new GetPackageDetailEvent(packageId)
    );
  }

  async getPackages(userId: string, query: PaginationQueryDto) {
    const { search, page, size } = query
    return this.orderClient.send(
      'package_get_list', 
      new GetPackageListEvent(userId, search, page, size)
    );
  }

  async removePackage(userId: string, packageId: string) {
    return this.orderClient.send(
      'package_remove', 
      new RemovePackageEvent(userId, packageId)
    );
  }

  async completePackage(userId: string, packageId: string) {
    return this.orderClient.send(
      'package_complete', 
      new CompletePackageEvent(userId, packageId)
    );
  }
  
}
