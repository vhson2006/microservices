import { ApiProperty } from '@nestjs/swagger';
import { Allow, IsNotEmpty, Min } from 'class-validator';

export class CreateUserProductDto {
  @ApiProperty({ description: 'name' })
  @IsNotEmpty()
  readonly name: string;

  @ApiProperty({ description: 'code' })
  @IsNotEmpty()
  readonly code: string;

  @ApiProperty({ description: 'quantity' })
  @IsNotEmpty()
  readonly quantity: string;

  @ApiProperty({ description: 'price' })
  @IsNotEmpty()
  readonly price: string;
}
