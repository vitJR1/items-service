import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsOptional,
  IsString,
  IsStrongPassword,
} from 'class-validator';

export class CreateUserDto {
  @IsOptional()
  @IsString()
  @ApiProperty({ required: false })
  name: string;

  @IsEmail()
  @ApiProperty({ required: true })
  email: string;

  @IsStrongPassword()
  @ApiProperty({ required: true })
  password: string;
}
