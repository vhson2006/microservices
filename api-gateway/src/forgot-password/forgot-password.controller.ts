import { Response } from 'express';
import { Body, Res, Controller, Delete, OnModuleInit, Patch, Put, Inject, Request, HttpStatus } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { ApiTags } from '@nestjs/swagger';
import { Public } from 'src/common/decorators/public.decorator';
import { ForgotPasswordRequestDto } from './dto/request-reset-password.dto';
import { ForgotPasswordService } from './forgot-password.service';
import { GetResetToken } from './dto/get-reset-token.dto'
import { INCORRECT } from 'src/config/app.constant';
import { ResetPasswordDto } from './dto/reset-password.dto';
@ApiTags('forgot-password')
@Controller('forgot-password')
export class ForgotPasswordController implements OnModuleInit {
  constructor(
    private readonly forgotPasswordService: ForgotPasswordService,
    @Inject('EMAIL_SERVICE') private readonly emailClient: ClientKafka
  ) {}

  @Public()
  @Patch()
  async requestForgotPassword(@Body() forgotPasswordRequest: ForgotPasswordRequestDto) {
    return await this.forgotPasswordService.requestForgotPassword(forgotPasswordRequest)
  }

  @Public()
  @Delete()
  async getResetToken(@Body() getResetToken: GetResetToken, @Res() res: Response) {
    const { forgotPasswordToken } = getResetToken
    const response = await this.forgotPasswordService.getResetToken(forgotPasswordToken)
    if (response === INCORRECT) {
      return res.status(HttpStatus.BAD_REQUEST).send({});
    }

    return res.status(HttpStatus.CREATED).json({token: response})
  }

  @Public()
  @Put()
  async resetPassword(@Body() resetPassword: ResetPasswordDto, @Res() res: Response) {
    const response = await this.forgotPasswordService.resetPassword(resetPassword)
    if (response === INCORRECT) {
      return res.status(HttpStatus.BAD_REQUEST).send({});
    }

    return res.status(HttpStatus.ACCEPTED).send({})
  }
  
  onModuleInit() {
    this.emailClient.subscribeToResponseOf('email_send')
  }
}
