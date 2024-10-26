import { ApiProperty } from '@nestjs/swagger';
import { IsIn, IsNumberString, IsOptional, IsString } from 'class-validator';

export class GetListFilter {
  @IsOptional()
  @IsNumberString()
  @ApiProperty({ required: false, default: 10 })
  take?: number;

  @IsOptional()
  @IsNumberString()
  @ApiProperty({ required: false, default: 0 })
  skip?: number;

  @IsOptional()
  @IsString()
  @ApiProperty({ required: false, default: 'id' })
  field?: string;

  @IsOptional()
  @IsIn(['ASC', 'DESC'])
  @ApiProperty({ required: false, default: 'DESC' })
  by?: 'ASC' | 'DESC';

  @IsOptional()
  @IsString()
  @ApiProperty({ required: false })
  search?: string;
}
