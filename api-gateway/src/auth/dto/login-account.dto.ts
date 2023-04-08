import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, MinLength } from 'class-validator';

export class LoginAccountDto {
  @ApiProperty({ description: 'email' })
  @IsEmail()
  readonly email: string;

  @ApiProperty({ description: 'password' })
  @MinLength(6)
  readonly password: string;
}
