import { Response } from 'express';
import { Body, Controller, Res, Delete, Put, Post, Request, HttpStatus } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { INCORRECT, CORRECT } from 'src/config/app.constant';
import { Public } from '../common/decorators/public.decorator';
import { AuthService } from './auth.service';
import { LoginAccountDto } from './dto/login-account.dto';
import { RegisterAccountDto } from './dto/register-account.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post()
  async register(@Body() registerDto: RegisterAccountDto, @Res() res: Response): Promise<any> {
    const response = await this.authService.register(registerDto);
    if (response === INCORRECT) {
      return res.status(HttpStatus.CONFLICT).send({});
    }

    return res.status(HttpStatus.CREATED).send({});
  }

  @Public()
  @Put()
  async login(@Body() loginDto: LoginAccountDto, @Res() res: Response) {
    const response = await this.authService.login(loginDto);
    if (response === INCORRECT) {
      return res.status(HttpStatus.NOT_FOUND).send({});
    }
    const { accessToken } = response
    return res.status(HttpStatus.OK).json({token: accessToken});
  }

  @Delete()
  async logout(@Request() req, @Res() res: Response) {
    const response = await this.authService.logout(req.user.id);
    if (response === INCORRECT) {
      return res.status(HttpStatus.NOT_FOUND).send({});
    }
    
    return res.status(HttpStatus.RESET_CONTENT).send({}); 
  }
  
}
