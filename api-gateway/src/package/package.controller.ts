import { OnModuleInit, Controller, Get, Inject, Param, Request, Query, Delete, Put } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { ApiTags } from '@nestjs/swagger';
import { Public } from 'src/common/decorators/public.decorator';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { PackageService } from './package.service';

@ApiTags('package')
@Controller('package')
export class PackageController implements OnModuleInit {
  constructor(
    private readonly packageService: PackageService,
    @Inject('ORDER_SERVICE') private readonly orderClient: ClientKafka,
  ) {}

  @Public()
  @Get(':id')
  async getPackage(@Param('id') id: string) {
    return await this.packageService.getPackage(id);
  }

  @Get()
  async getPackages(@Request() req, @Query() query: PaginationQueryDto) {
    return await this.packageService.getPackages(req.user.id, query);
  }

  @Delete(':id')
  async removePackage(@Request() req, @Param('id') id: string) {
    return await this.packageService.removePackage(req.user.id, id);
  }

  @Put(':id')
  async completePackage(@Request() req, @Param('id') id: string) {
    return await this.packageService.completePackage(req.user.id, id);
  }

  onModuleInit() {
    this.orderClient.subscribeToResponseOf('package_get_list');
    this.orderClient.subscribeToResponseOf('package_get_detail');
    this.orderClient.subscribeToResponseOf('package_remove');
    this.orderClient.subscribeToResponseOf('package_complete');
  }
}
