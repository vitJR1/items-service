import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class AuthLoginDto {
  @ApiProperty({ required: true, default: 'admin' })
  @IsString()
  email: string;

  @ApiProperty({ required: true, default: 'String1!' })
  @IsString()
  password: string;
}
