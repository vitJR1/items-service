import { IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserBalanceDto {
  @IsNumber()
  @ApiProperty({ required: true })
  balance: number;
}
