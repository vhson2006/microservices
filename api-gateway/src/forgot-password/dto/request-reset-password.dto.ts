import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';

export class ForgotPasswordRequestDto {
  @ApiProperty({ description: 'email' })
  @IsEmail()
  readonly email: string;
}
