import { Currency } from '../enum/currency.enum';
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsPositive, IsString } from 'class-validator';

export class CreateItemDto {
  @IsString()
  @ApiProperty()
  market_hash_name: string;

  @IsEnum(Currency)
  @ApiProperty({ enum: Currency, default: Currency.EUR })
  currency: Currency;

  @IsString()
  @ApiProperty()
  item_page: string;

  @IsString()
  @ApiProperty()
  market_page: string;

  @ApiProperty()
  @IsPositive()
  suggested_price: number;

  @ApiProperty()
  @IsPositive()
  min_price: number;

  @ApiProperty()
  @IsPositive()
  max_price: number;

  @ApiProperty()
  @IsPositive()
  mean_price: number;

  @ApiProperty()
  @IsPositive()
  quantity: number;
}
