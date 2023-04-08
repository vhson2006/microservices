import { ApiProperty } from '@nestjs/swagger';
import { Allow, IsNotEmpty, Min } from 'class-validator';

export class OrderDto {
  @ApiProperty({ description: 'productId' })
  @IsNotEmpty()
  readonly productId: string;

  @ApiProperty({ description: 'quantity' })
  @Min(1)
  readonly quantity: string;

  @ApiProperty({ description: 'price' })
  @IsNotEmpty()
  readonly price: string;

  @ApiProperty({ description: 'trackCode' })
  @Allow()
  readonly trackCode: string;
}
