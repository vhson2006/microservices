import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class GetResetToken {
  @ApiProperty({ description: 'forgotPasswordToken' })
  @IsNotEmpty()
  readonly forgotPasswordToken: string;
}
