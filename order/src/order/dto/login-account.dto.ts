import { ApiProperty } from '@nestjs/swagger';
import { Allow } from 'class-validator';

export class LoginAccountDto {
  @ApiProperty({ description: 'username' })
  @Allow()
  readonly username: string;

  @ApiProperty({ description: 'password' })
  @Allow()
  readonly password: string;
}
