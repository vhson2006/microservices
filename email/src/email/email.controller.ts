import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { Public } from 'src/common/decorators/public.decorator';
import { CORRECT } from 'src/config/app.constant';
import { EmailService } from './email.service';

@Controller()
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  @MessagePattern('email_send')
  async sendMail(data: any) {
    const { value } = data
    this.emailService.send(value);
    
    return {
      status: CORRECT,
    };
  }
}
