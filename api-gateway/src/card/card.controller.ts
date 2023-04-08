import { Controller, Get, OnModuleInit, Inject, Query, Param } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { ApiTags } from '@nestjs/swagger';
import { Public } from 'src/common/decorators/public.decorator';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { CardService } from './card.service';

@ApiTags('card')
@Controller('card')
export class CardController implements OnModuleInit {
  constructor(
    private readonly cardService: CardService,
    @Inject('PRODUCT_SERVICE') private readonly productClient: ClientKafka,
  ) {}

  @Public()
  @Get()
  async getCard(@Query() query: PaginationQueryDto) {
    return this.cardService.getCard(query);
  }

  onModuleInit() {
    this.productClient.subscribeToResponseOf('card_get_list');
  }
}
