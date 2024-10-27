import { ApiProperty } from '@nestjs/swagger';
import { IsPositive } from 'class-validator';

export class CreatePurchaseDto {
  @IsPositive()
  @ApiProperty({ required: true })
  item: number;

  @IsPositive()
  @ApiProperty({ required: true })
  quantity: number;
}
