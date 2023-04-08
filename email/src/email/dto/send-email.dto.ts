import { IsString, IsEmail } from 'class-validator';

export class SendEmailDto {
  @IsEmail()
  readonly email: string;

  @IsString()
  readonly code: string;
}
