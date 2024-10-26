import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class AuthLoginDto {
  @ApiProperty({ required: true })
  @IsString()
  email: string;

  @ApiProperty({ required: true })
  @IsString()
  password: string;
}
