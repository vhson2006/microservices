import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { CORRECT, INCORRECT } from 'src/config/app.constant';
import { CardService } from './card.service';

@Controller()
export class CardController {
  constructor(private readonly cardService: CardService) {}

  @MessagePattern('card_get_list')
  async getCardList(data: any) {
    const { value } = data
    const response = await this.cardService.getCardList(value);
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
  
}
