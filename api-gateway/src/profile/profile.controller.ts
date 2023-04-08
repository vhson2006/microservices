import { Body, Controller, Get, Put, Request, HttpStatus, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { INCORRECT } from 'src/config/app.constant';
import { ProfileService } from './profile.service';
import { UpdateProfileDto } from './dto/update-profile.dto'

@ApiTags('profile')
@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}
  
  @Get()
  async getProfile(@Request() req, @Res() res: Response) {
    const response = await this.profileService.getProfile(req.user.id);
    if (response === INCORRECT) {
      return res.status(HttpStatus.NOT_FOUND).send({})
    }

    return res.status(HttpStatus.OK).send(response)
  }

  @Put()
  async updateProfile(@Request() req, @Body() data: UpdateProfileDto, @Res() res: Response) {
    const response = await this.profileService.updateProfile(req.user.id, data);
    if (response === INCORRECT) {
      return res.status(HttpStatus.BAD_REQUEST).send({})
    }

    return res.status(HttpStatus.ACCEPTED).send({})
  }
}
