import { ApiProperty } from '@nestjs/swagger';
import { Allow, IsNotEmpty, Min } from 'class-validator';

export class UpdateUserProductDto {
  @ApiProperty({ description: 'name' })
  @Allow()
  readonly name: string;

  @ApiProperty({ description: 'code' })
  @Allow()
  readonly code: string;

  @ApiProperty({ description: 'quantity' })
  @Allow()
  readonly quantity: string;

  @ApiProperty({ description: 'price' })
  @Allow()
  readonly price: string;
}
