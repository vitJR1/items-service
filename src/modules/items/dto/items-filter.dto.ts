import { Currency } from '../enum/currency.enum';
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNumberString } from 'class-validator';

export class ItemsFilterDto {
  @IsNumberString()
  @ApiProperty({ required: true, default: 730 })
  app_id: number;

  @IsEnum(Currency)
  @ApiProperty({ required: true, default: Currency.EUR, enum: Currency })
  currency: Currency;
}
