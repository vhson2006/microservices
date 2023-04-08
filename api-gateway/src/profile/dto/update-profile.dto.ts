import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsPhoneNumber, MinLength } from 'class-validator';

export class UpdateProfileDto {

  @ApiProperty({ description: 'name' })
  @IsNotEmpty()
  readonly name: string;

  @ApiProperty({ description: 'phone' })
  @MinLength(10)
  readonly phone: string;

  @ApiProperty({ description: 'address' })
  @IsNotEmpty()
  readonly address: string;
}
